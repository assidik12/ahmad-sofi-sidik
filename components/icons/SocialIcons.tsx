import { Instagram, Github, Linkedin } from "lucide-react";

const socialLinks = [
  { href: "https://instagram.com/", label: "Instagram", icon: Instagram },
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all duration-200"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
