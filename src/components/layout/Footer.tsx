import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import WhatsAppButton from '../ui/WhatsAppButton';
import SocialLine from '../ui/SocialLine';
import { useSite } from '../../context/SiteData';
export default function Footer() {
  const { settings, waDisplay, socials } = useSite();
  const pre = { whiteSpace: 'pre-line' as const };
  return (
    <footer className="footer">
      <div className="container grid3">
        <div><Logo light /><p style={{marginTop:16}}>Por Mariana Vaca, especialista en cosmetología.</p><WhatsAppButton label="Agendar mi cita" variant="secondary" /></div>
        <div><h3>Visítanos</h3><p style={pre}>{settings.address}<br />Santa Cruz de la Sierra, Bolivia</p>
          <p style={pre}>{settings.opening_hours}</p><p>WhatsApp: {waDisplay}</p></div>
        <div><h3>Redes</h3>{socials.map(([n, h]) => <SocialLine key={n} name={n} value={h} />)}
          <p><Link to="/aviso-legal">Aviso legal</Link> · <Link to="/privacidad">Privacidad</Link></p><p><Link to="/admin">Acceso del equipo</Link></p></div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Lumina Skin &amp; Body Spa</p>
    </footer>
  );
}
