"use client";

import { 
  LayoutDashboard, 
  ListOrdered, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Search
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-[#1e293b] text-white flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Admin Hub</span>
          </div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AAST Ticketing Control</div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <AdminSidebarLink href="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label="Command Center" active={pathname === '/admin'} />
          <AdminSidebarLink href="/admin/academy" icon={<BrainCircuit className="w-5 h-5" />} label="DSA Academic Lab" active={pathname === '/admin/academy'} />
          <AdminSidebarLink href="/admin/queue" icon={<ListOrdered className="w-5 h-5" />} label="Live Queues" active={pathname === '/admin/queue'} />
          <AdminSidebarLink href="/admin/ai-traffic" icon={<BarChart3 className="w-5 h-5" />} label="AI Predictions" active={pathname === '/admin/ai-traffic'} />
          
          <div className="pt-8 pb-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System Config</div>
          <AdminSidebarLink href="/admin/settings" icon={<Settings className="w-5 h-5" />} label="Settings" active={pathname === '/admin/settings'} />
        </nav>

        <div className="p-6 bg-slate-900/50">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold text-sm hover:bg-red-500 hover:text-white transition-all">
             <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Admin Main Area */}
      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40">
           <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search students, tickets, or nodes..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-primary transition-all"
              />
           </div>

           <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                 <span className="text-sm font-bold text-slate-900">Dr. Administrator</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Overseer</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 p-1">
                 <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white">
                    <UserIcon className="w-6 h-6" />
                 </div>
              </div>
           </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminSidebarLink({ href, icon, label, active = false }: any) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${active ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
        {icon}
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}
