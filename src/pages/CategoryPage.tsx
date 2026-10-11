import type { ReactNode } from 'react';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import Faq from '../components/ui/Faq';
import TreatmentMenu from '../components/treatments/TreatmentMenu';
import { useTreatments } from '../hooks/useTreatments';
import { BENEFITS, STEPS } from '../data/treatments';
import { MSG } from '../lib/whatsapp';
import Img from '../components/ui/Img';
import { useSite } from '../context/SiteData';
type Props = { category: 'facial' | 'corporal'; title: ReactNode; intro: string };
export default function CategoryPage({ category, title, intro }: Props) {
  const { img, alt, txt } = useSite();
  const items = useTreatments().filter((t) => t.category === category);
  const msg = category === 'facial' ? MSG.facial : MSG.corporal;
  return (
    <>
      <section className="hero small"><div className="glow" aria-hidden="true" /><div className="hero-photo"><Img src={img(`cat_${category}`)} alt={alt(`cat_${category}`)} /></div><div className="container hero-copy"><p className="label">Lumina Skin &amp; Body Spa</p><h1>{title}</h1><p className="lead">{txt(`intro_${category}`) || intro}</p><WhatsAppButton message={msg} label="Agendar mi cita" /></div></section>
      <section className="section"><div className="container"><div className="sec-head"><h2>Elige tu <em>tratamiento</em></h2><p>Desde Bs {txt('price_from')}. Consulta el precio y la disponibilidad del tuyo por WhatsApp.</p></div><TreatmentMenu items={items} /></div></section>
      <section className="section alt wm"><div className="container"><SectionHeading title={<>Por qué <em>Lumina</em></>} /><div className="grid3">{BENEFITS.slice(0, 3).map(([h, p], i) => <div className="benefit" key={h}><Icon name={['user', 'layers', 'home'][i]} /><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>
      <section className="section"><div className="container"><SectionHeading title={<>Un proceso <em>personalizado</em></>} /><ol className="steps">{STEPS.map((s) => <li key={s}>{s}</li>)}</ol></div></section>
      <section className="section alt"><div className="container narrow"><SectionHeading title={<>Preguntas <em>frecuentes</em></>} /><Faq /></div></section>
      <section className="cta"><div className="glow" aria-hidden="true" /><div className="container center"><h2>Regálate un momento <em>para ti.</em></h2><WhatsAppButton message={msg} label="Consultar por WhatsApp" /></div></section>
    </>
  );
}
