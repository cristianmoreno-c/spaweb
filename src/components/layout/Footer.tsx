import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import WhatsAppButton from '../ui/WhatsAppButton';
import { SOCIALS } from '../../data/treatments';
import { WA_DISPLAY } from '../../lib/whatsapp';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container grid3">
        <div><Logo light /><p style={{marginTop:16}}>Por Mariana Vaca, especialista en cosmetología.</p><WhatsAppButton label="Agendar mi cita" variant="secondary" /></div>
        <div><h3>Visítanos</h3><p>Barrio Estación Argentina, Calle San Rafael #71<br />Santa Cruz de la Sierra, Bolivia</p>
          <p>Lunes a sábado: 09:00–18:00<br />Domingo: cerrado</p><p>WhatsApp: {WA_DISPLAY}</p></div>
        <div><h3>Redes</h3>{SOCIALS.map(([n, h]) => <p key={n}>{n}: {h}</p>)}
          <p><Link to="/aviso-legal">Aviso legal</Link> · <Link to="/privacidad">Privacidad</Link></p><p><Link to="/admin">Acceso del equipo</Link></p></div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Lumina Skin &amp; Body Spa</p>
    </footer>
  );
}
