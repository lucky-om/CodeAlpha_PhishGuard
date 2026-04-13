"""
PhishGuard Threat Analysis Engine v3.0.0
Command-line URL heuristic scanner — mirrors detectorLogic.js checks.
Coded by Lucky // Om Patel
GitHub: https://github.com/lucky-om/CodeAlpha_PhishGuard

USAGE:
  python analyzer.py <domain_or_url>
  python analyzer.py paypal-secure-login.xyz
  python analyzer.py https://google.com
  python analyzer.py amazon-billing.info --json
"""

import sys
import re
import time
import json
import socket
import ssl
import urllib.request
import urllib.error
from datetime import datetime

# ─────────────────────────────────────────────────────────────────────────────
# VERSION & CONSTANTS
# ─────────────────────────────────────────────────────────────────────────────
VERSION = "3.0.0"
TIMEOUT = 5

BRANDS = {
    'microsoft': [r'rnicrosoft', r'micros0ft', r'mircosoft', r'office-365-', r'microsoft-verify', r'ms-security'],
    'google': [r'g00gle', r'google-verify', r'gmail-security', r'google-account-', r'g0ogle'],
    'amazon': [r'amazon-billing', r'amzn-', r'shopplng-amazon', r'amazon-update', r'arnazon'],
    'netflix': [r'netfIix', r'netflix-billing', r'nfx-login', r'netflix-update', r'net-flix'],
    'paypal': [r'paypa1', r'paypa-l', r'paypal-secure', r'paypal-update', r'paypal-billing', r'pay-pal'],
    'apple': [r'apple-id-verify', r'icloud-security', r'apple-support-', r'appie', r'appl3'],
    'facebook': [r'faceb00k', r'facebook-security', r'fb-verify', r'meta-security', r'facebok'],
    'instagram': [r'instagram-verify', r'insta-gram', r'inst4gram', r'1nstagram'],
    'steam': [r'st3am', r'steam-trade', r'steampowered-', r'steamcommunlty'],
    'chase': [r'chase-bank-', r'chase-verify', r'chasebank', r'chas3'],
    'bank': [r'bank-login', r'secure-banking', r'banking-update', r'bank-alert'],
    'whatsapp': [r'whatsapp-verify', r'whatsap\.', r'whats-app', r'watsapp'],
    'twitter': [r'tw1tter', r'twitter-verify', r'twltter', r'twtter'],
    'dhl': [r'dhl-delivery', r'dhl-track', r'dh1-parcel'],
    'fedex': [r'fedex-delivery', r'fedex-track', r'f3dex'],
    'hdfc': [r'hdfc-bank', r'hdfcbank-secure', r'hdfc-verify', r'hdfcnet'],
    'icici': [r'icici-bank', r'icicibanklogin', r'icici-verify'],
    'sbi': [r'sbi-bank', r'sbibank-secure', r'onlinesbi-verify', r'sbi-online'],
    'paytm': [r'paytm-verify', r'paytm-kyc', r'paytm-update'],
    'walmart': [r'walrnart', r'walmart-billing', r'wal-mart-'],
}

HIGH_RISK_TLDS = [
    '.zip', '.mov', '.top', '.xyz', '.work', '.security',
    '.info', '.pw', '.tk', '.ml', '.ga', '.cf', '.gq',
    '.click', '.link', '.live', '.online', '.ru', '.cn',
    '.cc', '.ws', '.biz', '.icu', '.fun', '.vip',
]

URL_SHORTENERS = [
    'bit.ly', 't.co', 'tinyurl.com', 'ow.ly', 'goo.gl',
    'rebrand.ly', 'buff.ly', 'is.gd', 'rb.gy', 'short.io',
    'cutt.ly', 'shorte.st', 'tiny.cc', 'bl.ink', 't.ly',
]

FREE_HOSTING = [
    '.github.io', '.netlify.app', '.glitch.me', '.pages.dev',
    '.vercel.app', '.weebly.com', '.000webhostapp.com',
    '.web.app', '.firebaseapp.com', '.surge.sh',
]

PHISHING_PATH_KEYWORDS = [
    '/login', '/signin', '/verify', '/secure', '/update',
    '/confirm', '/account', '/billing', '/webscr', '/validate',
    '/auth', '/credential', '/recover', '/reset-password',
]

SUSPICIOUS_SUBDOMAINS = [
    'login.', 'secure.', 'verify.', 'account.', 'update.',
    'signin.', 'billing.', 'auth.', 'portal.', 'webmail.',
    'support.', 'helpdesk.',
]

REDIRECT_PARAMS = [
    'redirect', 'url', 'goto', 'next', 'return',
    'callback', 'dest', 'destination', 'continue',
]

KNOWN_BRAND_DOMAINS = ['google', 'microsoft', 'amazon', 'apple', 'facebook', 'github', 'paypal', 'netflix', 'twitter']


# ─────────────────────────────────────────────────────────────────────────────
# DISPLAY HELPERS
# ─────────────────────────────────────────────────────────────────────────────
def print_header():
    print("\n" + "═" * 65)
    print(f"  ⚡ PHISHGUARD THREAT ANALYSIS ENGINE v{VERSION}")
    print(f"  By Lucky (Om Patel) | github.com/lucky-om/CodeAlpha_PhishGuard")
    print("═" * 65)

def print_section(title):
    print(f"\n{'─' * 65}")
    print(f"  [PHASE] {title}")
    print('─' * 65)

def log(symbol, msg, code=''):
    R = '\033[0m'
    print(f"  {code}{symbol} {msg}{R if code else ''}")

def log_ok(msg):   log('✓', msg, '\033[92m')
def log_warn(msg): log('⚠', msg, '\033[93m')
def log_crit(msg): log('✗', msg, '\033[91m')
def log_info(msg): log('·', msg, '\033[96m')


# ─────────────────────────────────────────────────────────────────────────────
# URL NORMALIZATION
# ─────────────────────────────────────────────────────────────────────────────
def normalize(raw):
    raw = raw.strip()
    clean = re.sub(r'^https?://', '', raw).lower()
    domain = clean.split('/')[0].split('?')[0].split('#')[0]
    path = clean[len(domain):]
    query = raw[raw.index('?')+1:] if '?' in raw else ''
    return domain, path, query, clean

def validate_input(raw):
    domain, _, _, _ = normalize(raw)
    if re.match(r'^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$', domain):
        return domain
    if re.match(r'^https?://', raw):
        d = re.sub(r'^https?://', '', raw).split('/')[0]
        if re.match(r'^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$', d):
            return d.lower()
    return None


# ─────────────────────────────────────────────────────────────────────────────
# NETWORK CHECKS
# ─────────────────────────────────────────────────────────────────────────────
def check_dns(domain):
    try:
        ip = socket.getaddrinfo(domain, None, socket.AF_INET)[0][4][0]
        log_ok(f"DNS: {domain} → {ip}")
        return ip
    except socket.gaierror:
        log_warn("DNS: FAILED — domain does not resolve")
        return None
    except Exception as e:
        log_warn(f"DNS: Error — {e}")
        return None

def check_ssl(domain):
    try:
        ctx = ssl.create_default_context()
        conn = ctx.wrap_socket(socket.create_connection((domain, 443), timeout=TIMEOUT), server_hostname=domain)
        cert = conn.getpeercert()
        conn.close()
        issuer = dict(x[0] for x in cert.get('issuer', []))
        subject = dict(x[0] for x in cert.get('subject', []))
        org = issuer.get('organizationName', 'Unknown')
        cn = subject.get('commonName', domain)
        log_ok(f"SSL Valid | Issuer: {org} | CN: {cn}")
        expire_raw = cert.get('notAfter', '')
        if expire_raw:
            try:
                expire = datetime.strptime(expire_raw, '%b %d %H:%M:%S %Y %Z')
                days = (expire - datetime.utcnow()).days
                if days < 14:
                    log_warn(f"SSL expires in {days} days — possible throwaway cert")
                    return False, org
                log_info(f"SSL expires {expire.strftime('%Y-%m-%d')} ({days} days)")
            except ValueError:
                pass
        return True, org
    except ssl.SSLError as e:
        log_crit(f"SSL ERROR: {e}")
        return False, None
    except (socket.timeout, ConnectionRefusedError):
        log_warn("SSL: Port 443 unreachable")
        return False, None
    except Exception:
        log_warn("SSL: Unable to verify certificate")
        return False, None

def check_http(domain, raw_url):
    url = raw_url if raw_url.startswith('http') else f'https://{domain}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': f'PhishGuard-Scanner/{VERSION}'})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            final = resp.geturl()
            code = resp.status
            log_ok(f"HTTP {code} | Final: {final}")
            if final.lower() != url.lower():
                redir = re.sub(r'^https?://', '', final).split('/')[0]
                if redir.lower() != domain:
                    log_warn(f"Redirect → {redir}")
            return code, final
    except urllib.error.HTTPError as e:
        log_warn(f"HTTP Error: {e.code} {e.reason}")
        return e.code, None
    except urllib.error.URLError as e:
        log_warn(f"Connection failed: {e.reason}")
        return None, None
    except Exception as e:
        log_warn(f"HTTP check failed: {e}")
        return None, None

def check_whois(domain):
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
            log_info("WHOIS TLD: IANA record exists")
        else:
            log_warn("WHOIS TLD: Unverified or obscure registry")
    except Exception:
        log_info("WHOIS: Skipped (network timeout)")


# ─────────────────────────────────────────────────────────────────────────────
# HEURISTIC ENGINE (mirrors detectorLogic.js — 18 checks)
# ─────────────────────────────────────────────────────────────────────────────
def heuristic_analysis(domain, raw):
    domain, path, query, clean = normalize(raw)
    risk = 0
    findings = []
    base = '.'.join(domain.split('.')[:-1])

    # 1. Dangerous URI scheme
    if re.match(r'^(javascript:|data:|vbscript:)', raw, re.I):
        findings.append(('CRITICAL', 'Dangerous URI scheme (javascript:/data:/vbscript:) — code injection vector'))
        return 10, findings

    # 2. Brand impersonation
    for brand, patterns in BRANDS.items():
        for pat in patterns:
            if re.search(pat, clean):
                risk += 4
                findings.append(('CRITICAL', f'Brand impersonation: matches {brand.upper()} phishing cluster (pattern: {pat})'))
                break

    # 3. High-risk TLD
    for tld in HIGH_RISK_TLDS:
        if domain.endswith(tld) or f'{tld}/' in clean:
            risk += 3
            findings.append(('WARNING', f'High-risk TLD: "{tld}" commonly used in malicious registrations'))
            break

    # 4. URL shortener (check full raw input)
    for s in URL_SHORTENERS:
        if domain == s or s + '/' in raw.lower():
            risk += 4
            findings.append(('CRITICAL', f'URL shortener detected ({s}) — hides real destination'))
            break

    # 5. IP address as domain
    if re.match(r'^\d{1,3}(\.\d{1,3}){3}$', domain.split('/')[0]):
        risk += 5
        findings.append(('CRITICAL', 'IP address used as domain — not used by legitimate services'))

    # 6. "@" symbol
    if '@' in clean:
        risk += 5
        findings.append(('CRITICAL', '"@" in URL — real destination hidden after the "@" symbol'))

    # 7. Excessive subdomains
    dots = domain.count('.')
    if dots >= 3:
        risk += 2
        findings.append(('WARNING', f'Excessive subdomain depth ({dots} levels)'))

    # 8. Excessive hyphens
    hyphens = domain.count('-')
    if hyphens >= 3:
        risk += 2
        findings.append(('WARNING', f'{hyphens} hyphens in domain — typosquatting pattern'))

    # 9. Non-standard port
    port_m = re.search(r':(\d{2,5})$', domain)
    if port_m and int(port_m.group(1)) not in (80, 443, 8080, 8443):
        risk += 3
        findings.append(('CRITICAL', f'Non-standard port {port_m.group(1)} — suggests rogue server'))

    # 10. HTTP (no TLS)
    if raw.startswith('http://'):
        risk += 2
        findings.append(('WARNING', 'Insecure HTTP — no encryption, data transmitted in plaintext'))

    # 11. Leetspeak
    if re.search(r'[a-z][0-9][a-z]', base):
        risk += 2
        findings.append(('WARNING', 'Leetspeak number substitution detected (e.g., paypa1, g00gle)'))

    # 12. Long domain (DGA)
    if len(base) > 30:
        risk += 2
        findings.append(('WARNING', f'Abnormally long domain ({len(base)} chars) — possible DGA'))

    # 13. Shannon entropy
    clean_base = re.sub(r'[-_.]', '', base)
    if len(clean_base) > 15:
        entropy = len(set(clean_base)) / len(clean_base)
        if entropy > 0.80:
            risk += 2
            findings.append(('WARNING', f'High entropy ratio ({entropy:.2f}) — domain looks algorithmically generated'))

    # 14. NEW: Punycode / IDN homograph
    if domain.startswith('xn--') or '.xn--' in domain:
        risk += 4
        findings.append(('CRITICAL', 'Punycode/IDN homograph — uses Unicode lookalike characters'))

    # 15. NEW: Phishing keywords in path
    for kw in PHISHING_PATH_KEYWORDS:
        if kw in path:
            risk += 2
            findings.append(('WARNING', f'Phishing keyword in path: "{kw}"'))
            break

    # 16. NEW: Suspicious subdomain (not on known brand domain)
    is_known = any(domain.endswith(f'.{b}.com') or domain.endswith(f'.{b}.net') for b in KNOWN_BRAND_DOMAINS)
    if not is_known:
        for sub in SUSPICIOUS_SUBDOMAINS:
            if domain.startswith(sub):
                risk += 2
                findings.append(('WARNING', f'Suspicious subdomain "{sub.rstrip(".")}" on unrelated domain'))
                break

    # 17. NEW: Mixed TLD abuse (brand.com.xyz)
    if re.search(r'\.(com|net|org|co|io)\.[a-z]{2,10}$', domain):
        risk += 3
        findings.append(('CRITICAL', 'Mixed TLD abuse — e.g., "paypal.com.xyz" hides malicious TLD at the end'))

    # 18. NEW: Open redirect params
    ql = query.lower()
    for param in REDIRECT_PARAMS:
        if f'{param}=' in ql:
            risk += 2
            findings.append(('WARNING', f'Open redirect parameter "?{param}=" detected'))
            break

    # 19. NEW: Free hosting abuse
    for host in FREE_HOSTING:
        if domain.endswith(host):
            risk += 2
            findings.append(('WARNING', f'Free hosting platform ({host}) — frequently abused for phishing'))
            break

    return min(risk, 10), findings


# ─────────────────────────────────────────────────────────────────────────────
# REPORT
# ─────────────────────────────────────────────────────────────────────────────
def print_report(domain, score, findings, dns_ip, ssl_valid):
    print_section("FINAL THREAT ASSESSMENT REPORT")
    print(f"\n  Target      : {domain}")
    print(f"  DNS         : {'✓ Resolved → ' + dns_ip if dns_ip else '✗ Unresolvable (newly registered?)'}")
    print(f"  SSL/TLS     : {'✓ Valid Certificate' if ssl_valid else '✗ Invalid or Missing'}")
    print()

    if not findings:
        print("  ┌──────────────────────────────────────────────────────┐")
        print("  │  STATUS: PASS — No heuristic threats identified      │")
        print("  │  RISK SCORE: 0/10  |  THREAT LEVEL: NEGLIGIBLE       │")
        print("  └──────────────────────────────────────────────────────┘")
    else:
        level = 'CRITICAL 🔴' if score >= 7 else 'HIGH ⚠️' if score >= 4 else 'LOW 🟡'
        print(f"  RISK SCORE  : {score}/10")
        print(f"  THREAT LVL  : {level}")
        print(f"  FINDINGS    : {len(findings)} anomaly(ies)\n")
        for sev, msg in findings:
            prefix = '  [✗]' if sev == 'CRITICAL' else '  [⚠]'
            print(f"{prefix} {msg}")

    print(f"\n{'═' * 65}")
    print(f"  PhishGuard v{VERSION} | Coded by Lucky | phishguard.luckyverse.tech")
    print(f"{'═' * 65}\n")

def print_json(domain, score, findings, dns_ip, ssl_valid):
    level = 'High' if score >= 7 else 'Medium' if score >= 4 else 'Low'
    out = {
        'engine': f'PhishGuard v{VERSION}',
        'target': domain,
        'riskScore': score,
        'riskLevel': level,
        'dns': dns_ip,
        'sslValid': ssl_valid,
        'findings': [{'severity': s, 'message': m} for s, m in findings],
    }
    print(json.dumps(out, indent=2))


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────
def analyze(raw_input, json_mode=False):
    if not json_mode:
        print_header()

    domain = validate_input(raw_input)
    if not domain:
        if json_mode:
            print(json.dumps({'error': 'Invalid input', 'target': raw_input}))
        else:
            print("\n  [FATAL] Invalid input. Provide a valid domain or URL.")
            print(f"  Example: python analyzer.py paypal-secure-login.xyz\n")
        return

    if not json_mode:
        log_info(f"Target ingress: {domain}")
        time.sleep(0.2)
        print_section("HEURISTIC ANALYSIS (Offline — 18 Checks)")

    score, findings = heuristic_analysis(domain, raw_input)

    if not json_mode:
        if not findings:
            log_ok("No heuristic anomalies detected.")
        else:
            for sev, msg in findings:
                if sev == 'CRITICAL':
                    log_crit(msg)
                else:
                    log_warn(msg)

        print_section("LIVE NETWORK INSPECTION")

    dns_ip = check_dns(domain) if not json_mode else None
    ssl_valid = False

    if not json_mode:
        time.sleep(0.2)
        if dns_ip:
            ssl_valid, _ = check_ssl(domain)
            time.sleep(0.2)
            check_http(domain, raw_input)
            time.sleep(0.2)
        check_whois(domain)

        if not ssl_valid:
            score = min(score + 2, 10)
            findings.append(('WARNING', 'Missing/invalid SSL — high risk for credential interception'))
        if not dns_ip:
            score = min(score + 1, 10)
            findings.append(('WARNING', 'Domain does not resolve — possibly newly registered for phishing'))

        print_report(domain, score, findings, dns_ip, ssl_valid)
    else:
        print_json(domain, score, findings, dns_ip, ssl_valid)


if __name__ == '__main__':
    args = sys.argv[1:]
    if not args:
        print(f"\n  PhishGuard Analyzer v{VERSION} — Coded by Lucky")
        print("  USAGE: python analyzer.py <domain_or_url> [--json]")
        print("  EXAMPLES:")
        print("    python analyzer.py paypal-secure-login.xyz")
        print("    python analyzer.py https://amazon-billing-update.info/verify")
        print("    python analyzer.py google.com --json\n")
        sys.exit(0)

    json_mode = '--json' in args
    target = next((a for a in args if not a.startswith('--')), None)
    if target:
        analyze(target, json_mode=json_mode)
    else:
        print("  [ERROR] No URL provided.")
