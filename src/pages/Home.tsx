import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import SectionHeading from '../components/ui/SectionHeading';
import Img from '../components/ui/Img';
import Icon from '../components/ui/Icon';
import GalleryGrid from '../components/ui/GalleryGrid';
import Faq from '../components/ui/Faq';
import InfoBlock from '../components/layout/InfoBlock';
import TreatmentMenu from '../components/treatments/TreatmentMenu';
import RitualFinder from '../components/treatments/RitualFinder';
import { useTreatments } from '../hooks/useTreatments';
import { BENEFITS, STEPS } from '../data/treatments';
import { rich } from '../lib/rich';
import { useSite } from '../context/SiteData';
import { MSG } from '../lib/whatsapp';
const ICONS = ['user', 'badge', 'layers', 'home', 'drop', 'heart'];
export default function Home() {
  const all = useTreatments();
  const { img, alt, txt, testimonials } = useSite();
  const trust = txt('trust_items').split('\n').map((x) => x.trim()).filter(Boolean);
  return (
    <>
      <section className="hero">
        <div className="glow" aria-hidden="true" />
        <div className="hero-photo"><Img src={img('hero')} alt={alt('hero')} /></div>
        <p className="hero-side label" aria-hidden="true">Santa Cruz de la Sierra · Bolivia</p>
        <div className="container hero-copy">
          <p className="label">{txt('hero_label')}</p>
          <h1>{rich(txt('hero_title'))}</h1>
          <p className="lead">{txt('hero_lead')}</p>
          <div className="row"><WhatsAppButton label="Agendar mi cita" /><Link className="btn btn-secondary" to="/tratamientos-faciales">Descubrir tratamientos</Link></div>
        </div>
      </section>
      <div className="strip"><div className="container">{trust.map((t) => <span key={t}>{t}</span>)}</div></div>
      <section className="section wm rv">
        <div className="container split">
          <Img className="photo" src={img('reception')} alt={alt('reception')} ratio="4/5" />
          <div>
            <p className="label">Detrás de Lumina</p>
            <h2>Tu piel merece un cuidado <em>pensado para ti.</em></h2>
            <p>{txt('home_about_1')}</p>
            <p>{txt('home_about_2')}</p>
            <blockquote className="pull">{txt('home_quote')}</blockquote>
            <Link className="btn btn-secondary" to="/sobre-mariana">Conocer a Mariana</Link>
          </div>
        </div>
      </section>
      <section className="section alt rv" id="tratamientos">
        <div className="container">
          <div className="sec-head"><h2>Tratamientos <em>a tu medida</em></h2><p>Todos parten desde Bs {txt('price_from')}. Elige uno para ver el detalle y consultarlo con Mariana por WhatsApp.</p></div>
          <TreatmentMenu items={all} groups />
        </div>
      </section>
      <section className="section rv">
        <div className="container ritual">
          <div><p className="label">Encuentra tu ritual</p><h2>Cuéntanos qué <em>necesitas hoy.</em></h2><p>Responde tres preguntas y te armamos el mensaje para Mariana. Ella te confirma disponibilidad y te orienta.</p></div>
          <RitualFinder />
        </div>
      </section>
      <section className="section alt rv">
        <div className="container">
          <SectionHeading title={<>Cómo es tu <em>visita</em></>} />
          <ol className="steps">{STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
          <WhatsAppButton label="Quiero comenzar mi experiencia" />
        </div>
      </section>
      <section className="section rv">
        <div className="container">
          <SectionHeading title={<>Un espacio para <em>desconectarte</em></>} text="Un ambiente privado y elegante, lejos del ritmo cotidiano." />
          <GalleryGrid />
        </div>
      </section>
      <section className="section alt wm rv">
        <div className="container">
          <SectionHeading title={<>Por qué elegir <em>Lumina</em></>} />
          <div className="grid3">{BENEFITS.map(([h, p], i) => <div className="benefit" key={h}><Icon name={ICONS[i]} /><h3>{h}</h3><p>{p}</p></div>)}</div>
          <WhatsAppButton label="Reservar mi valoración" message={MSG.valoracion} variant="secondary" />
        </div>
      </section>
      <section className="section rv">
        <div className="container two">
          <div>
            <h2>La experiencia de <em>nuestras clientas</em></h2>
            <p>Cada visita es una oportunidad para hacerte sentir cuidada, escuchada y especial.</p>
            {testimonials.length === 0
              ? <p className="pending">[TESTIMONIOS_CLIENTAS_PENDIENTES]</p>
              : testimonials.slice(0, 3).map((t) => (
                <blockquote className="card" key={t.id} style={{ marginBottom: 14 }}>
                  {t.rating ? <p aria-label={`${t.rating} de 5`}>{'★'.repeat(t.rating)}</p> : null}
                  <p>{t.testimonial}</p><footer>{t.client_name}</footer>
                </blockquote>))}
          </div>
          <div><h2>Preguntas <em>frecuentes</em></h2><Faq /></div>
        </div>
      </section>
      <section className="section alt rv"><div className="container"><SectionHeading title={<>Horario, contacto y <em>ubicación</em></>} /><InfoBlock /></div></section>
      <section className="cta rv">
        <div className="glow" aria-hidden="true" />
        <div className="container center">
          <h2>Regálate un momento <em>para ti.</em></h2>
          <p>Descubre un espacio creado para cuidar tu piel, tu cuerpo y tu bienestar con una atención verdaderamente personalizada.</p>
          <div className="row center-row"><WhatsAppButton label="Hablar con Mariana por WhatsApp" /><Link className="btn btn-ghost" to="/tratamientos-faciales">Ver tratamientos</Link></div>
        </div>
      </section>
    </>
  );
}
