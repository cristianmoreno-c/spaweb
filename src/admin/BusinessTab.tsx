import { FormEvent, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSite } from '../context/SiteData';
export default function BusinessTab() {
  const { settings, refresh } = useSite();
  const [msg, setMsg] = useState(''); const [err, setErr] = useState('');
  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setMsg(''); setErr('');
    const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) ?? '').trim();
    const { error } = await supabase!.from('business_settings').upsert({
      id: 1, whatsapp: g('whatsapp'), address: g('address'), opening_hours: g('opening_hours'),
      instagram_url: g('instagram'), facebook_url: g('facebook'), tiktok_url: g('tiktok'), updated_at: new Date().toISOString(),
    });
    if (error) setErr(error.message); else { setMsg('Guardado. Ya se ve en el sitio.'); refresh(); }
  };
  return (
    <form className="form narrow" onSubmit={save} key={JSON.stringify(settings)}>
      <h2>Datos del negocio</h2>
      <label>WhatsApp (con código de país)<input name="whatsapp" defaultValue={settings.whatsapp} required placeholder="+59176084781" /></label>
      <label>Dirección<textarea name="address" rows={2} defaultValue={settings.address} required /></label>
      <label>Horario (una línea por renglón)<textarea name="opening_hours" rows={3} defaultValue={settings.opening_hours} required /></label>
      <label>Instagram<input name="instagram" defaultValue={settings.instagram} /></label>
      <label>Facebook<input name="facebook" defaultValue={settings.facebook} /></label>
      <label>TikTok<input name="tiktok" defaultValue={settings.tiktok} /></label>
      <p className="hint">Se actualizan el botón de WhatsApp, pie de página, contacto y mapa. Deja una red vacía para ocultarla.</p>
      <button className="btn btn-primary">Guardar</button>{msg && <p role="status" className="ok">{msg}</p>}{err && <p role="alert" className="bad">{err}</p>}
    </form>
  );
}
