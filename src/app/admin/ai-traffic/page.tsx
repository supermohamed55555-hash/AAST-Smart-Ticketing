"use client";

import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const forecastData = [
  { time: "08:00", actual: 10, predicted: 12 },
  { time: "09:00", actual: 25, predicted: 22 },
  { time: "10:00", actual: 55, predicted: 50 },
  { time: "11:00", actual: 80, predicted: 85 },
  { time: "12:00", actual: null, predicted: 95 },
  { time: "13:00", actual: null, predicted: 110 },
  { time: "14:00", actual: null, predicted: 85 },
  { time: "15:00", actual: null, predicted: 60 },
  { time: "16:00", actual: null, predicted: 40 },
];

export default function AITrafficPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold font-outfit mb-2 flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-indigo-400" /> AI Traffic Engine
          </h2>
          <p className="text-gray-400">Advanced predictive modeling based on academic calendar and historical trends.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border border-white/5">
            <Calendar className="w-4 h-4 text-indigo-400" /> May 11, 2026
          </div>
          <button className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-indigo-400 transition-colors">
            Retrain Model
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <InsightCard 
          title="Confidence Score" 
          value="94.2%" 
          description="High reliability based on current data" 
          color="indigo" 
        />
        <InsightCard 
          title="Peak Intensity" 
          value="Extreme" 
          description="Higher than average student volume" 
          color="red" 
        />
        <InsightCard 
          title="Optimal Staffing" 
          value="12 Agents" 
          description="Recommended for peak hours" 
          color="cyan" 
        />
        <InsightCard 
          title="Resolution Rate" 
          value="4.2m" 
          description="Avg time predicted per ticket" 
          color="purple" 
        />
      </div>

      {/* Main Forecast Chart */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-bold font-outfit">Predictive Traffic Curve</h3>
            <p className="text-sm text-gray-400">Actual vs Predicted Volume (Tickets/Hour)</p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-400">PREDICTED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/20 rounded-full"></div>
              <span className="text-xs font-bold text-gray-400">ACTUAL</span>
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
              <ReferenceLine x="12:00" stroke="#666" strokeDasharray="3 3" label={{ position: 'top', value: 'Now', fill: '#666', fontSize: 10 }} />
              <Area type="monotone" dataKey="predicted" stroke="#6366f1" fillOpacity={1} fill="url(#colorPredicted)" strokeWidth={3} />
              <Area type="monotone" dataKey="actual" stroke="#ffffff30" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Recommendations */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold font-outfit mb-6">AI Resource Distribution</h3>
          <div className="space-y-4">
            <RecommendationItem 
              dept="IT Support" 
              status="CRITICAL" 
              action="Assign 2 extra agents" 
              desc="High volume of portal reset requests predicted for mid-day."
            />
            <RecommendationItem 
              dept="Financial" 
              status="NORMAL" 
              action="Maintain current staff" 
              desc="Steady flow expected. No significant spikes detected."
            />
            <RecommendationItem 
              dept="Student Affairs" 
              status="WARNING" 
              action="Prepare document processing" 
              desc="Enrollment deadline approaching. Expect 20% increase."
            />
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="glass-card p-8 rounded-3xl bg-red-500/5 border-red-500/20">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold font-outfit">Anomaly Detection</h3>
          </div>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/30">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-red-400 uppercase">System Alert</span>
                <span className="text-[10px] text-gray-500 font-bold">14:22 PM</span>
              </div>
              <p className="text-sm font-bold mb-1">Sudden spike in IT Support tickets</p>
              <p className="text-xs text-gray-400">Current volume is 40% higher than typical Monday patterns. Potential portal outage.</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-indigo-500/30">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase">Optimization Note</span>
                <span className="text-[10px] text-gray-500 font-bold">Yesterday</span>
              </div>
              <p className="text-sm font-bold mb-1">Queue bottleneck identified</p>
              <p className="text-xs text-gray-400">Library Services wait times exceeded 30m due to document verification delays.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, value, description, color }: any) {
  const colorMap: any = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20"
  };

  return (
    <div className="glass-card p-6 rounded-3xl">
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{title}</div>
      <div className={`text-4xl font-bold font-outfit mb-2 ${colorMap[color].split(' ')[0]}`}>{value}</div>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function RecommendationItem({ dept, status, action, desc }: any) {
  const statusColor = status === 'CRITICAL' ? 'bg-red-500' : status === 'WARNING' ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
          <span className="text-sm font-bold">{dept}</span>
        </div>
        <span className="text-[10px] font-bold text-gray-500">{status}</span>
      </div>
      <p className="text-xs text-indigo-400 font-bold mb-1">{action}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}
