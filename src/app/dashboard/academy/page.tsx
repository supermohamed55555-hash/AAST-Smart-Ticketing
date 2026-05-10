"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Network, 
  GitBranch, 
  Layers, 
  Search, 
  RotateCcw, 
  Play,
  Info,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { universityRoot } from "@/lib/tree";

export default function StudentAcademyPage() {
  const [activeStructure, setActiveStructure] = useState("tree");
  const [traversalPath, setTraversalPath] = useState<string[]>([]);
  const [traversing, setTraversing] = useState(false);

  const runTraversal = async (type: "BFS" | "DFS") => {
    setTraversing(true);
    setTraversalPath([]);
    const { path } = type === "BFS" 
      ? universityRoot.bfs("Refunds") 
      : universityRoot.dfs("Refunds");
    
    for (let i = 0; i < path.length; i++) {
      setTraversalPath(prev => [...prev, path[i]]);
      await new Promise(r => setTimeout(r, 600));
    }
    setTraversing(false);
  };

  return (
    <div className="space-y-10 pb-20 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary font-outfit uppercase tracking-tighter">Academic Learning Lab</h2>
          <p className="text-slate-500 font-medium text-lg">Explore the Data Structures powering your university portal.</p>
        </div>
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-[1.5rem] shadow-sm border border-slate-100">
          <TabButton active={activeStructure === "tree"} onClick={() => setActiveStructure("tree")} icon={<GitBranch className="w-4 h-4" />} label="General Tree" />
          <TabButton active={activeStructure === "heap"} onClick={() => setActiveStructure("heap")} icon={<ShieldAlert className="w-4 h-4" />} label="Priority Queue" />
          <TabButton active={activeStructure === "bst"} onClick={() => setActiveStructure("bst")} icon={<Network className="w-4 h-4" />} label="BST Search" />
          <TabButton active={activeStructure === "stack"} onClick={() => setActiveStructure("stack")} icon={<Layers className="w-4 h-4" />} label="Logic Stack" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Theory Sidebar */}
        <div className="portal-card p-8 bg-white shadow-xl shadow-slate-200/50 h-fit">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Info className="w-4 h-4" /> Student Guide
          </h3>
          <AnimatePresence mode="wait">
            {activeStructure === "tree" && (
              <StructureInfo 
                title="Department Tree"
                desc="Understand how the university organizes its services in a hierarchical tree structure."
                complexity="Traversal: BFS/DFS"
                uses={["Finding IT Support", "Navigating Departments"]}
              />
            )}
            {activeStructure === "heap" && (
              <StructureInfo 
                title="Service Priority"
                desc="Learn how urgent tickets move faster through the queue using Max-Heap logic."
                complexity="Efficient Sorting"
                uses={["Urgent requests", "Fair processing"]}
              />
            )}
            {activeStructure === "bst" && (
              <StructureInfo 
                title="Search Logic"
                desc="How we find your ticket in a second among thousands of students."
                complexity="Logarithmic Search"
                uses={["Instant ID lookup", "Fast registry"]}
              />
            )}
            {activeStructure === "stack" && (
              <StructureInfo 
                title="Action History"
                desc="The Last-In-First-Out logic behind system updates and undos."
                complexity="LIFO Structure"
                uses={["System reliability", "History tracking"]}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Visualization Canvas */}
        <div className="lg:col-span-3 portal-card bg-white p-10 min-h-[600px] flex flex-col shadow-2xl shadow-slate-200/40 border-none relative overflow-auto">
          <div className="relative z-10 flex-1 flex flex-col">
            {activeStructure === "tree" && (
              <div className="space-y-12">
                <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <div className="text-sm font-bold text-slate-500 italic italic">Visualizing BFS/DFS Traversal...</div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => runTraversal("BFS")}
                      disabled={traversing}
                      className="px-8 py-3 rounded-2xl bg-primary text-white font-black text-sm flex items-center gap-3 hover:bg-blue-900 disabled:opacity-50 transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" /> Run BFS
                    </button>
                    <button 
                      onClick={() => runTraversal("DFS")}
                      disabled={traversing}
                      className="px-8 py-3 rounded-2xl bg-purple-600 text-white font-black text-sm flex items-center gap-3 hover:bg-purple-500 disabled:opacity-50 transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" /> Run DFS
                    </button>
                  </div>
                </div>

                <div className="flex justify-center pt-20 pb-40">
                  <TreeView 
                    node={universityRoot.getTreeData()} 
                    activeNodes={traversalPath} 
                  />
                </div>
              </div>
            )}

            {activeStructure === "heap" && (
              <div className="flex flex-col items-center justify-center flex-1 gap-16">
                <div className="text-center space-y-2">
                  <h4 className="text-3xl font-black text-primary font-outfit uppercase">Max-Heap Logic</h4>
                  <p className="text-slate-400 font-medium">Prioritizing tickets by severity</p>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-8 w-full max-w-5xl">
                  <HeapNode value={10} label="Urgent" active />
                  <HeapNode value={8} />
                  <HeapNode value={9} />
                  <HeapNode value={5} />
                  <HeapNode value={7} />
                  <HeapNode value={6} />
                  <HeapNode value={4} />
                </div>
              </div>
            )}

            {activeStructure === "bst" && (
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-full max-w-md text-center mb-16 space-y-4">
                  <h4 className="text-3xl font-black text-primary font-outfit uppercase">Search Tree</h4>
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Simulate Binary Search..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none focus:bg-white focus:border-primary transition-all shadow-inner text-slate-900 font-bold"
                    />
                  </div>
                </div>
                <BSTVisual />
              </div>
            )}

            {activeStructure === "stack" && (
               <div className="flex flex-col items-center justify-center flex-1 gap-12">
                  <div className="text-center space-y-2">
                    <h4 className="text-3xl font-black text-primary font-outfit uppercase">Logic Stack</h4>
                    <p className="text-slate-400 font-medium tracking-wide">Last-In-First-Out Visualization</p>
                  </div>
                  <div className="w-80 space-y-4">
                    <StackItem label="TOP Element" color="bg-primary" />
                    <StackItem label="Middle Element" color="bg-slate-700" />
                    <StackItem label="Base Element" color="bg-slate-400" />
                    <div className="h-6 border-b-4 border-dotted border-slate-100"></div>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl flex items-center gap-2 text-xs font-black transition-all uppercase tracking-widest ${active ? "bg-primary text-white shadow-xl" : "text-slate-400 hover:text-primary hover:bg-slate-50"}`}
    >
      {icon} {label}
    </button>
  );
}

function StructureInfo({ title, desc, complexity, uses }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h4 className="text-2xl font-black text-primary font-outfit mb-3">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
      </div>
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Algorithm Goal</div>
        <div className="font-mono text-primary font-black text-lg">{complexity}</div>
      </div>
      <div className="space-y-4">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Why we use this?</div>
        <div className="space-y-3">
          {uses.map((use: string, i: number) => (
            <div key={i} className="flex items-center gap-3 text-xs text-slate-600 font-bold">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {use}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TreeView({ node, activeNodes, depth = 0 }: any) {
  const isActive = activeNodes.includes(node.name);
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        animate={{ 
          scale: isActive ? 1.15 : 1,
          backgroundColor: isActive ? "#1e3a8a" : "white",
          color: isActive ? "white" : "#1e3a8a",
          borderColor: isActive ? "#1e3a8a" : "#e2e8f0"
        }}
        className="px-6 py-4 rounded-2xl border-2 text-sm font-black min-w-[150px] text-center shadow-sm"
      >
        {node.name}
      </motion.div>
      {node.children.length > 0 && (
        <div className="flex gap-12 mt-16 relative">
          <div className="absolute top-[-64px] left-1/2 -translate-x-1/2 w-0.5 h-16 bg-slate-100"></div>
          {node.children.map((child: any, i: number) => (
            <TreeView key={i} node={child} activeNodes={activeNodes} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function HeapNode({ value, label, active = false }: any) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl border-2 ${active ? "bg-primary border-primary text-white shadow-xl" : "bg-white border-slate-100 text-slate-400 shadow-sm"}`}>
        {value}
      </div>
      {label && <div className="text-[10px] font-black text-primary uppercase tracking-widest">{label}</div>}
    </div>
  );
}

function StackItem({ label, color }: any) {
  return (
    <div className={`p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between border-l-8 ${color.replace('bg-', 'border-')}`}>
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
    </div>
  );
}

function BSTVisual() {
  return (
    <div className="flex flex-col items-center gap-20 py-10">
      <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center font-black text-primary">50</div>
      <div className="flex gap-32">
        <div className="flex flex-col items-center gap-10">
           <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center font-black text-slate-400">25</div>
           <div className="flex gap-10">
              <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-300">12</div>
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary flex items-center justify-center text-xs font-black text-white">35</div>
           </div>
        </div>
        <div className="flex flex-col items-center gap-10">
           <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center font-black text-slate-400">75</div>
           <div className="flex gap-10">
              <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-300">60</div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-300">85</div>
           </div>
        </div>
      </div>
    </div>
  );
}
