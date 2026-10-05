import { useRef, useState } from 'react';
import { SUBJECTS, TRIMESTERS, BADGES } from '@/data/seed';
import { useStore } from '@/lib/store';
import Field from '@/components/app/Field';
import TasksPanel from '@/components/app/TasksPanel';
import ExamCountdown from '@/components/app/ExamCountdown';
import Toruk from '@/components/app/Toruk';

export default function Dashboard({ onOpenSubject, onPlayQuiz, onPlayMemory }: {
  onOpenSubject: (id: string) => void;
  onPlayQuiz: (id?: string) => void;
  onPlayMemory: (id?: string) => void;
}) {
  const { state, allTopics, exportState, importState, resetAll } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showBadges, setShowBadges] = useState(false);
  const [importMsg, setImportMsg] = useState('');

  const subjectProgress = (sid: string) => {
    let total = 0, done = 0;
    TRIMESTERS.forEach(t => t.parciales.forEach(p => {
      const topics = allTopics(sid, p.id);
      total += topics.length; done += topics.filter(x => x.done).length;
    }));
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const downloadBackup = () => {
    const blob = new Blob([exportState()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `playbook-toruk-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const uploadBackup = async (f: File | undefined) => {
    if (!f) return;
    const ok = importState(await f.text());
    setImportMsg(ok ? '✅ Respaldo restaurado' : '❌ Archivo no válido');
    setTimeout(() => setImportMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <ExamCountdown onOpenSubject={onOpenSubject} />
      <Field />

      {/* accesos rápidos */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button onClick={() => onPlayQuiz()} className="rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 p-4 text-left shadow-lg hover:scale-[1.03] transition">
          <p className="text-2xl">⚡</p><p className="font-black text-white">Quiz Relámpago</p><p className="text-xs text-yellow-100">5 preguntas · yardas por acierto</p>
        </button>
        <button onClick={() => onPlayMemory()} className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-left shadow-lg hover:scale-[1.03] transition">
          <p className="text-2xl">🧠</p><p className="font-black text-white">Memoria Touchdown</p><p className="text-xs text-cyan-100">Empareja conceptos</p>
        </button>
        <button onClick={() => setShowBadges(true)} className="rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 p-4 text-left shadow-lg hover:scale-[1.03] transition">
          <p className="text-2xl">🏅</p><p className="font-black text-white">Insignias</p><p className="text-xs text-purple-100">{state.profile.badges.length} de {Object.keys(BADGES).length} ganadas</p>
        </button>
        <button onClick={downloadBackup} className="rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 p-4 text-left shadow-lg hover:scale-[1.03] transition">
          <p className="text-2xl">💾</p><p className="font-black text-white">Respaldar</p><p className="text-xs text-slate-300">Descarga tu progreso (.json)</p>
        </button>
      </div>

      {/* estadios */}
      <div>
        <h3 className="mb-3 text-xl font-black text-white">🏟️ Los 11 Estadios <span className="text-sm font-normal text-slate-400">— elige tu materia</span></h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map(s => {
            const pct = subjectProgress(s.id);
            const pendingTasks = state.tasks.filter(t => t.subjectId === s.id && !t.done).length;
            return (
              <button key={s.id} onClick={() => onOpenSubject(s.id)}
                className="group rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-left shadow-lg transition hover:scale-[1.02] hover:border-white/25">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-2xl shadow`}>{s.emoji}</div>
                  {pendingTasks > 0 && <span className="rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">{pendingTasks} tarea{pendingTasks > 1 ? 's' : ''}</span>}
                </div>
                <p className="mt-2 font-black text-white group-hover:text-emerald-300">{s.name}</p>
                <p className="text-[11px] text-slate-400">🏟️ {s.stadium}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-emerald-400 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-right text-[10px] font-bold text-slate-400">{pct}% dominado</p>
              </button>
            );
          })}
        </div>
      </div>

      <TasksPanel />

      {/* respaldo / restaurar */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <h4 className="mb-2 font-black text-white">⚙️ Respaldo y datos</h4>
        <p className="mb-3 text-xs text-slate-400">
          Todo se guarda en este dispositivo (sin cuentas, sin costo). Descarga respaldos periódicamente y súbelos a Google Drive
          para tenerlos en cualquier lado; para sincronización automática entre dispositivos se puede conectar Supabase gratis más adelante.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={downloadBackup} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-500">⬇️ Descargar respaldo</button>
          <button onClick={() => fileRef.current?.click()} className="rounded-lg bg-cyan-700 px-3 py-2 text-sm font-bold text-white hover:bg-cyan-600">⬆️ Restaurar respaldo</button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={e => uploadBackup(e.target.files?.[0])} />
          <button onClick={() => { if (confirm('¿Borrar TODO el progreso? Esto no se puede deshacer.')) resetAll(); }}
            className="rounded-lg bg-red-900/70 px-3 py-2 text-sm font-bold text-red-200 hover:bg-red-800">🗑️ Reiniciar</button>
          {importMsg && <span className="self-center text-sm text-slate-300">{importMsg}</span>}
        </div>
        <p className="mt-2 text-[10px] text-slate-500">Nota: el respaldo incluye progreso, tareas y lista de materiales. Los archivos grandes (PDFs, fotos, videos) viven en este navegador.</p>
      </div>

      {/* insignias */}
      {showBadges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowBadges(false)}>
          <div className="w-full max-w-md rounded-2xl bg-slate-900 p-5" onClick={e => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-black text-white">🏅 Vitrina de trofeos</h3>
              <button onClick={() => setShowBadges(false)} className="rounded-lg bg-slate-800 px-3 py-1 text-white">✕</button>
            </div>
            <Toruk mood="happy" size={64} showBubble customLine="Cada insignia es una prueba de que eres más constante de lo que crees." />
            <ul className="mt-4 space-y-2">
              {Object.entries(BADGES).map(([id, b]) => {
                const won = state.profile.badges.includes(id);
                return (
                  <li key={id} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${won ? 'bg-yellow-500/15 border border-yellow-500/40' : 'bg-slate-800/50 opacity-50'}`}>
                    <span className="text-2xl">{won ? b.emoji : '🔒'}</span>
                    <div>
                      <p className="font-bold text-white">{b.name}</p>
                      <p className="text-xs text-slate-400">{b.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
