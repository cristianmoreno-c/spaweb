import WhatsAppButton from '../components/ui/WhatsAppButton';
import { MSG } from '../lib/whatsapp';
import Img from '../components/ui/Img';
import { isPending } from '../lib/rich';
import { useSite } from '../context/SiteData';
const BLOCKS: [string, string][] = [['Historia', 'about_story'], ['Filosofía', 'about_philosophy'], ['Formación', 'about_training'], ['Experiencia', 'about_experience']];
export default function About() {
  const { img, alt, txt } = useSite();
  return (
    <>
      <section className="hero small"><div className="container hero-in"><h1>Detrás de Lumina hay una forma diferente de entender el cuidado.</h1><p className="lead"><strong>Mariana Vaca</strong> · Especialista en cosmetología</p></div></section>
      <section className="section container split">
        <Img className="photo" src={img('mariana')} alt={alt('mariana')} ratio="4/5" />
        <div>
          {BLOCKS.map(([h, k]) => (<div key={h}><h3>{h}</h3><p className={isPending(txt(k)) ? 'pending' : ''} style={{ whiteSpace: 'pre-line' }}>{txt(k)}</p></div>))}
          <h3>Enfoque personalizado</h3><p style={{ whiteSpace: 'pre-line' }}>{txt('about_approach')}</p>
          <WhatsAppButton label="Hablar con Mariana" message={MSG.valoracion} />
        </div>
      </section>
    </>
  );
}
