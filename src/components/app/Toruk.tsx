// Toruk — el pug coach. Logo oficial (imagen) con estados de ánimo.
export type TorukMood = 'happy' | 'excited' | 'thinking' | 'celebrating';

const speech: Record<TorukMood, string> = {
  happy: '¡Woof! ¿Qué jugada hacemos hoy?',
  excited: '¡VAMOS! ¡Esto está por ponerse bueno!',
  thinking: 'Hmm… veamos el playbook…',
  celebrating: '¡TOUCHDOWN! ¡Lo lograste! 🎉',
};

const moodFx: Record<TorukMood, string> = {
  happy: 'drop-shadow-[0_4px_12px_rgba(16,185,129,0.35)]',
  excited: 'drop-shadow-[0_4px_16px_rgba(250,204,21,0.5)] scale-105',
  thinking: 'drop-shadow-[0_4px_12px_rgba(6,182,212,0.4)] saturate-90',
  celebrating: 'animate-bounce drop-shadow-[0_6px_20px_rgba(250,204,21,0.6)]',
};

export default function Toruk({ mood = 'happy', size = 96, showBubble = false, customLine }: {
  mood?: TorukMood; size?: number; showBubble?: boolean; customLine?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={`${import.meta.env.BASE_URL}toruk.png`}
        alt="Toruk, el pug coach"
        width={size}
        height={size}
        className={`rounded-full object-cover transition-transform duration-300 ${moodFx[mood]}`}
        style={{ width: size, height: size }}
      />
      {showBubble && (
        <div className="relative max-w-[220px] rounded-2xl rounded-bl-sm border border-emerald-400/40 bg-emerald-950/90 px-3 py-2 text-sm text-emerald-100 shadow-lg">
          {customLine ?? speech[mood]}
        </div>
      )}
    </div>
  );
}
