import { create } from 'zustand';

export type CampusSection =
  | 'entrance'
  | 'lobby'
  | 'ai-lab'
  | 'projects'
  | 'github'
  | 'skills'
  | 'experience'
  | 'certifications'
  | 'contact';

export type SceneView = 'exterior' | 'interior';

interface PortfolioStore {
  isLoaded: boolean;
  isEntered: boolean;
  soundOn: boolean;
  toggleSound: () => void;
  isDay: boolean;
  isMuted: boolean;
  activeSection: CampusSection;
  isTransitioning: boolean;
  showUI: boolean;
  sceneView: SceneView;
  setLoaded: (v: boolean) => void;
  setEntered: (v: boolean) => void;
  toggleDayNight: () => void;
  toggleMute: () => void;
  setActiveSection: (s: CampusSection) => void;
  setTransitioning: (v: boolean) => void;
  setShowUI: (v: boolean) => void;
  setSceneView: (v: SceneView) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  isLoaded: false,
  isEntered: false,
  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  isDay: true,
  isMuted: false,
  activeSection: 'entrance',
  isTransitioning: false,
  showUI: false,
  sceneView: 'exterior',
  setLoaded: (v) => set({ isLoaded: v }),
  setEntered: (v) => set({ isEntered: v }),
  toggleDayNight: () => set((s) => ({ isDay: !s.isDay })),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setActiveSection: (s) => set({ activeSection: s }),
  setTransitioning: (v) => set({ isTransitioning: v }),
  setShowUI: (v) => set({ showUI: v }),
  setSceneView: (v) => set({ sceneView: v }),
}));
