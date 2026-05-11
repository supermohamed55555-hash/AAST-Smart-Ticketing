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
  Database,
  ShieldAlert,
  ChevronRight,
  Info
} from "lucide-react";
import { universityRoot, TreeData } from "@/lib/tree";

export default function DSALab() {
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
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary font-outfit uppercase tracking-tighter">Academic DSA Lab</h2>
          <p className="text-slate-500 font-medium">Interactive visualization of core algorithms and data structures.</p>
        </div>
        <div className="flex gap-2 bg-white p-1.5 rounded-[1.5rem] shadow-sm border border-slate-100">
          <TabButton active={activeStructure === "tree"} onClick={() => setActiveStructure("tree")} icon={<GitBranch className="w-4 h-4" />} label="General Tree" />
          <TabButton active={activeStructure === "heap"} onClick={() => setActiveStructure("heap")} icon={<ShieldAlert className="w-4 h-4" />} label="Priority Queue" />
          <TabButton active={activeStructure === "bst"} onClick={() => setActiveStructure("bst")} icon={<Network className="w-4 h-4" />} label="BST Search" />
          <TabButton active={activeStructure === "stack"} onClick={() => setActiveStructure("stack")} icon={<Layers className="w-4 h-4" />} label="Undo Stack" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Theory Sidebar */}
        <div className="portal-card p-8 bg-white shadow-xl shadow-slate-200/50 h-fit">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Info className="w-4 h-4" /> Academic Logic
          </h3>
          <AnimatePresence mode="wait">
            {activeStructure === "tree" && (
              <StructureInfo 
                title="General Tree"
                desc="A hierarchical structure where each node can have multiple children. Used for University Department organization."
                complexity="Search: O(n)"
                uses={["Department lookup", "Service categorization"]}
              />
            )}
            {activeStructure === "heap" && (
              <StructureInfo 
                title="Max-Heap"
                desc="A specialized tree-based data structure that satisfies the heap property. Highest priority is always at root."
                complexity="Push/Pop: O(log n)"
                uses={["Urgent ticket processing", "Priority queuing"]}
              />
            )}
            {activeStructure === "bst" && (
              <StructureInfo 
                title="Binary Search Tree"
                desc="A node-based binary tree data structure which has its left child less than parent and right child greater."
                complexity="Search: O(log n)"
                uses={["Ticket ID lookup", "Fast registry access"]}
              />
            )}
            {activeStructure === "stack" && (
              <StructureInfo 
                title="Stack (LIFO)"
                desc="A linear data structure which follows a particular order: Last In First Out. Perfect for 'Undo' operations."
                complexity="O(1)"
                uses={["Action history", "Undo system"]}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Visualization Canvas */}
        <div className="lg:col-span-3 portal-card bg-white p-10 min-h-[700px] flex flex-col shadow-2xl shadow-slate-200/40 border-none relative overflow-auto">
          <div className="relative z-10 flex-1 flex flex-col">
            {activeStructure === "tree" && (
              <div className="space-y-12">
                <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <div className="text-sm font-bold text-slate-500 italic">Target: "Refunds" via Traversal...</div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => runTraversal("BFS")}
                      disabled={traversing}
                      className="px-8 py-3 rounded-2xl bg-primary text-white font-black text-sm flex items-center gap-3 hover:bg-blue-900 disabled:opacity-50 shadow-lg shadow-primary/20 transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" /> Run BFS
                    </button>
                    <button 
                      onClick={() => runTraversal("DFS")}
                      disabled={traversing}
                      className="px-8 py-3 rounded-2xl bg-purple-600 text-white font-black text-sm flex items-center gap-3 hover:bg-purple-500 disabled:opacity-50 shadow-lg shadow-purple-600/20 transition-all"
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
                  <p className="text-slate-400 font-medium">Bubbling up highest severity to the root node</p>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-8 w-full max-w-5xl">
                  <HeapNode value={10} label="Root (Max)" active />
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
                <div className="w-full max-w-md text-center mb-16 space-y-6">
                  <h4 className="text-3xl font-black text-primary font-outfit uppercase">BST Search Logic</h4>
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search Ticket ID..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none focus:bg-white focus:border-primary transition-all shadow-inner text-slate-900 font-bold"
                    />
                  </div>
                </div>
                <div className="pt-10">
                   <BSTVisual />
                </div>
              </div>
            )}

            {activeStructure === "stack" && (
               <div className="flex flex-col items-center justify-center flex-1 gap-12">
                  <div className="text-center space-y-2">
                    <h4 className="text-3xl font-black text-primary font-outfit uppercase">Operation Stack</h4>
                    <p className="text-slate-400 font-medium tracking-wide">Last-In-First-Out (LIFO) History</p>
                  </div>
                  <div className="w-80 space-y-4">
                    <StackItem label="POP [Action: Revert #9942]" color="bg-red-500" />
                    <StackItem label="TOP [Serve Ticket #9942]" color="bg-primary" />
                    <StackItem label="PUSH [Serve Ticket #9941]" color="bg-slate-700" />
                    <div className="h-6 border-b-4 border-dotted border-slate-100"></div>
                    <div className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-6">Bottom of Stack</div>
                  </div>
                  <button className="flex items-center gap-3 px-10 py-4 bg-orange-50 text-orange-600 border-2 border-orange-200 rounded-[1.5rem] font-black hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-orange-500/10">
                    <RotateCcw className="w-5 h-5" /> Execute Pop (Undo)
                  </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl flex items-center gap-2 text-xs font-black transition-all uppercase tracking-widest ${active ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-slate-400 hover:text-primary hover:bg-slate-50"}`}
    >
      {icon} {label}
    </button>
  );
}

interface StructureInfoProps {
  title: string;
  desc: string;
  complexity: string;
  uses: string[];
}

function StructureInfo({ title, desc, complexity, uses }: StructureInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div>
        <h4 className="text-2xl font-black text-primary font-outfit mb-3">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
      </div>
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Complexity Analysis</div>
        <div className="font-mono text-primary font-black text-lg">{complexity}</div>
      </div>
      <div className="space-y-4">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Academic Use Cases</div>
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

interface TreeViewProps {
  node: TreeData<string>;
  activeNodes: string[];
  depth?: number;
}

function TreeView({ node, activeNodes, depth = 0 }: TreeViewProps) {
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
          {node.children.map((child: TreeData<string>, i: number) => (
            <TreeView key={i} node={child} activeNodes={activeNodes} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface HeapNodeProps {
  value: number;
  label?: string;
  active?: boolean;
}

function HeapNode({ value, label, active = false }: HeapNodeProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div 
        whileHover={{ scale: 1.15 }}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl border-2 ${active ? "bg-primary border-primary text-white shadow-2xl shadow-primary/30" : "bg-white border-slate-100 text-slate-400 shadow-sm"}`}
      >
        {value}
      </motion.div>
      {label && <div className="text-[10px] font-black text-primary uppercase tracking-widest">{label}</div>}
    </div>
  );
}

interface StackItemProps {
  label: string;
  color: string;
}

function StackItem({ label, color }: StackItemProps) {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all border-l-8 ${color.replace('bg-', 'border-')}`}
    >
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
    </motion.div>
  );
}

function BSTVisual() {
  return (
    <div className="relative p-10">
      <div className="flex flex-col items-center">
        <BSTNode value={50} />
        <div className="flex gap-40 mt-20 relative">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-40 h-20 border-t-2 border-x-2 border-slate-100 rounded-t-[5rem]"></div>
          <div className="flex flex-col items-center gap-20">
            <BSTNode value={25} />
            <div className="flex gap-20">
               <BSTNode value={12} size="small" />
               <BSTNode value={35} size="small" active />
            </div>
          </div>
          <div className="flex flex-col items-center gap-20">
            <BSTNode value={75} />
            <div className="flex gap-20">
               <BSTNode value={60} size="small" />
               <BSTNode value={85} size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BSTNodeProps {
  value: number;
  size?: 'normal' | 'small';
  active?: boolean;
}

function BSTNode({ value, size = "normal", active = false }: BSTNodeProps) {
  return (
    <div className={`rounded-full flex items-center justify-center font-black border-2 transition-all shadow-sm ${active ? 'bg-primary border-primary text-white scale-125 shadow-xl shadow-primary/20' : 'bg-white border-slate-100 text-primary'} ${size === 'normal' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-xs'}`}>
      {value}
    </div>
  );
}
