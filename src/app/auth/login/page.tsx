"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Hash, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(30,58,138,0.1)] border border-white">
        
        {/* Visual Branding Side */}
        <div className="hidden lg:flex bg-primary p-16 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
          
          <div className="z-10 flex items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-primary" />
             </div>
             <span className="text-white font-black text-2xl tracking-tighter uppercase">AAST Smart</span>
          </div>

          <div className="z-10">
             <h1 className="text-5xl font-black text-white leading-tight mb-6">
                Academic <br />
                <span className="text-yellow-500">Service</span> Hub.
             </h1>
             <p className="text-white/60 text-lg max-w-sm leading-relaxed font-medium">
                The next generation of student support, powered by efficient data structures.
             </p>
          </div>

          <div className="z-10 flex gap-4">
             <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] text-white font-bold tracking-widest uppercase">Version 8.1.0</div>
             <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] text-white font-bold tracking-widest uppercase">Secure Portal</div>
          </div>
        </div>

        {/* Login Form Side */}
        <div className="p-12 md:p-20 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-primary mb-3">Student Portal</h2>
            <p className="text-gray-400 font-medium">Access your personalized academic command center</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Student Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4.5 pl-14 pr-6 text-gray-900 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="e.g. Mohamed Ahmed"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Registration ID</label>
              <div className="relative">
                <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4.5 pl-14 pr-6 text-gray-900 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="e.g. 24100XXXX"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                 <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>ENTER DASHBOARD <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-16 pt-12 border-t border-gray-50 text-center">
             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                Information & Documentation Center <br />
                Arab Academy for Science, Technology and Maritime Transport
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
