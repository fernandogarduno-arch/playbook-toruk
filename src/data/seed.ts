import type { Subject, Trimester, QuizQuestion } from '@/types';

// ============================================================
// LAS 11 MATERIAS — cada una es un "estadio" del Playbook
// ============================================================
export const SUBJECTS: Subject[] = [
  {
    id: 'espanol', name: 'Español', emoji: '📖', accent: '#f43f5e',
    color: 'from-rose-500 to-red-600', stadium: 'Estadio de las Letras',
    campo: 'Lenguajes',
    coachTip: 'Lee 10 minutos en voz alta como si fueras el narrador del partido. Leer en voz alta ancla la atención.',
  },
  {
    id: 'historia', name: 'Historia', emoji: '🏛️', accent: '#f59e0b',
    color: 'from-amber-500 to-orange-600', stadium: 'Coliseo del Tiempo',
    campo: 'Ética, Naturaleza y Sociedades',
    coachTip: 'Imagina cada época como una temporada de tu equipo: quiénes jugaban, qué se jugaban, quién ganó y por qué.',
  },
  {
    id: 'matematicas', name: 'Matemáticas', emoji: '🧮', accent: '#3b82f6',
    color: 'from-blue-500 to-indigo-600', stadium: 'Arena de los Números',
    campo: 'Saberes y Pensamiento Científico',
    coachTip: 'Cada problema es una jugada: lee el planteamiento como el playbook, ejecuta paso a paso y celebra el touchdown.',
  },
  {
    id: 'arte', name: 'Arte', emoji: '🎨', accent: '#a855f7',
    color: 'from-purple-500 to-fuchsia-600', stadium: 'Galería Central',
    campo: 'Artes y Experiencias Estéticas',
    coachTip: 'Crea sin miedo: en el arte no hay intercepciones, solo jugadas que no salieron como esperabas.',
  },
  {
    id: 'ingles', name: 'Inglés', emoji: '🌍', accent: '#22c55e',
    color: 'from-green-500 to-emerald-600', stadium: 'International Bowl',
    campo: 'Lenguajes',
    coachTip: 'Piensa en inglés mientras juegas o ves videos: 5 minutos diarios valen más que 1 hora el fin de semana.',
  },
  {
    id: 'fce', name: 'Formación Cívica y Ética', emoji: '⚖️', accent: '#eab308',
    color: 'from-yellow-500 to-amber-600', stadium: 'Foro de los Valores',
    campo: 'Ética, Naturaleza y Sociedades',
    coachTip: 'Aquí entrenas para ser el capitán justo: debate, escucha y defiende tus ideas con argumentos, no con gritos.',
  },
  {
    id: 'fisica', name: 'Física', emoji: '⚡', accent: '#06b6d4',
    color: 'from-cyan-500 to-sky-600', stadium: 'Laboratorio Estelar',
    campo: 'Saberes y Pensamiento Científico',
    coachTip: 'La física está en todo: el pase perfecto de football es un proyectil, tu perrito corriendo es energía cinética.',
  },
  {
    id: 'informatica', name: 'Informática', emoji: '💻', accent: '#64748b',
    color: 'from-slate-500 to-gray-600', stadium: 'Ciber Arena',
    campo: 'Saberes y Pensamiento Científico / Tecnología',
    coachTip: 'Programar es como Minecraft: construyes mundo por mundo, bloque por bloque. Debuggear es parte del juego.',
  },
  {
    id: 'tutoria', name: 'Tutoría', emoji: '🧭', accent: '#14b8a6',
    color: 'from-teal-500 to-cyan-600', stadium: 'Vestidor del Equipo',
    campo: 'Desarrollo personal y convivencia',
    coachTip: 'Este es tu tiempo de vestidor: revisa cómo vas, qué te preocupa y arma tu estrategia para la semana.',
  },
  {
    id: 'musica', name: 'Música', emoji: '🎵', accent: '#ec4899',
    color: 'from-pink-500 to-rose-600', stadium: 'Anfiteatro del Ritmo',
    campo: 'Artes y Experiencias Estéticas',
    coachTip: 'La música entrena tu oído y tu memoria: canta las tablas, rapea la historia, haz beats con las fórmulas.',
  },
  {
    id: 'edfisica', name: 'Educación Física', emoji: '🏈', accent: '#ef4444',
    color: 'from-red-500 to-orange-600', stadium: 'Toruk Stadium',
    campo: 'Actividad física y salud',
    coachTip: 'El cuerpo es tu jugador estrella: hidrátalo, muévelo y descansa. Un atleta duerme 9 horas.',
  },
];

// ============================================================
// TRIMESTRES Y PARCIALES — la "temporada regular"
// ============================================================
export const TRIMESTERS: Trimester[] = [
  {
    id: 't1', name: 'Trimestre 1', seasonLabel: 'Temporada: Arranque (ago–nov)',
    parciales: [
      { id: 't1p1', name: 'Parcial 1', topics: [] },
      { id: 't1p2', name: 'Parcial 2 (Examen Trimestral)', topics: [] },
    ],
  },
  {
    id: 't2', name: 'Trimestre 2', seasonLabel: 'Temporada: Media (nov–feb)',
    parciales: [
      { id: 't2p1', name: 'Parcial 1', topics: [] },
      { id: 't2p2', name: 'Parcial 2 (Examen Trimestral)', topics: [] },
    ],
  },
  {
    id: 't3', name: 'Trimestre 3', seasonLabel: 'Temporada: Cierre (mar–jun)',
    parciales: [
      { id: 't3p1', name: 'Parcial 1', topics: [] },
      { id: 't3p2', name: 'Parcial 2 (Examen Final)', topics: [] },
    ],
  },
];

// ============================================================
// CONTENIDO BASE PRECARGADO (orientativo, 2° secundaria,
// alineado a campos formativos del Plan 2022 / NEM).
// ⚠️ Es editable dentro del portal: ajusta con los programas
// y planeaciones reales del Colegio Rogers.
// ============================================================
export const SEED_TOPICS: Record<string, Record<string, string[]>> = {
  espanol: {
    t1p1: ['La narrativa: novela y cuento (estructura, narrador, personajes)', 'Textos expositivos y fuentes de consulta', 'Gramática: tiempos verbales y modos', 'Ortografía: uso de la g, j, s, c, z'],
    t1p2: ['La poesía: verso, rima, ritmo y figuras retóricas', 'El texto argumentativo: tesis y argumentos', 'Repaso trimestral y examen'],
    t2p1: ['El teatro: guion, actos, escenas y acotaciones', 'Periodismo: noticia, reportaje, entrevista y crónica', 'Gramática: concordancia y modificadores'],
    t2p2: ['El ensayo: estructura y elaboración', 'Medios digitales y lenguaje audiovisual', 'Repaso trimestral y examen'],
    t3p1: ['Literatura prehispánica y del siglo XIX (México)', 'Textos científicos y divulgación', 'Gramática: oraciones compuestas'],
    t3p2: ['Proyecto final de escritura creativa', 'Repaso general del año y examen final'],
  },
  historia: {
    t1p1: ['El siglo XIX: Independencia de México y construcción del Estado', 'Primeros gobiernos y lucha entre federalistas y centralistas', 'Intervenciones extranjeras en México'],
    t1p2: ['La Guerra de Reforma y las Leyes de Reforma', 'La Intervención Francesa y el Segundo Imperio', 'Repaso trimestral y examen'],
    t2p1: ['La República Restaurada', 'El Porfiriato: orden, progreso y desigualdad', 'Imperialismo y reparto del mundo en el siglo XIX'],
    t2p2: ['La Revolución Mexicana: causas y etapas', 'La Constitución de 1917', 'Repaso trimestral y examen'],
    t3p1: ['El México posrevolucionario: reconstrucción del país', 'El siglo XX en el mundo: guerras mundiales (contexto)', 'Caudillos y partidos en América Latina'],
    t3p2: ['México contemporáneo y globalización', 'Repaso general del año y examen final'],
  },
  matematicas: {
    t1p1: ['Multiplicación y división de fracciones y decimales', 'Problemas de proporcionalidad directa e inversa', 'Porcentaje y regla de tres', 'Potencias y notación científica'],
    t1p2: ['Expresiones algebraicas y lenguaje algebraico', 'Ecuaciones lineales de primer grado', 'Repaso trimestral y examen'],
    t2p1: ['Sistemas de ecuaciones 2x2 (métodos de solución)', 'Figuras geométricas: ángulos y triángulos', 'Teorema de Pitágoras'],
    t2p2: ['Congruencia y semejanza de triángulos', 'Polígonos: perímetros y áreas', 'Repaso trimestral y examen'],
    t3p1: ['Volumen de prismas y pirámides', 'Funciones y proporcionalidad (gráficas)', 'Estadística: media, mediana, moda y rango'],
    t3p2: ['Probabilidad: experimentos aleatorios', 'Repaso general del año y examen final'],
  },
  arte: {
    t1p1: ['Elementos del arte: línea, color, forma y textura', 'Arte del siglo XIX: romanticismo y costumbrismo', 'Técnicas de dibujo y composición'],
    t1p2: ['Arte mexicano: muralismo y sus protagonistas', 'Apreciación y crítica de obra', 'Repaso y exposición trimestral'],
    t2p1: ['Teatro y artes escénicas: puesta en escena', 'Cine y lenguaje audiovisual: planos y encuadres'],
    t2p2: ['Música y arte sonoro', 'Proyecto escénico o audiovisual del trimestre'],
    t3p1: ['Arte contemporáneo y arte urbano', 'Diseño, publicidad y medios digitales'],
    t3p2: ['Portafolio final de artes', 'Exposición de cierre de ciclo'],
  },
  ingles: {
    t1p1: ['Present simple vs. present continuous', 'Past simple: verbos regulares e irregulares', 'Vocabulario: school, hobbies, daily routines', 'Reading: short stories and articles'],
    t1p2: ['Comparatives and superlatives', 'Future: will / going to', 'Review and trimester exam'],
    t2p1: ['Past continuous and storytelling', 'Modal verbs: must, should, can, could', 'Vocabulary: travel, health, technology'],
    t2p2: ['Present perfect (introduction)', 'Writing: emails, reviews, short essays', 'Review and trimester exam'],
    t3p1: ['Passive voice (introduction)', 'Conditionals: zero and first', 'Speaking: presentations and debates'],
    t3p2: ['Reported speech (basics)', 'Final project and year review'],
  },
  fce: {
    t1p1: ['Identidad personal y adolescente: quién soy', 'Emociones: reconocerlas y regularlas', 'Derechos humanos y derechos de la niñez'],
    t1p2: ['Diversidad cultural y rechazo a la discriminación', 'La familia y los vínculos afectivos', 'Repaso trimestral y examen'],
    t2p1: ['Convivencia escolar y prevención del bullying', 'Toma de decisiones y consecuencias', 'Uso responsable de redes sociales'],
    t2p2: ['Equidad de género y relaciones respetuosas', 'Salud integral: adicciones y prevención', 'Repaso trimestral y examen'],
    t3p1: ['Participación ciudadana y democracia', 'Medio ambiente y consumo responsable', 'Proyecto comunitario'],
    t3p2: ['Proyecto de vida: metas y decisiones', 'Repaso general y examen final'],
  },
  fisica: {
    t1p1: ['El movimiento: marco de referencia, trayectoria y distancia', 'Rapidez, velocidad y aceleración', 'Gráficas de movimiento'],
    t1p2: ['Caída libre y movimiento de proyectiles', 'Las fuerzas y las Leyes de Newton', 'Repaso trimestral y examen'],
    t2p1: ['Energía: cinética, potencial y conservación', 'Trabajo y potencia mecánica', 'Máquinas simples'],
    t2p2: ['Calor y temperatura', 'Formas de propagación del calor', 'Repaso trimestral y examen'],
    t3p1: ['Las ondas y el sonido', 'La luz: reflexión, refracción y espectro', 'Electricidad básica'],
    t3p2: ['Imanes y electromagnetismo', 'Repaso general del año y examen final'],
  },
  informatica: {
    t1p1: ['Seguridad digital: contraseñas, phishing y privacidad', 'Organización de archivos y nube', 'Procesador de textos avanzado'],
    t1p2: ['Hojas de cálculo: fórmulas y gráficas', 'Presentaciones efectivas', 'Repaso trimestral y proyecto'],
    t2p1: ['Pensamiento computacional y algoritmos', 'Programación por bloques (Scratch)', 'Variables, condicionales y ciclos'],
    t2p2: ['Proyecto de videojuego en bloques', 'Introducción a HTML y páginas web'],
    t3p1: ['Robótica y sensores (fundamentos)', 'Inteligencia artificial: qué es y uso responsable'],
    t3p2: ['Proyecto final digital', 'Repaso general y cierre'],
  },
  tutoria: {
    t1p1: ['Adaptación y organización del ciclo escolar', 'Técnicas de estudio: horarios y hábitos', 'Autoconocimiento: fortalezas y áreas de mejora'],
    t1p2: ['Manejo del estrés en exámenes', 'Evaluación del trimestre y metas'],
    t2p1: ['Comunicación asertiva', 'Trabajo en equipo y resolución de conflictos'],
    t2p2: ['Proyecto de vida: intereses y vocaciones', 'Evaluación del trimestre'],
    t3p1: ['Educación socioemocional: empatía y límites', 'Prevención de riesgos'],
    t3p2: ['Balance del año y plan para 3°'],
  },
  musica: {
    t1p1: ['Elementos de la música: ritmo, melodía, armonía', 'Lectura básica: figuras rítmicas y pentagrama', 'Música de México: géneros tradicionales'],
    t1p2: ['Práctica vocal e interpretación grupal', 'Repaso y presentación trimestral'],
    t2p1: ['Música del siglo XIX y XX', 'Instrumentos y familias orquestales'],
    t2p2: ['Composición sencilla y percusión corporal', 'Presentación trimestral'],
    t3p1: ['Música y tecnología: producción básica', 'Apreciación: banda sonora y videojuegos'],
    t3p2: ['Concierto de cierre de ciclo'],
  },
  edfisica: {
    t1p1: ['Condición física: resistencia, fuerza, velocidad y flexibilidad', 'Deportes colectivos: reglas y juego limpio', 'Hábitos de higiene y salud'],
    t1p2: ['Atletismo: carreras y saltos', 'Evaluación trimestral de condición'],
    t2p1: ['Deportes de conjunto: táctica y colaboración', 'Expresión corporal y ritmo'],
    t2p2: ['Natación o deportes alternativos (según instalaciones)', 'Evaluación trimestral'],
    t3p1: ['Juegos tradicionales y deportes autóctonos', 'Primeros auxilios básicos'],
    t3p2: ['Torneo de cierre y evaluación final'],
  },
};

// ============================================================
// BANCOS DE PREGUNTAS — Quiz Relámpago ⚡
// ============================================================
export const QUIZ_BANK: QuizQuestion[] = [
  // Matemáticas
  { subjectId: 'matematicas', q: '¿Cuánto es 3/4 × 2/5?', options: ['6/20 = 3/10', '5/9', '6/9', '3/20'], answer: 0, explain: 'Multiplica numeradores (3×2=6) y denominadores (4×5=20): 6/20 = 3/10.' },
  { subjectId: 'matematicas', q: 'Si x + 7 = 15, ¿cuánto vale x?', options: ['22', '8', '7', '2'], answer: 1, explain: 'x = 15 − 7 = 8.' },
  { subjectId: 'matematicas', q: 'El 25% de 240 es…', options: ['25', '50', '60', '80'], answer: 2, explain: '240 × 0.25 = 60.' },
  { subjectId: 'matematicas', q: 'Un triángulo rectángulo tiene catetos 3 y 4. ¿Cuánto mide la hipotenusa?', options: ['7', '5', '6', '12'], answer: 1, explain: 'Pitágoras: √(3²+4²) = √25 = 5.' },
  { subjectId: 'matematicas', q: '10³ escrito en notación decimal es…', options: ['30', '100', '1000', '10000'], answer: 2, explain: '10³ = 10×10×10 = 1000.' },
  // Historia
  { subjectId: 'historia', q: '¿En qué año se consumó la Independencia de México?', options: ['1810', '1821', '1857', '1910'], answer: 1, explain: 'El 27 de septiembre de 1821 entró el Ejército Trigarante a la Ciudad de México.' },
  { subjectId: 'historia', q: 'Las Leyes de Reforma fueron promovidas principalmente por…', options: ['Porfirio Díaz', 'Benito Juárez', 'Agustín de Iturbide', 'Emiliano Zapata'], answer: 1, explain: 'Juárez y los liberales impulsaron la separación Iglesia-Estado.' },
  { subjectId: 'historia', q: 'La Constitución vigente de México es de…', options: ['1824', '1857', '1917', '1936'], answer: 2, explain: 'Se promulgó el 5 de febrero de 1917, producto de la Revolución.' },
  { subjectId: 'historia', q: 'El Segundo Imperio mexicano fue encabezado por…', options: ['Maximiliano de Habsburgo', 'Santa Anna', 'Napoleón III', 'Francisco I. Madero'], answer: 0, explain: 'Maximiliano gobernó de 1864 a 1867, apoyado por Francia.' },
  { subjectId: 'historia', q: 'El Porfiriato duró aproximadamente…', options: ['10 años', '20 años', '30 años', '50 años'], answer: 2, explain: 'De 1876/1884 a 1911: más de tres décadas de gobierno de Díaz.' },
  // Español
  { subjectId: 'espanol', q: '¿Qué es una metáfora?', options: ['Una comparación usando "como"', 'Una figura que identifica un objeto con otro', 'Exagerar algo', 'Repetir sonidos'], answer: 1, explain: '"Tus ojos son esmeraldas" — la metáfora identifica directamente; el símil usa "como".' },
  { subjectId: 'espanol', q: 'El narrador que cuenta la historia en primera persona se llama…', options: ['Omnisciente', 'Protagonista', 'Testigo', 'Editorial'], answer: 1, explain: 'El narrador protagonista vive la historia que cuenta ("yo").' },
  { subjectId: 'espanol', q: 'Las acotaciones en un guion de teatro sirven para…', options: ['Dar los diálogos', 'Indicar movimientos y escenografía', 'Nombrar al autor', 'Dividir en actos'], answer: 1, explain: 'Van entre paréntesis y orientan la puesta en escena.' },
  { subjectId: 'espanol', q: '¿Cuál es la estructura de una noticia?', options: ['Inicio, nudo, desenlace', 'Entrada, cuerpo, cierre', 'Titular, entrada (lead), cuerpo', 'Planteamiento, clímax, final'], answer: 2, explain: 'La pirámide invertida: lo más importante va primero.' },
  // Inglés
  { subjectId: 'ingles', q: 'Choose the correct option: "She ___ to school every day."', options: ['go', 'goes', 'going', 'went'], answer: 1, explain: 'Present simple, tercera persona: goes.' },
  { subjectId: 'ingles', q: 'What is the past tense of "buy"?', options: ['Buyed', 'Bought', 'Buyied', 'Brought'], answer: 1, explain: '"Buy" es irregular: buy → bought.' },
  { subjectId: 'ingles', q: '"Mount Everest is ___ mountain in the world."', options: ['the taller', 'the tallest', 'taller than', 'most tall'], answer: 1, explain: 'Superlativo: the tallest.' },
  { subjectId: 'ingles', q: '"They ___ football right now."', options: ['play', 'plays', 'are playing', 'played'], answer: 2, explain: '"Right now" indica present continuous: are playing.' },
  // Física
  { subjectId: 'fisica', q: 'La velocidad se calcula como…', options: ['distancia × tiempo', 'distancia / tiempo', 'tiempo / distancia', 'masa × aceleración'], answer: 1, explain: 'v = d/t. Ejemplo: 100 m en 20 s = 5 m/s.' },
  { subjectId: 'fisica', q: 'La Primera Ley de Newton habla de…', options: ['Acción y reacción', 'La inercia', 'Fuerza = masa × aceleración', 'La gravedad'], answer: 1, explain: 'Un objeto mantiene su estado de reposo o movimiento si no actúa una fuerza neta.' },
  { subjectId: 'fisica', q: 'La energía que tiene un objeto por estar en movimiento es…', options: ['Potencial', 'Térmica', 'Cinética', 'Química'], answer: 2, explain: 'Toruk corriendo tras la pelota = energía cinética 🐶.' },
  // FCyE
  { subjectId: 'fce', q: 'Los derechos humanos son…', options: ['Privilegios que da el gobierno', 'Universales, inalienables e interdependientes', 'Solo para adultos', 'Opcionales'], answer: 1, explain: 'Los tenemos todas las personas desde que nacemos.' },
  { subjectId: 'fce', q: 'Si ves bullying en la escuela, lo correcto es…', options: ['Ignorarlo', 'Grabarlo y subirlo', 'Reportarlo y apoyar a la víctima', 'Unirse si es broma'], answer: 2, explain: 'Ser espectador activo rompe el ciclo de violencia.' },
  // Informática
  { subjectId: 'informatica', q: 'Un algoritmo es…', options: ['Un robot', 'Una serie de pasos ordenados para resolver un problema', 'Un lenguaje de programación', 'Un virus'], answer: 1, explain: 'Como una receta o una jugada del playbook: pasos claros y finitos.' },
  { subjectId: 'informatica', q: '¿Qué es el phishing?', options: ['Un videojuego de pesca', 'Un fraude para robar datos haciéndose pasar por alguien confiable', 'Un antivirus', 'Una red social'], answer: 1, explain: 'Nunca des contraseñas en links sospechosos. 🎣🚫' },
];

// ============================================================
// PARES PARA EL JUEGO DE MEMORIA (por materia)
// ============================================================
export const MEMORY_PAIRS: Record<string, [string, string][]> = {
  matematicas: [['x + 5 = 12', 'x = 7'], ['25% de 80', '20'], ['√49', '7'], ['2³', '8'], ['Hipotenusa (3,4,?)', '5'], ['1/2 × 1/2', '1/4']],
  historia: [['1821', 'Independencia de México'], ['1917', 'Constitución actual'], ['Benito Juárez', 'Leyes de Reforma'], ['Maximiliano', 'Segundo Imperio'], ['1910', 'Inicio de la Revolución'], ['Porfirio Díaz', 'El Porfiriato']],
  ingles: [['Dog', 'Perro'], ['Fast', 'Rápido'], ['Bought', 'Pasado de buy'], ['Go →', 'Went'], ['The tallest', 'Superlativo'], ['Right now', 'Present continuous']],
  fisica: [['v = d/t', 'Velocidad'], ['Inercia', '1ª Ley de Newton'], ['Movimiento', 'Energía cinética'], ['Caída libre', 'Gravedad'], ['Calor', 'Energía térmica'], ['Eco', 'Reflexión del sonido']],
  espanol: [['Metáfora', 'Identifica objetos'], ['Símil', 'Compara con "como"'], ['Lead', 'Entrada de noticia'], ['Acotación', 'Indicación escénica'], ['Ensayo', 'Texto argumentativo'], ['Rima', 'Repetición de sonidos']],
  fce: [['Derechos humanos', 'Universales'], ['Bullying', 'Se reporta'], ['Empatía', 'Ponerse en su lugar'], ['Democracia', 'Participación ciudadana'], ['Identidad', 'Quién soy'], ['Resiliencia', 'Levantarse tras caer']],
  informatica: [['Algoritmo', 'Pasos ordenados'], ['Phishing', 'Fraude digital'], ['Variable', 'Guarda datos'], ['HTML', 'Lenguaje de páginas web'], ['Bug', 'Error de código'], ['Nube', 'Archivos en internet']],
};

export const BADGES: Record<string, { name: string; emoji: string; desc: string }> = {
  primerJuego: { name: 'Kickoff', emoji: '🏈', desc: 'Completaste tu primer juego' },
  primerMaterial: { name: 'Scout', emoji: '🔭', desc: 'Subiste tu primer material' },
  primerTouchdown: { name: 'Touchdown!', emoji: '🎉', desc: 'Llegaste a las 100 yardas' },
  racha3: { name: 'Racha x3', emoji: '🔥', desc: '3 días seguidos estudiando' },
  racha7: { name: 'Semana Perfecta', emoji: '💎', desc: '7 días seguidos estudiando' },
  quizPerfecto: { name: 'Pase Perfecto', emoji: '🎯', desc: 'Quiz sin errores' },
  tema10: { name: 'Titular', emoji: '⭐', desc: '10 temas dominados' },
  tema25: { name: 'All-Star', emoji: '🌟', desc: '25 temas dominados' },
};

// ============================================================
// CALENDARIO REAL DE PARCIALES — Colegio Rogers, octubre 2026
// (Tomado del planeador mensual; editable en Dashboard)
// ============================================================
export interface ExamDate {
  subjectId: string;
  date: string; // ISO YYYY-MM-DD
  label: string;
}

export const EXAM_CALENDAR: ExamDate[] = [
  { subjectId: 'ingles', date: '2026-10-05', label: 'Parcial Inglés' },
  { subjectId: 'fisica', date: '2026-10-06', label: 'Parcial Física' },
  { subjectId: 'arte', date: '2026-10-07', label: 'Parcial Arte' },
  { subjectId: 'fce', date: '2026-10-08', label: 'Parcial FCE' },
  { subjectId: 'historia', date: '2026-10-12', label: 'Parcial Historia' },
  { subjectId: 'espanol', date: '2026-10-13', label: 'Parcial Español' },
  { subjectId: 'matematicas', date: '2026-10-14', label: 'Parcial Matemáticas' },
];

export const SPECIAL_DAYS: { date: string; label: string; emoji: string }[] = [
  { date: '2026-10-09', label: 'Excursión 🚌', emoji: '🚌' },
];
