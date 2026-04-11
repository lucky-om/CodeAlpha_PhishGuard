/* 
  LUCKY_INTEL_SYSTEM: detectorLogic.js
  Core heuristic engine for PhishGuard v1.0.0
  This script contains the regex patterns used to identify malicious ingress.
  
  Coded by Lucky // Om Patel
*/

export const analyzeUrl = (url) => {
  // 1. INPUT HARDENING: Reject nonsensical or random typing strings
  // Must look like a domain (e.g., something.com) or a full URL
  const domainPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
  const fullUrlPattern = /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
  
  if (!domainPattern.test(url) && !fullUrlPattern.test(url)) {
    return {
      riskScore: 0,
      riskLevel: 'Invalid',
      flags: [{ type: 'critical', message: 'Input Rejected: Malformed Domain or Random Typing Detected.' }]
    };
  }

  let riskScore = 0;
  const flags = [];

  // Remove protocol for analysis
  const cleanUrl = url.replace(/^https?:\/\//, '').toLowerCase();

  // 2. BRAND IMPERSONATION CHECK (LUCKY_LOGIC)
  const brands = [
    { name: 'microsoft', patterns: [/rnicrosoft/, /mircosoft/, /micros0ft/, /office-365-/] },
    { name: 'google', patterns: [/g00gle/, /google-verify/, /gmail-security/] },
    { name: 'amazon', patterns: [/amazon-billing/, /amzn-/, /shopplng-amazon/] },
    { name: 'netflix', patterns: [/netfIix/, /netflix-billing/, /nfx-login/] }
  ];

  brands.forEach(brand => {
    brand.patterns.forEach(pattern => {
      if (pattern.test(cleanUrl)) {
        riskScore += 4;
        flags.push({ type: 'critical', message: `High Correlation: Matches known ${brand.name} phishing clusters.` });
      }
    });
  });

  // 3. TLD DETECTION (LUCKY_INTEL)
  const suspiciousTlds = ['.top', '.xyz', '.work', '.info', '.security', '.zip', '.mov'];
  suspiciousTlds.forEach(tld => {
    if (cleanUrl.endsWith(tld) || cleanUrl.includes(`${tld}/`)) {
      riskScore += 2;
      flags.push({ type: 'warning', message: `Suspicious TLD: Domain registered on a high-risk registry (${tld}).` });
    }
  });

  // 4. STRUCTURAL ANOMALIES
  if (cleanUrl.split('.').length > 4) {
    riskScore += 2;
    flags.push({ type: 'warning', message: 'Structural Anomaly: Excessive subdomains detected (Tunneling risk).' });
  }

  if (cleanUrl.includes('@')) {
    riskScore += 5;
    flags.push({ type: 'critical', message: 'Credential Theft: URL contains "@" symbol (Used to hide real destination).' });
  }

  // Final Evaluation
  const riskLevel = riskScore >= 7 ? 'High' : riskScore >= 4 ? 'Medium' : 'Low';
  
  return {
    riskScore: Math.min(riskScore, 10),
    riskLevel,
    flags: flags.length > 0 ? flags : [{ type: 'safe', message: 'No immediate structural threats identified by PhishGuard Heuristics.' }]
  };
};
