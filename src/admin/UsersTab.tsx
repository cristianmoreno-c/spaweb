import { FormEvent, useState } from 'react';
import { createIsolatedClient } from '../lib/supabase';
export default function UsersTab() {
  const [err, setErr] = useState(''); const [info, setInfo] = useState('');
  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr(''); setInfo('');
    const form = e.currentTarget; const f = new FormData(form);
    const { error } = await createIsolatedClient()!.auth.signUp({ email: String(f.get('email')), password: String(f.get('password')) });
    if (error) setErr(error.message); else { setInfo('Usuario creado. Ya puede ingresar (solo ve las citas).'); form.reset(); }
  };
  return (
    <form className="form narrow" onSubmit={createUser}>
      <h2>Crear usuario del equipo</h2>
      <p className="hint">Los usuarios nuevos ven únicamente las solicitudes de cita. Solo el administrador edita el sitio.</p>
      <label>Correo<input name="email" type="email" required /></label>
      <label>Contraseña (mínimo 6 caracteres)<input name="password" type="password" minLength={6} required /></label>
      <button className="btn btn-primary">Crear usuario</button>{err && <p role="alert" className="bad">{err}</p>}{info && <p role="status" className="ok">{info}</p>}
    </form>
  );
}
