import { useState } from 'react';
import { MEMORY_PAIRS, SUBJECTS } from '@/data/seed';
import { useStore } from '@/lib/store';
import Toruk from '@/components/app/Toruk';
import { GameShell } from '@/components/app/QuizGame';

interface Card { id: number; text: string; pair: number; flipped: boolean; matched: boolean }

// Memoria Touchdown 🧠 — empareja conceptos con sus respuestas.
export default function MemoryGame({ subjectId, onClose }: { subjectId?: string; onClose: () => void }) {
  const { awardYards, awardBadge, registerPlay } = useStore();
  const [picked, setPicked] = useState<string | undefined>(subjectId);
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  const subjectsWithGame = SUBJECTS.filter(s => MEMORY_PAIRS[s.id]);

  const start = (sid: string) => {
    const pairs = MEMORY_PAIRS[sid] ?? [];
    const deck: Card[] = pairs.flatMap((p, pi) => [
      { id: pi * 2, text: p[0], pair: pi, flipped: false, matched: false },
      { id: pi * 2 + 1, text: p[1], pair: pi, flipped: false, matched: false },
    ]).sort(() => Math.random() - 0.5);
    setCards(deck); setOpen([]); setMoves(0); setDone(false);
    setPicked(sid); registerPlay();
  };

  const flip = (id: number) => {
    if (open.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const newOpen = [...open, id];
    setCards(newCards); setOpen(newOpen);
    if (newOpen.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newOpen.map(i => newCards.find(c => c.id === i)!);
      if (a.pair === b.pair) {
        setTimeout(() => {
          const matched = newCards.map(c => c.pair === a.pair ? { ...c, matched: true } : c);
          setCards(matched); setOpen([]);
          if (matched.every(c => c.matched)) {
            setDone(true);
            awardYards(Math.max(30 - moves * 2, 10));
            awardBadge('primerJuego');
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newOpen.includes(c.id) ? { ...c, flipped: false } : c));
          setOpen([]);
        }, 900);
      }
    }
  };

  if (!picked) {
    return (
      <GameShell title="🧠 Memoria Touchdown" onClose={onClose}>
        <p className="mb-3 text-sm text-slate-300">Empareja cada concepto con su respuesta. ¡Menos turnos = más yardas!</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {subjectsWithGame.map(s => (
            <button key={s.id} onClick={() => start(s.id)}
              className={`rounded-xl bg-gradient-to-br ${s.color} p-3 text-sm font-bold text-white shadow hover:scale-105 transition`}>
              {s.emoji} {s.name}
            </button>
          ))}
        </div>
      </GameShell>
    );
  }

  if (done) {
    return (
      <GameShell title="🧠 ¡Touchdown de memoria!" onClose={onClose}>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <Toruk mood="celebrating" size={110} />
          <p className="text-2xl font-black text-white">¡Completado en {moves} turnos!</p>
          <div className="flex gap-2">
            <button onClick={() => start(picked)} className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-500">Otra vez 🔁</button>
            <button onClick={onClose} className="rounded-xl bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-600">Volver</button>
          </div>
        </div>
      </GameShell>
    );
  }

  return (
    <GameShell title={`🧠 Memoria — Turnos: ${moves}`} onClose={onClose}>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {cards.map(c => (
          <button key={c.id} onClick={() => flip(c.id)}
            className={`flex min-h-[72px] items-center justify-center rounded-xl p-2 text-center text-xs font-bold transition-all duration-300 ${
              c.matched ? 'bg-emerald-600/60 text-white scale-95'
              : c.flipped ? 'bg-yellow-500 text-yellow-950'
              : 'bg-slate-700 text-transparent hover:bg-slate-600'}`}
            style={!c.flipped && !c.matched ? { textShadow: '0 0 8px rgba(0,0,0,0)' } : undefined}>
            {c.flipped || c.matched ? c.text : '🏈'}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
