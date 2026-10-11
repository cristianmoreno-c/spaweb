import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSite } from '../context/SiteData';
type Row = { id: string; question: string; answer: string; sort_order: number; active: boolean };
export default function FaqTab() {
  const { refresh } = useSite();
  const [rows, setRows] = useState<Row[]>([]); const [msg, setMsg] = useState(''); const [err, setErr] = useState('');
  const load = async () => {
    const { data, error } = await supabase!.from('faqs').select('*').order('sort_order').order('created_at');
    if (error) setErr('No se pudo leer. ¿Ejecutaste sql/3_panel_autoadministrable.sql? ' + error.message); else setRows((data as Row[]) || []);
  };
  useEffect(() => { load(); }, []);
  const done = async (m: string, error?: { message: string } | null) => { if (error) setErr(error.message); else { setErr(''); setMsg(m); await load(); refresh(); } };
  const save = async (r: Row) => done('Guardado.', (await supabase!.from('faqs').update({ question: r.question.trim(), answer: r.answer.trim(), active: r.active }).eq('id', r.id)).error);
  const del = async (r: Row) => { if (confirm('¿Eliminar esta pregunta?')) done('Eliminada.', (await supabase!.from('faqs').delete().eq('id', r.id)).error); };
  const add = async () => done('Pregunta agregada: edítala y guarda.', (await supabase!.from('faqs').insert({ question: 'Nueva pregunta', answer: 'Respuesta', sort_order: ((rows[rows.length - 1]?.sort_order ?? 0)) + 1 })).error);
  const move = async (i: number, d: number) => {
    const next = [...rows]; const [x] = next.splice(i, 1); next.splice(i + d, 0, x);
    await Promise.all(next.map((r, k) => supabase!.from('faqs').update({ sort_order: k + 1 }).eq('id', r.id)));
    await load(); refresh();
  };
  const set = (i: number, p: Partial<Row>) => setRows(rows.map((r, k) => (k === i ? { ...r, ...p } : r)));
  return (
    <div>
      <div className="row between"><h2>Preguntas frecuentes</h2><button className="btn btn-secondary btn-sm" onClick={add}>+ Agregar pregunta</button></div>
      {msg && <p role="status" className="ok">{msg}</p>}{err && <p role="alert" className="bad">{err}</p>}
      {rows.map((r, i) => (
        <div className="admin-card" key={r.id}>
          <label className="form-row">Pregunta<input value={r.question} onChange={(e) => set(i, { question: e.target.value })} /></label>
          <label className="form-row">Respuesta<textarea rows={3} value={r.answer} onChange={(e) => set(i, { answer: e.target.value })} /></label>
          <div className="row">
            <label className="check"><input type="checkbox" checked={r.active} onChange={(e) => set(i, { active: e.target.checked })} /> Visible</label>
            <button className="btn btn-ghost btn-sm" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Subir">↑</button>
            <button className="btn btn-ghost btn-sm" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Bajar">↓</button>
            <button className="btn btn-primary btn-sm" onClick={() => save(r)}>Guardar</button>
            <button className="btn btn-ghost btn-sm" onClick={() => del(r)}>Eliminar</button>
          </div>
        </div>))}
    </div>
  );
}
