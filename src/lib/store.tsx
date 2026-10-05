import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { AppState, Material, GameProfile, Topic } from '@/types';
import { SEED_TOPICS, TRIMESTERS, SUBJECTS } from '@/data/seed';
import { deleteFile } from '@/lib/db';

const LS_KEY = 'playbook-toruk-state-v1';

const today = () => new Date().toISOString().slice(0, 10);

const defaultProfile: GameProfile = {
  xp: 0, yards: 0, touchdowns: 0, streak: 0, lastPlayDay: '', badges: [],
};

const initialState: AppState = {
  topicsDone: {},
  customTopics: [],
  tasks: [],
  profile: defaultProfile,
  materialsMeta: [],
  removedTopicIds: [],
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...initialState, ...JSON.parse(raw) };
  } catch { /* estado corrupto: reinicia */ }
  return initialState;
}

interface StoreCtx {
  state: AppState;
  // temas
  allTopics: (subjectId: string, parcialId: string) => Topic[];
  toggleTopic: (topicId: string) => void;
  addTopic: (subjectId: string, parcialId: string, title: string) => void;
  removeTopic: (topicId: string) => void;
  // tareas
  addTask: (subjectId: string, title: string, dueDate?: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  // materiales
  addMaterial: (m: Material) => void;
  removeMaterial: (id: string) => void;
  // juego
  awardYards: (yards: number, reason?: string) => void;
  awardBadge: (badgeId: string) => void;
  registerPlay: () => void;
  // respaldo
  exportState: () => string;
  importState: (json: string) => boolean;
  resetAll: () => void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  const allTopics = useCallback((subjectId: string, parcialId: string): Topic[] => {
    const seed = (SEED_TOPICS[subjectId]?.[parcialId] ?? []).map((title, i) => {
      const id = `${subjectId}:${parcialId}:s${i}`;
      return { id, title, official: true, done: !!state.topicsDone[id] };
    }).filter(t => !state.removedTopicIds.includes(t.id));
    const custom = state.customTopics
      .filter(t => t.id.startsWith(`${subjectId}:${parcialId}:`))
      .map(t => ({ ...t, done: !!state.topicsDone[t.id] }));
    return [...seed, ...custom];
  }, [state]);

  const awardBadge = useCallback((badgeId: string) => {
    setState(s => s.profile.badges.includes(badgeId)
      ? s
      : { ...s, profile: { ...s.profile, badges: [...s.profile.badges, badgeId] } });
  }, []);

  const registerPlay = useCallback(() => {
    setState(s => {
      const t = today();
      if (s.profile.lastPlayDay === t) return s;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const streak = s.profile.lastPlayDay === yesterday ? s.profile.streak + 1 : 1;
      const badges = [...s.profile.badges];
      if (streak >= 3 && !badges.includes('racha3')) badges.push('racha3');
      if (streak >= 7 && !badges.includes('racha7')) badges.push('racha7');
      return { ...s, profile: { ...s.profile, streak, lastPlayDay: t, badges } };
    });
  }, []);

  const awardYards = useCallback((yards: number) => {
    setState(s => {
      let { yards: y, touchdowns: td, xp, badges } = s.profile;
      y += yards;
      xp += yards;
      while (y >= 100) { y -= 100; td += 1; xp += 100; if (!badges.includes('primerTouchdown')) badges = [...badges, 'primerTouchdown']; }
      return { ...s, profile: { ...s.profile, yards: y, touchdowns: td, xp, badges } };
    });
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setState(s => {
      const done = !s.topicsDone[topicId];
      const doneCount = Object.values({ ...s.topicsDone, [topicId]: done }).filter(Boolean).length;
      const badges = [...s.profile.badges];
      if (doneCount >= 10 && !badges.includes('tema10')) badges.push('tema10');
      if (doneCount >= 25 && !badges.includes('tema25')) badges.push('tema25');
      return { ...s, topicsDone: { ...s.topicsDone, [topicId]: done }, profile: { ...s.profile, badges } };
    });
  }, []);

  const addTopic = useCallback((subjectId: string, parcialId: string, title: string) => {
    const id = `${subjectId}:${parcialId}:c${Date.now()}`;
    setState(s => ({ ...s, customTopics: [...s.customTopics, { id, title, official: false, done: false }] }));
  }, []);

  const removeTopic = useCallback((topicId: string) => {
    setState(s => {
      const isCustom = s.customTopics.some(t => t.id === topicId);
      return {
        ...s,
        customTopics: s.customTopics.filter(t => t.id !== topicId),
        removedTopicIds: isCustom ? s.removedTopicIds : [...s.removedTopicIds, topicId],
      };
    });
  }, []);

  const addTask = useCallback((subjectId: string, title: string, dueDate?: string) => {
    setState(s => ({ ...s, tasks: [...s.tasks, { id: `task-${Date.now()}`, subjectId, title, dueDate, done: false, createdAt: Date.now() }] }));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setState(s => ({ ...s, tasks: s.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) }));
  }, []);

  const removeTask = useCallback((id: string) => {
    setState(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) }));
  }, []);

  const addMaterial = useCallback((m: Material) => {
    setState(s => {
      const badges = s.profile.badges.includes('primerMaterial') ? s.profile.badges : [...s.profile.badges, 'primerMaterial'];
      return { ...s, materialsMeta: [...s.materialsMeta, m], profile: { ...s.profile, badges } };
    });
  }, []);

  const removeMaterial = useCallback((id: string) => {
    setState(s => ({ ...s, materialsMeta: s.materialsMeta.filter(m => m.id !== id) }));
    deleteFile(id).catch(() => undefined);
  }, []);

  const exportState = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const importState = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      setState({ ...initialState, ...parsed });
      return true;
    } catch { return false; }
  }, []);

  const resetAll = useCallback(() => setState(initialState), []);

  return (
    <Ctx.Provider value={{
      state, allTopics, toggleTopic, addTopic, removeTopic,
      addTask, toggleTask, removeTask, addMaterial, removeMaterial,
      awardYards, awardBadge, registerPlay, exportState, importState, resetAll,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore fuera de StoreProvider');
  return ctx;
}

export { TRIMESTERS, SUBJECTS };
