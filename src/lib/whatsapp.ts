export const WA_NUMBER = '59176084781';
export const WA_DISPLAY = '+591 76084781';
export const MSG = {
  general: 'Hola Mariana, quisiera conocer los tratamientos de Lumina Skin & Body Spa y consultar disponibilidad para una cita.',
  facial: 'Hola Mariana, quisiera consultar por un tratamiento facial de Lumina.',
  corporal: 'Hola Mariana, quisiera conocer los tratamientos corporales disponibles.',
  valoracion: 'Hola Mariana, quisiera consultar qué tratamiento sería más adecuado para mí y conocer disponibilidad para una valoración.',
};
export const msgTreatment = (name: string) => `Hola Mariana, quisiera consultar por ${name.toLowerCase()}.`;
export const waLink = (message: string = MSG.general) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
