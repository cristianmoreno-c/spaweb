import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import WhatsAppButton from '../ui/WhatsAppButton';
const NAV: [string, string][] = [
  ['/', 'Inicio'], ['/tratamientos-faciales', 'Tratamientos Faciales'], ['/tratamientos-corporales', 'Tratamientos Corporales'],
  ['/sobre-mariana', 'Sobre Mariana'], ['/testimonios', 'Testimonios'], ['/contacto', 'Contacto'],
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`header ${scrolled || open ? 'scrolled' : ''}`}>
      <div className="container bar">
        <Link to="/" aria-label="Lumina Skin & Body Spa, inicio" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Principal">
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
        <WhatsAppButton label="Agendar por WhatsApp" className="hide-sm" />
        <button className="burger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
