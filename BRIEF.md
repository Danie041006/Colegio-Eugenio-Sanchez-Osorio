# BRIEF — Sitio web Colegio Eugenio Sánchez Osorio

> Documento de partida y fuente de verdad. Los textos entre `[corchetes]` son datos por confirmar. Si un dato no existe, déjalo como `TODO`; no lo inventes.

## 0. Supuestos de este brief

- El proyecto es el **sitio web institucional de un colegio** (no una app interna).
- La audiencia principal son **familias que evalúan inscribir a sus hijos**.
- La acción más valiosa es **agendar una visita** o **solicitar información**.
- El sitio debe transmitir **confianza, calidez y rigurosidad académica**.
- Nombre oficial: **Colegio Eugenio Sánchez Osorio**.
- Identidad visual: **blanco y azul rey**. El blanco domina; el azul rey funciona como color institucional y de acción.

Si alguno de estos supuestos es falso, corrígelo antes de avanzar.

---

## 1. Resumen del proyecto

| Campo | Definición |
|---|---|
| Producto | Sitio web institucional, multipágina, responsive |
| Objetivo de negocio | Aumentar las solicitudes de admisión y las visitas al colegio |
| Objetivo de las familias | Entender si el colegio es una buena opción para su hijo/a y saber cómo postular |
| Propuesta de valor | `[Una frase concreta: qué hace diferente a este colegio]` |
| Tono | Cercano, claro y seguro. Institucional sin ser frío; nunca corporativo-genérico ni infantil |
| Idiomas | `[Español / bilingüe]` |
| CTA principal | **Agendar una visita** |
| CTA secundario | **Solicitar información** / **Descargar prospecto** |
| Enlace utilitario | **Portal de familias** |

### Mensaje central (borrador)

> Un colegio donde cada estudiante aprende a pensar, convivir y hacerse cargo de su futuro.

Reemplazar por el mensaje oficial del colegio. Debe ser específico: evitar “excelencia”, “formación integral” y “valores” sin pruebas concretas.

---

## 2. Público y tareas críticas

### Segmentos

1. **Familias nuevas (70%).** Padres/madres de 30–45 años, buscan colegio para inicial, primaria o secundaria. Llegan desde Google, Instagram o recomendación. Están comparando 2–3 opciones.
2. **Familias actuales (20%).** Necesitan calendario, circulares, contacto y portal.
3. **Docentes y proveedores (10%).** Buscan información institucional, vacantes o contacto.

### Top 5 tareas del usuario

| # | Tarea | Éxito |
|---|---|---|
| 1 | Entender la propuesta educativa y si encaja con su hijo/a | Puede explicar en una frase qué hace diferente al colegio |
| 2 | Conocer niveles, edades y jornada | Encuentra la información en menos de 2 clics |
| 3 | Entender el proceso de admisión, fechas y requisitos | Llega al checklist completo sin preguntar |
| 4 | Agendar una visita o dejar sus datos | Formulario enviado en menos de 90 segundos |
| 5 | Encontrar ubicación, horario y contacto | Ve mapa, teléfono y WhatsApp sin buscar |

### Métricas de éxito

- **Primaria:** solicitudes de visita completadas / mes.
- **Secundarias:** clics a “Solicitar información”, descargas del prospecto, tiempo hasta el primer CTA.
- **Experiencia:** 5 de 5 usuarios completan las tareas 2 y 4 sin ayuda; 4 de 5 completan la 1.
- **Técnicas:** LCP < 2.5 s, CLS < 0.1, INP < 200 ms, Lighthouse accesibilidad ≥ 95.

---

## 3. Arquitectura de información

### Navegación principal

`Inicio` · `Admisiones` · `Niveles` · `Vida escolar` · `Nosotros` · `Contacto` + botón **Agendar visita**

### Páginas

| Ruta | Trabajo de la página | CTA principal | Secciones mínimas |
|---|---|---|---|
| `/` | Convencer en 15 segundos y orientar | Agendar visita | Hero, diferenciales, niveles, proceso, vida escolar, testimonio, FAQ corta, CTA final |
| `/admisiones` | Eliminar incertidumbre del proceso | Iniciar solicitud | Fechas, pasos, requisitos, formulario, FAQ, contacto directo |
| `/niveles` | Ayudar a elegir el nivel correcto | Agendar visita al nivel | Inicial, Primaria, Secundaria: edades, jornada, metodología, foto |
| `/niveles/[nivel]` | Profundizar | Agendar visita | Enfoque, materias, horario, actividades, equipo, testimonio |
| `/vida-escolar` | Mostrar la experiencia real | Ver calendario / Admisiones | Noticias, eventos, galería, actividades extracurriculares |
| `/nosotros` | Construir confianza | Conocer al equipo / Visitar | Historia, misión, equipo, instalaciones, acreditaciones |
| `/contacto` | Resolver la última duda | Escribir / Llamar / Visitar | Formulario, mapa, horarios, teléfono, WhatsApp, dirección |
| `/familias` | Acceso de familias actuales | Entrar al portal | Accesos, circulares, calendario, contacto interno |
| `/politica-de-privacidad` | Cumplimiento | — | Tratamiento de datos, cookies, contacto |

### Flujo de admisión

```
Inicio / Google / Instagram
        ↓
Hero o sección de admisiones
        ↓
Página /admisiones (fechas + pasos + requisitos)
        ↓
Formulario corto (5 campos máximo en el primer paso)
        ↓
Confirmación clara + qué pasa después + contacto directo
        ↓
Visita guiada / entrevista
```

Reglas:

- El formulario no debe pedir más de lo necesario para el primer contacto: nombre, email, teléfono, nivel de interés, mensaje.
- Después del envío: confirmación en pantalla, correo automático y promesa explícita de tiempo de respuesta.
- El teléfono y WhatsApp deben estar visibles en todas las páginas (header o footer).
- Evitar PDFs como única fuente de información; el contenido clave debe estar en HTML.

---

## 4. Dirección de diseño

### Concepto

**“Institucional luminoso con alma editorial”: blanco dominante, azul rey como sello de confianza y fotografía real como protagonista.** Se parece más a una buena publicación de colegio que a una plantilla de SaaS. La calidez viene del contenido y de la fotografía, no de colores cálidos; los efectos decorativos sobran.

### Principios

1. **Claridad antes que sorpresa.** Si una animación retrasa la lectura, se elimina.
2. **Una acción principal por pantalla.** El resto son enlaces secundarios.
3. **Confianza con evidencia.** Fotos reales, cifras verificables, nombres y testimonios con consentimiento.
4. **Calidez sin infantilizar.** El colegio es para familias, no para niños de 5 años.
5. **Accesibilidad desde el inicio.** No es una capa final.

### Paleta

| Token | Hex | Uso |
|---|---|---|
| `--color-royal` | `#1B3A8F` | Primario: botones, enlaces, acentos, bloques de énfasis. 10.25:1 sobre blanco |
| `--color-royal-dark` | `#122A6B` | Hover/active, footer, texto sobre celeste. 13.38:1 sobre blanco |
| `--color-navy` | `#0F172A` | Texto principal. 17.85:1 sobre blanco |
| `--color-muted` | `#5A6475` | Texto secundario. 5.98:1 sobre blanco; 5.56:1 sobre mist |
| `--color-white` | `#FFFFFF` | Fondo principal y texto sobre azul |
| `--color-mist` | `#F4F7FC` | Fondo alterno de secciones |
| `--color-sky` | `#DCE6F7` | Bloques suaves, tarjetas, hover. Texto royal encima: 8.15:1 |
| `--color-sky-strong` | `#B9CCEE` | Bordes, separadores y detalles |

Reglas de uso:

- El **blanco domina**; el azul rey aparece en acciones, títulos y bloques puntuales.
- Si el colegio ya tiene un azul oficial, sustituir `#1B3A8F` por ese valor y verificar de nuevo el contraste (mínimo 4.5:1 sobre blanco).
- Alternar secciones blanco → mist → un bloque royal por página. No pintar todo de azul.
- En fondos royal, el foco y los botones usan blanco; en fondos claros, azul rey.
- No introducir un tercer color de marca. Si se necesita un acento, usar `sky` o `sky-strong`.

Evitar: degradados azul-morado o azul-turquesa, glassmorphism, neón, sombras difusas grandes, exceso de tarjetas blancas sobre gris.

### Cómo se aplica el color

| Zona | Fondo | Texto | Detalle |
|---|---|---|---|
| Header | Blanco | Navy / royal | CTA royal, borde inferior `sky-strong` |
| Hero | Blanco o mist | Navy, titular con palabra clave en royal | CTA royal + secundario outline |
| Banda de confianza | Mist | Navy / muted | Cifras en royal |
| Niveles | Blanco | Navy | Tarjetas con borde `sky`, hover `mist` |
| Proceso de admisión | Royal | Blanco | Pasos con círculos white/royal; CTA invertido |
| Vida escolar | Mist | Navy | Fechas y categorías en royal |
| Testimonio | Blanco | Navy | Comillas y firma en royal |
| CTA final | Royal-dark | Blanco | Botón blanco con texto royal |
| Footer | Royal-dark | Blanco / sky | Enlaces en blanco, hover subrayado |

### Tipografía

- **Display:** `Fraunces` (serif variable, cálida y con carácter). Títulos y cifras grandes.
- **Texto:** `Inter` (sans legible). Párrafos, navegación, formularios.
- Alternativa: `Lora` + `Source Sans 3`.
- Cargar con `next/font` y subsets `latin`. Máximo 2 familias.

Escala sugerida (desktop / mobile):

| Rol | Tamaño | Line-height |
|---|---|---|
| H1 | 56 / 38 px | 1.05 |
| H2 | 40 / 30 px | 1.15 |
| H3 | 24 / 21 px | 1.25 |
| Body | 18 / 17 px | 1.65 |
| Small | 14 / 14 px | 1.5 |
| Label | 12 / 12 px | 1.4, tracking 0.08em, mayúsculas |

### Espaciado, radios y sombras

- Base 4 px. Escala: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120.
- Sección vertical: 96–120 px desktop, 48–64 px mobile.
- Ancho de contenido: 1200 px máximo; texto de lectura: 65–75 caracteres.
- Radios: 8 px (inputs/botones), 16 px (tarjetas), 24 px (bloques destacados). No mezclar 4 radios distintos.
- Sombras: solo una, sutil, para elementos elevados. Preferir bordes de 1 px.

### Fotografía e ilustración

- Fotos reales del colegio, estudiantes y docentes, con consentimiento de imagen.
- **Nunca generar niños con IA** para un sitio escolar: es un riesgo ético y de confianza.
- La IA sí puede servir para: moodboards, texturas, patrones, ilustraciones abstractas, íconos y composición de referencias.
- Toda foto necesita `alt` descriptivo. Las decorativas, `alt=""`.
- Evitar fotos de stock sonriendo a cámara. Preferir momentos de trabajo, patio, laboratorio, lectura.

### Movimiento

- 150–300 ms, ease-out. Solo para orientar (aparición de menú, feedback, cambio de estado).
- Respetar `prefers-reduced-motion`.
- Prohibido: parallax pesado, carruseles automáticos, texto que aparece letra por letra, animaciones en loop.

### Anti-patrones específicos

- Hero con tres botones del mismo peso.
- Sección de “tres tarjetas genéricas” sin contenido diferenciado.
- Azul rey aplicado a todos los fondos, sin respirar en blanco.
- Degradados azul-morado o efectos de “tech” que resten confianza institucional.
- Emojis como iconos del sistema.
- Texto sobre imágenes sin capa de contraste.
- Menú móvil que oculta el CTA de admisiones.
- Formularios sin estados de error, éxito o carga.
- Fechas de admisión desactualizadas o ambiguas.

---

## 5. Inventario de componentes

| Componente | Notas |
|---|---|
| `SiteHeader` | Logo, nav, CTA, acceso a portal, menú móvil accesible |
| `SiteFooter` | Contacto, dirección, horarios, redes, privacidad |
| `SkipLink` | Primer elemento focusable |
| `Button` | Variantes: primary (azul rey), secondary (borde azul), ghost; inverso (blanco sobre azul) en secciones royal; tamaños sm/md/lg |
| `SectionHeader` | Eyebrow, título, bajada; alineación consistente |
| `LevelCard` | Nivel, edades, jornada, imagen, enlace |
| `AdmissionSteps` | Timeline de 3–5 pasos con fechas |
| `NewsCard` | Imagen, categoría, fecha, título |
| `EventList` | Fecha, título, lugar; formato escaneable |
| `Testimonial` | Cita, nombre, relación con el colegio, foto opcional |
| `FAQAccordion` | Accesible con teclado, `aria-expanded`, sin auto-cierre |
| `ContactForm` | Labels visibles, validación inline, resumen de errores |
| `Breadcrumbs` | En páginas internas |
| `AnnouncementBar` | Solo si hay un aviso realmente urgente; descartable |
| `Stat` | Cifra + etiqueta; no inventar cifras |

---

## 6. Modelo de contenido

Preparar el sitio para editar contenido sin tocar código (CMS o archivos tipados).

- **Página:** título, slug, SEO title, meta description, OG image, secciones.
- **Nivel:** nombre, edades, jornada, descripción, metodología, materias, foto, CTA.
- **Noticia:** título, slug, fecha, categoría, extracto, cuerpo, imagen, autor.
- **Evento:** título, fecha inicio/fin, lugar, descripción, público, enlace.
- **FAQ:** pregunta, respuesta, categoría, orden.
- **Testimonio:** cita, nombre, relación, foto, consentimiento.
- **Ajustes globales:** nombre, logo, teléfono, WhatsApp, email, dirección, horarios, redes, fechas de admisión.

Ningún dato de contacto debe estar hardcodeado en los componentes.

---

## 7. Requisitos técnicos

### Ruta A — Next.js (recomendada)

- Next.js con App Router, TypeScript estricto.
- Tailwind CSS v4 + `shadcn/ui` como base de componentes.
- `next/font` para Fraunces e Inter.
- `next/image` con imágenes locales optimizadas.
- Formularios con validación en cliente y servidor (Zod). Envío por endpoint propio o servicio transaccional.
- Contenido en `content/` tipado o CMS headless (Sanity/Contentful) si el colegio va a editar seguido.
- Despliegue en Vercel o similar, con dominio y SSL.
- Analítica: Vercel Analytics o Plausible + eventos de CTA y envío de formulario.
- Sin librerías de UI adicionales sin justificarlo.

### Ruta B — Framer

- Usar el mismo brief y tokens.
- CMS de Framer para noticias/eventos.
- Formulario nativo o integración con el CRM del colegio.
- Revisar accesibilidad y peso de imágenes antes de publicar.

### Rendimiento y SEO

- Imágenes en AVIF/WebP, dimensiones explícitas, `loading="lazy"` salvo el hero.
- Presupuesto: JS inicial < 150 KB gzip; fuentes < 100 KB; LCP < 2.5 s en 4G.
- Metadatos por página, canonical, sitemap, robots, OG image.
- Datos estructurados `EducationalOrganization` y `FAQPage` cuando aplique.
- URLs legibles, sin fechas ni IDs.

### Accesibilidad (WCAG 2.2 AA)

- Contraste mínimo 4.5:1 en texto normal; 3:1 en texto grande y componentes.
- Navegación completa con teclado y foco visible.
- Un solo `h1` por página; jerarquía de encabezados correcta.
- Labels visibles; errores descritos en texto, no solo en color.
- `prefers-reduced-motion` respetado.
- Skip link y landmarks (`header`, `nav`, `main`, `footer`).
- Formularios con `autocomplete` y tipos de input correctos.

---

## 8. Definition of Done

Una página está terminada cuando:

- [ ] Tiene contenido real y aprobado; no queda lorem ipsum.
- [ ] Cumple una sola tarea principal y su CTA es evidente.
- [ ] Funciona en 360, 768, 1024 y 1440 px.
- [ ] Es navegable solo con teclado, con foco visible.
- [ ] Pasa axe sin errores críticos y contraste AA.
- [ ] LCP < 2.5 s y CLS < 0.1 en móvil.
- [ ] Tiene title, meta description, canonical y OG image.
- [ ] Los enlaces internos y externos funcionan; no hay 404.
- [ ] El formulario valida, envía, confirma y maneja errores.
- [ ] Los eventos de analítica disparan en CTA y envío.
- [ ] Se probó con 5 personas y las tareas críticas se completan.
- [ ] No hay errores en consola ni warnings de hidratación.

---

## 9. Plan de trabajo

| Fase | Tiempo | Entregable |
|---|---|---|
| 0. Confirmar brief y datos | 30 min | Este documento sin placeholders críticos |
| 1. Inventario de contenido | 2–3 h | Textos, fotos, fechas, contactos, logos |
| 2. Arquitectura y wireframes | 2–4 h | Sitemap validado + wireframes de Inicio y Admisiones |
| 3. Dirección visual y tokens | 2–4 h | Moodboard, paleta, tipografía, componentes base |
| 4. Prototipo hi-fi | 4–8 h | Inicio + Admisiones navegables en Figma Make |
| 5. Test con 5 personas | 1–2 h | Hallazgos priorizados y ajustes |
| 6. Implementación | 2–4 días | Sitio completo en Next.js o Framer |
| 7. QA y publicación | 1 día | Checklist DoD, dominio, analítica |
| 8. Iteración | Continuo | Mejoras con datos de uso |

---

## 10. Preguntas abiertas

- [ ] ¿Nombre oficial y logo del colegio?
- [ ] ¿Niveles educativos y edades exactas?
- [ ] ¿Fechas y requisitos de admisión del ciclo actual?
- [ ] ¿Teléfono, WhatsApp, email, dirección y horarios?
- [ ] ¿Existe CRM o a dónde deben llegar los formularios?
- [ ] ¿Quién actualizará noticias y eventos?
- [ ] ¿Hay fotos reales con consentimiento? ¿Quién las provee?
- [ ] ¿El sitio es solo en español o bilingüe?
- [ ] ¿Se necesita portal de familias o solo enlace externo?
- [ ] ¿Restricciones de marca (colores, tipografías, tono) ya definidas?
