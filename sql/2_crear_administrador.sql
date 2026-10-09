-- LUMINA: ADMINISTRADOR. Ejecuta DESPUÉS de crear el usuario en Authentication > Users.
-- Cambia el correo por el del usuario que creaste y pulsa Run.
insert into public.profiles (id, email, role)
select id, email, 'admin' from auth.users where email = 'cristianmorenotrabajo@gmail.com'
on conflict (id) do update set role = 'admin';
