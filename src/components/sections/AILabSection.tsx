'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AI_MODELS = [
  { name: 'LangChain RAG', accuracy: 94, type: 'NLP', status: 'active' },
  { name: 'Neural Classifier', accuracy: 89, type: 'Vision', status: 'active' },
  { name: 'Recommendation Engine', accuracy: 91, type: 'ML', status: 'training' },
  { name: 'Anomaly Detector', accuracy: 96, type: 'Time Series', status: 'active' },
];

const NEURAL_LAYERS = [3, 5, 5, 4, 2];

export default function AILabSection() {
  const [activeModel, setActiveModel] = useState(0);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    const p: number[] = [];
    for (let i = 0; i < 20; i++) p.push(Math.random());
    setParticles(p);
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">
          AI Research Lab
        </p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Artificial Intelligence</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #7C3AED, transparent)' }} />
      </motion.div>

      {/* Neural network visualizer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ minHeight: 200 }}
      >
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at center, #7C3AED, transparent 70%)' }} />
        <p className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">Neural Network Visualizer</p>
        <svg viewBox="0 0 400 150" className="w-full" style={{ maxHeight: 150 }}>
          {NEURAL_LAYERS.map((nodeCount, layerIdx) => {
            const x = (layerIdx / (NEURAL_LAYERS.length - 1)) * 360 + 20;
            const nodes = Array.from({ length: nodeCount }, (_, ni) => ({
              y: (ni / (nodeCount - 1 || 1)) * 110 + 20,
            }));
            return (
              <g key={layerIdx}>
                {/* Connections */}
                {layerIdx < NEURAL_LAYERS.length - 1 &&
                  nodes.map((node, ni) => {
                    const nextCount = NEURAL_LAYERS[layerIdx + 1];
                    const nextX = ((layerIdx + 1) / (NEURAL_LAYERS.length - 1)) * 360 + 20;
                    return Array.from({ length: nextCount }, (_, nextNi) => {
                      const nextY = (nextNi / (nextCount - 1 || 1)) * 110 + 20;
                      return (
                        <motion.line
                          key={`${ni}-${nextNi}`}
                          x1={x} y1={node.y}
                          x2={nextX} y2={nextY}
                          stroke="rgba(124,58,237,0.2)"
                          strokeWidth="0.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.1, 0.4, 0.1] }}
                          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
                        />
                      );
                    });
                  })}
                {/* Nodes */}
                {nodes.map((node, ni) => (
                  <motion.circle
                    key={ni}
                    cx={x} cy={node.y} r={5}
                    fill={layerIdx === 0 ? '#00D4FF' : layerIdx === NEURAL_LAYERS.length - 1 ? '#F59E0B' : '#7C3AED'}
                    initial={{ opacity: 0, r: 0 }}
                    animate={{ opacity: 1, r: 5 }}
                    transition={{ delay: layerIdx * 0.1 + ni * 0.05 }}
                  >
                    <motion.animate attributeName="r" values="5;7;5" dur={`${1 + Math.random()}s`} repeatCount="indefinite" />
                  </motion.circle>
                ))}
              </g>
            );
          })}
        </svg>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[#00D4FF] font-mono">Input Layer</span>
          <span className="text-xs text-[#7C3AED] font-mono">Hidden Layers</span>
          <span className="text-xs text-[#F59E0B] font-mono">Output Layer</span>
        </div>
      </motion.div>

      {/* AI Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Active Models</h3>
        <div className="space-y-3">
          {AI_MODELS.map((model, i) => (
            <motion.button
              key={model.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              onClick={() => setActiveModel(i)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                activeModel === i ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30' : 'glass hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: model.status === 'active' ? '#10B981' : '#F59E0B' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-display font-medium text-white/80">{model.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/40 px-2 py-0.5 bg-white/5 rounded">{model.type}</span>
                  <span className="text-sm font-mono font-bold" style={{ color: '#00D4FF' }}>{model.accuracy}%</span>
                </div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #00D4FF)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${model.accuracy}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: 'easeOut' }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* AI Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">AI / ML Stack</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'OpenAI GPT-4', icon: '🧠' },
            { name: 'LangChain', icon: '⛓️' },
            { name: 'PyTorch', icon: '🔥' },
            { name: 'TensorFlow', icon: '📐' },
            { name: 'Hugging Face', icon: '🤗' },
            { name: 'Pinecone', icon: '🌲' },
            { name: 'Anthropic Claude', icon: '🤖' },
            { name: 'Scikit-learn', icon: '📊' },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.03 }}
              className="glass rounded-xl p-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-display text-white/70">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
