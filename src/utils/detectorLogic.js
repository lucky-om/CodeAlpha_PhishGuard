/*
  PhishGuard Heuristic Engine v3.0.0
  Client-side URL analysis — 18 detection checks
  Coded by Lucky // Om Patel
*/

// ── Brand Impersonation Patterns ──────────────────────────────────────────────
const BRANDS = [
  { name: 'Microsoft', patterns: [/rnicrosoft/, /micros0ft/, /mircosoft/, /microsoft-verify/, /ms-security/, /office-365-/] },
  { name: 'Google', patterns: [/g00gle/, /google-verify/, /gmail-security/, /google-account-/, /g0ogle/, /gogle\./] },
  { name: 'Amazon', patterns: [/amazon-billing/, /amzn-/, /shopplng-amazon/, /amazon-update/, /arnazon/] },
  { name: 'Netflix', patterns: [/netfIix/, /netflix-billing/, /nfx-login/, /netflix-update/, /net-flix/] },
  { name: 'PayPal', patterns: [/paypa1/, /paypal-secure/, /paypal-update/, /paypal-billing/, /paypai/, /pay-pal/] },
  { name: 'Apple', patterns: [/apple-id-verify/, /icloud-security/, /apple-support-/, /appie\./, /app1e/, /appl3/] },
  { name: 'Facebook', patterns: [/faceb00k/, /facebook-security/, /fb-verify/, /meta-security/, /facebok/, /faceboook/] },
  { name: 'Instagram', patterns: [/instagram-verify/, /insta-gram/, /inst4gram/, /1nstagram/] },
  { name: 'Steam', patterns: [/st3am/, /steam-trade/, /steampowered-/, /steamcommunlty/] },
  { name: 'Chase', patterns: [/chase-bank-/, /chase-verify/, /chasebank/, /chas3/] },
  { name: 'Bank', patterns: [/bank-login/, /secure-banking/, /banking-update/, /bank-alert/] },
  { name: 'WhatsApp', patterns: [/whatsapp-verify/, /whatsap\./, /whats-app/, /watsapp/] },
  { name: 'Twitter', patterns: [/tw1tter/, /twitter-verify/, /twltter/, /twtter/] },
  { name: 'DHL', patterns: [/dhl-delivery/, /dhl-track/, /dh1-parcel/, /dhI-/] },
  { name: 'FedEx', patterns: [/fedex-delivery/, /fedex-track/, /f3dex/] },
  { name: 'HDFC', patterns: [/hdfc-bank/, /hdfcbank-secure/, /hdfc-verify/, /hdfcnet/] },
  { name: 'ICICI', patterns: [/icici-bank/, /icicibanklogin/, /icici-verify/] },
  { name: 'SBI', patterns: [/sbi-bank/, /sbibank-secure/, /onlinesbi-verify/, /sbi-online/] },
  { name: 'PayTM', patterns: [/paytm-verify/, /paytm-kyc/, /paytm-update/, /pay-tm/] },
  { name: 'Walmart', patterns: [/walrnart/, /walmart-billing/, /wal-mart-/] },
];

const HIGH_RISK_TLDS = [
  '.zip', '.mov', '.top', '.xyz', '.work', '.security',
  '.info', '.pw', '.tk', '.ml', '.ga', '.cf', '.gq',
  '.click', '.link', '.live', '.online', '.ru', '.cn',
  '.cc', '.ws', '.biz', '.icu', '.fun', '.vip',
];

const URL_SHORTENERS = [
  'bit.ly', 't.co', 'tinyurl.com', 'ow.ly', 'goo.gl',
  'rebrand.ly', 'buff.ly', 'is.gd', 'rb.gy', 'short.io',
  'cutt.ly', 'shorte.st', 'tiny.cc', 'bl.ink', 't.ly',
];

const FREE_HOSTING = [
  '.github.io', '.netlify.app', '.glitch.me', '.pages.dev',
  '.vercel.app', '.weebly.com', '.000webhostapp.com',
  '.web.app', '.firebaseapp.com', '.surge.sh',
];

const PHISHING_PATH_KEYWORDS = [
  '/login', '/signin', '/verify', '/secure', '/update',
  '/confirm', '/account', '/billing', '/webscr', '/validate',
  '/auth', '/credential', '/recover', '/reset-password',
];

const SUSPICIOUS_SUBDOMAINS = [
  'login.', 'secure.', 'verify.', 'account.', 'update.',
  'signin.', 'billing.', 'auth.', 'portal.', 'webmail.',
  'support.', 'helpdesk.',
];

const REDIRECT_PARAMS = [
  'redirect', 'url', 'goto', 'next', 'return',
  'callback', 'dest', 'destination', 'continue',
];

// ── TLD Map for Domain Reputation Card ────────────────────────────────────────
export const TLD_MAP = {
  tk: { name: 'Tokelau', flag: '🇹🇰', risk: 'critical', note: 'Historically free TLD, heavily abused for phishing' },
  ml: { name: 'Mali', flag: '🇲🇱', risk: 'critical', note: 'Free TLD, common in spam campaigns' },
  ga: { name: 'Gabon', flag: '🇬🇦', risk: 'critical', note: 'Free TLD, high abuse rate' },
  cf: { name: 'C. African Rep.', flag: '🇨🇫', risk: 'critical', note: 'Free TLD, heavily abused' },
  gq: { name: 'Eq. Guinea', flag: '🇬🇶', risk: 'critical', note: 'Free TLD, commonly abused' },
  zip: { name: 'Generic', flag: '🌐', risk: 'critical', note: 'Confused with file extensions — new abuse vector' },
  mov: { name: 'Generic', flag: '🌐', risk: 'critical', note: 'Confused with media files, clickjacking risk' },
  pw: { name: 'Palau', flag: '🇵🇼', risk: 'high', note: 'Low-cost, popular with spammers' },
  ru: { name: 'Russia', flag: '🇷🇺', risk: 'high', note: 'Elevated cybercrime association' },
  cn: { name: 'China', flag: '🇨🇳', risk: 'high', note: 'High-volume malicious registrations' },
  xyz: { name: 'Generic', flag: '🌐', risk: 'high', note: 'Cheap, popular in phishing campaigns' },
  top: { name: 'Generic', flag: '🌐', risk: 'high', note: 'Frequently misused, low-cost' },
  info: { name: 'Generic', flag: '🌐', risk: 'high', note: 'Historically associated with spam' },
  icu: { name: 'Generic', flag: '🌐', risk: 'high', note: 'Very cheap TLD, attracts abuse' },
  cc: { name: 'Cocos Islands', flag: '🇨🇨', risk: 'medium', note: 'Often used as a .com alternative' },
  io: { name: 'British Indian Ocean', flag: '🇮🇴', risk: 'low', note: 'Popular with tech startups' },
  com: { name: 'Commercial', flag: '🌐', risk: 'low', note: 'Most common, widely trusted' },
  net: { name: 'Network', flag: '🌐', risk: 'low', note: 'Common legitimate TLD' },
  org: { name: 'Organization', flag: '🌐', risk: 'low', note: 'Non-profit and open-source use' },
  gov: { name: 'Government', flag: '🏛️', risk: 'low', note: 'US government — restricted' },
  edu: { name: 'Education', flag: '🎓', risk: 'low', note: 'Academic institutions only' },
  co: { name: 'Generic/Colombia', flag: '🌐', risk: 'low', note: 'Used as shorthand for .com' },
  us: { name: 'United States', flag: '🇺🇸', risk: 'low', note: '' },
  uk: { name: 'United Kingdom', flag: '🇬🇧', risk: 'low', note: '' },
  de: { name: 'Germany', flag: '🇩🇪', risk: 'low', note: '' },
  in: { name: 'India', flag: '🇮🇳', risk: 'low', note: '' },
  au: { name: 'Australia', flag: '🇦🇺', risk: 'low', note: '' },
  ca: { name: 'Canada', flag: '🇨🇦', risk: 'low', note: '' },
  jp: { name: 'Japan', flag: '🇯🇵', risk: 'low', note: '' },
};

// ── Main Analyzer ──────────────────────────────────────────────────────────────
export const analyzeUrl = (rawUrl) => {
  const trimmed = rawUrl.trim();

  // Handle dangerous URI schemes immediately
  if (/^(javascript:|data:|vbscript:)/i.test(trimmed)) {
    return {
      riskScore: 10,
      riskLevel: 'High',
      flags: [{
        type: 'critical',
        message: 'Dangerous URI Scheme — javascript:, data:, or vbscript: URIs execute code directly in the browser.',
        category: 'Code Injection',
      }],
    };
  }

  // Input validation
  const domainPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?(?:\?.*)?$/;
  const fullUrlPattern = /^https?:\/\/(?:[a-zA-Z0-9@:_-]+\.)+[a-zA-Z]{2,}(?:\/.*)?(?:\?.*)?$/;

  if (!domainPattern.test(trimmed) && !fullUrlPattern.test(trimmed)) {
    return {
      riskScore: 0,
      riskLevel: 'Invalid',
      flags: [{ type: 'invalid', message: 'Input rejected — provide a valid domain or full URL (e.g., paypal-security.xyz).', category: 'Validation' }],
    };
  }

  let riskScore = 0;
  const flags = [];

  const cleanUrl = trimmed.replace(/^https?:\/\//, '').toLowerCase();
  const domainOnly = cleanUrl.split('/')[0].split('?')[0];
  const pathPart = cleanUrl.includes('/') ? cleanUrl.substring(cleanUrl.indexOf('/')) : '';
  const queryPart = trimmed.includes('?') ? trimmed.substring(trimmed.indexOf('?') + 1) : '';
  const baseDomain = domainOnly.split('.').slice(0, -1).join('.');

  // ── Check 1: Brand Impersonation ────────────────────────────────────────────
  for (const brand of BRANDS) {
    let matched = false;
    for (const pat of brand.patterns) {
      if (pat.test(cleanUrl)) {
        riskScore += 4;
        flags.push({ type: 'critical', message: `Brand Impersonation — URL matches a known ${brand.name} phishing cluster pattern.`, category: 'Brand Spoofing' });
        matched = true;
        break;
      }
    }
    if (matched) break;
  }

  // ── Check 2: High-Risk TLD ───────────────────────────────────────────────────
  for (const tld of HIGH_RISK_TLDS) {
    if (domainOnly.endsWith(tld) || cleanUrl.includes(`${tld}/`)) {
      riskScore += 3;
      flags.push({ type: 'warning', message: `Suspicious TLD "${tld}" — commonly used in throwaway or malicious domain registrations.`, category: 'Suspicious TLD' });
      break;
    }
  }

  // ── Check 3: URL Shortener (fixed: check full rawUrl) ───────────────────────
  for (const s of URL_SHORTENERS) {
    if (domainOnly === s || trimmed.toLowerCase().includes(s + '/')) {
      riskScore += 4;
      flags.push({ type: 'critical', message: `URL Shortener Detected (${s}) — masks the real destination. Cannot be safely pre-inspected.`, category: 'Hidden Destination' });
      break;
    }
  }

  // ── Check 4: IP Address as Domain ───────────────────────────────────────────
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(domainOnly)) {
    riskScore += 5;
    flags.push({ type: 'critical', message: 'IP Address used as Domain — legitimate services use domain names. Raw IPs are a hallmark of phishing kits and C2 servers.', category: 'Raw IP Address' });
  }

  // ── Check 5: "@" Symbol (credential obfuscation) ────────────────────────────
  if (cleanUrl.includes('@')) {
    riskScore += 5;
    flags.push({ type: 'critical', message: '"@" Symbol in URL — browsers ignore everything before "@", hiding the real destination after it.', category: 'URL Obfuscation' });
  }

  // ── Check 6: Excessive Subdomains ───────────────────────────────────────────
  const dotCount = domainOnly.split('.').length - 1;
  if (dotCount >= 3) {
    riskScore += 2;
    flags.push({ type: 'warning', message: `Excessive Subdomain Depth (${dotCount} levels) — may be masking the real domain via DNS tunneling or subdomain chaining.`, category: 'Subdomain Abuse' });
  }

  // ── Check 7: Excessive Hyphens ──────────────────────────────────────────────
  const hyphenCount = domainOnly.split('-').length - 1;
  if (hyphenCount >= 3) {
    riskScore += 2;
    flags.push({ type: 'warning', message: `${hyphenCount} Hyphens in Domain — common typosquatting pattern (e.g., "secure-update-paypal-login.com").`, category: 'Typosquatting' });
  }

  // ── Check 8: Non-Standard Port ──────────────────────────────────────────────
  const portMatch = domainOnly.match(/:(\d{2,5})$/);
  if (portMatch) {
    const port = parseInt(portMatch[1], 10);
    if (![80, 443, 8080, 8443].includes(port)) {
      riskScore += 3;
      flags.push({ type: 'critical', message: `Non-Standard Port (${port}) — suggests a malicious server not running on expected web ports.`, category: 'Port Anomaly' });
    }
  }

  // ── Check 9: Insecure HTTP ──────────────────────────────────────────────────
  if (trimmed.startsWith('http://')) {
    riskScore += 2;
    flags.push({ type: 'warning', message: 'Insecure Protocol (HTTP) — no encryption. Credentials and data are transmitted in plaintext.', category: 'No Encryption' });
  }

  // ── Check 10: Leetspeak / Number Substitution ───────────────────────────────
  if (/[a-z][0-9][a-z]/.test(baseDomain)) {
    riskScore += 2;
    flags.push({ type: 'warning', message: 'Leetspeak Substitution Detected — numbers replacing letters (e.g., "paypa1", "g00gle") to evade text filters.', category: 'Leetspeak' });
  }

  // ── Check 11: Long Domain (DGA) ─────────────────────────────────────────────
  if (baseDomain.length > 30) {
    riskScore += 2;
    flags.push({ type: 'warning', message: `Domain Length Anomaly (${baseDomain.length} chars) — may be generated by a Domain Generation Algorithm (DGA) for malware C2.`, category: 'DGA Detection' });
  }

  // ── Check 12: Shannon Entropy (adjusted threshold) ──────────────────────────
  const cleanBase = baseDomain.replace(/[-_.]/g, '');
  if (cleanBase.length > 0) {
    const uniqueChars = new Set(cleanBase).size;
    const entropy = uniqueChars / cleanBase.length;
    if (entropy > 0.80 && cleanBase.length > 15) {
      riskScore += 2;
      flags.push({ type: 'warning', message: `High Entropy Ratio (${entropy.toFixed(2)}) — domain character distribution suggests algorithmic generation (DGA malware indicator).`, category: 'DGA Detection' });
    }
  }

  // ── Check 13 (NEW): Punycode / IDN Homograph ────────────────────────────────
  if (domainOnly.startsWith('xn--') || domainOnly.includes('.xn--')) {
    riskScore += 4;
    flags.push({ type: 'critical', message: 'Punycode / IDN Homograph Detected — internationalized domain uses visually identical Unicode characters to impersonate trusted brands.', category: 'Homograph Attack' });
  }

  // ── Check 14 (NEW): Phishing Keywords in Path ───────────────────────────────
  for (const kw of PHISHING_PATH_KEYWORDS) {
    if (pathPart.startsWith(kw) || pathPart.includes(kw + '/') || pathPart.includes(kw + '?')) {
      riskScore += 2;
      flags.push({ type: 'warning', message: `Phishing Keyword in Path ("${kw}") — commonly used paths on credential harvesting pages.`, category: 'Suspicious Path' });
      break;
    }
  }

  // ── Check 15 (NEW): Suspicious Keyword as Subdomain ────────────────────────
  const KNOWN_BRANDS_DOMAINS = ['google', 'microsoft', 'amazon', 'apple', 'facebook', 'github', 'paypal', 'netflix', 'twitter'];
  const isKnownBrandDomain = KNOWN_BRANDS_DOMAINS.some(b => domainOnly.endsWith('.' + b + '.com') || domainOnly.endsWith('.' + b + '.net'));
  if (!isKnownBrandDomain) {
    for (const sub of SUSPICIOUS_SUBDOMAINS) {
      if (domainOnly.startsWith(sub)) {
        riskScore += 2;
        flags.push({ type: 'warning', message: `Suspicious Subdomain "${sub.replace('.', '')}" — used to impersonate login portals of major services on an unrelated domain.`, category: 'Fake Portal Subdomain' });
        break;
      }
    }
  }

  // ── Check 16 (NEW): Mixed TLD Abuse (brand.com.xyz) ────────────────────────
  if (/\.(com|net|org|co|io)\.[a-z]{2,10}$/.test(domainOnly)) {
    riskScore += 3;
    flags.push({ type: 'critical', message: 'Mixed TLD Abuse — pattern like "amazon.com.xyz" embeds a legitimate TLD in the middle to deceive users who read left-to-right.', category: 'Mixed TLD' });
  }

  // ── Check 17 (NEW): Open Redirect Parameters ────────────────────────────────
  const queryLower = queryPart.toLowerCase();
  for (const param of REDIRECT_PARAMS) {
    if (queryLower.includes(`${param}=`)) {
      riskScore += 2;
      flags.push({ type: 'warning', message: `Open Redirect Indicator ("?${param}=") — URL may redirect users to a malicious destination after visiting a seemingly legitimate page.`, category: 'Open Redirect' });
      break;
    }
  }

  // ── Check 18 (NEW): Free Hosting Platform Abuse ─────────────────────────────
  for (const host of FREE_HOSTING) {
    if (domainOnly.endsWith(host)) {
      riskScore += 2;
      flags.push({ type: 'warning', message: `Free Hosting Platform (${host}) — frequently abused to host phishing pages with easy setup and no identity verification.`, category: 'Free Hosting Abuse' });
      break;
    }
  }

  // ── Final Calculation ────────────────────────────────────────────────────────
  const cappedScore = Math.min(riskScore, 10);
  const riskLevel = cappedScore >= 7 ? 'High' : cappedScore >= 4 ? 'Medium' : 'Low';

  return {
    riskScore: cappedScore,
    riskLevel,
    flags: flags.length > 0
      ? flags
      : [{ type: 'safe', message: 'No structural threats identified. URL aligns with standard FQDN signatures. Always verify manually before clicking.', category: 'Clear' }],
  };
};

// ── URL Decoder Utility ────────────────────────────────────────────────────────
export const decodeUrl = (rawUrl) => {
  const results = [];
  const trimmed = rawUrl.trim();

  // Check for dangerous schemes
  if (/^(javascript:|data:|vbscript:)/i.test(trimmed)) {
    results.push({ label: '⚠ Dangerous Scheme', value: 'This URI uses javascript:, data:, or vbscript: — a code injection vector. Never click this.', danger: true });
    return results;
  }

  // Step 1: Percent-encoding decode
  try {
    const decoded = decodeURIComponent(trimmed);
    if (decoded !== trimmed) {
      results.push({ label: 'Percent-Decoded URL', value: decoded });
    } else {
      results.push({ label: 'Percent-Encoding', value: 'No percent-encoded characters found.' });
    }
  } catch {
    results.push({ label: 'Percent-Decode Error', value: 'URL contains malformed percent-encoding (%XX sequence is invalid).', danger: true });
  }

  // Step 2: Double-encoding detection
  if (/%25[0-9a-fA-F]{2}/i.test(trimmed)) {
    results.push({ label: '⚠ Double Encoding Detected', value: 'URL contains %25XX — a double percent-encoded character. Common WAF/filter evasion technique.', danger: true });
  }

  // Step 3: Detect Base64 blobs in query params
  const b64Pattern = /[?&][^=]+=([A-Za-z0-9+/]{20,}={0,2})/g;
  let match;
  let foundB64 = false;
  while ((match = b64Pattern.exec(trimmed)) !== null) {
    try {
      const decoded = atob(match[1]);
      if (/^[\x20-\x7E]+$/.test(decoded)) {
        results.push({ label: 'Base64 Param Decoded', value: decoded });
        foundB64 = true;
      }
    } catch {
      // Not valid base64 — skip
    }
  }
  if (!foundB64 && trimmed.includes('?')) {
    results.push({ label: 'Base64 Params', value: 'No Base64-encoded query parameters detected.' });
  }

  // Step 4: URL components breakdown
  try {
    const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    results.push({ label: 'Protocol', value: urlObj.protocol });
    results.push({ label: 'Hostname', value: urlObj.hostname });
    if (urlObj.port) results.push({ label: 'Port', value: urlObj.port });
    if (urlObj.pathname !== '/') results.push({ label: 'Path', value: urlObj.pathname });
    if (urlObj.search) results.push({ label: 'Query String', value: urlObj.search });
    if (urlObj.hash) results.push({ label: 'Fragment (#)', value: urlObj.hash });
  } catch {
    results.push({ label: 'Parse Error', value: 'Could not decompose URL into components.', danger: true });
  }

  return results;
};
