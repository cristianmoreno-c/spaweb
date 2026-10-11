import WhatsAppButton from '../components/ui/WhatsAppButton';
import SectionHeading from '../components/ui/SectionHeading';
import { useSite } from '../context/SiteData';
export default function Testimonials() {
  const { testimonials: list } = useSite();
  return (
    <section className="section container">
      <SectionHeading title="La experiencia de nuestras clientas" text="Cada visita es una oportunidad para hacerte sentir cuidada, escuchada y especial." />
      {list.length === 0 ? (
        <p className="pending center">[TESTIMONIOS_CLIENTAS_PENDIENTES] Pronto compartiremos experiencias reales de nuestras clientas.</p>
      ) : (
        <div className="grid3">{list.map((t) => (
          <blockquote className="card" key={t.id}>
            {t.rating ? <p aria-label={`${t.rating} de 5`}>{'★'.repeat(t.rating)}</p> : null}
            <p>{t.testimonial}</p><footer>{t.client_name}</footer>
          </blockquote>))}
        </div>
      )}
      <div className="center"><WhatsAppButton label="Agendar mi cita" /></div>
    </section>
  );
}
