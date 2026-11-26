'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';
import {
  GitHubIcon,
  StarIcon,
  GitForkIcon,
  GitCommitIcon,
} from '@/components/ui/Icons';

const REPOS = [
  { name: 'Financial-Document-Analyzer-Debug', desc: 'AI-powered financial document analyzer with optimized prompt routing', stars: 4, forks: 2, lang: 'Python', color: '#3572A5' },
  { name: 'Traffic-Clearance-System-For-Ambulance', desc: 'Emergency vehicle traffic clearance using YOLOv5 & edge IoT — NIT Award 2025', stars: 12, forks: 5, lang: 'Python', color: '#3572A5' },
  { name: 'Math-Routing-Agent', desc: 'Agentic-RAG architecture for intelligent mathematical workflow routing', stars: 6, forks: 1, lang: 'Python', color: '#3572A5' },
  { name: 'DeepEdge-Pixel-Regression', desc: 'CNN regression predicting coordinate matrices in computer vision applications', stars: 3, forks: 1, lang: 'Jupyter Notebook', color: '#DA5B0B' },
  { name: 'Sign-Language-Recognition-RealTime', desc: 'Real-time ASL/ISL gesture classification with MediaPipe and recurrent neural nets', stars: 8, forks: 3, lang: 'Python', color: '#3572A5' },
  { name: '3d-portfolio-Ranganathan', desc: 'Next.js 14, Three.js & React Three Fiber spatial developer portfolio', stars: 15, forks: 4, lang: 'TypeScript', color: '#3178C6' },
];

const WEEKS = 52;
const DAYS = 7;

const LEVEL_COLORS = [
  'rgba(255,255,255,0.05)',
  'rgba(0,212,255,0.2)',
  'rgba(0,212,255,0.5)',
  '#00D4FF',
];

export default function GitHubSection() {
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    // Generate deterministic/pseudo contribution distribution on client
    const grid = Array.from({ length: WEEKS }, (_, w) =>
      Array.from({ length: DAYS }, (_, d) => {
        const seed = (w * 7 + d) * 9301 + 49297;
        const v = (seed % 233280) / 233280;
        if (v > 0.72) return 3;
        if (v > 0.5) return 2;
        if (v > 0.3) return 1;
        return 0;
      })
    );
    setContributions(grid);
  }, []);

  const total = contributions.flat().reduce((a, b) => a + b, 0);

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">GitHub Center</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Developer Hub</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #00D4FF, transparent)' }} />
      </motion.div>

      {/* Profile card */}
      <motion.a
        href={PERSONAL_INFO.github}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5 mb-6 flex items-center gap-4 hover:bg-white/10 transition-colors block"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
          style={{ background: 'linear-gradient(135deg, #1f2937, #111827)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <GitHubIcon className="w-8 h-8 text-[#00D4FF]" />
        </div>
        <div>
          <div className="text-lg font-display font-bold text-white">RanganathanSadhula</div>
          <div className="text-xs text-white/40 font-mono mt-0.5">github.com/RanganathanSadhula</div>
          <div className="flex gap-4 mt-2">
            <span className="text-xs text-white/50 font-mono"><span className="text-white font-bold">25+</span> Repositories</span>
            <span className="text-xs text-white/50 font-mono"><span className="text-white font-bold">200+</span> Followers</span>
          </div>
        </div>
        <div className="ml-auto text-white/20 text-lg">→</div>
      </motion.a>

      {/* Contribution graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Contributions</span>
          <span className="text-xs font-mono text-[#00D4FF]">{total * 3 || '450'}+ this year</span>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-0.5 min-w-max">
            {contributions.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className="w-2.5 h-2.5 rounded-sm transition-colors"
                    style={{ background: LEVEL_COLORS[level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-xs text-white/30 font-mono">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
          ))}
          <span className="text-xs text-white/30 font-mono">More</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {[
          { label: 'Total Stars', value: '180+', Icon: StarIcon, color: '#F59E0B' },
          { label: 'Forks & Clones', value: '55+', Icon: GitForkIcon, color: '#00D4FF' },
          { label: 'Commits', value: '1.4k+', Icon: GitCommitIcon, color: '#10B981' },
        ].map((s, i) => {
          const ItemIcon = s.Icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="glass rounded-xl p-3.5 text-center flex flex-col items-center"
            >
              <ItemIcon className="w-5 h-5 mb-1.5" style={{ color: s.color }} />
              <div className="text-lg font-display font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40 font-mono">{s.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Repos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Pinned Repositories</h3>
        <div className="grid grid-cols-1 gap-3">
          {REPOS.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`${PERSONAL_INFO.github}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="glass rounded-xl p-4 hover:bg-white/10 transition-colors block"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-mono text-[#00D4FF] font-medium">{repo.name}</span>
                <div className="flex items-center gap-3 text-xs text-white/40 font-mono">
                  <span className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-[#F59E0B]" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitForkIcon className="w-3 h-3 text-white/40" />
                    {repo.forks}
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/50 mb-3 leading-relaxed">{repo.desc}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: repo.color }} />
                <span className="text-xs text-white/40 font-mono">{repo.lang}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
