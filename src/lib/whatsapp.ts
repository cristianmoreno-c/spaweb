export const WA_NUMBER = '59176084781';
export const WA_DISPLAY = '+591 76084781';
export const MSG = {
  general: 'Hola Mariana, quisiera conocer los tratamientos de Lumina Skin & Body Spa y consultar disponibilidad para una cita.',
  facial: 'Hola Mariana, quisiera consultar por un tratamiento facial de Lumina.',
  corporal: 'Hola Mariana, quisiera conocer los tratamientos corporales disponibles.',
  valoracion: 'Hola Mariana, quisiera consultar qué tratamiento sería más adecuado para mí y conocer disponibilidad para una valoración.',
};
export const msgTreatment = (name: string) => `Hola Mariana, quisiera consultar por ${name.toLowerCase()}.`;
export const waDigits = (s: string) => s.replace(/\D/g, '');
export const fmtPhone = (s: string) => {
  const d = waDigits(s);
  return d.startsWith('591') && d.length === 11 ? `+591 ${d.slice(3)}` : `+${d}`;
};
export const waLink = (message: string = MSG.general, number: string = WA_NUMBER) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
