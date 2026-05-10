"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Briefcase, 
  ChevronLeft, 
  Send, 
  Sparkles,
  ShieldAlert,
  Clock,
  HelpCircle
} from "lucide-react";

export default function NewTicketPage() {
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketType, setTicketType] = useState<"NORMAL" | "URGENT">("NORMAL");
  const [severity, setSeverity] = useState(1);
  const router = useRouter();

  // Improved AI Logic: Smart Categorization & Summary
  useEffect(() => {
    if (description.length > 8) {
      setIsPredicting(true);
      const timer = setTimeout(() => {
        setIsPredicting(false);
        const text = description.toLowerCase();
        
        let suggestion = null;
        
        // IT Keywords
        if (text.includes("wifi") || text.includes("internet") || text.includes("password") || text.includes("login") || text.includes("account") || text.includes("نت") || text.includes("باسورد")) {
          suggestion = "IT Department";
        } 
        // Finance Keywords
        else if (text.includes("pay") || text.includes("fees") || text.includes("money") || text.includes("scholarship") || text.includes("refund") || text.includes("مصاريف") || text.includes("فلوس")) {
          suggestion = "Finance";
        }
        // Student Affairs Keywords
        else if (text.includes("id") || text.includes("card") || text.includes("graduate") || text.includes("certificate") || text.includes("carne") || text.includes("كارنيه") || text.includes("شهادة")) {
          suggestion = "Student Affairs";
        }
        // Library Keywords
        else if (text.includes("book") || text.includes("study") || text.includes("research") || text.includes("library") || text.includes("كتاب") || text.includes("استعارة")) {
          suggestion = "Library";
        }

        if (suggestion) {
          setAiSuggestion(suggestion);
          // Auto-fill if it's very clear and department isn't set yet
          if (!department) setDepartment(suggestion);
        }
      }, 800);
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
          studentName: "Mohamed", // In a real app, get from session
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
        alert("Failed to submit ticket.");
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-10 hover:opacity-70 transition-opacity">
        <ChevronLeft className="w-4 h-4" /> Return to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Help Sidebar */}
        <div className="lg:col-span-2 space-y-8">
           <div className="portal-card p-10 bg-primary text-white border-none shadow-2xl shadow-primary/20">
              <h1 className="text-4xl font-black font-outfit mb-4 leading-tight">Create Service Request</h1>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Submit your ticket to the relevant department. Our system uses advanced algorithms to ensure priority and fair handling.
              </p>
              <div className="space-y-4">
                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0"><Clock className="w-4 h-4" /></div>
                    <div>
                       <div className="text-sm font-bold">Standard Queue</div>
                       <div className="text-[10px] opacity-60">Handled via FIFO Deque logic</div>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0"><ShieldAlert className="w-4 h-4" /></div>
                    <div>
                       <div className="text-sm font-bold">Urgent Processing</div>
                       <div className="text-[10px] opacity-60">Prioritized using Max-Heap algorithms</div>
                    </div>
                 </div>
              </div>
           </div>


        </div>

        {/* Form Main Area */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="portal-card p-12 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.03)] space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Service Level</label>
                <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setTicketType("NORMAL")}
                    className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-black transition-all uppercase tracking-widest ${ticketType === 'NORMAL' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Normal
                  </button>
                  <button 
                    type="button"
                    onClick={() => setTicketType("URGENT")}
                    className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-black transition-all uppercase tracking-widest ${ticketType === 'URGENT' ? 'bg-red-50 text-red-600 shadow-sm shadow-red-100' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Urgent
                  </button>
                </div>
              </div>

              {ticketType === 'URGENT' && (
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
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Target Department</label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] py-5 px-8 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-700 font-medium"
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
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Issue Overview</label>
              <div className="relative">
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] py-6 px-8 min-h-[180px] outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-700 font-medium leading-relaxed"
                  placeholder="Tell us what you need help with..."
                  required
                />
                
                {isPredicting && (
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-black text-primary bg-blue-50 px-4 py-2 rounded-full animate-pulse border border-primary/10 shadow-sm">
                    <Sparkles className="w-3 h-3" /> AI Analyzing...
                  </div>
                )}
                {aiSuggestion && !isPredicting && (
                  <button 
                    type="button"
                    onClick={() => setDepartment(aiSuggestion)}
                    className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-black text-white bg-primary px-4 py-2 rounded-full hover:bg-blue-900 transition-all shadow-lg shadow-primary/20"
                  >
                    <Sparkles className="w-3 h-3" /> Suggestion: {aiSuggestion}
                  </button>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitted}
              className="w-full py-6 rounded-[1.5rem] bg-primary text-white font-black text-xl flex items-center justify-center gap-4 hover:bg-blue-900 transition-all shadow-2xl shadow-primary/20 active:scale-[0.98]"
            >
              {isSubmitted ? (
                 <>PROCESSING... <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div></>
              ) : (
                 <>SUBMIT REQUEST <Send className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
