import WhatsAppButton from '../ui/WhatsAppButton';
import { SOCIALS } from '../../data/treatments';
import { WA_DISPLAY } from '../../lib/whatsapp';
const ADDRESS = 'Barrio Estación Argentina, Calle San Rafael #71, Santa Cruz de la Sierra, Bolivia';
export default function InfoBlock() {
  return (
    <div className="info">
      <div><h3>Horario</h3><p>Lunes a sábado<br /><strong>09:00 – 18:00</strong><br />Domingo: cerrado</p></div>
      <div><h3>Contacto</h3><p>WhatsApp {WA_DISPLAY}</p>{SOCIALS.map(([n, h]) => <p key={n}>{n}: {h}</p>)}<WhatsAppButton label="Agendar por WhatsApp" variant="secondary" /></div>
      <div><h3>Visítanos</h3><p>Barrio Estación Argentina,<br />Calle San Rafael #71<br />Santa Cruz de la Sierra</p></div>
      <iframe title="Mapa de Lumina Skin & Body Spa" loading="lazy" className="map wide" src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} />
    </div>
  );
}
