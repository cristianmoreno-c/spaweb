-- LUMINA: SCHEMA GENERAL. Pega todo en Supabase > SQL Editor > Run (una sola vez).
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'staff' check (role in ('admin','staff')),
  created_at timestamptz default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, email, role) values (new.id, new.email, 'staff') on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_staff() returns boolean language sql security definer stable set search_path = public as
$$ select exists (select 1 from public.profiles where id = auth.uid()) $$;
create or replace function public.is_admin() returns boolean language sql security definer stable set search_path = public as
$$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

create table if not exists public.treatments (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('facial','corporal')),
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  benefits text[] default '{}',
  image_url text,
  duration text,
  price numeric,
  active boolean default true,
  created_at timestamptz default now()
);
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  testimonial text not null,
  rating int check (rating between 1 and 5),
  image_url text,
  active boolean default false,
  created_at timestamptz default now()
);
create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  phone text not null,
  treatment_id uuid references public.treatments(id) on delete set null,
  preferred_date date,
  preferred_time text,
  message text,
  status text not null default 'pending' check (status in ('pending','contacted','confirmed','cancelled')),
  created_at timestamptz default now()
);
create table if not exists public.business_settings (
  id int primary key default 1 check (id = 1),
  business_name text, whatsapp text, address text, opening_hours text,
  instagram_url text, facebook_url text, tiktok_url text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.treatments enable row level security;
alter table public.testimonials enable row level security;
alter table public.booking_requests enable row level security;
alter table public.business_settings enable row level security;

drop policy if exists "profiles_own_or_admin" on public.profiles;
create policy "profiles_own_or_admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "treatments_read" on public.treatments;
create policy "treatments_read" on public.treatments for select using (active or public.is_staff());
drop policy if exists "treatments_admin" on public.treatments;
create policy "treatments_admin" on public.treatments for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "testimonials_read" on public.testimonials;
create policy "testimonials_read" on public.testimonials for select using (active or public.is_staff());
drop policy if exists "testimonials_admin" on public.testimonials;
create policy "testimonials_admin" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "settings_read" on public.business_settings;
create policy "settings_read" on public.business_settings for select using (true);
drop policy if exists "settings_admin" on public.business_settings;
create policy "settings_admin" on public.business_settings for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "booking_insert_public" on public.booking_requests;
create policy "booking_insert_public" on public.booking_requests for insert with check (status = 'pending');
drop policy if exists "booking_staff_read" on public.booking_requests;
create policy "booking_staff_read" on public.booking_requests for select using (public.is_staff());
drop policy if exists "booking_staff_update" on public.booking_requests;
create policy "booking_staff_update" on public.booking_requests for update using (public.is_staff()) with check (public.is_staff());

insert into public.business_settings (id, business_name, whatsapp, address, opening_hours)
values (1, 'Lumina Skin & Body Spa', '+59176084781', 'Barrio Estación Argentina, Calle San Rafael #71', 'Lunes a sábado 09:00–18:00')
on conflict (id) do nothing;

insert into public.treatments (category, name, slug, short_description) values
('facial','Limpieza facial profunda','limpieza-facial-profunda','Un ritual de limpieza adaptado al tipo de tu piel.'),
('facial','Hidratación intensiva','hidratacion-intensiva','Cuidado pensado para aportar hidratación a tu piel.'),
('facial','Peeling químico','peeling-quimico','Tratamiento cosmético de renovación, indicado tras una valoración.'),
('facial','Tratamiento antiage','tratamiento-antiage','Cuidado facial enfocado en el bienestar de la piel madura.'),
('facial','Rejuvenecimiento','rejuvenecimiento','Protocolo facial para realzar la luminosidad de tu piel.'),
('corporal','Masajes reductores','masajes-reductores','Masaje corporal enfocado en el cuidado de tu figura.'),
('corporal','Maderoterapia','maderoterapia','Masaje corporal con instrumentos de madera.'),
('corporal','Drenaje linfático','drenaje-linfatico','Masaje suave y rítmico para sentirte más liviana.'),
('corporal','Reafirmación corporal','reafirmacion-corporal','Cuidado corporal para tonificar y cuidar tu piel.'),
('corporal','Masajes de relajación','masajes-de-relajacion','Un espacio para soltar tensión y desconectarte.')
on conflict (slug) do nothing;
