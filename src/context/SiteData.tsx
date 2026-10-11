import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { IMG_DEFAULTS, IMG_DEFAULT_ALTS } from '../data/images';
import { CONTENT_DEFAULTS, FAQ_DEFAULTS } from '../data/content';
import { SOCIALS, TREATMENTS } from '../data/treatments';
import { WA_NUMBER, fmtPhone, waDigits } from '../lib/whatsapp';
import type { Testimonial, Treatment } from '../types';

export type Settings = { whatsapp: string; address: string; opening_hours: string; instagram: string; facebook: string; tiktok: string };
export type FaqItem = { id: string; question: string; answer: string };
export const DEFAULT_SETTINGS: Settings = {
  whatsapp: `+${WA_NUMBER}`,
  address: 'Barrio Estación Argentina, Calle San Rafael #71',
  opening_hours: 'Lunes a sábado: 09:00–18:00\nDomingo: cerrado',
  instagram: SOCIALS[0][1], facebook: SOCIALS[1][1], tiktok: SOCIALS[2][1],
};
type ImgRow = { url: string; alt: string | null };
type Ctx = {
  ready: boolean;
  img: (key: string) => string | undefined;
  alt: (key: string) => string;
  imageRows: Record<string, ImgRow>;
  txt: (key: string) => string;
  contentRows: Record<string, string>;
  settings: Settings; waNumber: string; waDisplay: string; mapAddress: string;
  socials: [string, string][];
  faqs: FaqItem[]; treatments: Treatment[]; testimonials: Testimonial[];
  refresh: () => Promise<void>;
};
const fallbackTxt = (k: string) => CONTENT_DEFAULTS[k] ?? '';
const build = (p: { ready: boolean; images: Record<string, ImgRow>; content: Record<string, string>; settings: Settings; faqs: FaqItem[]; treatments: Treatment[]; testimonials: Testimonial[]; refresh: () => Promise<void> }): Ctx => {
  const { settings } = p;
  const digits = waDigits(settings.whatsapp) || WA_NUMBER;
  const addr = settings.address.replace(/\s*\n\s*/g, ', ');
  const socials = ([['Instagram', settings.instagram], ['Facebook', settings.facebook], ['TikTok', settings.tiktok]] as [string, string][]).filter(([, v]) => v.trim());
  return {
    ready: p.ready,
    // Mientras carga (y hay Supabase) devolvemos undefined para no mostrar un instante la imagen equivocada
    img: (k) => p.images[k]?.url ?? (!p.ready && supabase ? undefined : IMG_DEFAULTS[k]),
    alt: (k) => p.images[k]?.alt || IMG_DEFAULT_ALTS[k] || '',
    imageRows: p.images,
    txt: (k) => (p.content[k]?.trim() ? p.content[k] : fallbackTxt(k)),
    contentRows: p.content,
    settings, waNumber: digits, waDisplay: fmtPhone(digits),
    mapAddress: /santa cruz/i.test(addr) ? addr : `${addr}, Santa Cruz de la Sierra, Bolivia`,
    socials, faqs: p.faqs, treatments: p.treatments, testimonials: p.testimonials, refresh: p.refresh,
  };
};
const Site = createContext<Ctx>(build({ ready: !supabase, images: {}, content: {}, settings: DEFAULT_SETTINGS, faqs: FAQ_DEFAULTS, treatments: TREATMENTS, testimonials: [], refresh: async () => {} }));
export const useSite = () => useContext(Site);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!supabase);
  const [images, setImages] = useState<Record<string, ImgRow>>({});
  const [content, setContent] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [faqs, setFaqs] = useState<FaqItem[]>(FAQ_DEFAULTS);
  const [treatments, setTreatments] = useState<Treatment[]>(supabase ? [] : TREATMENTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const refresh = useCallback(async () => {
    const sb = supabase;
    if (!sb) { setReady(true); return; }
    try {
      const tq = async () => {
        const r = await sb.from('treatments').select('*').eq('active', true).order('sort_order').order('created_at');
        return r.error ? sb.from('treatments').select('*').eq('active', true).order('created_at') : r;
      };
      const [im, co, st, fq, tr, te] = await Promise.all([
        sb.from('site_images').select('key,url,alt'),
        sb.from('site_content').select('key,value'),
        sb.from('business_settings').select('*').eq('id', 1).maybeSingle(),
        sb.from('faqs').select('id,question,answer').eq('active', true).order('sort_order').order('created_at'),
        tq(),
        sb.from('testimonials').select('*').eq('active', true).order('created_at', { ascending: false }),
      ]);
      if (!im.error && im.data) setImages(Object.fromEntries(im.data.map((r: any) => [r.key, { url: r.url, alt: r.alt }])));
      if (!co.error && co.data) setContent(Object.fromEntries(co.data.map((r: any) => [r.key, r.value])));
      if (!st.error && st.data) {
        const d: any = st.data;
        setSettings({
          whatsapp: d.whatsapp || DEFAULT_SETTINGS.whatsapp, address: d.address || DEFAULT_SETTINGS.address,
          opening_hours: d.opening_hours || DEFAULT_SETTINGS.opening_hours,
          instagram: d.instagram_url ?? DEFAULT_SETTINGS.instagram, facebook: d.facebook_url ?? DEFAULT_SETTINGS.facebook, tiktok: d.tiktok_url ?? DEFAULT_SETTINGS.tiktok,
        });
      }
      if (!fq.error && fq.data) setFaqs(fq.data as FaqItem[]);
      if (!tr.error && tr.data) setTreatments(tr.data.map((r: any) => ({ ...r, benefits: r.benefits ?? [] })) as Treatment[]);
      else setTreatments(TREATMENTS);
      if (!te.error && te.data) setTestimonials(te.data as Testimonial[]);
    } catch {
      setTreatments(TREATMENTS);
    }
    setReady(true);
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const value = useMemo(() => build({ ready, images, content, settings, faqs, treatments, testimonials, refresh }), [ready, images, content, settings, faqs, treatments, testimonials, refresh]);
  return <Site.Provider value={value}>{children}</Site.Provider>;
}
