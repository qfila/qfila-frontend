import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  title: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: ClassValue;
}

export function SideBarNavLink({
  title,
  icon,
  href,
  onClick,
  className,
}: Props) {
  function NavLink() {
    if (href) {
      return (
        <Link
          className={cn(
            'flex items-center justify-between hover:bg-gray-200/70 p-2 rounded-xl w-full',
            className,
          )}
          href={href}
          onClick={onClick}
        >
          <div className="flex gap-4">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronRight />
        </Link>
      );
    }

    return (
      <button
        className={cn(
          'flex items-center justify-between hover:bg-gray-200/70 p-2 rounded-xl w-full',
          className,
        )}
        onClick={onClick}
      >
        <div className="flex gap-4">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronRight />
      </button>
    );
  }

  return <NavLink />;
}
