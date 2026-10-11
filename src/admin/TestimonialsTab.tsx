import { FormEvent, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSite } from '../context/SiteData';
type Row = { id: string; client_name: string; testimonial: string; rating: number | null; active: boolean };
export default function TestimonialsTab() {
  const { refresh } = useSite();
  const [rows, setRows] = useState<Row[]>([]); const [msg, setMsg] = useState(''); const [err, setErr] = useState('');
  const load = async () => {
    const { data, error } = await supabase!.from('testimonials').select('*').order('created_at', { ascending: false });
    if (error) setErr(error.message); else setRows((data as Row[]) || []);
  };
  useEffect(() => { load(); }, []);
  const done = async (m: string, error?: { message: string } | null) => { if (error) setErr(error.message); else { setErr(''); setMsg(m); await load(); refresh(); } };
  const add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const form = e.currentTarget; const f = new FormData(form);
    const r = Number(f.get('rating'));
    await done('Testimonio agregado.', (await supabase!.from('testimonials').insert({
      client_name: String(f.get('name')).trim(), testimonial: String(f.get('text')).trim(), rating: r || null, active: f.get('active') === 'on',
    })).error);
    form.reset();
  };
  const toggle = async (r: Row) => done(r.active ? 'Ocultado.' : 'Publicado.', (await supabase!.from('testimonials').update({ active: !r.active }).eq('id', r.id)).error);
  const del = async (r: Row) => { if (confirm('¿Eliminar este testimonio?')) done('Eliminado.', (await supabase!.from('testimonials').delete().eq('id', r.id)).error); };
  return (
    <div>
      <h2>Testimonios</h2>
      <p className="hint">Publica solo experiencias reales y con permiso de la clienta.</p>
      <form className="form narrow admin-card" onSubmit={add}>
        <label>Nombre<input name="name" required /></label>
        <label>Testimonio<textarea name="text" rows={3} required /></label>
        <label>Calificación<select name="rating" defaultValue="5"><option value="0">Sin estrellas</option>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{'★'.repeat(n)}</option>)}</select></label>
        <label className="check"><input type="checkbox" name="active" defaultChecked /> Publicar en el sitio</label>
        <button className="btn btn-primary">Agregar</button>
      </form>
      {msg && <p role="status" className="ok">{msg}</p>}{err && <p role="alert" className="bad">{err}</p>}
      {rows.map((r) => (
        <div className="admin-card" key={r.id}>
          <p>{r.rating ? '★'.repeat(r.rating) + ' ' : ''}{r.testimonial}</p><strong>{r.client_name}</strong>
          <div className="row"><button className="btn btn-secondary btn-sm" onClick={() => toggle(r)}>{r.active ? 'Ocultar' : 'Publicar'}</button>
            <button className="btn btn-ghost btn-sm" onClick={() => del(r)}>Eliminar</button><span className="hint">{r.active ? 'Visible' : 'Oculto'}</span></div>
        </div>))}
    </div>
  );
}
