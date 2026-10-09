import { FormEvent, useState } from 'react';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { supabase } from '../lib/supabase';
import { TREATMENTS, SOCIALS } from '../data/treatments';
import { WA_DISPLAY } from '../lib/whatsapp';
const ADDRESS = 'Barrio Estación Argentina, Calle San Rafael #71, Santa Cruz de la Sierra, Bolivia';
export default function Contact() {
  const [state, setState] = useState<'idle' | 'ok' | 'error'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (!supabase) return setState('error');
    const msg = `Tratamiento: ${f.get('treatment') || 'Por definir'}. ${f.get('message') || ''}`;
    const { error } = await supabase.from('booking_requests').insert({
      client_name: String(f.get('name')), phone: String(f.get('phone')), message: msg, preferred_date: f.get('date') || null,
    });
    setState(error ? 'error' : 'ok');
    if (!error) form.reset();
  };
  return (
    <>
      <section className="hero small"><div className="container hero-in"><h1>Tu momento de bienestar comienza aquí.</h1><WhatsAppButton label="Agendar por WhatsApp" /></div></section>
      <section className="section container split">
        <div>
          <h3>WhatsApp</h3><p>{WA_DISPLAY}</p>
          <h3>Dirección</h3><p>Barrio Estación Argentina, Calle San Rafael #71</p>
          <h3>Horarios</h3><p>Lunes a sábado: 09:00–18:00<br />Domingo: cerrado</p>
          <h3>Redes</h3>{SOCIALS.map(([n, h]) => <p key={n}>{n}: {h}</p>)}
          <iframe title="Mapa de Lumina Skin & Body Spa" loading="lazy" className="map" src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} />
        </div>
        <form onSubmit={submit} className="form">
          <h3>¿Prefieres que te contactemos?</h3>
          <label>Nombre<input name="name" required autoComplete="name" /></label>
          <label>Teléfono<input name="phone" required type="tel" autoComplete="tel" /></label>
          <label>Tratamiento<select name="treatment"><option value="">Aún no lo sé</option>{TREATMENTS.map((t) => <option key={t.slug}>{t.name}</option>)}</select></label>
          <label>Fecha preferida<input name="date" type="date" /></label>
          <label>Mensaje<textarea name="message" rows={3} /></label>
          <button className="btn btn-primary" type="submit">Enviar solicitud</button>
          {state === 'ok' && <p role="status">Recibimos tu solicitud. Mariana te contactará para confirmar disponibilidad.</p>}
          {state === 'error' && <p role="alert">No pudimos enviarla. Escríbenos por WhatsApp.</p>}
        </form>
      </section>
    </>
  );
}
