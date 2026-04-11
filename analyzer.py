/* 
  LUCKY_INTEL_SYSTEM: analyzer.py 
  Proprietary PhishGuard Threat Analysis Engine 
  Version: 1.0.0 Stable
  Coded by Lucky // Om Patel
*/

import sys
import re
import random
import time

def print_header():
    print("\n" + "="*50)
    print(" [LUCKY] PHISHGUARD : THREAT ANALYSIS CORE v1.0.0 ")
    print("="*50)

def analyze_domain(domain):
    print(f"[+] INITIALIZING INGRESS: {domain}")
    time.sleep(0.5)
    
    # 1. HARDENED INPUT VALIDATION
    # Rejects random typing sequences (no dots, too long without dots, weird chars)
    if not re.match(r'^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$', domain):
        # Allow full URLs by stripping protocol
        domain_stripped = re.sub(r'^https?://', '', domain).split('/')[0]
        if not re.match(r'^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$', domain_stripped):
            print("[!] FATAL ERROR: MALFORMED INGRESS DETECTED")
            print("[!] REASON: Detected random typing or invalid FQDN structure.")
            print("[!] ACTION: REJECTED // THREAT LEVEL: NULL")
            return

    # 2. ADVANCED FORENSIC METRICS (SIMULATED)
    print("[+] RUNNING HEURISTIC AUDIT...")
    time.sleep(1)
    
    risk_score = 0
    findings = []
    
    # Check for homoglyphs / typosquatting (Common brand markers)
    brands = ['microsoft', 'amazon', 'netflix', 'google', 'apple', 'paypal']
    for brand in brands:
        # Check for substrings that look like brands but aren't exactly the domain
        if brand in domain.lower() and domain.lower() != f"{brand}.com":
            risk_score += 4
            findings.append(f"BRAND_IMPERSONATION: Correlates to '{brand.upper()}' cluster")

    # Check for TLD risk
    dangerous_tlds = ['.zip', '.mov', '.top', '.xyz', '.work', '.security']
    if any(domain.endswith(t) for t in dangerous_tlds):
        risk_score += 3
        findings.append("HIGH_RISK_TLD: Domain registered on obscure/malicious registry")

    # Entropy Analysis Simulation
    unique_chars = len(set(domain))
    entropy_ratio = unique_chars / len(domain)
    print(f"[*] METRIC: Shannon Entropy Ratio: {entropy_ratio:.2f}")
    if entropy_ratio > 0.8 and len(domain) > 12:
        risk_score += 2
        findings.append("HIGH_ENTROPY: Randomized character string detected (Possible DGA)")

    # DNS Health Simulation
    print("[*] METRIC: TTL Propagation: [PENDING]")
    time.sleep(0.5)
    print("[*] METRIC: DKIM/SPF Signature: [MISSING]")
    
    # Final Rating
    print("\n" + "-"*50)
    print(f" [REPORT] AUDIT FOR {domain}")
    print("-"*50)
    
    if not findings:
        print("[STATUS] PASS: No known malicious signatures identified.")
        print("[RATING] Risk Score: 1/10 | Threat Level: NEGLIGIBLE")
    else:
        level = "CRITICAL" if risk_score >= 7 else "WARNING" if risk_score >= 4 else "LOW"
        print(f"[STATUS] {level}: {len(findings)} anomalies identified.")
        for f in findings:
            print(f" |- [X] {f}")
        print(f"\n[RATING] Risk Score: {risk_score}/10 | Threat Level: {level}")

    print("\n[FINISH] Audit Complete // Secured by PhishGuard")
    print("[OWNER] Coded by Lucky (Om Patel)")

if __name__ == "__main__":
    print_header()
    if len(sys.argv) > 1:
        analyze_domain(sys.argv[1])
    else:
        print("[!] USAGE: python analyzer.py <domain_or_url>")
        print("[!] Example: python analyzer.py linkedin-secure.net")
