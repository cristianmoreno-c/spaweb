// Fotos del sitio. Para cambiar una: copia el archivo a public/images/ y cambia la ruta aquí.
const p = (n: string) => `/images/${n}.webp`;
export const IMG = {
  hero: p('tratamiento-facial'),
  reception: p('logo-recepcion'),
  mariana: '/images/mariana.webp', // pendiente: retrato real de Mariana
  cat: { facial: p('tratamiento-facial'), corporal: p('maderoterapia') },
  // orden de la galería (coincide con el diseño editorial)
  gallery: [p('cabina'), p('sala-espera'), p('productos'), p('masaje-corporal'), p('maderoterapia'), p('herramientas')],
  treatments: {
    'limpieza-facial-profunda': p('tratamiento-facial'), 'hidratacion-intensiva': p('productos'), 'peeling-quimico': p('tratamiento-facial'),
    'tratamiento-antiage': p('productos'), 'rejuvenecimiento': p('tratamiento-facial'), 'masajes-reductores': p('maderoterapia'),
    'maderoterapia': p('herramientas'), 'drenaje-linfatico': p('masaje-corporal'), 'reafirmacion-corporal': p('masaje-corporal'),
    'masajes-de-relajacion': p('cabina'),
  } as Record<string, string>,
};
export const GALLERY_ALTS = ['Cabina de tratamientos', 'Sala de espera', 'Productos de cuidado', 'Masaje corporal', 'Maderoterapia en tratamiento', 'Herramientas de maderoterapia'];
