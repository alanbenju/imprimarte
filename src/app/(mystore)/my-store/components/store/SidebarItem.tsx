import Link from "next/link";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function SidebarItem({ href, icon, label, isActive, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={isActive 
        ? "flex items-center bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-colors" 
        : "flex items-center px-4 py-3 text-sm text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
      }
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
}

export default SidebarItem; 