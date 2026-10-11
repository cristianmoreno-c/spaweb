// Imágenes del sitio. Las de abajo son las ORIGINALES (por defecto).
// Desde el panel (/admin > Imágenes) se pueden reemplazar sin tocar código; si se restaura, vuelve la original.
export type ImgSlot = { key: string; group: string; label: string; def: string; alt: string; ratio: string; hint: string };
const p = (n: string) => `/images/${n}.webp`;
const V = 'Vertical (4:5), mínimo 1000×1250 px';
const H = 'Horizontal (4:3), mínimo 1200×900 px';
export const IMG_SLOTS: ImgSlot[] = [
  { key: 'hero', group: 'Portadas', label: 'Portada de inicio', def: p('tratamiento-facial'), alt: 'Tratamiento facial en Lumina', ratio: '4/5', hint: V },
  { key: 'cat_facial', group: 'Portadas', label: 'Portada de Tratamientos faciales', def: p('tratamiento-facial'), alt: 'Tratamiento facial', ratio: '4/5', hint: V },
  { key: 'cat_corporal', group: 'Portadas', label: 'Portada de Tratamientos corporales', def: p('maderoterapia'), alt: 'Maderoterapia en tratamiento', ratio: '4/5', hint: V },
  { key: 'reception', group: 'Secciones', label: 'Sección "Detrás de Lumina"', def: p('logo-recepcion'), alt: 'Recepción de Lumina Skin & Body Spa', ratio: '4/5', hint: V },
  { key: 'mariana', group: 'Secciones', label: 'Retrato de Mariana (Sobre Mariana)', def: p('mariana'), alt: 'Mariana Vaca', ratio: '4/5', hint: V },
  { key: 'gallery_1', group: 'Galería (6 espacios)', label: 'Galería 1 · grande izquierda', def: p('cabina'), alt: 'Cabina de tratamientos', ratio: '4/3', hint: H },
  { key: 'gallery_2', group: 'Galería (6 espacios)', label: 'Galería 2', def: p('sala-espera'), alt: 'Sala de espera', ratio: '4/3', hint: H },
  { key: 'gallery_3', group: 'Galería (6 espacios)', label: 'Galería 3', def: p('productos'), alt: 'Productos de cuidado', ratio: '4/3', hint: H },
  { key: 'gallery_4', group: 'Galería (6 espacios)', label: 'Galería 4', def: p('masaje-corporal'), alt: 'Masaje corporal', ratio: '4/3', hint: H },
  { key: 'gallery_5', group: 'Galería (6 espacios)', label: 'Galería 5', def: p('maderoterapia'), alt: 'Maderoterapia en tratamiento', ratio: '4/3', hint: H },
  { key: 'gallery_6', group: 'Galería (6 espacios)', label: 'Galería 6 · ancha inferior', def: p('herramientas'), alt: 'Herramientas de maderoterapia', ratio: '4/3', hint: H },
  { key: 'logo_mark', group: 'Logo', label: 'Monograma del logo (encabezado y pie)', def: '/images/logo-mark.png', alt: '', ratio: '5/6', hint: 'PNG con fondo transparente. Cambiarlo altera el logo del sitio.' },
];
export const IMG_DEFAULTS: Record<string, string> = Object.fromEntries(IMG_SLOTS.map((s) => [s.key, s.def]));
export const IMG_DEFAULT_ALTS: Record<string, string> = Object.fromEntries(IMG_SLOTS.map((s) => [s.key, s.alt]));
export const GALLERY_KEYS = ['gallery_1', 'gallery_2', 'gallery_3', 'gallery_4', 'gallery_5', 'gallery_6'];
// Foto de respaldo por tratamiento (se usa si el tratamiento no tiene foto propia)
export const TREATMENT_FALLBACK: Record<string, string> = {
  'limpieza-facial-profunda': p('tratamiento-facial'), 'hidratacion-intensiva': p('productos'), 'peeling-quimico': p('tratamiento-facial'),
  'tratamiento-antiage': p('productos'), 'rejuvenecimiento': p('tratamiento-facial'), 'masajes-reductores': p('maderoterapia'),
  'maderoterapia': p('herramientas'), 'drenaje-linfatico': p('masaje-corporal'), 'reafirmacion-corporal': p('masaje-corporal'),
  'masajes-de-relajacion': p('cabina'),
};
export const TREATMENT_DEFAULT_IMG = p('tratamiento-facial');
