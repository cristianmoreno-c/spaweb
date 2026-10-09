# Prompt de rediseño v2 – Lumina Skin & Body Spa ("Luz que cuida")
Actúa como director de arte y diseñador web senior (React + TypeScript + Vite). Rediseña la capa visual del proyecto sin romper Supabase, .env, /admin ni WhatsApp. Objetivo: que no parezca una plantilla ni hecha con prompts básicos, sino una marca boutique única, armónica y fiel al logo adjunto.
## Concepto
"Luz que cuida": resplandor cálido que se desplaza lento tras el hero y el CTA; monograma L como marca de agua tenue (6%) en 2–3 secciones; filete cobre de 1px como único adorno.
## Tipografía (derivada del logo)
Titulares: Cormorant Garamond 300/400 con cursiva en una frase clave (≥32px). Texto, menú y botones: Jost 400/500. Etiquetas: Jost 500, 12px, mayúsculas, tracking .22em. H1 clamp(46px,7.2vw,100px) lh 1.02; H2 clamp(34px,4.6vw,60px); texto 15–17px lh 1.75, máx. 62 caracteres por línea. Máx. 2 fuentes y 2 pesos.
## Color (muestreado del logo)
Fondo crema #F5EFE9; arena #EFE4DB; durazno #EFC9B2; cobre #B98969 (decorativo) y #8A5F45 (texto/botones, contraste AA); filete #C99860; tinta #2D3134; grafito #4A4E51 para el único bloque oscuro; texto secundario #6E6863. Proporción 60/30/10. Sin dorado amarillo.
## Sistema
Rejilla 12 col, contenedor 1200px, gutter 32px; escala 8·16·24·48·96·144; secciones de 144px (80 en móvil); radio 2px; íconos de línea trazo 1.2; sombras casi nulas.
## Composición
Alineación izquierda salvo el CTA final. Hero asimétrico: texto cols 1–7, foto vertical 4:5 pegada al borde derecho, titular solapando la foto, texto vertical "Santa Cruz de la Sierra · Bolivia". Franja de datos con filetes. Mariana (5/6 cols) con retrato, texto de marca y cita de marca (no inventar palabras de ella). "Carta de tratamientos": lista numerada 01–10 con nombre grande, acordeón con descripción, beneficios, "Desde Bs 150" y WhatsApp; en escritorio, vista previa sticky de la foto del tratamiento. "Encuentra tu ritual": 3 preguntas con chips que generan un mensaje de WhatsApp. "Cómo es tu visita": 4 pasos con números grandes en contorno. Galería editorial de tamaños variados con lightbox. Beneficios con íconos de línea. Testimonios + FAQ en dos columnas. Horario/contacto/mapa. CTA oscuro con resplandor. Footer con legales.
## Imágenes
Luz natural cálida, mismo tratamiento de color; retratos 4:5, galería variada, hero 4:5. Sin poses de stock, texto ni marcadores vacíos visibles. Sistema reemplazable en src/data/images.ts. Logo real (monograma + wordmark tipográfico), favicon y og-image recortados del logo.
## Movimiento
Solo: resplandor del hero, entrada escalonada del titular, revelado suave al scroll, hover de la carta. Respetar prefers-reduced-motion.
## Reglas
No inventar testimonios, precios, duraciones, credenciales, años, promociones ni fotos reales. Placeholders: [BIOGRAFIA_MARIANA], [FORMACION_MARIANA], [CERTIFICACIONES], [EXPERIENCIA_PROFESIONAL], [TESTIMONIOS_CLIENTAS_PENDIENTES]. Sin "cura/elimina/garantiza". WhatsApp +591 76084781; claves solo en .env.
## Control anti-"hecho con IA"
Nada de 3 tarjetas iguales seguidas; un punto focal por pantalla; mismo ritmo de espaciado; dorado/cobre solo como detalle; accesibilidad AA y mobile-first (360/390/768/1280).
