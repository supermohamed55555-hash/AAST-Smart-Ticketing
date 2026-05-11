"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  Home, 
  Briefcase, 
  Users, 
  User as UserIcon,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Sun,
  Languages
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // For demo, we skip actual auth check or use mock
  }, [status, router]);

  return (
    <div className="flex min-h-screen bg-[#f4f7fa]">
      {/* Portal Sidebar */}
      <aside className="portal-sidebar">
        <div className="p-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
             <span className="text-primary font-black text-xl">A</span>
          </div>
          <div className="font-bold text-sm tracking-widest opacity-80 uppercase">Student Portal</div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          <SidebarLink href="/dashboard" icon={<Home className="w-5 h-5" />} label="Home" active />
          <SidebarLink href="/dashboard/tickets/new" icon={<Briefcase className="w-5 h-5" />} label="Services" />
          <SidebarLink href="/dashboard/academy" icon={<Users className="w-5 h-5" />} label="DSA Lab" />
          <SidebarLink href="/dashboard/profile" icon={<UserIcon className="w-5 h-5" />} label="Identity" />
        </nav>

        <div className="p-6 border-t border-white/10">
          <button className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen pb-24 lg:pb-0">
        {/* Portal Header */}
        <header className="portal-header">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
               <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                 <UserIcon className="w-6 h-6 text-primary" />
               </div>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Hi, Mohamed</div>
              <div className="text-[10px] bg-yellow-500 text-primary font-bold px-2 py-0.5 rounded-full inline-block">241008562</div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <HeaderAction icon={<Languages className="w-5 h-5" />} />
            <HeaderAction icon={<Sun className="w-5 h-5" />} />
            <HeaderAction icon={<Bell className="w-5 h-5" />} badge />
          </div>
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-4 lg:hidden z-50">
          <MobileLink href="/dashboard" icon={<Home className="w-6 h-6" />} label="Home" active />
          <MobileLink href="/dashboard/tickets/new" icon={<Briefcase className="w-6 h-6" />} label="Services" />
          <MobileLink href="/dashboard/community" icon={<Users className="w-6 h-6" />} label="Community" />
          <MobileLink href="/dashboard/profile" icon={<UserIcon className="w-6 h-6" />} label="Identity" />
        </nav>
      </main>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarLink({ href, icon, label, active = false }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${active ? "bg-white/10 text-white font-bold" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
        {icon}
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}

interface HeaderActionProps {
  icon: React.ReactNode;
  badge?: boolean;
}

function HeaderAction({ icon, badge = false }: HeaderActionProps) {
  return (
    <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center relative hover:scale-105 transition-transform">
      {icon}
      {badge && <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full border-2 border-primary"></span>}
    </button>
  );
}

interface MobileLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function MobileLink({ href, icon, label, active = false }: MobileLinkProps) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      <div className={active ? "text-primary" : "text-gray-400"}>{icon}</div>
      <span className={`text-[10px] font-bold ${active ? "text-primary" : "text-gray-400"}`}>{label}</span>
    </Link>
  );
}
