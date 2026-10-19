# AGENTS.md — Reglas de implementación

Estas reglas aplican a cualquier agente (OpenCode, Claude Code, Cursor, etc.) que trabaje en este repositorio.

> Ruta por defecto: **Next.js**. Si el proyecto se decide implementar en Framer, este archivo no aplica; usar `BRIEF.md` y el Prompt 3 de `PROMPTS.md`.

## Antes de escribir código

1. Leer `BRIEF.md` completo. Es la fuente de verdad del producto y del diseño.
2. Leer el prompt de la tarea en `PROMPTS.md` y respetar su alcance.
3. Si falta un dato del colegio (fechas, contacto, cifras, testimonios, fotos), escribir `TODO` visible y listarlo al final. **No inventarlo.**
4. Si una ambigüedad afecta la arquitectura o el contenido, hacer máximo 3 preguntas antes de empezar.
5. No agregar dependencias sin justificar y pedir confirmación.

## Stack

- Next.js con App Router y TypeScript estricto.
- Tailwind CSS v4.
- `shadcn/ui` para componentes base (instalar solo lo que se use).
- `next/font` para Fraunces e Inter.
- `next/image` para todas las imágenes.
- `lucide-react` para iconos.
- Zod para validación de formularios.
- Sin librerías de animación pesadas; CSS o Motion solo si aporta.

## Estructura objetivo

```text
app/
  layout.tsx
  globals.css
  page.tsx
  admisiones/page.tsx
  niveles/page.tsx
  niveles/[nivel]/page.tsx
  vida-escolar/page.tsx
  nosotros/page.tsx
  contacto/page.tsx
  familias/page.tsx
  politica-de-privacidad/page.tsx
  not-found.tsx
components/
  site/        # header, footer, secciones y componentes del sitio
  ui/          # primitivas shadcn/ui
content/
  site.ts      # nombre, contacto, horarios, redes, fechas de admisión
  levels.ts
  faqs.ts
  news.ts
  testimonials.ts
lib/
  utils.ts
  validation.ts
public/
  images/
```

## Contrato de diseño

- Tokens definidos en `app/globals.css` como variables CSS. **Nunca HEX sueltos en componentes.**
- Colores: `royal #1B3A8F`, `royal-dark #122A6B`, `navy #0F172A`, `muted #5A6475`, `white #FFFFFF`, `mist #F4F7FC`, `sky #DCE6F7`, `sky-strong #B9CCEE`.
- El blanco domina. El azul rey se usa para acciones, títulos y bloques puntuales; no para pintar todas las secciones.
- Tipografía: Fraunces para display, Inter para texto. Máximo dos familias.
- Escala de espaciado base 4 px. Secciones: 96–120 px desktop, 48–64 px mobile.
- Radios: 8 px inputs/botones, 16 px tarjetas, 24 px bloques destacados.
- Sombras mínimas; preferir borde de 1 px.
- Un `h1` por página. Una acción primaria por bloque.
- Mobile-first. Probar 360, 768, 1024 y 1440 px.
- Movimiento de 150–300 ms, solo funcional, con `prefers-reduced-motion`.
- Fotografía real del colegio. **Nunca imágenes de niños generadas por IA.**

## Contrato de contenido

- Todo dato de contacto, horario, redes o fecha de admisión vive en `content/site.ts`.
- Niveles, FAQ, noticias y testimonios en archivos tipados dentro de `content/`.
- Nada de lorem ipsum ni copy genérico.
- Los textos deben ser específicos y verificables. Evitar “excelencia”, “formación integral”, “líderes del mañana”.
- Los CTA dicen qué pasa al hacer clic: “Agendar una visita”, no “Enviar”.
- Fechas en formato explícito y con zona horaria cuando corresponda.

## Contrato de accesibilidad (WCAG 2.2 AA)

- Landmarks: `header`, `nav`, `main`, `footer`; skip link al inicio.
- Navegación completa con teclado y `:focus-visible` claro.
- Contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande.
- Labels visibles en todos los campos; errores en texto, no solo en color.
- `alt` descriptivo en imágenes con contenido; `alt=""` en decorativas.
- No usar `div` o `span` clickeables. Usar `button` o `a`.
- Un solo `h1`; jerarquía de encabezados sin saltos.
- Respetar `prefers-reduced-motion`.
- Tamaño mínimo de objetivo táctil: 44×44 px.

## Formularios

- Validación en cliente y servidor con Zod.
- Campos mínimos: nombre, email, teléfono, nivel de interés, mensaje.
- Estados: idle, validando, enviando, éxito, error.
- Mantener los datos si falla el envío.
- Confirmación clara: qué se envió, qué pasa después y en cuánto tiempo.
- Enlace a política de privacidad junto al botón.
- `autocomplete` y `inputmode` correctos.

## SEO y rendimiento

- Metadata API de Next.js por página: title, description, canonical, Open Graph.
- `sitemap.ts` y `robots.ts`.
- Datos estructurados `EducationalOrganization` y `FAQPage` cuando aplique.
- Imágenes AVIF/WebP con dimensiones explícitas; hero con prioridad, resto lazy.
- Presupuesto: JS inicial < 150 KB gzip; LCP < 2.5 s; CLS < 0.1; INP < 200 ms.
- URLs legibles y estables.

## Código

- TypeScript estricto; prohibido `any` implícito.
- Server Components por defecto. `"use client"` solo para interactividad real.
- Componentes en PascalCase, props tipadas, archivos en kebab-case.
- Clases Tailwind con `cn()`; variantes con `cva` cuando haya más de dos.
- Sin estilos inline salvo variables dinámicas justificadas.
- Sin `console.log` en producción.
- Sin componentes gigantes: si supera ~150 líneas, dividir.
- Reutilizar primitivas de `components/ui` antes de crear nuevas.

## Comandos

Cuando el proyecto esté inicializado:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

Si un comando no existe, no lo inventes: agrégalo al `package.json` o pregunta.

## Definition of Done

- [ ] Contenido real o `TODO` explícito; sin lorem ipsum.
- [ ] Responsive verificado en 360, 768, 1024 y 1440.
- [ ] Teclado + foco visible + axe sin errores críticos.
- [ ] Contraste AA.
- [ ] Formularios con validación y estados.
- [ ] Metadata, canonical y OG.
- [ ] Sin errores de consola ni hidratación.
- [ ] `npm run build`, `lint` y `typecheck` pasan.
- [ ] Captura o descripción de cómo probar el cambio.

## Prohibiciones

- Inventar datos, fechas, cifras, testimonios o fotos.
- Generar imágenes de niños o docentes con IA.
- Degradados azul-morado o azul-turquesa, glassmorphism, neón o emojis como iconos.
- Carruseles automáticos, parallax pesado o texto animado letra por letra.
- Secciones de tres tarjetas genéricas sin contenido diferenciado.
- Hardcodear contacto, fechas o navegación dentro de componentes.
- Copiar plantillas completas sin adaptarlas al brief.
- Hacer `force push`, reescribir historia o borrar trabajo sin confirmación.
