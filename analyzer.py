"""
LUCKY_INTEL_SYSTEM: analyzer.py
Proprietary PhishGuard Threat Analysis Engine
Version: 2.0.2 Stable — Real Network Checks Edition
Coded by Lucky // Om Patel
GitHub: https://github.com/lucky-om/CodeAlpha_PhishGuard

USAGE:
  python analyzer.py <domain_or_url>
  python analyzer.py paypal-secure-login.xyz
  python analyzer.py https://google.com
"""

import sys
import re
import time
import socket
import ssl
import urllib.request
import urllib.error
from datetime import datetime

# ─────────────────────────────────────────────
# CONSTANTS
# ─────────────────────────────────────────────
VERSION = "2.0.2"
TIMEOUT = 5  # seconds for network ops

BRANDS = {
    'microsoft': [r'rnicrosoft', r'micros0ft', r'mircosoft', r'office-365-', r'microsoft-verify', r'ms-security'],
    'google': [r'g00gle', r'google-verify', r'gmail-security', r'google-account-'],
    'amazon': [r'amazon-billing', r'amzn-', r'shopplng-amazon', r'amazon-update'],
    'netflix': [r'netfIix', r'netflix-billing', r'nfx-login', r'netflix-update'],
    'paypal': [r'paypa1', r'paypa-l', r'paypal-secure', r'paypal-update', r'paypal-billing'],
    'apple': [r'apple-id-verify', r'icloud-security', r'apple-support-', r'appie'],
    'facebook': [r'faceb00k', r'facebook-security', r'fb-verify', r'meta-security'],
    'instagram': [r'instagram-verify', r'insta-gram', r'inst4gram'],
    'steam': [r'st3am', r'steam-trade', r'steampowered-'],
    'chase': [r'chase-bank-', r'chase-verify', r'chasebank'],
    'bank': [r'bank-login', r'secure-banking', r'banking-update'],
}

HIGH_RISK_TLDS = ['.zip', '.mov', '.top', '.xyz', '.work', '.security',
                  '.info', '.pw', '.tk', '.ml', '.ga', '.cf', '.gq',
                  '.click', '.link', '.live', '.online']

URL_SHORTENERS = ['bit.ly', 't.co', 'tinyurl.com', 'ow.ly', 'goo.gl',
                  'rebrand.ly', 'buff.ly', 'is.gd', 'rb.gy', 'short.io']


# ─────────────────────────────────────────────
# DISPLAY HELPERS
# ─────────────────────────────────────────────
def print_header():
    print("\n" + "═" * 60)
    print(f"  ⚡ PHISHGUARD THREAT ANALYSIS ENGINE v{VERSION}")
    print(f"  By Lucky (Om Patel) | github.com/lucky-om")
    print("═" * 60)

def print_section(title):
    print(f"\n{'─' * 60}")
    print(f"  [PHASE] {title}")
    print('─' * 60)

def log(symbol, msg, color_code=''):
    RESET = '\033[0m'
    print(f"  {color_code}{symbol} {msg}{RESET if color_code else ''}")

def log_ok(msg):     log('✓', msg, '\033[92m')   # green
def log_warn(msg):   log('⚠', msg, '\033[93m')   # yellow
def log_crit(msg):   log('✗', msg, '\033[91m')   # red
def log_info(msg):   log('·', msg, '\033[96m')   # cyan
def log_data(msg):   log('→', msg, '\033[90m')   # gray


# ─────────────────────────────────────────────
# URL NORMALIZATION
# ─────────────────────────────────────────────
def normalize(raw):
    """Strips protocol and paths, returns clean domain + full lowercase url."""
    raw = raw.strip()
    # strip protocol
    domain = re.sub(r'^https?://', '', raw).split('/')[0].split('?')[0].split('#')[0]
    return domain.lower(), raw.lower()


def validate_input(raw):
    """Rejects obviously invalid inputs."""
    domain, _ = normalize(raw)
    pattern = r'^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$'
    if re.match(pattern, domain):
        return domain
    # try full url pattern
    if re.match(r'^https?://', raw):
        domain_from_url = re.sub(r'^https?://', '', raw).split('/')[0]
        if re.match(pattern, domain_from_url):
            return domain_from_url.lower()
    return None


# ─────────────────────────────────────────────
# REAL NETWORK CHECKS
# ─────────────────────────────────────────────

def check_dns_resolution(domain):
    """Tries to resolve the domain via DNS."""
    try:
        addrs = socket.getaddrinfo(domain, None, socket.AF_INET)
        ip = addrs[0][4][0]
        log_ok(f"DNS Resolution: {domain} → {ip}")
        return ip
    except socket.gaierror:
        log_warn(f"DNS Resolution: FAILED (domain does not resolve)")
        return None
    except Exception as e:
        log_warn(f"DNS Resolution: Error — {e}")
        return None


def check_ssl_certificate(domain):
    """Validates SSL/TLS certificate and extracts issuer info."""
    try:
        ctx = ssl.create_default_context()
        conn = ctx.wrap_socket(
            socket.create_connection((domain, 443), timeout=TIMEOUT),
            server_hostname=domain
        )
        cert = conn.getpeercert()
        conn.close()

        issuer = dict(x[0] for x in cert.get('issuer', []))
        subject = dict(x[0] for x in cert.get('subject', []))
        expire_raw = cert.get('notAfter', '')
        
        org = issuer.get('organizationName', 'Unknown')
        cn = subject.get('commonName', domain)
        log_ok(f"SSL Valid | Issuer: {org} | CN: {cn}")
        
        if expire_raw:
            try:
                expire = datetime.strptime(expire_raw, '%b %d %H:%M:%S %Y %Z')
                days_left = (expire - datetime.utcnow()).days
                if days_left < 14:
                    log_warn(f"SSL expires in {days_left} days — possible throwaway cert!")
                    return False, org
                else:
                    log_info(f"SSL expires: {expire.strftime('%Y-%m-%d')} ({days_left} days)")
            except ValueError:
                pass
        return True, org
    except ssl.SSLError as e:
        log_crit(f"SSL ERROR: {e}")
        return False, None
    except (socket.timeout, ConnectionRefusedError):
        log_warn(f"SSL: Port 443 unreachable (no HTTPS)")
        return False, None
    except Exception:
        log_warn(f"SSL: Unable to verify certificate")
        return False, None


def check_http_response(domain, raw_url):
    """Checks HTTP response code and detects redirects."""
    # Build a URL to check
    test_url = raw_url if raw_url.startswith('http') else f'https://{domain}'
    try:
        req = urllib.request.Request(
            test_url,
            headers={'User-Agent': 'Mozilla/5.0 (PhishGuard Security Scanner v2.0)'}
        )
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            final_url = resp.geturl()
            code = resp.status
            log_ok(f"HTTP {code} | Final URL: {final_url}")
            if final_url.lower() != test_url.lower():
                redirect_domain = re.sub(r'^https?://', '', final_url).split('/')[0]
                if redirect_domain.lower() != domain:
                    log_warn(f"Redirect detected → {redirect_domain}")
                    return code, final_url
            return code, final_url
    except urllib.error.HTTPError as e:
        log_warn(f"HTTP Error: {e.code} {e.reason}")
        return e.code, None
    except urllib.error.URLError as e:
        log_warn(f"Connection failed: {e.reason}")
        return None, None
    except Exception as e:
        log_warn(f"HTTP check failed: {e}")
        return None, None


def check_whois_age(domain):
    """
    Lightweight WHOIS-like check: newly registered domains are high risk.
    Uses IANA WHOIS over port 443 redirect (text-based TCP 43).
    NOTE: Real production WHOIS needs 'python-whois' library.
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(TIMEOUT)
        sock.connect(('whois.iana.org', 43))
        tld = '.' + domain.split('.')[-1]
        sock.send((tld + '\r\n').encode())
        raw = b''
        while True:
            chunk = sock.recv(1024)
            if not chunk:
                break
            raw += chunk
        sock.close()
        response = raw.decode('utf-8', errors='ignore').lower()
        if 'refer:' in response:
            log_info(f"WHOIS TLD registered — IANA record exists")
        else:
            log_warn(f"WHOIS TLD: Unverified or obscure registry")
    except Exception:
        log_info("WHOIS: Skipped (network timeout)")


# ─────────────────────────────────────────────
# HEURISTIC ANALYSIS
# ─────────────────────────────────────────────

def heuristic_analysis(domain, full_url):
    """
    Runs all static heuristic checks and returns (risk_score, findings[]).
    No network calls — pure pattern matching.
    """
    risk_score = 0
    findings = []
    clean = domain.lower()

    # 1. Brand impersonation check
    for brand, patterns in BRANDS.items():
        for pat in patterns:
            if re.search(pat, clean):
                risk_score += 4
                findings.append(('CRITICAL', f"Brand impersonation: matches '{brand.upper()}' threat cluster (pattern: {pat})"))
                break

    # 2. High-risk TLD check
    for tld in HIGH_RISK_TLDS:
        if clean.endswith(tld) or f'{tld}/' in clean:
            risk_score += 3
            findings.append(('WARNING', f"High-risk TLD: '{tld}' commonly used in malicious registrations"))
            break

    # 3. URL shortener detection
    for shortener in URL_SHORTENERS:
        if clean == shortener or clean.startswith(shortener + '/'):
            risk_score += 4
            findings.append(('CRITICAL', f"URL shortener detected ('{shortener}') — hides real destination"))
            break

    # 4. IP address in URL
    ip_pattern = r'^\d{1,3}(\.\d{1,3}){3}$'
    if re.match(ip_pattern, clean.split('/')[0]):
        risk_score += 5
        findings.append(('CRITICAL', 'IP address used as domain — legitimate sites use domain names, not raw IPs'))

    # 5. Credential theft indicator — @ symbol
    if '@' in full_url:
        risk_score += 5
        findings.append(('CRITICAL', '"@" symbol in URL — everything before "@" is ignored by browser, hides real destination'))

    # 6. Excessive subdomains (tunneling risk)
    dot_count = clean.split('/')[0].count('.')
    if dot_count >= 4:
        risk_score += 2
        findings.append(('WARNING', f'Excessive subdomain depth ({dot_count} levels) — indicates DNS tunneling or masking'))

    # 7. Excessive hyphens (typosquatting pattern)
    hyphen_count = clean.split('/')[0].count('-')
    if hyphen_count >= 3:
        risk_score += 2
        findings.append(('WARNING', f'{hyphen_count} hyphens in domain — common pattern in fake brand domains (e.g., secure-update-paypal-login.com)'))

    # 8. Port number in URL (unusual port for standard service)
    port_match = re.search(r':(\d{2,5})', clean)
    if port_match:
        port_num = int(port_match.group(1))
        if port_num not in (80, 443, 8080, 8443):
            risk_score += 3
            findings.append(('CRITICAL', f'Unusual port {port_num} in URL — may indicate C2 server or evasion'))

    # 9. Long domain heuristic (DGA — Domain Generation Algorithm)
    base_domain = clean.split('/')[0]
    base_no_tld = '.'.join(base_domain.split('.')[:-1])
    if len(base_no_tld) > 30:
        risk_score += 2
        findings.append(('WARNING', f'Abnormally long domain ({len(base_no_tld)} chars) — possible DGA or obfuscation'))

    # 10. Number substitution (leetspeak)
    if re.search(r'[a-z][0-9][a-z]', base_no_tld):
        risk_score += 2
        findings.append(('WARNING', 'Number-for-letter substitution detected (e.g., "0" for "o", "1" for "l") — visual deception'))

    # 11. Shannon entropy (random character strings — malware C2 domains)
    unique_chars = len(set(base_no_tld.replace('.', '').replace('-', '')))
    entropy = unique_chars / max(len(base_no_tld), 1)
    if entropy > 0.82 and len(base_no_tld) > 14:
        risk_score += 2
        findings.append(('WARNING', f'High entropy ratio ({entropy:.2f}) — domain looks algorithmically generated'))

    return risk_score, findings


# ─────────────────────────────────────────────
# REPORT PRINTER
# ─────────────────────────────────────────────

def print_final_report(domain, risk_score, findings, dns_ip, ssl_valid):
    print_section("FINAL THREAT ASSESSMENT REPORT")
    print(f"\n  Target: {domain}")
    print(f"  DNS: {'✓ Resolved to ' + dns_ip if dns_ip else '✗ Unresolvable'}")
    print(f"  SSL: {'✓ Valid Certificate' if ssl_valid else '✗ Invalid / Missing'}")
    print()

    if not findings:
        print("  ┌─────────────────────────────────────────────┐")
        print("  │  STATUS: PASS — No threats identified       │")
        print("  │  RISK SCORE: 0/10  |  THREAT: NEGLIGIBLE   │")
        print("  └─────────────────────────────────────────────┘")
    else:
        capped = min(risk_score, 10)
        level = 'CRITICAL 🔴' if capped >= 7 else 'HIGH ⚠️' if capped >= 4 else 'LOW 🟡'
        print(f"  RISK SCORE : {capped}/10")
        print(f"  THREAT LVL : {level}")
        print(f"  FINDINGS   : {len(findings)} anomaly(ies)\n")
        for severity, msg in findings:
            prefix = '  [✗]' if severity == 'CRITICAL' else '  [⚠]'
            print(f"{prefix} {msg}")

    print(f"\n{'═' * 60}")
    print("  Audit sealed by PhishGuard v2.0.0 | Coded by Lucky")
    print(f"{'═' * 60}\n")


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

def analyze(raw_input):
    print_header()

    domain = validate_input(raw_input)
    if not domain:
        print("\n  [FATAL] Invalid input. Provide a valid domain or URL.")
        print("  Example: python analyzer.py paypal-secure-login.xyz\n")
        return

    log_info(f"Target ingress: {domain}")
    time.sleep(0.2)

    # Phase 1: Heuristics (offline — always fast)
    print_section("HEURISTIC ANALYSIS (Offline)")
    risk_score, findings = heuristic_analysis(domain, raw_input)
    
    if not findings:
        log_ok("No heuristic anomalies detected.")
    else:
        for sev, msg in findings:
            if sev == 'CRITICAL':
                log_crit(msg)
            else:
                log_warn(msg)

    # Phase 2: Real network checks (online)
    print_section("LIVE NETWORK INSPECTION")

    dns_ip = check_dns_resolution(domain)
    time.sleep(0.3)

    ssl_valid = False
    ssl_org = None
    if dns_ip:
        ssl_valid, ssl_org = check_ssl_certificate(domain)
        time.sleep(0.3)
        check_http_response(domain, raw_input)
        time.sleep(0.2)

    check_whois_age(domain)

    # Final SSL scoring
    if not ssl_valid:
        risk_score += 2
        findings.append(('WARNING', 'Missing or invalid SSL certificate — high risk for credential theft'))

    if not dns_ip:
        risk_score += 1
        findings.append(('WARNING', 'Domain does not resolve — may be newly registered for phishing campaign'))

    print_final_report(domain, risk_score, findings, dns_ip, ssl_valid)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        analyze(sys.argv[1])
    else:
        print("\n  [PhishGuard Analyzer v2.0.0] — Coded by Lucky")
        print("  USAGE: python analyzer.py <domain_or_url>")
        print("  EXAMPLES:")
        print("    python analyzer.py paypal-secure-login.xyz")
        print("    python analyzer.py https://amazon-billing-update.info/verify")
        print("    python analyzer.py google.com\n")
