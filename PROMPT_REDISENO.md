# Prompt de rediseño web – Lumina Skin & Body Spa
Actúa como director creativo y diseñador web senior de spas y marcas de belleza premium (React + TypeScript + Vite). Rediseña toda la capa visual del proyecto adjunto sin romper Supabase, .env, /admin ni WhatsApp.
Referencia de estructura: https://www.splashbabyspa.com/santa-cruz (hero a pantalla completa con foto, secciones aireadas con títulos centrados, galería de instalaciones, bloques claros de horario/contacto/mapa/formulario, WhatsApp flotante). Lumina debe verse más lujosa y editorial.
## Arte
- Lujo discreto, femenino, minimalista. Paleta fija: Rose #E8B4B8, Graphite #4A4E51, Champagne #D4AF37 (solo acento), Ivory #FAFAFA, Dark #2D3134, más tonos derivados (blush, arena).
- Playfair Display (títulos grandes) + Montserrat. Espaciado generoso (96–140px), radios 2–8px, sombras casi imperceptibles, líneas finas doradas.
- Evitar: plantilla, tarjetas idénticas, degradados fuertes, exceso de dorado/rosa, emojis, estética clínica.
## Imágenes
Hero full-bleed 100vh con velo suave; imagen por tratamiento (ratio uniforme, lazy); galería masonry con lightbox; sistema de imágenes reemplazables (data/images.ts); prompts de IA coherentes y marcados como conceptuales; logo oficial reemplazable.
## Estructura del inicio
Header transparente→marfil; hero; franja de confianza; bienvenida; tratamientos con pestañas; experiencia en 4 pasos; nuestro espacio (galería); beneficios con iconos de línea; testimonios (placeholder); FAQ; horario/contacto/mapa; CTA final grafito; footer completo con legales.
## Extras
WhatsApp flotante; animación de entrada del hero + revelado al scroll (respeta reduced-motion); páginas internas al mismo nivel; 404; aviso legal y privacidad; WebP/AVIF; Lighthouse >90; accesibilidad AA; SEO local; mobile-first (360/390/768/1280).
## Reglas
No inventar testimonios, precios, duraciones, credenciales, años, promociones ni fotos reales; usar placeholders [BIOGRAFIA_MARIANA], [FORMACION_MARIANA], [CERTIFICACIONES], [EXPERIENCIA_PROFESIONAL], [TESTIMONIOS_CLIENTAS_PENDIENTES]. Sin "cura/elimina/garantiza". WhatsApp +591 76084781; claves solo en .env.
## Entrega
ZIP actualizado que compile (npm run build); lista de imágenes a reemplazar (archivo, tamaño, ratio) con prompt de IA; resumen de cambios y pasos de Netlify.
