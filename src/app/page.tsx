"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1e3a8a] flex flex-col items-center justify-center relative px-6 text-center">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] border-[2px] border-white rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[1px] border-white rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <GraduationCap className="w-12 h-12 text-[#1e3a8a]" />
        </div>

        <h1 className="text-white text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter mb-4">
          AAST Smart Ticketing
        </h1>
        <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
          The next generation of academic support and queue management.
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            href="/auth/login" 
            className="bg-yellow-500 hover:bg-yellow-400 text-primary font-black px-12 py-4 rounded-full text-lg shadow-xl transition-all flex items-center justify-center gap-2 group"
          >
            ENTER PORTAL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="mt-20">
             <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Information & Documentation Center</div>
             <div className="text-white/30 text-[9px] uppercase tracking-wider">Arab Academy for Science, Technology and Maritime Transport</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
