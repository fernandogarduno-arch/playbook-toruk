import { useState } from 'react';
import { StoreProvider } from '@/lib/store';
import { SUBJECTS } from '@/data/seed';
import Dashboard from '@/components/app/Dashboard';
import SubjectView from '@/components/app/SubjectView';
import QuizGame from '@/components/app/QuizGame';
import MemoryGame from '@/components/app/MemoryGame';
import Toruk from '@/components/app/Toruk';

function Shell() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<string | null | 'open'>(null);
  const [memory, setMemory] = useState<string | null | 'open'>(null);

  const subject = SUBJECTS.find(s => s.id === subjectId) ?? null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-950 text-white">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button onClick={() => setSubjectId(null)} className="flex items-center gap-2 text-left">
            <Toruk mood="happy" size={44} />
            <div>
              <h1 className="text-lg font-black leading-tight tracking-tight">
                El Playbook de <span className="text-emerald-400">Toruk</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">2° Secundaria · Colegio Rogers · Temporada 2026</p>
            </div>
          </button>
          <span className="hidden rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-300 sm:inline">
            🏈 Modo campeón activado
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-16">
        {subject ? (
          <SubjectView
            subject={subject}
            onBack={() => setSubjectId(null)}
            onPlayQuiz={id => setQuiz(id)}
            onPlayMemory={id => setMemory(id)}
          />
        ) : (
          <Dashboard
            onOpenSubject={setSubjectId}
            onPlayQuiz={() => setQuiz('open')}
            onPlayMemory={() => setMemory('open')}
          />
        )}
      </main>

      <footer className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        El Playbook de Toruk 🐾 — entrena tu cerebro como un campeón. Hecho con 💚 para el #12.
      </footer>

      {quiz !== null && <QuizGame subjectId={quiz === 'open' ? undefined : quiz} onClose={() => setQuiz(null)} />}
      {memory !== null && <MemoryGame subjectId={memory === 'open' ? undefined : memory} onClose={() => setMemory(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
