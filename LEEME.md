# Lumina Skin & Body Spa (React + Vite + Supabase)
## Supabase
1. Crea un proyecto en supabase.com.
2. SQL Editor > pega `sql/1_schema.sql` > Run.
3. Authentication > Users > Add user: tu correo y contraseña (marca "Auto Confirm User").
4. Authentication > Providers > Email: desactiva "Confirm email" (para crear usuarios desde el panel).
5. SQL Editor > pega `sql/2_crear_administrador.sql` con tu correo > Run.
5b. SQL Editor > pega `sql/3_panel_autoadministrable.sql` > Run (imágenes, textos, FAQ, orden de tratamientos y bucket `site-images`).
6. Project Settings > API: copia Project URL y la clave anon/publishable.
7. Buckets: no necesitas crear nada a mano; el SQL 3 crea el bucket público `site-images`.
## Netlify
1. Sube esta carpeta a GitHub (o arrastra el proyecto) y crea el sitio en Netlify.
2. Site configuration > Environment variables: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Deploy (build: `npm run build`, publish: `dist`).
4. Reemplaza TU-DOMINIO.netlify.app en index.html, public/robots.txt y public/sitemap.xml.
## Local
Rellena `.env`, luego `npm install` y `npm run dev`. Panel del equipo: /admin.

## Panel autoadministrable (/admin, solo administrador)
- **Tratamientos**: agregar, editar, ocultar, eliminar, reordenar, precio, duración, beneficios y foto.
- **Imágenes**: portadas, retrato de Mariana, galería (6 espacios) y monograma del logo. Se optimizan solas y conservan los efectos CSS.
- **Textos**: título/portada, franja de confianza, "Detrás de Lumina", introducciones, precio base y página Sobre Mariana.
- **Preguntas frecuentes**, **Testimonios**, **Datos del negocio** (WhatsApp, dirección, horario, redes) y **Equipo**.
- Los usuarios "staff" solo ven las citas.
Las imágenes originales siguen en `public/images/` y se usan como respaldo ("Restaurar original").
