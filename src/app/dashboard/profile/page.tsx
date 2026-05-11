"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  IdCard,
  CreditCard,
  Award
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  
  const user = session?.user || {
    name: "Mohamed",
    email: "student@aast.edu",
    role: "STUDENT",
    id: "241008562"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Digital Identity</h2>
          <p className="text-slate-500 font-medium">Your academic credentials and system role.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="md:col-span-1 portal-card p-8 bg-primary text-white space-y-8 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/20 p-2 relative">
             <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User className="w-16 h-16 text-primary" />
             </div>
             <div className="absolute bottom-2 right-2 w-8 h-8 bg-yellow-500 rounded-full border-4 border-primary flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
             </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">{user.name}</h3>
            <div className="px-4 py-1 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase mt-2">
              {user.role} Account
            </div>
          </div>

          <div className="w-full pt-8 border-t border-white/10 space-y-4">
             <div className="flex justify-between items-center text-xs">
                <span className="opacity-50 font-bold uppercase">Status</span>
                <span className="font-black text-green-400 uppercase tracking-widest">Active</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="opacity-50 font-bold uppercase">Registry</span>
                <span className="font-black uppercase tracking-widest">Verified</span>
             </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="md:col-span-2 space-y-8">
           <div className="portal-card p-10 bg-white space-y-10">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-4">Account Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <InfoItem icon={<Mail className="w-5 h-5" />} label="Email Address" value={user.email || "N/A"} />
                 <InfoItem icon={<IdCard className="w-5 h-5" />} label="System ID" value={user.id || "N/A"} />
                 <InfoItem icon={<Calendar className="w-5 h-5" />} label="Joined Date" value={new Date().toLocaleDateString()} />
                 <InfoItem icon={<Award className="w-5 h-5" />} label="Academic Term" value="Spring 2026" />
              </div>
           </div>

           <div className="portal-card p-10 bg-slate-50 border-none relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] opacity-5">
                 <CreditCard className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Linked Academic ID</h4>
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                       <IdCard className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                       <div className="text-2xl font-black text-slate-900 tracking-widest">2410-0856-2001</div>
                       <div className="text-[10px] font-black text-slate-400 uppercase mt-1">NFC Enabled Digital Pass</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-slate-50 rounded-xl text-primary">{icon}</div>
      <div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-sm font-bold text-slate-700">{value}</div>
      </div>
    </div>
  );
}
