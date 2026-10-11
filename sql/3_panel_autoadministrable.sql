-- LUMINA: PANEL AUTOADMINISTRABLE. Ejecuta DESPUÉS de 1_schema.sql (Supabase > SQL Editor > Run).
-- Es seguro correrlo más de una vez.

-- 1) Tratamientos: orden y beneficios por defecto
alter table public.treatments add column if not exists sort_order int not null default 0;

update public.treatments t set sort_order = v.o
from (values
  ('limpieza-facial-profunda',1),('hidratacion-intensiva',2),('peeling-quimico',3),('tratamiento-antiage',4),('rejuvenecimiento',5),
  ('masajes-reductores',6),('maderoterapia',7),('drenaje-linfatico',8),('reafirmacion-corporal',9),('masajes-de-relajacion',10)
) as v(slug,o)
where t.slug = v.slug and t.sort_order = 0;

update public.treatments t set benefits = v.b
from (values
  ('limpieza-facial-profunda', array['Protocolo según tu piel','Sensación de frescura','Atención personalizada']),
  ('hidratacion-intensiva',    array['Piel cuidada y confortable','Productos seleccionados para ti','Momento de pausa']),
  ('peeling-quimico',          array['Valoración previa','Protocolo adaptado','Acompañamiento posterior']),
  ('tratamiento-antiage',      array['Enfoque personalizado','Cuidado integral del rostro','Rutina recomendada']),
  ('rejuvenecimiento',         array['Aspecto cuidado y luminoso','Protocolo a tu medida','Experiencia relajante']),
  ('masajes-reductores',       array['Atención personalizada','Técnica adaptada','Sensación de ligereza']),
  ('maderoterapia',            array['Técnica manual','Cuidado corporal','Bienestar y relajación']),
  ('drenaje-linfatico',        array['Movimientos suaves','Sensación de descanso','Atención cercana']),
  ('reafirmacion-corporal',    array['Protocolo personalizado','Cuidado de la piel del cuerpo','Experiencia de bienestar']),
  ('masajes-de-relajacion',    array['Ambiente privado','Pausa del ritmo diario','Bienestar integral'])
) as v(slug,b)
where t.slug = v.slug and (t.benefits is null or t.benefits = '{}');

-- 2) Imágenes editables del sitio (portadas, galería, retrato, logo)
create table if not exists public.site_images (
  key text primary key,
  url text not null,
  alt text,
  updated_at timestamptz default now()
);

-- 3) Textos editables del sitio
create table if not exists public.site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- 4) Preguntas frecuentes
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz default now()
);

alter table public.site_images enable row level security;
alter table public.site_content enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "site_images_read" on public.site_images;
create policy "site_images_read" on public.site_images for select using (true);
drop policy if exists "site_images_admin" on public.site_images;
create policy "site_images_admin" on public.site_images for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "site_content_read" on public.site_content;
create policy "site_content_read" on public.site_content for select using (true);
drop policy if exists "site_content_admin" on public.site_content;
create policy "site_content_admin" on public.site_content for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "faqs_read" on public.faqs;
create policy "faqs_read" on public.faqs for select using (active or public.is_staff());
drop policy if exists "faqs_admin" on public.faqs;
create policy "faqs_admin" on public.faqs for all using (public.is_admin()) with check (public.is_admin());

-- 5) El admin puede borrar solicitudes de cita (spam / pruebas)
drop policy if exists "booking_admin_delete" on public.booking_requests;
create policy "booking_admin_delete" on public.booking_requests for delete using (public.is_admin());

-- 6) Horario con "Domingo: cerrado" (solo si sigue con el valor original)
update public.business_settings
set opening_hours = E'Lunes a sábado: 09:00–18:00\nDomingo: cerrado'
where id = 1 and opening_hours = 'Lunes a sábado 09:00–18:00';

-- 7) Preguntas frecuentes iniciales (solo si la tabla está vacía)
insert into public.faqs (question, answer, sort_order)
select * from (values
  ('¿Cuánto cuestan los tratamientos?','Los tratamientos parten desde Bs 150. Escríbele a Mariana por WhatsApp para conocer el precio del tuyo.',1),
  ('¿Cómo agendo mi cita?','Por WhatsApp o con el formulario de contacto. Una solicitud no es una reserva hasta que Mariana la confirme.',2),
  ('¿Cómo sé qué tratamiento es para mí?','Puedes reservar una valoración: Mariana te escucha y te orienta según tus necesidades.',3),
  ('¿Dónde están y cuál es el horario?','Barrio Estación Argentina, Calle San Rafael #71. Atendemos de lunes a sábado de 09:00 a 18:00.',4)
) as v(q,a,o)
where not exists (select 1 from public.faqs);

-- 8) Almacenamiento de imágenes (bucket público: lectura para todos, escritura solo admin)
insert into storage.buckets (id, name, public) values ('site-images','site-images',true)
on conflict (id) do update set public = true;

drop policy if exists "site_images_storage_read" on storage.objects;
create policy "site_images_storage_read" on storage.objects for select using (bucket_id = 'site-images');
drop policy if exists "site_images_storage_insert" on storage.objects;
create policy "site_images_storage_insert" on storage.objects for insert with check (bucket_id = 'site-images' and public.is_admin());
drop policy if exists "site_images_storage_update" on storage.objects;
create policy "site_images_storage_update" on storage.objects for update using (bucket_id = 'site-images' and public.is_admin());
drop policy if exists "site_images_storage_delete" on storage.objects;
create policy "site_images_storage_delete" on storage.objects for delete using (bucket_id = 'site-images' and public.is_admin());
