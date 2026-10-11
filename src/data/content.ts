// Textos del sitio. Estos son los valores ORIGINALES; desde /admin > Textos se pueden cambiar.
export type TextField = { key: string; group: string; label: string; def: string; multiline?: boolean; help?: string };
export const TEXT_FIELDS: TextField[] = [
  { key: 'hero_label', group: 'Inicio · portada', label: 'Texto pequeño superior', def: 'Atención personalizada por Mariana Vaca' },
  { key: 'hero_title', group: 'Inicio · portada', label: 'Título principal', def: 'Piel radiante y un cuerpo *en armonía.*', help: 'Lo que va entre *asteriscos* se muestra en cursiva color cobre.' },
  { key: 'hero_lead', group: 'Inicio · portada', label: 'Descripción', multiline: true, def: 'Tratamientos faciales y corporales personalizados para cuidar tu piel, realzar tu belleza y regalarte un momento de bienestar en Santa Cruz.' },
  { key: 'trust_items', group: 'Inicio · franja de confianza', label: 'Frases de la franja', multiline: true, help: 'Una frase por línea.', def: 'Atención personalizada\nEspecialista en cosmetología\nEspacio privado\nLunes a sábado · 09:00–18:00' },
  { key: 'home_about_1', group: 'Inicio · Detrás de Lumina', label: 'Párrafo 1', multiline: true, def: 'En Lumina Skin & Body Spa creemos que cada piel y cada cuerpo tienen necesidades diferentes. Por eso, cada experiencia comienza escuchándote, entendiendo tus necesidades y seleccionando un protocolo de cuidado adaptado a ti.' },
  { key: 'home_about_2', group: 'Inicio · Detrás de Lumina', label: 'Párrafo 2', multiline: true, def: 'Detrás de Lumina está Mariana Vaca, especialista en cosmetología, acompañando personalmente una experiencia donde el cuidado, la atención y el bienestar ocupan el centro.' },
  { key: 'home_quote', group: 'Inicio · Detrás de Lumina', label: 'Frase destacada', multiline: true, def: 'No vienes simplemente a realizarte un tratamiento. Vienes a regalarte un momento de cuidado personalizado.' },
  { key: 'price_from', group: 'Precios', label: 'Precio base "Desde Bs …" (solo el número)', def: '150', help: 'Se usa en la carta de tratamientos y páginas de categoría. Cada tratamiento puede tener su propio precio.' },
  { key: 'intro_facial', group: 'Páginas de tratamientos', label: 'Introducción · Tratamientos faciales', multiline: true, def: 'Cuidado facial personalizado para tu tipo de piel, con la atención cercana de Mariana Vaca.' },
  { key: 'intro_corporal', group: 'Páginas de tratamientos', label: 'Introducción · Tratamientos corporales', multiline: true, def: 'Masajes y cuidado corporal pensados para tu bienestar, en un ambiente privado y elegante.' },
  { key: 'about_story', group: 'Sobre Mariana', label: 'Historia', multiline: true, def: '[BIOGRAFIA_MARIANA]' },
  { key: 'about_philosophy', group: 'Sobre Mariana', label: 'Filosofía', multiline: true, def: 'Cada piel y cada cuerpo tienen necesidades diferentes: por eso cada experiencia comienza escuchándote.' },
  { key: 'about_training', group: 'Sobre Mariana', label: 'Formación', multiline: true, def: '[FORMACION_MARIANA] · [CERTIFICACIONES]' },
  { key: 'about_experience', group: 'Sobre Mariana', label: 'Experiencia', multiline: true, def: '[EXPERIENCIA_PROFESIONAL]' },
  { key: 'about_approach', group: 'Sobre Mariana', label: 'Enfoque personalizado', multiline: true, def: 'Protocolos adaptados a ti, en un ambiente privado y cercano.' },
];
export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(TEXT_FIELDS.map((f) => [f.key, f.def]));
export const FAQ_DEFAULTS: { id: string; question: string; answer: string }[] = [
  ['¿Cuánto cuestan los tratamientos?', 'Los tratamientos parten desde Bs 150. Escríbele a Mariana por WhatsApp para conocer el precio del tuyo.'],
  ['¿Cómo agendo mi cita?', 'Por WhatsApp o con el formulario de contacto. Una solicitud no es una reserva hasta que Mariana la confirme.'],
  ['¿Cómo sé qué tratamiento es para mí?', 'Puedes reservar una valoración: Mariana te escucha y te orienta según tus necesidades.'],
  ['¿Dónde están y cuál es el horario?', 'Barrio Estación Argentina, Calle San Rafael #71. Atendemos de lunes a sábado de 09:00 a 18:00.'],
].map(([question, answer], i) => ({ id: `d${i}`, question, answer }));
