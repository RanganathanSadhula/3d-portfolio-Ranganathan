'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';

const REPOS = [
  { name: 'Financial-Document-Analyzer-Debug', desc: 'AI-powered financial document analyzer — debug assignment, optimized prompts', stars: 1, forks: 0, lang: 'Python', color: '#3572A5' },
  { name: 'Math-Routing-Agent', desc: 'Agentic-RAG architecture for a math routing assignment proposal', stars: 0, forks: 0, lang: 'Python', color: '#3572A5' },
  { name: 'DeepEdge-Assessment-White-Pixel-Coordinate-Regression', desc: 'CNN regression predicting white pixel coordinates in grayscale images', stars: 1, forks: 0, lang: 'Jupyter Notebook', color: '#DA5B0B' },
  { name: 'Traffic-Clearance-System-For-Ambulance-In-High-Density-Areas', desc: 'Emergency vehicle traffic clearance system — 2nd Prize, STEPCON 2025', stars: 0, forks: 0, lang: 'Python', color: '#3572A5' },
  { name: 'dog-breed-prediction', desc: 'Image classification model for dog breed prediction', stars: 1, forks: 0, lang: 'Python', color: '#3572A5' },
  { name: 'helmet-detection', desc: 'Computer vision model for helmet detection', stars: 1, forks: 0, lang: 'Python', color: '#3572A5' },
  { name: 'Determinant-Trace-Singular-Vector-Decomposition-Eigenvalues-Matrix-Norm-Inverse-Etc', desc: 'Linear algebra operations implemented from scratch', stars: 1, forks: 0, lang: 'Python', color: '#3572A5' },
  { name: 'Prot-2', desc: 'Updated portfolio site', stars: 1, forks: 0, lang: 'HTML', color: '#E34C26' },
];

// Contribution graph mock
const WEEKS = 52;
const DAYS = 7;

function generateContributions() {
  return Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: DAYS }, (_, d) => {
      const v = Math.random();
      if (v > 0.7) return 3;
      if (v > 0.5) return 2;
      if (v > 0.3) return 1;
      return 0;
    })
  );
}

const contributions = generateContributions();

const LEVEL_COLORS = [
  'rgba(255,255,255,0.05)',
  'rgba(0,212,255,0.2)',
  'rgba(0,212,255,0.5)',
  '#00D4FF',
];

export default function GitHubSection() {
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
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, #2D333B, #22272E)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          ⚡
        </div>
        <div>
          <div className="text-lg font-display font-bold text-white">RanganathanSadhula</div>
          <div className="text-xs text-white/40 font-mono mt-0.5">github.com/RanganathanSadhula</div>
          <div className="flex gap-4 mt-2">
            <span className="text-xs text-white/50 font-mono"><span className="text-white font-bold">20+</span> Repos</span>
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
          <span className="text-xs font-mono text-[#00D4FF]">{total * 3}+ this year</span>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-0.5 min-w-max">
            {contributions.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((level, di) => (
                  <motion.div
                    key={di}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ background: LEVEL_COLORS[level] }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (wi * 7 + di) * 0.001 }}
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
          { label: 'Total Stars', value: '164+', icon: '⭐' },
          { label: 'Total Forks', value: '42+', icon: '🍴' },
          { label: 'Commits', value: '1.2k+', icon: '💾' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className="glass rounded-xl p-3 text-center"
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-lg font-display font-bold text-[#00D4FF]">{s.value}</div>
            <div className="text-xs text-white/30 font-mono">{s.label}</div>
          </motion.div>
        ))}
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
                  <span>⭐ {repo.stars}</span>
                  <span>🍴 {repo.forks}</span>
                </div>
              </div>
              <p className="text-xs text-white/40 mb-3">{repo.desc}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: repo.color }} />
                <span className="text-xs text-white/30 font-mono">{repo.lang}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
