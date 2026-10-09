import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileWhatsAppBar from './components/whatsapp/MobileWhatsAppBar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import FloatingWhatsApp from './components/whatsapp/FloatingWhatsApp';
const TITLES: Record<string, string> = {
  '/': 'Lumina Skin & Body Spa | Spa en Santa Cruz de la Sierra',
  '/tratamientos-faciales': 'Tratamientos faciales en Santa Cruz | Lumina Skin & Body Spa',
  '/tratamientos-corporales': 'Tratamientos corporales en Santa Cruz | Lumina Skin & Body Spa',
  '/sobre-mariana': 'Sobre Mariana Vaca | Lumina Skin & Body Spa',
  '/testimonios': 'Testimonios | Lumina Skin & Body Spa',
  '/contacto': 'Contacto y ubicación | Lumina Skin & Body Spa',
  '/aviso-legal': 'Aviso legal | Lumina Skin & Body Spa',
  '/privacidad': 'Política de privacidad | Lumina Skin & Body Spa',
};
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/']; window.scrollTo(0, 0);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
    const t = setTimeout(() => document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el)), 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tratamientos-faciales" element={<CategoryPage category="facial" title={<>Tratamientos <em>faciales</em></>} intro="Cuidado facial personalizado para tu tipo de piel, con la atención cercana de Mariana Vaca." />} />
          <Route path="/tratamientos-corporales" element={<CategoryPage category="corporal" title={<>Tratamientos <em>corporales</em></>} intro="Masajes y cuidado corporal pensados para tu bienestar, en un ambiente privado y elegante." />} />
          <Route path="/sobre-mariana" element={<About />} />
          <Route path="/testimonios" element={<Testimonials />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/aviso-legal" element={<Legal kind="aviso" />} />
          <Route path="/privacidad" element={<Legal kind="privacidad" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {!pathname.startsWith('/admin') && <><MobileWhatsAppBar /><FloatingWhatsApp /></>}
    </>
  );
}
