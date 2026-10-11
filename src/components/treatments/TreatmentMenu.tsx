import { useState } from 'react';
import Img from '../ui/Img';
import WhatsAppButton from '../ui/WhatsAppButton';
import { TREATMENT_DEFAULT_IMG, TREATMENT_FALLBACK } from '../../data/images';
import { useSite } from '../../context/SiteData';
import type { Treatment } from '../../types';
const photo = (t: Treatment) => t.image_url || TREATMENT_FALLBACK[t.slug] || TREATMENT_DEFAULT_IMG;
export default function TreatmentMenu({ items, groups = false }: { items: Treatment[]; groups?: boolean }) {
  const { txt } = useSite();
  const [chosen, setChosen] = useState<string | null>(null); // null = aún no eligió: se abre el primero
  const [hover, setHover] = useState<string | null>(null);
  const open = chosen ?? items[0]?.slug ?? '';
  const shown = items.find((t) => t.slug === (hover ?? open)) ?? items[0];
  const cats: (('facial' | 'corporal') | null)[] = groups ? ['facial', 'corporal'] : [null];
  let n = 0;
  return (
    <div className="menu">
      <div>
        {cats.map((c) => (
          <div className="menu-group" key={c ?? 'all'}>
            {c && <p className="label">{c === 'facial' ? 'Faciales' : 'Corporales'}</p>}
            {items.filter((t) => !c || t.category === c).map((t) => {
              n++; const isOpen = open === t.slug;
              return (
                <div className={`mrow ${isOpen ? 'open' : ''}`} key={t.slug} onMouseEnter={() => setHover(t.slug)} onMouseLeave={() => setHover(null)}>
                  <button aria-expanded={isOpen} aria-controls={`m-${t.slug}`} onClick={() => setChosen(isOpen ? '' : t.slug)} onFocus={() => setHover(t.slug)} onBlur={() => setHover(null)}>
                    <span className="label">{String(n).padStart(2, '0')}</span><span className="mname">{t.name}</span><span className="mplus" aria-hidden="true" />
                  </button>
                  <div className="mbody" id={`m-${t.slug}`} hidden={!isOpen}>
                    {t.short_description && <p>{t.short_description}</p>}
                    {t.description && <p style={{ whiteSpace: 'pre-line' }}>{t.description}</p>}
                    {t.benefits.length > 0 && <p className="tags">{t.benefits.join(' · ')}</p>}
                    <p className="label">{t.price ? `Bs ${t.price}` : `Desde Bs ${txt('price_from')}`}{t.duration ? ` · ${t.duration}` : ''}</p>
                    <WhatsAppButton treatment={t.name} label="Consultar por WhatsApp" variant="secondary" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {shown && <div className="menu-prev" aria-hidden="true"><Img key={shown.slug} src={photo(shown)} alt="" ratio="4/5" /></div>}
    </div>
  );
}
