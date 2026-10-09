import { FormEvent, useEffect, useState } from 'react';
import { supabase, createIsolatedClient } from '../lib/supabase';
type Req = { id: string; client_name: string; phone: string; message: string | null; status: string; preferred_date: string | null; created_at: string };
const STATUS = ['pending', 'contacted', 'confirmed', 'cancelled'];
const LABEL: Record<string, string> = { pending: 'Pendiente', contacted: 'Contactada', confirmed: 'Confirmada', cancelled: 'Cancelada' };
export default function Admin() {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [reqs, setReqs] = useState<Req[]>([]);
  const [err, setErr] = useState(''); const [info, setInfo] = useState('');
  const load = async () => {
    if (!supabase) { setReady(true); return; }
    const { data: s } = await supabase.auth.getSession();
    if (!s.session) { setRole(null); setReady(true); return; }
    const { data: p } = await supabase.from('profiles').select('role').eq('id', s.session.user.id).maybeSingle();
    setRole(p?.role ?? 'none');
    const { data: r } = await supabase.from('booking_requests').select('*').order('created_at', { ascending: false });
    setReqs((r as Req[]) || []); setReady(true);
  };
  useEffect(() => { load(); }, []);
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr('');
    const f = new FormData(e.currentTarget);
    const { error } = await supabase!.auth.signInWithPassword({ email: String(f.get('email')), password: String(f.get('password')) });
    if (error) setErr('Correo o contraseña incorrectos.'); else load();
  };
  const setStatus = async (id: string, status: string) => {
    await supabase!.from('booking_requests').update({ status }).eq('id', id); load();
  };
  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr(''); setInfo('');
    const form = e.currentTarget;
    const f = new FormData(form);
    const { error } = await createIsolatedClient()!.auth.signUp({ email: String(f.get('email')), password: String(f.get('password')) });
    if (error) setErr(error.message); else { setInfo('Usuario creado. Ya puede ingresar.'); form.reset(); }
  };
  if (!supabase) return <section className="section container"><p>Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.</p></section>;
  if (!ready) return <section className="section container"><p>Cargando…</p></section>;
  if (!role) return (
    <section className="section container narrow"><h1>Acceso del equipo</h1>
      <form className="form" onSubmit={login}>
        <label>Correo<input name="email" type="email" required autoComplete="email" /></label>
        <label>Contraseña<input name="password" type="password" required autoComplete="current-password" /></label>
        <button className="btn btn-primary">Ingresar</button>{err && <p role="alert">{err}</p>}
      </form></section>);
  return (
    <section className="section container">
      <div className="row between"><h1>Panel</h1><button className="btn btn-ghost" onClick={async () => { await supabase!.auth.signOut(); load(); }}>Salir</button></div>
      <h2>Solicitudes de cita</h2>
      {reqs.length === 0 && <p>Aún no hay solicitudes.</p>}
      <div className="scroll"><table><tbody>{reqs.map((r) => (
        <tr key={r.id}><td>{new Date(r.created_at).toLocaleDateString('es-BO')}</td><td>{r.client_name}</td>
          <td><a href={`https://wa.me/${r.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">{r.phone}</a></td>
          <td>{r.preferred_date ?? ''}</td><td>{r.message}</td>
          <td><select aria-label="Estado" value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>{STATUS.map((s) => <option key={s} value={s}>{LABEL[s]}</option>)}</select></td></tr>))}
      </tbody></table></div>
      {role === 'admin' && (
        <form className="form narrow" onSubmit={createUser}>
          <h2>Crear usuario del equipo</h2>
          <label>Correo<input name="email" type="email" required /></label>
          <label>Contraseña (mínimo 6 caracteres)<input name="password" type="password" minLength={6} required /></label>
          <button className="btn btn-primary">Crear usuario</button>{err && <p role="alert">{err}</p>}{info && <p role="status">{info}</p>}
        </form>)}
    </section>);
}
