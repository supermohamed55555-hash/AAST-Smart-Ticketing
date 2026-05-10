"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  GraduationCap, 
  Calendar, 
  Clock,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  PlusCircle,
  Database,
  Search,
  Bell
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Dynamic Header Section */}
      <section className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary font-outfit">Student Command Center</h2>
          <p className="text-gray-500 font-medium">Academic Year 2024/2025 • Semester 2</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:bg-gray-50 transition-all font-bold text-sm text-gray-700">
             <Calendar className="w-4 h-4 text-primary" /> Term Schedule
          </button>
          <Link href="/dashboard/tickets/new" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl shadow-lg hover:shadow-primary/20 transition-all font-bold text-sm">
             <PlusCircle className="w-4 h-4" /> New Ticket
          </Link>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Services & Queue */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Quick Stats / Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Clock className="w-6 h-6 text-yellow-600" />} label="Active Tickets" value="2" sub="Processing" />
            <StatCard icon={<FileText className="w-6 h-6 text-green-600" />} label="Resolved" value="14" sub="This Semester" />
            <StatCard icon={<ShieldAlert className="w-6 h-6 text-red-600" />} label="Urgent" value="0" sub="High Priority" />
          </div>

          {/* Academic Services Section */}
          <div className="portal-card p-10 bg-white shadow-[0_20px_50px_rgba(30,58,138,0.05)]">
             <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-bold text-primary flex items-center gap-3">
                 <Database className="w-6 h-6" /> University Services
               </h3>
               <Link href="/dashboard/tickets/new" className="text-primary text-sm font-black hover:underline flex items-center gap-1">
                 All Services <ChevronRight className="w-4 h-4" />
               </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceAction 
                  title="IT & Network Support" 
                  desc="WiFi, portal login, and system issues."
                  color="bg-blue-600"
                />
                <ServiceAction 
                  title="Student Affairs" 
                  desc="ID cards, graduation, and certificates."
                  color="bg-purple-600"
                />
                <ServiceAction 
                  title="Finance & Tuition" 
                  desc="Payment issues and scholarship status."
                  color="bg-green-600"
                />
                <ServiceAction 
                  title="Academic Complaints" 
                  desc="Submit feedback or report issues."
                  color="bg-red-600"
                />
             </div>
          </div>
        </div>

        {/* Right Column: Notifications & History */}
        <div className="space-y-10">
           {/* Notifications Panel */}
           <div className="portal-card p-8 h-fit bg-gradient-to-br from-primary to-blue-900 text-white border-none shadow-xl shadow-primary/20">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                    <Bell className="w-5 h-5" /> Recent Alerts
                 </h3>
                 <span className="bg-yellow-500 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Live</span>
              </div>
              <div className="space-y-6">
                 <AlertItem title="System Maintenance" time="2h ago" desc="The student portal will be offline for 1 hour at 12:00 AM." />
                 <AlertItem title="Refund Approved" time="Yesterday" desc="Your scholarship refund request #9921 has been processed." />
              </div>
           </div>

           {/* DSA Lab Quick Access */}
           <div className="portal-card p-8 border-dashed border-2 border-primary/20 hover:border-primary transition-all group">
              <div className="flex flex-col gap-4">
                 <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-black text-primary mb-1">DSA Academic Lab</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Visualize the data structures powering this ticketing system.</p>
                 </div>
                 <Link href="/admin/academy" className="mt-2 py-3 bg-gray-50 rounded-xl text-center text-xs font-black text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-widest">
                    Open Lab
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: any) {
  return (
    <div className="portal-card p-6 bg-white hover:translate-y-[-4px] transition-all">
       <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner">{icon}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
       </div>
       <div className="text-3xl font-black text-gray-900 font-outfit">{value}</div>
       <div className="text-[10px] text-gray-400 font-bold mt-1">{sub}</div>
    </div>
  );
}

function ServiceAction({ title, desc, color }: any) {
  return (
    <Link href="/dashboard/tickets/new" className="group">
       <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-primary/20 transition-all flex items-start gap-4 shadow-sm hover:shadow-xl hover:shadow-primary/5">
          <div className={`w-2 h-12 ${color} rounded-full opacity-20 group-hover:opacity-100 transition-opacity`}></div>
          <div>
             <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{title}</h4>
             <p className="text-xs text-gray-500 mt-1">{desc}</p>
          </div>
       </div>
    </Link>
  );
}

function AlertItem({ title, time, desc }: any) {
  return (
    <div className="space-y-1">
       <div className="flex justify-between items-center">
          <span className="font-bold text-sm">{title}</span>
          <span className="text-[10px] opacity-60 font-bold">{time}</span>
       </div>
       <p className="text-xs opacity-80 leading-relaxed">{desc}</p>
    </div>
  );
}
