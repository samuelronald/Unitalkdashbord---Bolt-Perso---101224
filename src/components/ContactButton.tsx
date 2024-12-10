import { ReactNode } from 'react';

interface ContactButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  primary?: boolean;
}

export default function ContactButton({ icon, label, href, primary }: ContactButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium
        transition-all duration-200 hover:-translate-y-0.5
        ${primary
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
        }
      `}
    >
      {icon}
      {label}
    </a>
  );
}
