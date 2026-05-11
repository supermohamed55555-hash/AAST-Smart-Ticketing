"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Database, 
  Shield, 
  Bell, 
  Lock, 
  Cpu,
  Globe
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 font-outfit uppercase tracking-tighter">System Configuration</h2>
          <p className="text-slate-500 font-medium">Fine-tune the AAST Smart Ticketing engine.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SettingSection 
          title="AI Engine" 
          description="Configure GPT-4o-mini parameters and categorization logic."
          icon={<Cpu className="w-6 h-6" />}
        >
          <ToggleItem label="Auto-Categorize Tickets" defaultChecked />
          <ToggleItem label="Smart Summarization" defaultChecked />
          <ToggleItem label="Traffic Prediction Engine" defaultChecked />
        </SettingSection>

        <SettingSection 
          title="Data Structures" 
          description="Manage queue buffers and stack limits."
          icon={<Database className="w-6 h-6" />}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500 uppercase">Max Heap Size</span>
              <span className="font-black text-primary">500 Nodes</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500 uppercase">Undo Stack Limit</span>
              <span className="font-black text-primary">20 Actions</span>
            </div>
          </div>
        </SettingSection>

        <SettingSection 
          title="Security & Access" 
          description="Manage admin roles and session security."
          icon={<Shield className="w-6 h-6" />}
        >
          <ToggleItem label="Require Multi-Factor Auth" />
          <ToggleItem label="Enable Admin Audit Logs" defaultChecked />
        </SettingSection>

        <SettingSection 
          title="Notifications" 
          description="Configure real-time alerts and emails."
          icon={<Bell className="w-6 h-6" />}
        >
          <ToggleItem label="In-App Notifications" defaultChecked />
          <ToggleItem label="Push Alerts (Students)" defaultChecked />
        </SettingSection>
      </div>
    </div>
  );
}

function SettingSection({ title, description, icon, children }: { title: string, description: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="portal-card p-8 bg-white space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
        <div className="p-3 bg-slate-50 rounded-xl text-primary">{icon}</div>
        <div>
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function ToggleItem({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${defaultChecked ? 'bg-primary' : 'bg-slate-200'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${defaultChecked ? 'translate-x-6' : ''}`}></div>
      </div>
    </div>
  );
}
