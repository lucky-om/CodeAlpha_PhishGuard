export const quizQuestions = [
  {
    id: 1,
    difficulty: 'easy',
    question: "You receive an email from your bank asking you to verify your identity by clicking a link and logging in. The URL says 'http://secure-login.bank.com'. What is the most immediate warning sign?",
    options: [
      "The bank didn't use your name.",
      "The URL uses 'http' instead of 'https'.",
      "The URL has a subdomain.",
      "Banks never ask you to log in."
    ],
    answer: 1,
    explanation: "HTTP (without the 'S') means the connection is not encrypted. Legitimate banks will always use HTTPS for login portals."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Which of the following sender addresses is the most suspicious for an official Apple receipt?",
    options: [
      "receipts@apple.com",
      "no-reply@email.apple.com",
      "billing@apple-support.com",
      "support@apple.com"
    ],
    answer: 2,
    explanation: "'apple-support.com' is a completely different domain than 'apple.com'. Attackers often register domains that contain the brand name followed by a dash."
  },
  {
    id: 3,
    difficulty: 'medium',
    question: "What is the primary goal of a 'Baiting' social engineering attack?",
    options: [
      "To scare the victim with legal threats.",
      "To offer a false promise or reward to entice the victim.",
      "To send bulk emails to millions of random addresses.",
      "To infect an entire network automatically."
    ],
    answer: 1,
    explanation: "Baiting uses false promises (like a free gift card or a USB drive labeled 'Executive Salaries') to pique curiosity and greed."
  },
  {
    id: 4,
    difficulty: 'medium',
    question: "In the URL 'https://www.paypal.com.secure-update.net/login', what is the actual domain taking you to?",
    options: [
      "paypal.com",
      "secure-update.net",
      "login.com",
      "www.paypal.com"
    ],
    answer: 1,
    explanation: "The actual root domain is just before the top-level domain (.net). Everything before 'secure-update' is just a subdomain designed to impersonate PayPal."
  },
  {
    id: 5,
    difficulty: 'easy',
    question: "Which psychological trigger is an attacker using if they claim your account will be deleted in 24 hours?",
    options: [
      "Authority",
      "Curiosity",
      "Sense of Urgency",
      "Familiarity"
    ],
    answer: 2,
    explanation: "Creating a tight deadline forces the victim to act quickly, reducing the chance they will stop to scrutinize the email."
  },
  {
    id: 6,
    difficulty: 'hard',
    question: "What is a 'Homograph/Homoglyph attack'?",
    options: [
      "Using letters that look alike (e.g. replacing 'l' with 'I') to spoof a domain.",
      "Sending an email with a malicious PDF attachment.",
      "Calling a victim on the phone to steal a password.",
      "Intercepting Wi-Fi traffic at a coffee shop."
    ],
    answer: 0,
    explanation: "Homograph attacks use character substitution (like Cyrillic 'а' replacing Latin 'a') to create fake domains that look identical to the real ones."
  },
  {
    id: 7,
    difficulty: 'easy',
    question: "Spear Phishing differs from standard Phishing because it:",
    options: [
      "Is highly targeted at a specific individual or organization.",
      "Only targets mobile devices.",
      "Does not use emails.",
      "Is always legal."
    ],
    answer: 0,
    explanation: "Spear phishing uses customized information (like referencing a recent company project or your manager) to target you specifically."
  },
  {
    id: 8,
    difficulty: 'medium',
    question: "You see the URL 'https://rnicrosoft.com'. This is an example of:",
    options: [
      "Brand Impersonation in a Subdomain",
      "Typosquatting",
      "A legitimate international domain",
      "SQL Injection"
    ],
    answer: 1,
    explanation: "Typosquatting relies on users making typographical errors or simply misreading visually similar characters (like 'r' and 'n' looking like 'm')."
  },
  {
    id: 9,
    difficulty: 'hard',
    question: "What is 'Pretexting' in social engineering?",
    options: [
      "Sending a text message before a call.",
      "Creating a fabricated scenario to trick a victim into giving up info.",
      "Testing a system for vulnerabilities before an attack.",
      "Encrypting a message with a prefix key."
    ],
    answer: 1,
    explanation: "Pretexting involves creating a believable story or 'pretext' (like posing as an IT auditor) to justify asking for sensitive data."
  },
  {
    id: 10,
    difficulty: 'hard',
    question: "What does 'DMARC' stand for in email security?",
    options: [
      "Direct Mail Authentication and Reporting Control.",
      "Domain-based Message Authentication, Reporting, and Conformance.",
      "Digital Message Analysis and Recovery Center.",
      "Distributed Mail Access and Routing Code."
    ],
    answer: 1,
    explanation: "DMARC is a protocol that uses SPF and DKIM to determine the authenticity of an email message."
  },
  {
    id: 11,
    difficulty: 'easy',
    question: "What should you do if you receive a 'Qushing' (QR Phishing) code in a random email?",
    options: [
      "Scan it to see where it goes.",
      "Delete the email immediately without scanning.",
      "Scan it but only on a separate 'testing' phone.",
      "Forward it to your friends to warn them."
    ],
    answer: 1,
    explanation: "Scanning unknown QR codes can lead to malicious redirects or direct malware downloads. Treat them with the same suspicion as unknown links."
  },
  {
    id: 12,
    difficulty: 'medium',
    question: "An attacker calls you posing as your bank's fraud department. This is called:",
    options: [
      "Smishing",
      "Vishing",
      "Pharming",
      "Tailgating"
    ],
    answer: 1,
    explanation: "Vishing (Voice Phishing) uses phone calls or VoIP to execute social engineering attacks."
  }
];

export const getShuffledQuestions = () => {
  const easy = quizQuestions.filter(q => q.difficulty === 'easy').sort(() => 0.5 - Math.random());
  const medium = quizQuestions.filter(q => q.difficulty === 'medium').sort(() => 0.5 - Math.random());
  const hard = quizQuestions.filter(q => q.difficulty === 'hard').sort(() => 0.5 - Math.random());
  
  // Return a balanced mix: 4 Easy, 4 Medium, 2 Hard
  const selection = [
    ...easy.slice(0, 4),
    ...medium.slice(0, 4),
    ...hard.slice(0, 2)
  ].sort(() => 0.5 - Math.random());

  return selection;
};
