import { useRef, useState } from 'react';
import type { Material, MaterialKind } from '@/types';
import { useStore } from '@/lib/store';
import { saveFile, getFile } from '@/lib/db';

const KIND_META: Record<MaterialKind, { emoji: string; label: string }> = {
  pdf: { emoji: '📄', label: 'PDF' },
  image: { emoji: '🖼️', label: 'Imagen / foto de cuaderno' },
  audio: { emoji: '🎧', label: 'Audio' },
  video: { emoji: '🎬', label: 'Video' },
  link: { emoji: '🔗', label: 'Link / fuente' },
  note: { emoji: '📝', label: 'Nota rápida' },
};

function kindFromFile(f: File): MaterialKind {
  if (f.type === 'application/pdf') return 'pdf';
  if (f.type.startsWith('image/')) return 'image';
  if (f.type.startsWith('audio/')) return 'audio';
  if (f.type.startsWith('video/')) return 'video';
  return 'pdf';
}

export default function MaterialUploader({ subjectId, trimesterId, parcialId }: {
  subjectId: string; trimesterId: string; parcialId: string;
}) {
  const { state, addMaterial, removeMaterial, awardYards, registerPlay } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [note, setNote] = useState('');
  const [openViewer, setOpenViewer] = useState<string | null>(null);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const materials = state.materialsMeta.filter(m => m.parcialId === parcialId && m.subjectId === subjectId);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    for (const f of Array.from(files)) {
      const id = `mat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      await saveFile(id, f);
      addMaterial({
        id, subjectId, trimesterId, parcialId,
        kind: kindFromFile(f), title: f.name, fileName: f.name, mime: f.type, size: f.size, createdAt: Date.now(),
      });
      awardYards(5);
      registerPlay();
    }
  };

  const addLink = () => {
    if (!linkUrl.trim()) return;
    addMaterial({
      id: `mat-${Date.now()}`, subjectId, trimesterId, parcialId, kind: 'link',
      title: linkTitle.trim() || linkUrl, url: linkUrl.trim(), createdAt: Date.now(),
    });
    setLinkUrl(''); setLinkTitle('');
    awardYards(3); registerPlay();
  };

  const addNote = () => {
    if (!note.trim()) return;
    addMaterial({
      id: `mat-${Date.now()}`, subjectId, trimesterId, parcialId, kind: 'note',
      title: note.trim().slice(0, 60), note: note.trim(), createdAt: Date.now(),
    });
    setNote('');
    awardYards(3); registerPlay();
  };

  const viewFile = async (m: Material) => {
    if (m.kind === 'link') { window.open(m.url, '_blank'); return; }
    if (m.kind === 'note') { setOpenViewer(m.id); setViewerUrl(null); return; }
    const blob = await getFile(m.id);
    if (blob) {
      setViewerUrl(URL.createObjectURL(blob));
      setOpenViewer(m.id);
    }
  };

  const viewing = materials.find(m => m.id === openViewer);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <h4 className="mb-3 font-black text-white">📦 Material de estudio</h4>

      {/* zona drag & drop */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        className={`mb-3 cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition ${
          dragOver ? 'border-yellow-400 bg-yellow-400/10' : 'border-emerald-500/40 bg-emerald-950/30 hover:border-emerald-400'}`}>
        <p className="text-2xl">📸📄🎧🎬</p>
        <p className="text-sm font-semibold text-emerald-200">Arrastra aquí PDFs, fotos de cuaderno, audios o videos</p>
        <p className="text-xs text-slate-400">o haz clic para elegir archivos (+5 yardas c/u)</p>
        <input ref={fileRef} type="file" multiple className="hidden"
          accept=".pdf,image/*,audio/*,video/*"
          onChange={e => { handleFiles(e.target.files); e.target.value = ''; }} />
      </div>

      {/* link */}
      <div className="mb-2 flex flex-col gap-2 sm:flex-row">
        <input value={linkTitle} onChange={e => setLinkTitle(e.target.value)} placeholder="Título del link (opcional)"
          className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500" />
        <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://…"
          className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500" />
        <button onClick={addLink} className="shrink-0 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-bold text-white hover:bg-cyan-500">🔗 Agregar</button>
      </div>

      {/* nota */}
      <div className="mb-3 flex gap-2">
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Nota rápida: idea clave, duda, fórmula…"
          className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500"
          onKeyDown={e => e.key === 'Enter' && addNote()} />
        <button onClick={addNote} className="shrink-0 rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white hover:bg-purple-500">📝 Nota</button>
      </div>

      {/* lista */}
      {materials.length === 0 ? (
        <p className="py-2 text-center text-xs text-slate-500">Aún no hay material en este parcial. ¡Sube el primero y gana yardas!</p>
      ) : (
        <ul className="space-y-1.5">
          {materials.map(m => (
            <li key={m.id} className="flex items-center gap-2 rounded-lg bg-slate-800/70 px-3 py-2 text-sm">
              <span>{KIND_META[m.kind].emoji}</span>
              <button onClick={() => viewFile(m)} className="flex-1 truncate text-left text-slate-200 hover:text-white hover:underline">
                {m.title}
              </button>
              <span className="hidden text-[10px] text-slate-500 sm:inline">{new Date(m.createdAt).toLocaleDateString('es-MX')}</span>
              <button onClick={() => removeMaterial(m.id)} className="text-slate-500 hover:text-red-400" title="Eliminar">🗑️</button>
            </li>
          ))}
        </ul>
      )}

      {/* visor */}
      {openViewer && viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => { setOpenViewer(null); setViewerUrl(null); }}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-slate-900 p-4" onClick={e => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-bold text-white">{KIND_META[viewing.kind].emoji} {viewing.title}</h4>
              <button onClick={() => { setOpenViewer(null); setViewerUrl(null); }} className="rounded-lg bg-slate-800 px-3 py-1 text-white">✕</button>
            </div>
            {viewing.kind === 'note' && <p className="whitespace-pre-wrap text-slate-200">{viewing.note}</p>}
            {viewerUrl && viewing.kind === 'image' && <img src={viewerUrl} alt={viewing.title} className="w-full rounded-lg" />}
            {viewerUrl && viewing.kind === 'pdf' && <iframe src={viewerUrl} title={viewing.title} className="h-[70vh] w-full rounded-lg bg-white" />}
            {viewerUrl && viewing.kind === 'audio' && <audio src={viewerUrl} controls className="w-full" />}
            {viewerUrl && viewing.kind === 'video' && <video src={viewerUrl} controls className="w-full rounded-lg" />}
          </div>
        </div>
      )}
    </div>
  );
}
