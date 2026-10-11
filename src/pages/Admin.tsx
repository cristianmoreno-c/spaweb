import { FormEvent, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BookingsTab from '../admin/BookingsTab';
import TreatmentsTab from '../admin/TreatmentsTab';
import ImagesTab from '../admin/ImagesTab';
import TextsTab from '../admin/TextsTab';
import FaqTab from '../admin/FaqTab';
import TestimonialsTab from '../admin/TestimonialsTab';
import BusinessTab from '../admin/BusinessTab';
import UsersTab from '../admin/UsersTab';
import '../styles/admin.css';
// [clave, etiqueta, solo administrador]
const TABS: [string, string, boolean][] = [
  ['citas', 'Citas', false], ['tratamientos', 'Tratamientos', true], ['imagenes', 'Imágenes', true], ['textos', 'Textos', true],
  ['faq', 'Preguntas frecuentes', true], ['testimonios', 'Testimonios', true], ['negocio', 'Datos del negocio', true], ['equipo', 'Equipo', true],
];
export default function Admin() {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [tab, setTab] = useState('citas');
  const [err, setErr] = useState('');
  const load = async () => {
    if (!supabase) { setReady(true); return; }
    const { data: s } = await supabase.auth.getSession();
    if (!s.session) { setRole(null); setReady(true); return; }
    const { data: p } = await supabase.from('profiles').select('role').eq('id', s.session.user.id).maybeSingle();
    setRole(p?.role ?? 'none'); setReady(true);
  };
  useEffect(() => { load(); }, []);
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr('');
    const f = new FormData(e.currentTarget);
    const { error } = await supabase!.auth.signInWithPassword({ email: String(f.get('email')), password: String(f.get('password')) });
    if (error) setErr('Correo o contraseña incorrectos.'); else load();
  };
  const logout = async () => { await supabase!.auth.signOut(); setRole(null); setTab('citas'); };
  if (!supabase) return <section className="section container"><p>Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.</p></section>;
  if (!ready) return <section className="section container"><p>Cargando…</p></section>;
  if (!role) return (
    <section className="section container narrow"><h1>Acceso del equipo</h1>
      <form className="form" onSubmit={login}>
        <label>Correo<input name="email" type="email" required autoComplete="email" /></label>
        <label>Contraseña<input name="password" type="password" required autoComplete="current-password" /></label>
        <button className="btn btn-primary">Ingresar</button>{err && <p role="alert">{err}</p>}
      </form></section>);
  if (role === 'none') return (
    <section className="section container narrow"><h1>Sin permisos</h1><p>Tu usuario no tiene acceso al panel. Pide al administrador que lo habilite.</p>
      <button className="btn btn-ghost" onClick={logout}>Salir</button></section>);
  const isAdmin = role === 'admin';
  const tabs = TABS.filter(([, , adm]) => isAdmin || !adm);
  return (
    <section className="section container admin">
      <div className="row between"><h1>Panel</h1><button className="btn btn-ghost" onClick={logout}>Salir</button></div>
      <nav className="tabs" aria-label="Secciones del panel">{tabs.map(([k, l]) => (
        <button key={k} className={`tab ${tab === k ? 'on' : ''}`} aria-pressed={tab === k} onClick={() => setTab(k)}>{l}</button>))}</nav>
      {tab === 'citas' && <BookingsTab isAdmin={isAdmin} />}
      {isAdmin && tab === 'tratamientos' && <TreatmentsTab />}
      {isAdmin && tab === 'imagenes' && <ImagesTab />}
      {isAdmin && tab === 'textos' && <TextsTab />}
      {isAdmin && tab === 'faq' && <FaqTab />}
      {isAdmin && tab === 'testimonios' && <TestimonialsTab />}
      {isAdmin && tab === 'negocio' && <BusinessTab />}
      {isAdmin && tab === 'equipo' && <UsersTab />}
    </section>
  );
}
