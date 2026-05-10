"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Clock, 
  ShieldAlert, 
  CheckCircle, 
  MoreHorizontal,
  ChevronRight,
  Database,
  ArrowUpDown,
  RefreshCcw
} from "lucide-react";

export default function LiveQueuePage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tickets");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTickets(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Live Service Queues</h2>
          <p className="text-slate-500 font-medium">Monitoring all active ticket buffers across departments.</p>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={fetchTickets}
             className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-colors shadow-sm"
           >
              <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
           </button>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Binary Search by ID..." 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 text-sm outline-none focus:border-primary w-64 shadow-sm"
              />
           </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
           <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
           <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Accessing Database Registry...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="portal-card bg-white border-red-100">
                <div className="p-6 border-b border-red-50 bg-red-50/30 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-red-600" />
                      <h3 className="font-black text-red-900 uppercase tracking-widest text-xs">Urgent Buffer (Max-Heap)</h3>
                   </div>
                   <span className="text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full">Priority Order</span>
                </div>
                <div className="p-0">
                   {tickets.filter(t => t.priority === 'URGENT').length > 0 ? (
                      tickets.filter(t => t.priority === 'URGENT').map((ticket, i) => (
                        <QueueItem key={ticket.id} ticket={ticket} isFirst={i === 0} />
                      ))
                   ) : (
                      <div className="p-10 text-center text-slate-300 text-xs font-bold uppercase">No urgent tickets</div>
                   )}
                </div>
             </div>

             <div className="portal-card bg-white border-blue-100">
                <div className="p-6 border-b border-blue-50 bg-blue-50/30 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="font-black text-blue-900 uppercase tracking-widest text-xs">Normal Buffer (FIFO Deque)</h3>
                   </div>
                   <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full">Entry Order</span>
                </div>
                <div className="p-0">
                   {tickets.filter(t => t.priority === 'NORMAL').length > 0 ? (
                      tickets.filter(t => t.priority === 'NORMAL').map((ticket, i) => (
                        <QueueItem key={ticket.id} ticket={ticket} isFirst={i === 0} />
                      ))
                   ) : (
                      <div className="p-10 text-center text-slate-300 text-xs font-bold uppercase">No normal tickets</div>
                   )}
                </div>
             </div>
          </div>

          <div className="portal-card bg-white overflow-hidden shadow-xl shadow-slate-200/50">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                   <Database className="w-5 h-5 text-primary" /> Comprehensive Ticket Registry
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                         <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                         <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                         <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                         <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {tickets.map((ticket) => (
                         <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-6"><span className="font-mono text-xs font-bold">{ticket.id.slice(-6)}</span></td>
                            <td className="p-6 font-bold text-slate-700">{ticket.student?.user?.name || "Mohamed"}</td>
                            <td className="p-6 text-sm text-slate-500">{ticket.department?.name}</td>
                            <td className="p-6">
                               <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${ticket.priority === 'URGENT' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                  {ticket.priority}
                               </span>
                            </td>
                            <td className="p-6">
                               <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${ticket.status === 'PENDING' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                                  <span className="text-xs font-bold text-slate-500">{ticket.status}</span>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </>
      )}
    </div>
  );
}

function QueueItem({ ticket, isFirst }: any) {
  return (
    <div className={`p-5 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-all ${isFirst ? 'bg-yellow-50/10' : ''}`}>
       <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${ticket.priority === 'URGENT' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
             {ticket.priority === 'URGENT' ? '!' : '#'}
          </div>
          <div>
             <div className="text-sm font-bold text-slate-900">{ticket.student?.user?.name || "Mohamed"}</div>
             <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{ticket.department?.name}</div>
          </div>
       </div>
       <div className="flex flex-col items-end">
          <div className="text-[10px] font-black text-slate-400 mb-1">{new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          {isFirst && <div className="text-[9px] font-black text-yellow-600 bg-yellow-100 px-2 rounded-full uppercase">Next</div>}
       </div>
    </div>
  );
}
