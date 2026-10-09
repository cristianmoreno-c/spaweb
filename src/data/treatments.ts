import type { Treatment } from '../types';
const t = (category: 'facial' | 'corporal', name: string, slug: string, short_description: string, benefits: string[]): Treatment =>
  ({ id: slug, category, name, slug, short_description, benefits });
export const TREATMENTS: Treatment[] = [
  t('facial', 'Limpieza facial profunda', 'limpieza-facial-profunda', 'Un ritual de limpieza adaptado al tipo de tu piel.', ['Protocolo según tu piel', 'Sensación de frescura', 'Atención personalizada']),
  t('facial', 'Hidratación intensiva', 'hidratacion-intensiva', 'Cuidado pensado para aportar hidratación a tu piel.', ['Piel cuidada y confortable', 'Productos seleccionados para ti', 'Momento de pausa']),
  t('facial', 'Peeling químico', 'peeling-quimico', 'Tratamiento cosmético de renovación, indicado tras una valoración.', ['Valoración previa', 'Protocolo adaptado', 'Acompañamiento posterior']),
  t('facial', 'Tratamiento antiage', 'tratamiento-antiage', 'Cuidado facial enfocado en el bienestar de la piel madura.', ['Enfoque personalizado', 'Cuidado integral del rostro', 'Rutina recomendada']),
  t('facial', 'Rejuvenecimiento', 'rejuvenecimiento', 'Protocolo facial para realzar la luminosidad de tu piel.', ['Aspecto cuidado y luminoso', 'Protocolo a tu medida', 'Experiencia relajante']),
  t('corporal', 'Masajes reductores', 'masajes-reductores', 'Masaje corporal enfocado en el cuidado de tu figura.', ['Atención personalizada', 'Técnica adaptada', 'Sensación de ligereza']),
  t('corporal', 'Maderoterapia', 'maderoterapia', 'Masaje corporal con instrumentos de madera.', ['Técnica manual', 'Cuidado corporal', 'Bienestar y relajación']),
  t('corporal', 'Drenaje linfático', 'drenaje-linfatico', 'Masaje suave y rítmico para sentirte más liviana.', ['Movimientos suaves', 'Sensación de descanso', 'Atención cercana']),
  t('corporal', 'Reafirmación corporal', 'reafirmacion-corporal', 'Cuidado corporal para tonificar y cuidar tu piel.', ['Protocolo personalizado', 'Cuidado de la piel del cuerpo', 'Experiencia de bienestar']),
  t('corporal', 'Masajes de relajación', 'masajes-de-relajacion', 'Un espacio para soltar tensión y desconectarte.', ['Ambiente privado', 'Pausa del ritmo diario', 'Bienestar integral']),
];
export const BENEFITS = [
  ['Atención personalizada', 'Cada protocolo parte de las necesidades específicas de tu piel y tu cuerpo.'],
  ['Experiencia profesional', 'Recibe acompañamiento cercano y una atención enfocada en tu bienestar.'],
  ['Cosmetología', 'Una experiencia de cuidado basada en conocimientos de cosmetología.'],
  ['Espacio íntimo', 'Un ambiente privado y elegante para desconectarte del ritmo cotidiano.'],
  ['Protocolos a tu medida', 'No todas las pieles necesitan lo mismo.'],
  ['Bienestar integral', 'Combina cuidado estético, relajación y tiempo para ti.'],
];
export const STEPS = ['Conocemos tus necesidades', 'Definimos tu protocolo', 'Disfrutas tu tratamiento', 'Te acompañamos en tu cuidado'];
export const SOCIALS = [
  ['Instagram', '@lumina.spa.bo · @marianavaca.spa'], ['Facebook', '@LuminaSpa.SantaCruz'], ['TikTok', '@luminaspa.bo'],
];
