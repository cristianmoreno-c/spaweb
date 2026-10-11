import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSite } from '../context/SiteData';
import { TEXT_FIELDS } from '../data/content';
export default function TextsTab() {
  const { txt, contentRows, refresh } = useSite();
  const [draft, setDraft] = useState<Record<string, string>>(() => Object.fromEntries(TEXT_FIELDS.map((f) => [f.key, txt(f.key)])));
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const groups = Array.from(new Set(TEXT_FIELDS.map((f) => f.group)));
  const save = async () => {
    setBusy(true); setMsg(''); setErr('');
    const up: { key: string; value: string; updated_at: string }[] = []; const del: string[] = [];
    for (const f of TEXT_FIELDS) {
      const v = (draft[f.key] ?? '').trim();
      if (!v || v === f.def) { if (contentRows[f.key] !== undefined) del.push(f.key); } else if (v !== contentRows[f.key]) up.push({ key: f.key, value: v, updated_at: new Date().toISOString() });
    }
    let e1: { message: string } | null = null; let e2: { message: string } | null = null;
    if (up.length) e1 = (await supabase!.from('site_content').upsert(up)).error;
    if (del.length) e2 = (await supabase!.from('site_content').delete().in('key', del)).error;
    setBusy(false);
    if (e1 || e2) setErr((e1 || e2)!.message); else { setMsg('Guardado. Ya se ve en el sitio.'); refresh(); }
  };
  const restore = (k: string, def: string) => setDraft({ ...draft, [k]: def });
  return (
    <div>
      <h2>Textos del sitio</h2>
      <p className="hint">Cambia los textos principales. Si borras un campo o pulsas “Restaurar”, vuelve el texto original.</p>
      {groups.map((g) => (
        <fieldset key={g} className="admin-card"><legend>{g}</legend>
          {TEXT_FIELDS.filter((f) => f.group === g).map((f) => (
            <label key={f.key} className="form-row">{f.label}
              {f.multiline ? <textarea rows={3} value={draft[f.key] ?? ''} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
                : <input value={draft[f.key] ?? ''} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />}
              <span className="hint">{f.help}{f.help ? ' · ' : ''}<button type="button" className="linklike" onClick={() => restore(f.key, f.def)}>Restaurar original</button></span>
            </label>))}
        </fieldset>))}
      <div className="row"><button className="btn btn-primary" disabled={busy} onClick={save}>{busy ? 'Guardando…' : 'Guardar cambios'}</button></div>
      {msg && <p role="status" className="ok">{msg}</p>}{err && <p role="alert" className="bad">{err}</p>}
    </div>
  );
}
