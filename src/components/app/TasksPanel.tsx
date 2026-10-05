import { useState } from 'react';
import { useStore } from '@/lib/store';
import { SUBJECTS } from '@/data/seed';

// Panel de tareas — global o filtrado por materia.
export default function TasksPanel({ subjectId }: { subjectId?: string }) {
  const { state, addTask, toggleTask, removeTask, awardYards, registerPlay } = useStore();
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [sid, setSid] = useState(subjectId ?? SUBJECTS[0].id);

  const tasks = state.tasks
    .filter(t => !subjectId || t.subjectId === subjectId)
    .sort((a, b) => Number(a.done) - Number(b.done) || (a.dueDate ?? '9999').localeCompare(b.dueDate ?? '9999'));

  const subjectOf = (id: string) => SUBJECTS.find(s => s.id === id);

  const add = () => {
    if (!title.trim()) return;
    addTask(subjectId ?? sid, title.trim(), due || undefined);
    setTitle(''); setDue('');
    awardYards(2); registerPlay();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <h4 className="mb-3 font-black text-white">📋 Tareas {subjectId ? '' : 'de todas las materias'}</h4>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row">
        {!subjectId && (
          <select value={sid} onChange={e => setSid(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-800 px-2 py-2 text-sm text-white">
            {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
          </select>
        )}
        <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Nueva tarea…"
          className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500" />
        <input type="date" value={due} onChange={e => setDue(e.target.value)}
          className="rounded-lg border border-white/10 bg-slate-800 px-2 py-2 text-sm text-white" />
        <button onClick={add} className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500">＋</button>
      </div>
      {tasks.length === 0 ? (
        <p className="py-2 text-center text-xs text-slate-500">Sin tareas registradas. 🎉</p>
      ) : (
        <ul className="space-y-1.5">
          {tasks.map(t => {
            const subj = subjectOf(t.subjectId);
            const overdue = t.dueDate && !t.done && t.dueDate < new Date().toISOString().slice(0, 10);
            return (
              <li key={t.id} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${t.done ? 'bg-slate-800/40 opacity-60' : 'bg-slate-800/70'}`}>
                <button onClick={() => { toggleTask(t.id); if (!t.done) awardYards(4); }}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${t.done ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-500'}`}>
                  {t.done && '✓'}
                </button>
                <span className="text-base">{subj?.emoji}</span>
                <span className={`flex-1 ${t.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>{t.title}</span>
                {t.dueDate && (
                  <span className={`text-[10px] font-bold ${overdue ? 'text-red-400' : 'text-slate-400'}`}>
                    {overdue ? '⚠️ ' : '📅 '}{new Date(t.dueDate + 'T12:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </span>
                )}
                <button onClick={() => removeTask(t.id)} className="text-slate-500 hover:text-red-400">🗑️</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
