import { FormEvent, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Img from '../components/ui/Img';
import { useSite } from '../context/SiteData';
import { TREATMENT_DEFAULT_IMG, TREATMENT_FALLBACK } from '../data/images';
import { removeImageByUrl, slugify, uploadImage } from './upload';
type Row = {
  id: string; category: 'facial' | 'corporal'; name: string; slug: string; short_description: string | null; description: string | null;
  benefits: string[] | null; image_url: string | null; duration: string | null; price: number | null; active: boolean; sort_order: number;
};
const photo = (t: Row) => t.image_url || TREATMENT_FALLBACK[t.slug] || TREATMENT_DEFAULT_IMG;
export default function TreatmentsTab() {
  const { refresh } = useSite();
  const [rows, setRows] = useState<Row[]>([]);
  const [edit, setEdit] = useState<Row | 'new' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const load = async () => {
    const { data, error } = await supabase!.from('treatments').select('*').order('sort_order').order('created_at');
    if (error) setErr('No se pudo leer. ¿Ejecutaste sql/3_panel_autoadministrable.sql? ' + error.message); else setRows((data as Row[]) || []);
  };
  useEffect(() => { load(); }, []);
  const after = async (m: string) => { setErr(''); setMsg(m); setEdit(null); setFile(null); await load(); refresh(); };

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setBusy(true); setErr(''); setMsg('');
    try {
      const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) ?? '').trim();
      const name = g('name'); if (!name) throw new Error('Escribe el nombre del tratamiento.');
      const isNew = edit === 'new'; const cur = isNew ? null : (edit as Row);
      let slug = cur?.slug ?? slugify(name);
      if (isNew) { const base = slug; let n = 2; while (rows.some((r) => r.slug === slug)) slug = `${base}-${n++}`; }
      let image_url = cur?.image_url ?? null;
      if (file) { const url = await uploadImage(file, 'treatments', slug); await removeImageByUrl(image_url); image_url = url; }
      const price = g('price') ? Number(g('price').replace(',', '.')) : null;
      if (price !== null && Number.isNaN(price)) throw new Error('El precio debe ser un número.');
      const payload = {
        category: g('category'), name, short_description: g('short_description') || null, description: g('description') || null,
        benefits: g('benefits').split('\n').map((x) => x.trim()).filter(Boolean), duration: g('duration') || null, price,
        image_url, active: f.get('active') === 'on',
      };
      const q = isNew
        ? supabase!.from('treatments').insert({ ...payload, slug, sort_order: ((rows[rows.length - 1]?.sort_order ?? 0)) + 1 })
        : supabase!.from('treatments').update(payload).eq('id', cur!.id);
      const { error } = await q; if (error) throw new Error(error.message);
      await after(isNew ? 'Tratamiento agregado.' : 'Cambios guardados.');
    } catch (x: any) { setErr(x.message || 'No se pudo guardar.'); }
    setBusy(false);
  };
  const toggle = async (r: Row) => { await supabase!.from('treatments').update({ active: !r.active }).eq('id', r.id); await after(r.active ? 'Tratamiento oculto.' : 'Tratamiento visible.'); };
  const del = async (r: Row) => {
    if (!confirm(`¿Eliminar "${r.name}"? Esta acción no se puede deshacer. (Si solo quieres ocultarlo, usa "Ocultar".)`)) return;
    const { error } = await supabase!.from('treatments').delete().eq('id', r.id);
    if (error) return setErr(error.message);
    await removeImageByUrl(r.image_url); await after('Tratamiento eliminado.');
  };
  const move = async (r: Row, d: number) => {
    const sameCat = rows.filter((x) => x.category === r.category);
    const i = sameCat.findIndex((x) => x.id === r.id); const j = i + d;
    if (j < 0 || j >= sameCat.length) return;
    const nextCat = [...sameCat]; const [x] = nextCat.splice(i, 1); nextCat.splice(j, 0, x);
    const all = [...rows.filter((y) => y.category === 'facial' && r.category !== 'facial'), ...(r.category === 'facial' ? nextCat : []),
      ...rows.filter((y) => y.category === 'corporal' && r.category !== 'corporal'), ...(r.category === 'corporal' ? nextCat : [])];
    await Promise.all(all.map((y, k) => (y.sort_order === k + 1 ? null : supabase!.from('treatments').update({ sort_order: k + 1 }).eq('id', y.id))));
    await load(); refresh();
  };

  const cur = edit && edit !== 'new' ? edit : null;
  const preview = file ? URL.createObjectURL(file) : cur ? photo(cur) : undefined;
  return (
    <div>
      <div className="row between"><h2>Tratamientos</h2>{!edit && <button className="btn btn-primary btn-sm" onClick={() => { setEdit('new'); setMsg(''); setErr(''); }}>+ Agregar tratamiento</button>}</div>
      {msg && <p role="status" className="ok">{msg}</p>}{err && <p role="alert" className="bad">{err}</p>}
      {edit && (
        <form className="form admin-card" onSubmit={save} key={cur?.id ?? 'new'}>
          <h3>{cur ? `Editar: ${cur.name}` : 'Nuevo tratamiento'}</h3>
          <div className="admin-two">
            <div>
              <label>Categoría<select name="category" defaultValue={cur?.category ?? 'facial'}><option value="facial">Facial</option><option value="corporal">Corporal</option></select></label>
              <label>Nombre<input name="name" defaultValue={cur?.name} required /></label>
              <label>Descripción corta (aparece al abrir el tratamiento)<textarea name="short_description" rows={2} defaultValue={cur?.short_description ?? ''} /></label>
              <label>Descripción larga (opcional)<textarea name="description" rows={3} defaultValue={cur?.description ?? ''} /></label>
              <label>Beneficios (uno por línea)<textarea name="benefits" rows={3} defaultValue={(cur?.benefits ?? []).join('\n')} /></label>
              <div className="row">
                <label>Precio en Bs (vacío = “Desde Bs …”)<input name="price" inputMode="decimal" defaultValue={cur?.price ?? ''} /></label>
                <label>Duración (ej. 60 min)<input name="duration" defaultValue={cur?.duration ?? ''} /></label>
              </div>
              <label className="check"><input type="checkbox" name="active" defaultChecked={cur ? cur.active : true} /> Visible en el sitio</label>
            </div>
            <div>
              <p className="label">Foto</p>
              <div className="thumb"><Img src={preview} alt="" ratio="4/5" /></div>
              <label className="btn btn-secondary btn-sm file">{file ? 'Cambiar selección' : 'Elegir foto'}
                <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></label>
              <p className="hint">Vertical (4:5), mínimo 800×1000 px. Se optimiza sola y mantiene los efectos de la web.</p>
            </div>
          </div>
          <div className="row"><button className="btn btn-primary" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</button>
            <button type="button" className="btn btn-ghost" onClick={() => { setEdit(null); setFile(null); }}>Cancelar</button></div>
        </form>)}
      {(['facial', 'corporal'] as const).map((c) => (
        <section key={c}><h3>{c === 'facial' ? 'Faciales' : 'Corporales'}</h3>
          {rows.filter((r) => r.category === c).length === 0 && <p className="hint">Sin tratamientos.</p>}
          {rows.filter((r) => r.category === c).map((r, i, arr) => (
            <div className={`admin-row ${r.active ? '' : 'off'}`} key={r.id}>
              <div className="thumb sm"><Img src={photo(r)} alt="" ratio="4/5" bare /></div>
              <div className="grow"><strong>{r.name}</strong><span className="hint">{r.price ? `Bs ${r.price}` : 'Desde (precio base)'}{r.duration ? ` · ${r.duration}` : ''}{r.active ? '' : ' · OCULTO'}</span></div>
              <div className="row">
                <button className="btn btn-ghost btn-sm" onClick={() => move(r, -1)} disabled={i === 0} aria-label="Subir">↑</button>
                <button className="btn btn-ghost btn-sm" onClick={() => move(r, 1)} disabled={i === arr.length - 1} aria-label="Bajar">↓</button>
                <button className="btn btn-secondary btn-sm" onClick={() => { setEdit(r); setFile(null); setMsg(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Editar</button>
                <button className="btn btn-ghost btn-sm" onClick={() => toggle(r)}>{r.active ? 'Ocultar' : 'Mostrar'}</button>
                <button className="btn btn-ghost btn-sm" onClick={() => del(r)}>Eliminar</button>
              </div>
            </div>))}
        </section>))}
    </div>
  );
}
