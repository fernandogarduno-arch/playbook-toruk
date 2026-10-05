import { useMemo, useState } from 'react';
import { QUIZ_BANK, SUBJECTS } from '@/data/seed';
import { useStore } from '@/lib/store';
import Toruk from '@/components/app/Toruk';

// Quiz Relámpago ⚡ — 5 preguntas contra reloj, XP y yardas por aciertos.
export default function QuizGame({ subjectId, onClose }: { subjectId?: string; onClose: () => void }) {
  const { awardYards, awardBadge, registerPlay } = useStore();
  const [picked, setPicked] = useState<string | undefined>(subjectId);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    const pool = picked ? QUIZ_BANK.filter(q => q.subjectId === picked) : QUIZ_BANK;
    return [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [picked]);

  if (!picked) {
    return (
      <GameShell title="⚡ Quiz Relámpago" onClose={onClose}>
        <p className="mb-3 text-sm text-slate-300">Elige materia (o juega con todas mezcladas):</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SUBJECTS.filter(s => QUIZ_BANK.some(q => q.subjectId === s.id)).map(s => (
            <button key={s.id} onClick={() => { setPicked(s.id); registerPlay(); }}
              className={`rounded-xl bg-gradient-to-br ${s.color} p-3 text-sm font-bold text-white shadow hover:scale-105 transition`}>
              {s.emoji} {s.name}
            </button>
          ))}
          <button onClick={() => { setPicked(''); registerPlay(); }}
            className="rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 p-3 text-sm font-bold text-white shadow hover:scale-105 transition">
            🎲 ¡Todas mezcladas!
          </button>
        </div>
      </GameShell>
    );
  }

  const q = questions[idx];

  const pick = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      const yards = score * 8 + (score === questions.length ? 20 : 0);
      awardYards(yards);
      awardBadge('primerJuego');
      if (score === questions.length) awardBadge('quizPerfecto');
    } else {
      setIdx(i => i + 1);
      setChosen(null);
    }
  };

  if (finished) {
    const perfect = score === questions.length;
    return (
      <GameShell title="⚡ Resultado" onClose={onClose}>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <Toruk mood={perfect ? 'celebrating' : score >= 3 ? 'excited' : 'happy'} size={110} />
          <p className="text-3xl font-black text-white">{score} / {questions.length}</p>
          <p className="text-emerald-300">
            {perfect ? '¡PASE PERFECTO! 🎯 +yardas extra' : score >= 3 ? '¡Buen drive! Sigue así 🏈' : 'Toda jugada cuenta. ¡Inténtalo otra vez!'}
          </p>
          <div className="flex gap-2">
            <button onClick={() => { setPicked(undefined); setIdx(0); setScore(0); setChosen(null); setFinished(false); }}
              className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-500">Jugar otra vez</button>
            <button onClick={onClose} className="rounded-xl bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-600">Volver</button>
          </div>
        </div>
      </GameShell>
    );
  }

  return (
    <GameShell title={`⚡ Quiz Relámpago — ${idx + 1}/${questions.length}`} onClose={onClose}>
      <p className="mb-4 text-lg font-bold text-white">{q.q}</p>
      <div className="grid gap-2">
        {q.options.map((opt, i) => {
          let cls = 'bg-slate-800 hover:bg-slate-700 text-white';
          if (chosen !== null) {
            if (i === q.answer) cls = 'bg-emerald-600 text-white';
            else if (i === chosen) cls = 'bg-red-600/80 text-white';
            else cls = 'bg-slate-800/50 text-slate-400';
          }
          return (
            <button key={i} onClick={() => pick(i)} className={`rounded-xl px-4 py-3 text-left font-semibold transition ${cls}`}>
              {String.fromCharCode(65 + i)}) {opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-950/60 p-3 text-sm text-cyan-100">
          <Toruk size={40} mood={chosen === q.answer ? 'excited' : 'thinking'} />
          <p className="mt-1">{chosen === q.answer ? '✅ ¡Correcto! ' : '❌ Casi… '}{q.explain ?? ''}</p>
          <button onClick={next} className="mt-3 w-full rounded-xl bg-yellow-500 px-4 py-2 font-black text-yellow-950 hover:bg-yellow-400">
            {idx + 1 >= questions.length ? 'Ver resultado 🏁' : 'Siguiente jugada ▶'}
          </button>
        </div>
      )}
    </GameShell>
  );
}

export function GameShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-black text-white">{title}</h3>
          <button onClick={onClose} className="rounded-lg bg-slate-800 px-3 py-1 text-white hover:bg-slate-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
