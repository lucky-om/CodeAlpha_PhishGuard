// Coded by Lucky
import { AlertOctagon, Zap, ShieldAlert, BadgeInfo } from 'lucide-react';

const triggers = [
  {
    id: 'urgency',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: 'Sense of Urgency',
    description: 'Attackers want you to act fast before you have time to think. They use phrases like "Immediate Action Required" or "Your account will be suspended in 24 hours".',
    example: '"If you do not verify your information within 1 hour, your account will be permanently closed."'
  },
  {
    id: 'authority',
    icon: <ShieldAlert className="w-8 h-8 text-emerald-500" />,
    title: 'Authority & Fear',
    description: 'Impersonating a person in power (like a CEO) or a punitive organization (like the IRS or FBI) to intimidate victims into complying.',
    example: '"This is the IRS. You owe back taxes and a warrant will be issued for your arrest if you do not pay immediately via wire transfer."'
  },
  {
    id: 'curiosity',
    icon: <BadgeInfo className="w-8 h-8 text-cyan-500" />,
    title: 'Curiosity & Greed',
    description: 'Baiting users with something they desire, like a free gift, a lottery win, or an interesting document they "just have to see".',
    example: '"You have won the 2024 Customer Loyalty Prize! Click here to claim your $500 Amazon Gift Card."'
  }
];

export default function PsychologyCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {triggers.map(trigger => (
        <div key={trigger.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all group">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {trigger.icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{trigger.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
            {trigger.description}
          </p>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border-l-2 border-rose-500 rounded-r-lg">
            <p className="text-xs italic text-rose-700 dark:text-rose-400">
              {trigger.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
