import { supabase } from '../lib/supabase';
const BUCKET = 'site-images';
export const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// Redimensiona (máx. 1600 px de ancho) y convierte a WebP antes de subir: la web carga rápido sin que el equipo optimice nada
async function toWebp(file: File, maxW = 1600): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, maxW / bmp.width);
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('No se pudo procesar la imagen.'))), 'image/webp', 0.86));
}
export async function uploadImage(file: File, folder: string, name: string, keepPng = false): Promise<string> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  if (!file.type.startsWith('image/')) throw new Error('El archivo debe ser una imagen (JPG, PNG o WebP).');
  if (file.size > 15 * 1024 * 1024) throw new Error('La imagen pesa más de 15 MB.');
  let body: Blob = file; let ext = file.type === 'image/svg+xml' ? 'svg' : file.type === 'image/webp' ? 'webp' : 'png';
  if (!keepPng) { body = await toWebp(file); ext = 'webp'; }
  const path = `${folder}/${slugify(name) || 'img'}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, body, { contentType: body.type || 'image/png', cacheControl: '31536000' });
  if (error) throw new Error(error.message.includes('row-level') ? 'Sin permiso: ejecuta sql/3_panel_autoadministrable.sql y entra como administrador.' : error.message);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
export async function removeImageByUrl(url?: string | null) {
  if (!supabase || !url) return;
  const part = url.split(`/${BUCKET}/`)[1];
  if (part) await supabase.storage.from(BUCKET).remove([decodeURIComponent(part.split('?')[0])]);
}
