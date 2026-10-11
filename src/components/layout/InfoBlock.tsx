import WhatsAppButton from '../ui/WhatsAppButton';
import SocialLine from '../ui/SocialLine';
import { useSite } from '../../context/SiteData';
export default function InfoBlock() {
  const { settings, waDisplay, socials, mapAddress } = useSite();
  const pre = { whiteSpace: 'pre-line' as const };
  return (
    <div className="info">
      <div><h3>Horario</h3><p style={pre}>{settings.opening_hours}</p></div>
      <div><h3>Contacto</h3><p>WhatsApp {waDisplay}</p>{socials.map(([n, h]) => <SocialLine key={n} name={n} value={h} />)}<WhatsAppButton label="Agendar por WhatsApp" variant="secondary" /></div>
      <div><h3>Visítanos</h3><p style={pre}>{settings.address}<br />Santa Cruz de la Sierra</p></div>
      <iframe title="Mapa de Lumina Skin & Body Spa" loading="lazy" className="map wide" src={`https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`} />
    </div>
  );
}
