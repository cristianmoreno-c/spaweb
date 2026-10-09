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
import { IMG } from '../data/images';
import { MSG } from '../lib/whatsapp';
const ICONS = ['user', 'badge', 'layers', 'home', 'drop', 'heart'];
const TRUST = ['Atención personalizada', 'Especialista en cosmetología', 'Espacio privado', 'Lunes a sábado · 09:00–18:00'];
export default function Home() {
  const all = useTreatments();
  return (
    <>
      <section className="hero">
        <div className="glow" aria-hidden="true" />
        <div className="hero-photo"><Img src={IMG.hero} alt="Tratamiento facial en Lumina" /></div>
        <p className="hero-side label" aria-hidden="true">Santa Cruz de la Sierra · Bolivia</p>
        <div className="container hero-copy">
          <p className="label">Atención personalizada por Mariana Vaca</p>
          <h1>Piel radiante y un cuerpo <em>en armonía.</em></h1>
          <p className="lead">Tratamientos faciales y corporales personalizados para cuidar tu piel, realzar tu belleza y regalarte un momento de bienestar en Santa Cruz.</p>
          <div className="row"><WhatsAppButton label="Agendar mi cita" /><Link className="btn btn-secondary" to="/tratamientos-faciales">Descubrir tratamientos</Link></div>
        </div>
      </section>
      <div className="strip"><div className="container">{TRUST.map((t) => <span key={t}>{t}</span>)}</div></div>
      <section className="section wm rv">
        <div className="container split">
          <Img className="photo" src={IMG.reception} alt="Recepción de Lumina Skin & Body Spa" ratio="4/5" />
          <div>
            <p className="label">Detrás de Lumina</p>
            <h2>Tu piel merece un cuidado <em>pensado para ti.</em></h2>
            <p>En Lumina Skin &amp; Body Spa creemos que cada piel y cada cuerpo tienen necesidades diferentes. Por eso, cada experiencia comienza escuchándote, entendiendo tus necesidades y seleccionando un protocolo de cuidado adaptado a ti.</p>
            <p>Detrás de Lumina está Mariana Vaca, especialista en cosmetología, acompañando personalmente una experiencia donde el cuidado, la atención y el bienestar ocupan el centro.</p>
            <blockquote className="pull">No vienes simplemente a realizarte un tratamiento. Vienes a regalarte un momento de cuidado personalizado.</blockquote>
            <Link className="btn btn-secondary" to="/sobre-mariana">Conocer a Mariana</Link>
          </div>
        </div>
      </section>
      <section className="section alt rv" id="tratamientos">
        <div className="container">
          <div className="sec-head"><h2>Tratamientos <em>a tu medida</em></h2><p>Todos parten desde Bs 150. Elige uno para ver el detalle y consultarlo con Mariana por WhatsApp.</p></div>
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
            <p className="pending">[TESTIMONIOS_CLIENTAS_PENDIENTES]</p>
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
