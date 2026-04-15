// Coded by Lucky
import { ShieldCheck, Smartphone, PhoneCall, AlertTriangle, ArrowRight } from 'lucide-react';

const practices = [
  {
    id: 'mfa',
    title: 'Multi-Factor Authentication (MFA)',
    icon: <Smartphone className="w-8 h-8 text-cyan-500" />,
    description: "Always enable MFA on your accounts. Even if a phishing attack compromises your password, the attacker still cannot access your account without your physical device or security token.",
    actionLink: "Enable MFA across all work and personal accounts today."
  },
  {
    id: 'oob',
    title: 'Out-of-Band Verification',
    icon: <PhoneCall className="w-8 h-8 text-emerald-500" />,
    description: "If you receive an urgent request via email to wire money, buy gift cards, or change payroll details, NEVER reply to that email. Call the person or message them on a completely different platform (Slack, Teams, SMS) to verify.",
    actionLink: "Establish a strict Out-of-Band policy for all financial requests."
  },
  {
    id: 'soc',
    title: 'Incident Reporting (SOC)',
    icon: <AlertTriangle className="w-8 h-8 text-rose-500" />,
    description: "If you click a phishing link or enter credentials, do not hide it out of embarrassment. Time is critical. Report the incident to your Security Operations Center (SOC) immediately so they can reset sessions and analyze the threat.",
    actionLink: "Save your IT/SOC emergency contact number on your phone."
  }
];

export default function Dashboard() {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-slate-800 dark:text-slate-200">
      <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-cyan-500" />
          Best Practices Dashboard
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Implement these core defenses to drastically reduce the risk of a successful social engineering compromise.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
        {practices.map(practice => (
          <div key={practice.id} className="p-8 hover:bg-white dark:hover:bg-slate-800/50 transition-colors group">
            <div className="bg-slate-200 dark:bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
              {practice.icon}
            </div>
            <h4 className="text-xl font-bold mb-4">{practice.title}</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 h-32">
              {practice.description}
            </p>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
                <ArrowRight className="w-4 h-4" />
                {practice.actionLink}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
