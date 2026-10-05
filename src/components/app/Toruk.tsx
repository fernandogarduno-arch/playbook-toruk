// Toruk — el pug coach. SVG animado con estados de ánimo.
export type TorukMood = 'happy' | 'excited' | 'thinking' | 'celebrating';

const speech: Record<TorukMood, string> = {
  happy: '¡Woof! ¿Qué jugada hacemos hoy?',
  excited: '¡VAMOS! ¡Esto está por ponerse bueno!',
  thinking: 'Hmm… veamos el playbook…',
  celebrating: '¡TOUCHDOWN! ¡Lo lograste! 🎉',
};

export default function Toruk({ mood = 'happy', size = 96, showBubble = false, customLine }: {
  mood?: TorukMood; size?: number; showBubble?: boolean; customLine?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 120 120" className={mood === 'celebrating' ? 'animate-bounce' : ''} aria-label="Toruk el pug">
        {/* cuerpo */}
        <ellipse cx="60" cy="88" rx="34" ry="26" fill="#c9a06c" />
        {/* cabeza */}
        <circle cx="60" cy="48" r="34" fill="#d4ad76" />
        {/* orejas */}
        <ellipse cx="30" cy="28" rx="10" ry="14" fill="#4a3728" transform="rotate(-20 30 28)" />
        <ellipse cx="90" cy="28" rx="10" ry="14" fill="#4a3728" transform="rotate(20 90 28)" />
        {/* hocico */}
        <ellipse cx="60" cy="58" rx="16" ry="12" fill="#8a6b4d" />
        <ellipse cx="60" cy="54" rx="7" ry="5" fill="#2d2018" />
        {/* lengua si celebra */}
        {mood === 'celebrating' && <ellipse cx="60" cy="68" rx="5" ry="8" fill="#f472b6" />}
        {/* ojos */}
        {mood === 'thinking' ? (
          <>
            <circle cx="46" cy="42" r="6" fill="#fff" /><circle cx="47" cy="40" r="3" fill="#2d2018" />
            <circle cx="74" cy="42" r="6" fill="#fff" /><circle cx="75" cy="40" r="3" fill="#2d2018" />
          </>
        ) : (
          <>
            <circle cx="46" cy="42" r="6" fill="#fff" /><circle cx="46" cy="43" r="3.2" fill="#2d2018" />
            <circle cx="74" cy="42" r="6" fill="#fff" /><circle cx="74" cy="43" r="3.2" fill="#2d2018" />
          </>
        )}
        {/* brillo de ojos */}
        <circle cx="44" cy="41" r="1.5" fill="#fff" /><circle cx="72" cy="41" r="1.5" fill="#fff" />
        {/* jersey de football */}
        <path d="M32 78 Q60 66 88 78 L88 96 Q60 108 32 96 Z" fill="#166534" />
        <text x="60" y="94" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">12</text>
        {/* arrugas del pug */}
        <path d="M42 32 Q48 28 54 31" stroke="#b08b5e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M66 31 Q72 28 78 32" stroke="#b08b5e" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* colita enroscada */}
        <circle cx="92" cy="86" r="8" fill="none" stroke="#c9a06c" strokeWidth="6" />
      </svg>
      {showBubble && (
        <div className="relative max-w-[220px] rounded-2xl rounded-bl-sm border border-emerald-400/40 bg-emerald-950/90 px-3 py-2 text-sm text-emerald-100 shadow-lg">
          {customLine ?? speech[mood]}
        </div>
      )}
    </div>
  );
}
