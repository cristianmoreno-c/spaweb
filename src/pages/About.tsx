import WhatsAppButton from '../components/ui/WhatsAppButton';
import { MSG } from '../lib/whatsapp';
import Img from '../components/ui/Img';
import { IMG } from '../data/images';
export default function About() {
  return (
    <>
      <section className="hero small"><div className="container hero-in"><h1>Detrás de Lumina hay una forma diferente de entender el cuidado.</h1><p className="lead"><strong>Mariana Vaca</strong> · Especialista en cosmetología</p></div></section>
      <section className="section container split">
        <Img className="photo" src={IMG.mariana} alt="Mariana Vaca" ratio="4/5" />
        <div>
          {['Historia', 'Filosofía', 'Formación', 'Experiencia'].map((h) => (<div key={h}><h3>{h}</h3><p className="pending">{h === 'Historia' ? '[BIOGRAFIA_MARIANA]' : h === 'Formación' ? '[FORMACION_MARIANA] · [CERTIFICACIONES]' : h === 'Experiencia' ? '[EXPERIENCIA_PROFESIONAL]' : 'Cada piel y cada cuerpo tienen necesidades diferentes: por eso cada experiencia comienza escuchándote.'}</p></div>))}
          <h3>Enfoque personalizado</h3><p>Protocolos adaptados a ti, en un ambiente privado y cercano.</p>
          <WhatsAppButton label="Hablar con Mariana" message={MSG.valoracion} />
        </div>
      </section>
    </>
  );
}
