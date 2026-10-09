const ITEMS: [string, string][] = [
  ['¿Cuánto cuestan los tratamientos?', 'Los tratamientos parten desde Bs 150. Escríbele a Mariana por WhatsApp para conocer el precio del tuyo.'],
  ['¿Cómo agendo mi cita?', 'Por WhatsApp o con el formulario de contacto. Una solicitud no es una reserva hasta que Mariana la confirme.'],
  ['¿Cómo sé qué tratamiento es para mí?', 'Puedes reservar una valoración: Mariana te escucha y te orienta según tus necesidades.'],
  ['¿Dónde están y cuál es el horario?', 'Barrio Estación Argentina, Calle San Rafael #71. Atendemos de lunes a sábado de 09:00 a 18:00.'],
];
export default function Faq() {
  return <div className="faq">{ITEMS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}
