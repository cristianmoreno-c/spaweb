import { useState } from 'react';
import WhatsAppButton from '../ui/WhatsAppButton';
import { MSG } from '../../lib/whatsapp';
const Q = [
  { k: 'care', t: '¿Qué te gustaría cuidar?', o: ['Mi rostro', 'Mi cuerpo', 'Rostro y cuerpo'] },
  { k: 'seek', t: '¿Qué buscas hoy?', o: ['Cuidar y renovar mi piel', 'Relajarme y desconectarme', 'Cuidar mi figura', 'Que Mariana me oriente'] },
  { k: 'when', t: '¿Cuándo te viene mejor?', o: ['Por la mañana', 'Por la tarde', 'Un sábado', 'Aún no lo sé'] },
];
export default function RitualFinder() {
  const [a, setA] = useState<Record<string, string>>({});
  const parts = [a.care && `Quiero cuidar: ${a.care.toLowerCase()}.`, a.seek && `Busco: ${a.seek.toLowerCase()}.`, a.when && `Me viene mejor: ${a.when.toLowerCase()}.`].filter(Boolean);
  const message = parts.length ? `Hola Mariana, me gustaría reservar una valoración. ${parts.join(' ')} ¿Qué disponibilidad tienes?` : MSG.valoracion;
  return (
    <div>
      {Q.map((q) => (
        <div className="q" key={q.k} role="group" aria-label={q.t}>
          <p>{q.t}</p>
          <div className="chips">{q.o.map((o) => (
            <button key={o} type="button" aria-pressed={a[q.k] === o} className={`chip ${a[q.k] === o ? 'on' : ''}`} onClick={() => setA({ ...a, [q.k]: o })}>{o}</button>
          ))}</div>
        </div>
      ))}
      <WhatsAppButton label="Enviar a Mariana por WhatsApp" message={message} />
    </div>
  );
}
