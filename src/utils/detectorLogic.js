/*
  LUCKY_INTEL_SYSTEM: detectorLogic.js
  PhishGuard Client-Side Heuristic Engine v2.0.0
  Mirrors the logic of analyzer.py for in-browser URL scoring.
  Coded by Lucky // Om Patel
  github.com/lucky-om/CodeAlpha_PhishGuard
*/

const BRANDS = [
  // Microsoft
  { name: 'Microsoft', patterns: [/rnicrosoft/, /micros0ft/, /mircosoft/, /microsoft-verify/, /ms-security/, /office-365-/] },
  // Google
  { name: 'Google', patterns: [/g00gle/, /google-verify/, /gmail-security/, /google-account-/] },
  // Amazon
  { name: 'Amazon', patterns: [/amazon-billing/, /amzn-/, /shopplng-amazon/, /amazon-update/] },
  // Netflix
  { name: 'Netflix', patterns: [/netfIix/, /netflix-billing/, /nfx-login/, /netflix-update/] },
  // PayPal
  { name: 'PayPal', patterns: [/paypa1/, /paypal-secure/, /paypal-update/, /paypal-billing/, /paypai/] },
  // Apple
  { name: 'Apple', patterns: [/apple-id-verify/, /icloud-security/, /apple-support-/, /appie\./, /app1e/] },
  // Facebook / Meta
  { name: 'Facebook', patterns: [/faceb00k/, /facebook-security/, /fb-verify/, /meta-security/] },
  // Instagram
  { name: 'Instagram', patterns: [/instagram-verify/, /insta-gram/, /inst4gram/] },
  // Steam
  { name: 'Steam', patterns: [/st3am/, /steam-trade/, /steampowered-/] },
  // Chase / Bank
  { name: 'Chase', patterns: [/chase-bank-/, /chase-verify/] },
  { name: 'Bank', patterns: [/bank-login/, /secure-banking/, /banking-update/, /bank-alert/] },
];

const HIGH_RISK_TLDS = [
  '.zip', '.mov', '.top', '.xyz', '.work', '.security',
  '.info', '.pw', '.tk', '.ml', '.ga', '.cf', '.gq',
  '.click', '.link', '.live', '.online',
];

const URL_SHORTENERS = [
  'bit.ly', 't.co', 'tinyurl.com', 'ow.ly', 'goo.gl',
  'rebrand.ly', 'buff.ly', 'is.gd', 'rb.gy', 'short.io',
  'cutt.ly', 'shorte.st',
];

export const analyzeUrl = (rawUrl) => {
  // ── Input Validation ────────────────────────────────────────────
  const domainPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
  const fullUrlPattern = /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;

  if (!domainPattern.test(rawUrl) && !fullUrlPattern.test(rawUrl)) {
    return {
      riskScore: 0,
      riskLevel: 'Invalid',
      flags: [{ type: 'critical', message: 'Input rejected — provide a valid domain or full URL (e.g., paypal-security.xyz).' }],
    };
  }

  let riskScore = 0;
  const flags = [];

  // Strip protocol for analysis
  const cleanUrl = rawUrl.replace(/^https?:\/\//, '').toLowerCase();
  const domainOnly = cleanUrl.split('/')[0].split('?')[0];

  // ── 1. Brand Impersonation ──────────────────────────────────────
  for (const brand of BRANDS) {
    let matched = false;
    for (const pat of brand.patterns) {
      if (pat.test(cleanUrl)) {
        riskScore += 4;
        flags.push({ type: 'critical', message: `Brand Impersonation: URL matches known ${brand.name} phishing cluster.` });
        matched = true;
        break;
      }
    }
    if (matched) break; // Only score one brand match
  }

  // ── 2. High-Risk TLD ───────────────────────────────────────────
  for (const tld of HIGH_RISK_TLDS) {
    if (domainOnly.endsWith(tld) || cleanUrl.includes(`${tld}/`)) {
      riskScore += 3;
      flags.push({ type: 'warning', message: `Suspicious TLD: "${tld}" is commonly associated with malicious registrations.` });
      break;
    }
  }

  // ── 3. URL Shortener ───────────────────────────────────────────
  for (const s of URL_SHORTENERS) {
    if (domainOnly === s || domainOnly.startsWith(s + '/')) {
      riskScore += 4;
      flags.push({ type: 'critical', message: `URL Shortener Detected (${s}) — hides the real destination. Cannot be safely inspected.` });
      break;
    }
  }

  // ── 4. IP Address as Domain ────────────────────────────────────
  const ipPattern = /^\d{1,3}(\.\d{1,3}){3}$/;
  if (ipPattern.test(domainOnly)) {
    riskScore += 5;
    flags.push({ type: 'critical', message: 'IP Address in URL — Legitimate websites use domain names, not raw IPs. Common in phishing kits.' });
  }

  // ── 5. "@" symbol (credential obfuscation) ─────────────────────
  if (cleanUrl.includes('@')) {
    riskScore += 5;
    flags.push({ type: 'critical', message: '"@" Symbol Detected — Browser ignores everything before "@", hiding the real destination host.' });
  }

  // ── 6. Excessive Subdomains (tunneling / masking) ──────────────
  const dotCount = domainOnly.count ? domainOnly.split('.').length - 1 : domainOnly.split('.').length - 1;
  if (dotCount >= 3) {
    riskScore += 2;
    flags.push({ type: 'warning', message: `Excessive Subdomains (${dotCount} levels) — may be masking the real domain or DNS tunneling.` });
  }

  // ── 7. Excessive Hyphens ───────────────────────────────────────
  const hyphenCount = domainOnly.split('-').length - 1;
  if (hyphenCount >= 3) {
    riskScore += 2;
    flags.push({ type: 'warning', message: `${hyphenCount} Hyphens in Domain — common in fake brand domains like "secure-update-paypal-login.com".` });
  }

  // ── 8. Non-standard Port ───────────────────────────────────────
  const portMatch = domainOnly.match(/:(\d{2,5})$/);
  if (portMatch) {
    const port = parseInt(portMatch[1], 10);
    if (![80, 443, 8080, 8443].includes(port)) {
      riskScore += 3;
      flags.push({ type: 'critical', message: `Unusual Port (${port}) — may indicate a malicious C2 server or firewall evasion tactic.` });
    }
  }

  // ── 9. HTTP (no HTTPS) ─────────────────────────────────────────
  if (rawUrl.startsWith('http://')) {
    riskScore += 2;
    flags.push({ type: 'warning', message: 'Insecure Protocol (HTTP) — No encryption. Any data entered can be intercepted in transit.' });
  }

  // ── 10. Number-for-Letter Substitution (leetspeak) ─────────────
  const baseDomain = domainOnly.split('.').slice(0, -1).join('.');
  if (/[a-z][0-9][a-z]/.test(baseDomain)) {
    riskScore += 2;
    flags.push({ type: 'warning', message: 'Leetspeak Substitution Detected — Numbers replacing letters (e.g., "paypa1", "g00gle") to evade filters.' });
  }

  // ── 11. Long Domain (DGA Detection) ───────────────────────────
  if (baseDomain.length > 30) {
    riskScore += 2;
    flags.push({ type: 'warning', message: `Domain Length Anomaly (${baseDomain.length} chars) — possibly algorithmically generated for phishing campaign.` });
  }

  // ── 12. Shannon Entropy (random C2 domains) ───────────────────
  const cleanBase = baseDomain.replace(/[-_.]/g, '');
  if (cleanBase.length > 0) {
    const uniqueChars = new Set(cleanBase).size;
    const entropy = uniqueChars / cleanBase.length;
    if (entropy > 0.82 && cleanBase.length > 12) {
      riskScore += 2;
      flags.push({ type: 'warning', message: `High Entropy Ratio (${entropy.toFixed(2)}) — Domain appears algorithmically generated (DGA malware C2).` });
    }
  }

  // ── Final Evaluation ───────────────────────────────────────────
  const cappedScore = Math.min(riskScore, 10);
  const riskLevel = cappedScore >= 7 ? 'High' : cappedScore >= 4 ? 'Medium' : 'Low';

  return {
    riskScore: cappedScore,
    riskLevel,
    flags: flags.length > 0
      ? flags
      : [{ type: 'safe', message: 'No structural threats identified by PhishGuard heuristics. Always verify manually before clicking.' }],
  };
};
