import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
type Req = { id: string; client_name: string; phone: string; message: string | null; status: string; preferred_date: string | null; created_at: string };
const STATUS = ['pending', 'contacted', 'confirmed', 'cancelled'];
const LABEL: Record<string, string> = { pending: 'Pendiente', contacted: 'Contactada', confirmed: 'Confirmada', cancelled: 'Cancelada' };
export default function BookingsTab({ isAdmin }: { isAdmin: boolean }) {
  const [reqs, setReqs] = useState<Req[]>([]);
  const load = async () => {
    const { data } = await supabase!.from('booking_requests').select('*').order('created_at', { ascending: false });
    setReqs((data as Req[]) || []);
  };
  useEffect(() => { load(); }, []);
  const setStatus = async (id: string, status: string) => { await supabase!.from('booking_requests').update({ status }).eq('id', id); load(); };
  const del = async (id: string) => { if (confirm('¿Eliminar esta solicitud?')) { await supabase!.from('booking_requests').delete().eq('id', id); load(); } };
  return (
    <div>
      <h2>Solicitudes de cita</h2>
      {reqs.length === 0 && <p>Aún no hay solicitudes.</p>}
      {reqs.length > 0 && (
        <div className="scroll"><table>
          <thead><tr><th>Recibida</th><th>Nombre</th><th>Teléfono</th><th>Fecha pref.</th><th>Mensaje</th><th>Estado</th>{isAdmin && <th />}</tr></thead>
          <tbody>{reqs.map((r) => (
            <tr key={r.id}><td>{new Date(r.created_at).toLocaleDateString('es-BO')}</td><td>{r.client_name}</td>
              <td><a href={`https://wa.me/${r.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">{r.phone}</a></td>
              <td>{r.preferred_date ?? ''}</td><td>{r.message}</td>
              <td><select aria-label="Estado" value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>{STATUS.map((s) => <option key={s} value={s}>{LABEL[s]}</option>)}</select></td>
              {isAdmin && <td><button className="btn btn-ghost btn-sm" onClick={() => del(r.id)}>Eliminar</button></td>}</tr>))}
          </tbody></table></div>
      )}
    </div>
  );
}
