"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layout,
  Bell,
  X
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const [stats, setStats] = useState({ activeCount: 0, resolvedCount: 0, urgentCount: 0 });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Real Stats
        const statsRes = await fetch("/api/tickets?stats=true");
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch Real Notifications
        const notifsRes = await fetch("/api/tickets?notifications=true");
        const notifsData = await notifsRes.json();
        setNotifications(notifsData);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchData();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="portal-card p-10 bg-primary text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
            <ShieldCheck className="w-40 h-40" />
         </div>
         <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-black font-outfit uppercase tracking-tighter">Student Command Center</h2>
            <p className="text-blue-100 font-medium text-lg max-w-xl leading-relaxed">
              Manage your academic requests, track real-time queue positions, and explore university departments.
            </p>
            <div className="flex gap-4 pt-2">
               <Link href="/dashboard/tickets/new" className="px-8 py-4 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-3">
                  <PlusCircle className="w-5 h-5" /> Submit New Request
               </Link>
               <button 
                 onClick={() => setShowNotifs(!showNotifs)}
                 className="px-8 py-4 bg-blue-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-3 relative"
               >
                  <Bell className="w-5 h-5" /> Notifications
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-primary text-[10px] flex items-center justify-center rounded-full border-2 border-primary">
                      {notifications.length}
                    </span>
                  )}
               </button>
            </div>
         </div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifs && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="portal-card p-8 bg-white border-yellow-100 shadow-xl shadow-yellow-100/50 relative"
          >
             <button onClick={() => setShowNotifs(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
             </button>
             <h3 className="font-black text-slate-900 uppercase tracking-tighter text-xl mb-6">Recent Updates</h3>
             <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="font-bold text-slate-900">{n.title}</div>
                          <div className="text-sm text-slate-500">{n.message}</div>
                          <div className="text-[10px] font-black text-slate-300 uppercase mt-1">{new Date(n.createdAt).toLocaleTimeString()}</div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-xs">No new notifications</div>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatusCard label="Active Tickets" value={stats.activeCount} icon={<Clock className="w-6 h-6" />} color="bg-orange-50 text-orange-600" />
        <StatusCard label="Processed" value={stats.resolvedCount} icon={<CheckCircle className="w-6 h-6" />} color="bg-green-50 text-green-600" />
        <StatusCard label="Urgent (Heap)" value={stats.urgentCount} icon={<Zap className="w-6 h-6" />} color="bg-blue-50 text-primary" />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 portal-card bg-white p-8 space-y-8">
            <div className="flex justify-between items-end">
               <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl">Live Registry</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time status from university nodes</p>
               </div>
            </div>

            <div className="space-y-4">
               {/* This will show real ticket data if we had a specific user session, 
                   for now it shows general activity */}
               <TicketRow id="TIC-LIVE-SYNC" dept="Active Sync" status="Real-time" time="Now" />
            </div>
         </div>

         <div className="portal-card bg-slate-50 p-8 border-none space-y-8">
            <h3 className="font-black text-slate-900 uppercase tracking-tighter text-xl flex items-center gap-3">
               <Layout className="w-5 h-5 text-primary" /> Shortcuts
            </h3>
            <div className="space-y-4">
               <ShortcutItem label="DSA Academic Lab" desc="Explore the algorithms" href="/dashboard/academy" />
               <ShortcutItem label="New Service Request" desc="Submit to queue" href="/dashboard/tickets/new" />
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Server Heartbeat</div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Database Linked</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatusCard({ label, value, icon, color }: any) {
  return (
    <div className="portal-card p-8 flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
      <div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-black text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function TicketRow({ id, dept, status, time }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors group">
       <div className="flex items-center gap-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black bg-blue-100 text-primary`}>
             <Clock className="w-5 h-5" />
          </div>
          <div>
             <div className="text-sm font-bold text-slate-900">{id}</div>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dept}</div>
          </div>
       </div>
       <div className="flex items-center gap-6">
          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-blue-50 text-primary animate-pulse`}>
             {status}
          </span>
          <div className="text-[10px] font-black text-slate-300">{time}</div>
          <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-primary transition-colors" />
       </div>
    </div>
  );
}

function ShortcutItem({ label, desc, href = "#" }: any) {
  return (
    <Link href={href} className="flex flex-col gap-1 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
       <span className="text-sm font-bold text-slate-900">{label}</span>
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{desc}</span>
    </Link>
  );
}
