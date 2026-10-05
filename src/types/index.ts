export interface Topic {
  id: string;
  title: string;
  official?: boolean; // contenido base precargado (orientativo, editable)
  done: boolean;
}

export interface Parcial {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Trimester {
  id: string;
  name: string;
  seasonLabel: string; // metáfora deportiva
  parciales: Parcial[];
}

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind gradient classes
  accent: string; // hex
  stadium: string; // nombre de su "estadio"
  coachTip: string; // consejo psicopedagógico de Toruk
  campo: string; // campo formativo NEM
}

export type MaterialKind = 'pdf' | 'image' | 'audio' | 'video' | 'link' | 'note';

export interface Material {
  id: string;
  subjectId: string;
  trimesterId: string;
  parcialId: string;
  kind: MaterialKind;
  title: string;
  url?: string; // para links
  note?: string; // para notas
  fileName?: string;
  mime?: string;
  size?: number;
  createdAt: number;
}

export interface Task {
  id: string;
  subjectId: string;
  title: string;
  dueDate?: string;
  done: boolean;
  createdAt: number;
}

export interface QuizQuestion {
  subjectId: string;
  q: string;
  options: string[];
  answer: number; // índice correcto
  explain?: string;
}

export interface GameProfile {
  xp: number;
  yards: number; // 0-100, al llegar a 100 = touchdown
  touchdowns: number;
  streak: number;
  lastPlayDay: string; // ISO date
  badges: string[];
}

export interface AppState {
  topicsDone: Record<string, boolean>; // topicId -> done
  customTopics: Topic[]; // temas agregados por el usuario
  tasks: Task[];
  profile: GameProfile;
  materialsMeta: Material[]; // metadatos (blobs en IndexedDB)
  removedTopicIds: string[]; // temas base ocultados
}
