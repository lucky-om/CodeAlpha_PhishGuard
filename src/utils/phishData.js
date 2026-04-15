// Coded by Lucky

export const emails = [
  {
    id: 'microsoft',
    name: 'Microsoft Password Reset',
    sender: 'Microsoft Security <security@rnicrosoft-support.com>',
    subject: 'Action Required: Unusual sign-in activity',
    date: 'Today at 10:42 AM',
    contentPreview: "Microsoft account unusual sign-in activity. We detected something unusual...",
    hotspots: [
      { id: 'ms-sender', top: '10%', left: '50%', title: 'Spoofed Sender', tactic: 'Typosquatting', description: 'Look closely at the sender. It says "rnicrosoft", using an "r" and "n" instead of an "m", to trick you.' },
      { id: 'ms-urgency', top: '35%', left: '30%', title: 'Sense of Urgency', tactic: 'Psychological Manipulation', description: 'The email creates a false sense of urgency by claiming a suspicious login from a foreign country.' },
      { id: 'ms-btn', top: '75%', left: '25%', title: 'Malicious Button', tactic: 'Deceptive Link', description: 'Hovering over this button would reveal a URL that does not go to Microsoft.com.' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon Order Confirmation',
    sender: 'Amazon.com <orders@amazon-billing-update.info>',
    subject: 'Your Amazon.com order of "Sony PlayStation 5 DualSense"',
    date: 'Yesterday at 3:15 PM',
    contentPreview: "Thank you for shopping with us. Your order #114-1234567-890123 has shipped...",
    hotspots: [
      { id: 'amz-greeting', top: '25%', left: '15%', title: 'Generic Greeting', tactic: 'Mass Phishing', description: '"Hello Customer" instead of your actual name is a huge red flag. Real Amazon emails use your registered name.' },
      { id: 'amz-sender', top: '10%', left: '45%', title: 'Suspicious Domain', tactic: 'Brand Impersonation', description: 'The email address ends in amazon-billing-update.info instead of amazon.com.' },
      { id: 'amz-fear', top: '65%', left: '75%', title: 'Fear of Loss', tactic: 'Baiting', description: 'They try to panic you into clicking the cancel button by showing a high-value purchase you didn\'t make.' }
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix Billing Update',
    sender: 'Netflix Support <support@netfIix.com>',
    subject: 'Payment Declined - Update your payment method',
    date: 'Monday at 8:00 AM',
    contentPreview: "We're having some trouble with your current billing information...",
    hotspots: [
      { id: 'nfx-sender', top: '8%', left: '40%', title: 'Homoglyph Attack', tactic: 'Typosquatting', description: 'The sender is "netfIix" with a capital "I" rather than a lowercase "l". This is extremely hard to spot at a glance.' },
      { id: 'nfx-link', top: '65%', left: '50%', title: 'Credential Harvesting', tactic: 'Phishing payload', description: 'Clicking here would take you to a fake Netflix login page designed to steal your email and password.' }
    ]
  }
];
