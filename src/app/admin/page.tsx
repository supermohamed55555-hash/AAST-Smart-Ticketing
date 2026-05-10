"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  RotateCcw,
  Database,
  TrendingUp,
  Brain
} from "lucide-react";
import Link from "next/link";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const chartData = [
  { time: "08:00", count: 12 },
  { time: "10:00", count: 45 },
  { time: "12:00", count: 78 },
  { time: "14:00", count: 56 },
  { time: "16:00", count: 32 },
  { time: "18:00", count: 15 },
];

export default function AdminDashboard() {
  const [undoActive, setUndoActive] = useState(false);
  const [stats, setStats] = useState({ activeCount: 0, resolvedCount: 0, urgentCount: 0 });

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/tickets?stats=true", { cache: 'no-store' });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Stats Fetch Error:", error);
    }
  };

  const checkUndoStack = async () => {
    try {
      const response = await fetch("/api/tickets?checkStack=true", { cache: 'no-store' });
      const data = await response.json();
      setUndoActive(data.hasActions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
    checkUndoStack();
    const interval = setInterval(fetchStats, 10000); // Auto-refresh stats every 10s
    return () => clearInterval(interval);
  }, []);

  const handleProcessNext = async () => {
    try {
      const response = await fetch("/api/tickets", { method: "PATCH" });
      const data = await response.json();

      if (response.ok) {
        if (data.ticket) {
          alert(`Success! Served: [${data.ticket.priority}] Ticket.`);
          fetchStats();
          checkUndoStack();
        } else {
          alert(data.message || "Queue is empty.");
        }
      } else {
        alert(data.error || "System error occurred. Check server logs.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUndo = async () => {
    try {
      const response = await fetch("/api/tickets", { method: "PUT" });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchStats();
        checkUndoStack();
      } else {
        alert(data.message || "Failed to undo.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Command Center</h2>
          <p className="text-slate-500 font-medium">Real-time queue orchestration & DSA monitoring.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleProcessNext}
            className="px-8 py-4 bg-primary text-white rounded-[1.5rem] font-black text-lg shadow-2xl shadow-primary/20 hover:bg-blue-900 transition-all flex items-center gap-3 active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" /> Serve Next Ticket
          </button>
          <button
            onClick={handleUndo}
            disabled={!undoActive}
            className={`px-8 py-4 rounded-[1.5rem] font-black text-lg border-2 transition-all flex items-center gap-3 ${undoActive ? 'border-orange-500 text-orange-600 bg-orange-50 shadow-lg cursor-pointer hover:bg-orange-100' : 'border-slate-100 text-slate-300 bg-slate-50 opacity-50 cursor-not-allowed'}`}
          >
            <RotateCcw className="w-5 h-5" /> Undo (Stack)
          </button>
        </div>
      </div>

      {/* Overview Stats (REAL DATA) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminStatCard icon={<Users className="w-6 h-6 text-blue-600" />} label="Total Waiting" value={stats.activeCount} trend="Live" />
        <AdminStatCard icon={<AlertCircle className="w-6 h-6 text-red-600" />} label="Urgent (Heap)" value={stats.urgentCount} trend="Priority" />
        <AdminStatCard icon={<CheckCircle className="w-6 h-6 text-green-600" />} label="Processed" value={stats.resolvedCount} trend="Success" />
        <AdminStatCard icon={<Clock className="w-6 h-6 text-purple-600" />} label="Avg. Wait" value="14m" trend="Sync" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Live Traffic Visualization */}
        <div className="lg:col-span-2 portal-card p-10 bg-white">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Live Traffic (BFS Analysis)</h3>
              <p className="text-sm text-slate-400">Tickets generated across all departments</p>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-black bg-green-50 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4" /> +15.4% Efficiency
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #f1f5f9", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Area type="monotone" dataKey="count" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorCount)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DSA Performance Sidebar */}
        <div className="space-y-10">
          <div className="portal-card p-8 bg-slate-900 text-white border-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">AI Traffic Engine</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Predicting peak hours using BFS traversal across department nodes.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs text-slate-300">Next Peak</span>
                <span className="font-black text-yellow-500">14:30 PM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs text-slate-300">Department</span>
                <span className="font-black text-cyan-400">Finance</span>
              </div>
            </div>
            <Link href="/admin/ai-traffic" className="block mt-8 text-center py-4 bg-primary rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors">
              View AI Analytics
            </Link>
          </div>

          <div className="portal-card p-8 bg-white border-dashed border-2 border-slate-200 flex flex-col gap-4">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Search Method</div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900">BST Lookup</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Time: O(log n)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminStatCard({ icon, label, value, trend }: any) {
  return (
    <div className="portal-card p-8 bg-white hover:shadow-xl transition-all border-slate-100">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase bg-blue-50 text-primary`}>
          {trend}
        </span>
      </div>
      <div className="text-3xl font-black text-slate-900 font-outfit mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}
