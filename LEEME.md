# Lumina Skin & Body Spa (React + Vite + Supabase)
## Supabase
1. Crea un proyecto en supabase.com.
2. SQL Editor > pega `sql/1_schema.sql` > Run.
3. Authentication > Users > Add user: tu correo y contraseña (marca "Auto Confirm User").
4. Authentication > Providers > Email: desactiva "Confirm email" (para crear usuarios desde el panel).
5. SQL Editor > pega `sql/2_crear_administrador.sql` con tu correo > Run.
6. Project Settings > API: copia Project URL y la clave anon/publishable.
7. Buckets: no necesitas ninguno por ahora.
## Netlify
1. Sube esta carpeta a GitHub (o arrastra el proyecto) y crea el sitio en Netlify.
2. Site configuration > Environment variables: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Deploy (build: `npm run build`, publish: `dist`).
4. Reemplaza TU-DOMINIO.netlify.app en index.html, public/robots.txt y public/sitemap.xml.
## Local
Rellena `.env`, luego `npm install` y `npm run dev`. Panel del equipo: /admin.

## Imágenes
Los visuales de `public/images/` son temporales (no son fotos). Para usar tus fotos: copia el archivo a `public/images/` y cambia la ruta en `src/data/images.ts`.
Logo: `public/images/logo-mark.png` (monograma) y `logo-full.png` (completo, fondo transparente).
