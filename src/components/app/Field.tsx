import { useStore } from '@/lib/store';
import Toruk from '@/components/app/Toruk';

// Campo de fútbol americano: las yardas avanzan hacia el touchdown.
export default function Field() {
  const { state } = useStore();
  const { yards, touchdowns, xp, streak } = state.profile;
  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950 to-green-950 p-4 shadow-xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Toruk mood={yards >= 80 ? 'excited' : 'happy'} size={64} />
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400">Drive actual</p>
            <p className="text-lg font-bold text-white">{yards} / 100 yardas</p>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div><p className="text-2xl font-black text-yellow-400">{touchdowns}</p><p className="text-[10px] uppercase text-emerald-300">Touchdowns</p></div>
          <div><p className="text-2xl font-black text-cyan-300">{xp}</p><p className="text-[10px] uppercase text-emerald-300">XP</p></div>
          <div><p className="text-2xl font-black text-orange-400">{streak}🔥</p><p className="text-[10px] uppercase text-emerald-300">Racha</p></div>
        </div>
      </div>
      {/* campo */}
      <div className="relative h-16 overflow-hidden rounded-lg border-2 border-white/20 bg-gradient-to-r from-green-700 via-green-600 to-green-700">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="absolute top-0 h-full w-px bg-white/30" style={{ left: `${i * 10}%` }}>
            <span className="absolute bottom-0 left-1 text-[9px] font-bold text-white/60">{i === 0 ? 'G' : i === 10 ? 'TD' : i * 10}</span>
          </div>
        ))}
        {/* zona de touchdown */}
        <div className="absolute right-0 top-0 h-full w-[8%] bg-red-600/70" />
        {/* balón según yardas */}
        <div className="absolute top-1/2 -translate-y-1/2 text-2xl transition-all duration-700" style={{ left: `calc(${Math.min(yards, 94)}% - 10px)` }}>
          🏈
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-emerald-300">
        Sube materiales, domina temas y gana quizzes para avanzar yardas. ¡Cada 100 yardas = TOUCHDOWN! 🏆
      </p>
    </div>
  );
}
