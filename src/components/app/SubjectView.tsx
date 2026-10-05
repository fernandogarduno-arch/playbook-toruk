import { useState } from 'react';
import type { Subject } from '@/types';
import { TRIMESTERS } from '@/data/seed';
import { useStore } from '@/lib/store';
import MaterialUploader from '@/components/app/MaterialUploader';
import TasksPanel from '@/components/app/TasksPanel';
import Toruk from '@/components/app/Toruk';

export default function SubjectView({ subject, onBack, onPlayQuiz, onPlayMemory }: {
  subject: Subject; onBack: () => void;
  onPlayQuiz: (subjectId: string) => void; onPlayMemory: (subjectId: string) => void;
}) {
  const { allTopics, toggleTopic, addTopic, removeTopic, awardYards, registerPlay } = useStore();
  const [trimesterId, setTrimesterId] = useState(TRIMESTERS[0].id);
  const [newTopic, setNewTopic] = useState<Record<string, string>>({});

  const trimester = TRIMESTERS.find(t => t.id === trimesterId)!;

  const parcialProgress = (parcialId: string) => {
    const topics = allTopics(subject.id, parcialId);
    if (topics.length === 0) return 0;
    return Math.round((topics.filter(t => t.done).length / topics.length) * 100);
  };

  return (
    <div>
      {/* encabezado del estadio */}
      <div className={`mb-4 rounded-2xl bg-gradient-to-r ${subject.color} p-5 shadow-xl`}>
        <button onClick={onBack} className="mb-2 rounded-lg bg-black/30 px-3 py-1 text-sm font-bold text-white hover:bg-black/50">← Todos los estadios</button>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/70">{subject.campo}</p>
            <h2 className="text-3xl font-black text-white">{subject.emoji} {subject.name}</h2>
            <p className="text-sm text-white/80">🏟️ {subject.stadium}</p>
          </div>
          <Toruk mood="happy" size={72} showBubble customLine={subject.coachTip} />
        </div>
      </div>

      {/* juegos de la materia */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => onPlayQuiz(subject.id)}
          className="rounded-xl bg-yellow-500 px-4 py-2 font-black text-yellow-950 shadow hover:bg-yellow-400">⚡ Quiz Relámpago</button>
        <button onClick={() => onPlayMemory(subject.id)}
          className="rounded-xl bg-cyan-600 px-4 py-2 font-black text-white shadow hover:bg-cyan-500">🧠 Memoria Touchdown</button>
      </div>

      {/* trimestres */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {TRIMESTERS.map(t => (
          <button key={t.id} onClick={() => setTrimesterId(t.id)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
              t.id === trimesterId ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            {t.name}
            <span className="block text-[10px] font-normal opacity-70">{t.seasonLabel}</span>
          </button>
        ))}
      </div>

      {/* parciales */}
      <div className="grid gap-4 lg:grid-cols-2">
        {trimester.parciales.map(p => {
          const topics = allTopics(subject.id, p.id);
          const pct = parcialProgress(p.id);
          return (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-black text-white">🏈 {p.name}</h4>
                <span className={`rounded-full px-2 py-0.5 text-xs font-black ${pct === 100 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  {pct === 100 ? '¡DOMINADO! 🏆' : `${pct}%`}
                </span>
              </div>
              <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>

              <ul className="mb-3 space-y-1.5">
                {topics.map(t => (
                  <li key={t.id} className="group flex items-start gap-2 rounded-lg bg-slate-800/60 px-3 py-2 text-sm">
                    <button onClick={() => { toggleTopic(t.id); if (!t.done) { awardYards(10); registerPlay(); } }}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                        t.done ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-500 hover:border-emerald-400'}`}>
                      {t.done && '✓'}
                    </button>
                    <span className={`flex-1 ${t.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {t.title}
                      {t.official && <span className="ml-1 text-[9px] uppercase text-slate-500">· programa base</span>}
                    </span>
                    <button onClick={() => removeTopic(t.id)} title="Quitar tema"
                      className="opacity-0 transition group-hover:opacity-100 text-slate-500 hover:text-red-400">✕</button>
                  </li>
                ))}
              </ul>

              <div className="mb-3 flex gap-2">
                <input
                  value={newTopic[p.id] ?? ''}
                  onChange={e => setNewTopic(nt => ({ ...nt, [p.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (newTopic[p.id] ?? '').trim()) {
                      addTopic(subject.id, p.id, newTopic[p.id].trim());
                      setNewTopic(nt => ({ ...nt, [p.id]: '' }));
                    }
                  }}
                  placeholder="Agregar tema del colegio…"
                  className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-sm text-white placeholder-slate-500" />
                <button
                  onClick={() => {
                    if ((newTopic[p.id] ?? '').trim()) {
                      addTopic(subject.id, p.id, newTopic[p.id].trim());
                      setNewTopic(nt => ({ ...nt, [p.id]: '' }));
                    }
                  }}
                  className="shrink-0 rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-bold text-white hover:bg-slate-600">＋</button>
              </div>

              <MaterialUploader subjectId={subject.id} trimesterId={trimesterId} parcialId={p.id} />
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <TasksPanel subjectId={subject.id} />
      </div>
    </div>
  );
}
