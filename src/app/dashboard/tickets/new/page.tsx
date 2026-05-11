"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  ChevronRight, 
  Send, 
  Sparkles,
  ShieldAlert,
  Clock,
  HelpCircle,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function NewTicketPage() {
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketType, setTicketType] = useState<"NORMAL" | "URGENT">("NORMAL");
  const [severity, setSeverity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (description.length > 8) {
      const fetchAiSuggestion = async () => {
        try {
          const res = await fetch("/api/ai/categorize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }),
          });
          const data = await res.json();
          
          if (data.category) {
            // Mapping AI response to existing departments
            let mapped = data.category;
            if (mapped.includes("IT")) mapped = "IT Department";
            if (mapped.includes("Finance") || mapped.includes("Financial")) mapped = "Finance";
            if (mapped.includes("Student Affairs")) mapped = "Student Affairs";
            if (mapped.includes("Library")) mapped = "Library";
            
            setAiSuggestion(mapped);
            if (!department) setDepartment(mapped);
          }
        } catch (error) {
          console.error("AI Error:", error);
          // Fallback to keyword matching if AI fails
          const text = description.toLowerCase();
          if (text.includes("wifi") || text.includes("internet") || text.includes("password")) setAiSuggestion("IT Department");
        } finally {
          setIsPredicting(false);
        }
      };

      const timer = setTimeout(fetchAiSuggestion, 1500); // Wait for user to stop typing
      return () => clearTimeout(timer);
    } else {
      setAiSuggestion(null);
    }
  }, [description, department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: "Mohamed",
          studentId: "241008562",
          departmentName: department,
          description: description,
          priority: ticketType,
          severity: severity
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-colors">
         <ChevronRight className="w-4 h-4 rotate-180" /> Back to Workspace
      </Link>

      <div className="portal-card p-12 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.04)] space-y-12">
        <div className="flex justify-between items-center border-b border-slate-50 pb-8">
           <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Submit New Ticket</h1>
              <p className="text-slate-500 font-medium italic italic">Your request will be prioritized using automated DSA buffers.</p>
           </div>
           <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <PlusCircle className="w-8 h-8 text-primary" />
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Service Level</label>
              <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
                <button 
                  type="button"
                  onClick={() => setTicketType("NORMAL")}
                  className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black transition-all uppercase tracking-widest ${ticketType === 'NORMAL' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Clock className="w-4 h-4" /> Normal
                </button>
                <button 
                  type="button"
                  onClick={() => setTicketType("URGENT")}
                  className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black transition-all uppercase tracking-widest ${ticketType === 'URGENT' ? 'bg-red-50 text-red-600 shadow-sm shadow-red-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ShieldAlert className="w-4 h-4" /> Urgent
                </button>
              </div>
            </div>

            {ticketType === 'URGENT' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Severity: <span className="text-red-600">{severity}</span></label>
                <input 
                  type="range" min="1" max="10" 
                  value={severity}
                  onChange={(e) => setSeverity(parseInt(e.target.value))}
                  className="w-full accent-red-600 h-2 bg-gray-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3 opacity-30">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">FIFO Queue (Standard)</label>
                <div className="h-12 bg-gray-50 rounded-xl border border-dashed border-gray-200"></div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Target Department</label>
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] py-6 px-8 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-700 font-bold text-lg"
              required
            >
              <option value="">Select Department</option>
              <option value="IT Department">IT Department</option>
              <option value="Student Affairs">Student Affairs</option>
              <option value="Finance">Finance</option>
              <option value="Library">Library</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Problem Description</label>
            <div className="relative">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] py-8 px-10 min-h-[220px] outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-700 font-bold text-lg leading-relaxed shadow-inner"
                placeholder="Tell us what you need help with..."
                required
              />
              
              {isPredicting && (
                <div className="absolute bottom-8 right-8 flex items-center gap-2 text-[10px] font-black text-primary bg-blue-50 px-5 py-2.5 rounded-full animate-pulse border border-primary/10 shadow-sm">
                  <Sparkles className="w-3 h-3" /> AI Analyzing...
                </div>
              )}
              {aiSuggestion && !isPredicting && (
                <button 
                  type="button"
                  onClick={() => setDepartment(aiSuggestion)}
                  className="absolute bottom-8 right-8 flex items-center gap-3 text-[10px] font-black text-white bg-primary px-6 py-3 rounded-full hover:bg-blue-900 transition-all shadow-xl shadow-primary/30"
                >
                  <Sparkles className="w-4 h-4" /> Smart Suggestion: {aiSuggestion}
                </button>
              )}
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitted}
            className="w-full py-8 rounded-[1.5rem] bg-primary text-white font-black text-2xl flex items-center justify-center gap-5 hover:bg-blue-900 transition-all shadow-2xl shadow-primary/30 active:scale-[0.98]"
          >
            {isSubmitted ? (
               <>PROCESSING... <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div></>
            ) : (
               <>SUBMIT REQUEST <Send className="w-6 h-6" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
