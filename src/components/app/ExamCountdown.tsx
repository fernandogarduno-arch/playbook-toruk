import { useMemo, useState } from 'react';
import { EXAM_CALENDAR, SPECIAL_DAYS, SUBJECTS } from '@/data/seed';
import { useStore } from '@/lib/store';
import Toruk from '@/components/app/Toruk';

const DAY_MS = 86400000;
const todayStr = () => new Date().toISOString().slice(0, 10);
const daysUntil = (date: string) => Math.ceil((new Date(date + 'T12:00').getTime() - new Date(todayStr() + 'T12:00').getTime()) / DAY_MS);

export default function ExamCountdown({ onOpenSubject }: { onOpenSubject: (id: string) => void }) {
  const { state, addTask } = useStore();
  const [planMsg, setPlanMsg] = useState('');

  const upcoming = useMemo(() =>
    EXAM_CALENDAR
      .map(e => ({ ...e, days: daysUntil(e.date) }))
      .filter(e => e.days >= 0)
      .sort((a, b) => a.days - b.days),
  []);

  const specials = SPECIAL_DAYS.filter(d => daysUntil(d.date) >= 0);
  const next = upcoming[0];

  const urgencyStyle = (days: number) =>
    days === 0 ? 'bg-red-600 text-white animate-pulse'
    : days <= 2 ? 'bg-red-500/20 border-red-500/60 text-red-300'
    : days <= 5 ? 'bg-orange-500/15 border-orange-500/50 text-orange-300'
    : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300';

  const buildPlan = () => {
    let created = 0;
    for (const exam of upcoming) {
      const subj = SUBJECTS.find(s => s.id === exam.subjectId);
      if (!subj) continue;
      const candidates: { daysBefore: number; title: string }[] = [];
      if (exam.days >= 3) candidates.push({ daysBefore: 2, title: `🧠 Quiz Relámpago + repaso de ${subj.name} (25 min)` });
      if (exam.days >= 2) candidates.push({ daysBefore: 1, title: `📖 Repaso final de ${subj.name}: temas + errores (30 min)` });
      if (exam.days === 1) candidates.push({ daysBefore: 0, title: `🌙 Repaso ligero de ${subj.name} y dormir temprano` });
      for (const c of candidates) {
        const due = new Date(new Date(exam.date + 'T12:00').getTime() - c.daysBefore * DAY_MS).toISOString().slice(0, 10);
        if (due < todayStr()) continue;
        const exists = state.tasks.some(t => t.subjectId === exam.subjectId && t.title === c.title);
        if (!exists) { addTask(exam.subjectId, c.title, due); created++; }
      }
    }
    setPlanMsg(created > 0 ? `✅ ¡${created} tareas de repaso agregadas!` : '👍 Tu plan ya estaba completo');
    setTimeout(() => setPlanMsg(''), 4000);
  };

  if (upcoming.length === 0 && specials.length === 0) return null;

  return (
    <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 p-4 shadow-xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white">🚨 Semana de Parciales — Octubre 2026</h3>
          <p className="text-xs text-slate-400">Calendario real del Colegio Rogers</p>
        </div>
        {next && (
          <Toruk size={52}
            mood={next.days <= 2 ? 'excited' : 'happy'}
            showBubble
            customLine={next.days === 0
              ? `¡HOY es ${next.label}! Respira, confía en tu entrenamiento. 🐾`
              : next.days === 1
                ? `¡MAÑANA es ${next.label}! Hoy repaso ligero y a dormir temprano.`
                : `Faltan ${next.days} días para ${next.label}. ¡Tú puedes!`} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {upcoming.map(e => {
          const subj = SUBJECTS.find(s => s.id === e.subjectId);
          return (
            <button key={e.subjectId} onClick={() => onOpenSubject(e.subjectId)}
              className={`rounded-xl border p-3 text-center transition hover:scale-105 ${urgencyStyle(e.days)}`}>
              <p className="text-xl">{subj?.emoji}</p>
              <p className="text-xs font-bold">{subj?.name}</p>
              <p className="text-[10px] opacity-80">
                {new Date(e.date + 'T12:00').toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
              <p className="mt-1 text-sm font-black">
                {e.days === 0 ? '¡HOY!' : e.days === 1 ? '¡MAÑANA!' : `${e.days} días`}
              </p>
            </button>
          );
        })}
        {specials.map(d => (
          <div key={d.date} className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-3 text-center text-sky-300">
            <p className="text-xl">{d.emoji}</p>
            <p className="text-xs font-bold">{d.label}</p>
            <p className="text-[10px] opacity-80">
              {new Date(d.date + 'T12:00').toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
            <p className="mt-1 text-sm font-black">¡A disfrutar!</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={buildPlan}
          className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-sm font-black text-white shadow hover:from-red-400 hover:to-orange-400">
          🗓️ Crear mi plan de estudio automático
        </button>
        {planMsg && <span className="text-sm text-emerald-300">{planMsg}</span>}
        <p className="w-full text-[11px] text-slate-400">
          El plan genera tareas cortas (25–30 min) antes de cada parcial: sesiones breves y frecuentes vencen a las maratones de último minuto. 🧠
        </p>
      </div>
    </div>
  );
}
