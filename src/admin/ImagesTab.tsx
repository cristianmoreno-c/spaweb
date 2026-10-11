import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Img from '../components/ui/Img';
import { useSite } from '../context/SiteData';
import { IMG_SLOTS } from '../data/images';
import { removeImageByUrl, uploadImage } from './upload';
export default function ImagesTab() {
  const { img, alt, imageRows, refresh } = useSite();
  const [busy, setBusy] = useState(''); const [msg, setMsg] = useState(''); const [err, setErr] = useState('');
  const groups = Array.from(new Set(IMG_SLOTS.map((s) => s.group)));
  const upsert = async (key: string, url: string, altText: string | null) =>
    supabase!.from('site_images').upsert({ key, url, alt: altText, updated_at: new Date().toISOString() });
  const onFile = async (key: string, file?: File) => {
    if (!file) return;
    setBusy(key); setErr(''); setMsg('');
    try {
      const old = imageRows[key]?.url;
      const url = await uploadImage(file, 'site', key, key === 'logo_mark');
      const { error } = await upsert(key, url, imageRows[key]?.alt ?? null);
      if (error) throw new Error(error.message);
      await removeImageByUrl(old); await refresh(); setMsg('Imagen actualizada.');
    } catch (e: any) { setErr(e.message || 'No se pudo subir la imagen.'); }
    setBusy('');
  };
  const restore = async (key: string) => {
    if (!confirm('¿Volver a la imagen original?')) return;
    setBusy(key); setErr(''); setMsg('');
    const old = imageRows[key]?.url;
    const { error } = await supabase!.from('site_images').delete().eq('key', key);
    if (error) setErr(error.message); else { await removeImageByUrl(old); await refresh(); setMsg('Se restauró la imagen original.'); }
    setBusy('');
  };
  const saveAlt = async (key: string, value: string) => {
    if (value === alt(key)) return;
    const { error } = await upsert(key, img(key) ?? '', value.trim() || null);
    if (error) setErr(error.message); else { await refresh(); setMsg('Descripción guardada.'); }
  };
  return (
    <div>
      <h2>Imágenes del sitio</h2>
      <p className="hint">La imagen nueva se ajusta sola (se redimensiona y optimiza) y conserva los mismos efectos de color y marcos de la web. Para los tratamientos, súbela en la pestaña Tratamientos.</p>
      {msg && <p role="status" className="ok">{msg}</p>}{err && <p role="alert" className="bad">{err}</p>}
      {groups.map((g) => (
        <section key={g}><h3>{g}</h3>
          <div className="admin-grid">{IMG_SLOTS.filter((s) => s.group === g).map((s) => (
            <div className="admin-card" key={s.key}>
              <div className="thumb"><Img src={img(s.key)} alt={alt(s.key)} ratio={s.ratio} /></div>
              <strong>{s.label}</strong>
              <span className="hint">{s.hint}{imageRows[s.key] ? ' · personalizada' : ' · original'}</span>
              {s.key !== 'logo_mark' && <label className="form-row">Descripción (accesibilidad/SEO)<input defaultValue={alt(s.key)} onBlur={(e) => saveAlt(s.key, e.target.value)} /></label>}
              <div className="row">
                <label className="btn btn-secondary btn-sm file">{busy === s.key ? 'Subiendo…' : 'Cambiar imagen'}
                  <input type="file" accept="image/*" hidden disabled={!!busy} onChange={(e) => { onFile(s.key, e.target.files?.[0]); e.target.value = ''; }} /></label>
                {imageRows[s.key] && <button className="btn btn-ghost btn-sm" disabled={!!busy} onClick={() => restore(s.key)}>Restaurar original</button>}
              </div>
            </div>))}
          </div></section>))}
    </div>
  );
}
