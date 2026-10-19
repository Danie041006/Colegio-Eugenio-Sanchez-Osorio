# PROMPTS — Colegio Eugenio Sánchez Osorio

Prompts listos para copiar y pegar. Reemplaza lo que está entre `[corchetes]`. Úsalos en orden: primero pensar, luego diseñar, luego construir, luego auditar.

Regla común para todos: **si falta un dato, que la IA escriba `TODO` y lo liste al final. Nunca debe inventar cifras, fechas, nombres, testimonios ni fotos.**

---

## Prompt 0 — Revisar el brief antes de diseñar

Úsalo en Claude, ChatGPT u OpenCode, adjuntando `BRIEF.md`.

```text
Actúa como director de producto y UX lead de un estudio que diseña sitios para colegios.

Te adjunto el BRIEF.md del sitio del Colegio Eugenio Sánchez Osorio. Tu tarea NO es diseñar todavía. Quiero que lo audites como si fueras a recibir el proyecto mañana.

Entrega:
1. Los 5 huecos de información que más riesgo generan para el diseño o la implementación.
2. Las 3 suposiciones que podrían ser falsas y cómo verificarlas.
3. Una lista de contenido imprescindible que debe existir antes de empezar (textos, fotos, datos, formularios).
4. Una versión corregida del "mensaje central" en máximo 15 palabras, específica y sin clichés.
5. Un veredicto: ¿el brief está listo para wireframes? Sí / No, y por qué.

Reglas:
- No inventes datos del colegio.
- No propongas colores ni tipografías todavía.
- Sé directo y concreto; máximo 500 palabras.
```

---

## Prompt 1 — Sitemap y arquitectura de información

```text
Actúa como arquitecto de información senior.

Contexto: sitio web de un colegio para familias que evalúan admisión. El objetivo principal es que agenden una visita; el secundario es que soliciten información. La audiencia son padres y madres comparando 2–3 colegios.

Usando el BRIEF.md adjunto, entrega:

1. Un sitemap de máximo 8 páginas, con la ruta de cada una.
2. Para cada página: el trabajo único que cumple, la acción principal, las 3–6 secciones en orden y el contenido que necesita.
3. El flujo completo desde "veo el sitio por primera vez" hasta "agendé una visita", incluyendo dónde puede abandonar y cómo lo evitamos.
4. Qué páginas NO deberían existir en la primera versión y por qué.
5. Una tabla de navegación principal con etiquetas de máximo 2 palabras.

Criterios:
- Cada página debe tener una sola tarea principal.
- La información de admisión debe estar en HTML, no solo en PDF.
- No propongas páginas que el colegio no pueda mantener con contenido real.
- No inventes contenido; marca lo faltante como TODO.
```

---

## Prompt 2 — Dirección visual (3 opciones, una decisión)

```text
Actúa como director de arte senior especializado en identidad para instituciones educativas.

Proyecto: Colegio Eugenio Sánchez Osorio. Sitio institucional para familias. Debe transmitir confianza, calidez y rigor académico; no debe parecer una startup de software ni una guardería.

Con base en el BRIEF.md, propón 3 direcciones visuales realmente distintas. Para cada una entrega:

- Nombre del concepto y una frase que lo resuma.
- Referencias concretas (tipo de revista, editorial, fotografía, arquitectura; no marcas de tecnología).
- Paleta con 5–6 colores en HEX y su uso, verificando contraste AA para texto.
- Dos tipografías (display + texto) disponibles en Google Fonts, con por qué.
- Tratamiento de fotografía e ilustración.
- Tipo de retícula y uso del espacio en blanco.
- Cómo se ve el hero de Inicio y la sección de pasos de admisión.
- Un riesgo de cada dirección (por qué podría fallar).

Después:
- Recomienda UNA dirección y explica en 5 líneas por qué es la mejor para este objetivo.
- Da los tokens finales listos para CSS: colores, fuentes, escala de espaciado, radios.

Reglas:
- Nada de degradados azul-morado o azul-turquesa, glassmorphism ni neón. El azul rey es el único color de marca y el blanco debe dominar.
- No uses "moderno y limpio" como descripción; sé específico.
- No generes código todavía.
```

---

## Prompt 3 — Prototipo hi-fi en Figma Make / Stitch

```text
Actúa como diseñador UX/UI senior. Vas a crear un prototipo hi-fi navegable, no una landing genérica.

PROYECTO
Sitio del Colegio Eugenio Sánchez Osorio, institución educativa. Audiencia: familias comparando colegios para inscribir a sus hijos. Objetivo: agendar una visita. Tono: cálido, humano, riguroso.

DIRECCIÓN VISUAL
- Concepto: institucional luminoso con alma editorial. Blanco dominante, azul rey como sello de confianza, fotografía real protagonista, tipografía con carácter y espacio en blanco generoso.
- Fondo blanco #FFFFFF y mist #F4F7FC; azul rey #1B3A8F; azul marino #122A6B; tinta #0F172A; gris azulado #5A6475; celeste #DCE6F7 para bloques suaves. Sin tercer color de marca.
- Header blanco con logo y navegación en azul; CTA principal en azul rey. Footer en azul marino. Alternar secciones blanco → mist y usar un solo bloque royal de énfasis por página.
- Display: Fraunces. Texto: Inter.
- Bordes sutiles, radios 8/16/24, sin sombras difusas.
- Movimiento mínimo y funcional.

ENTREGA
1. Inicio en desktop 1440 y mobile 390.
2. Página de Admisiones en desktop y mobile.
3. Estados de hover, focus y menú móvil abierto.

ESTRUCTURA DE INICIO
- Header con logo, nav (Admisiones, Niveles, Vida escolar, Nosotros, Contacto), enlace Portal de familias y botón "Agendar visita".
- Hero: titular de máximo 10 palabras, bajada de 2 líneas, CTA principal y secundario, foto real del colegio, datos de confianza verificables.
- Diferenciales: 3 argumentos específicos, no tarjetas genéricas.
- Niveles: Inicial, Primaria, Secundaria con edades y jornada.
- Proceso de admisión en 3–4 pasos con fechas.
- Vida escolar: 2 noticias + próximo evento.
- Testimonio de una familia.
- FAQ de 4 preguntas.
- CTA final + footer con dirección, teléfono, horario y privacidad.

ESTRUCTURA DE ADMISIONES
- Encabezado claro con fechas del ciclo.
- Timeline de pasos.
- Requisitos en lista escaneable.
- Formulario corto (nombre, email, teléfono, nivel, mensaje), con labels visibles.
- Qué pasa después del envío.
- Contacto directo (teléfono/WhatsApp).
- FAQ.

REGLAS
- Usa contenido real del BRIEF.md. Donde falte, escribe "TODO: [dato]" visible; no inventes cifras, fechas, nombres ni testimonios.
- No uses imágenes generadas de niños. Usa placeholders fotográficos claramente marcados.
- Mobile-first: el CTA de admisión debe estar siempre accesible.
- Respeta contraste AA y tamaños de toque de 44 px.
- Nada de carruseles automáticos, parallax, texto letra por letra ni tres botones con el mismo peso.
- No agregues secciones que no estén en la estructura.

Al final entrega:
- Lista de decisiones de diseño.
- Lista de datos faltantes (TODO).
- 3 preguntas que harías al colegio antes de publicar.
```

---

## Prompt 4 — Implementación maestra (Next.js)

Úsalo en OpenCode/Claude Code dentro del repositorio, después de leer `BRIEF.md` y `AGENTS.md`.

```text
Actúa como diseñador UX/UI senior y desarrollador frontend. Vas a implementar una página del sitio del Colegio Eugenio Sánchez Osorio.

CONTEXTO
Lee completos BRIEF.md y AGENTS.md antes de escribir código. Son la fuente de verdad. Si hay contradicción, gana BRIEF.md y me lo avisas.

TAREA
Implementa: [página o sección, ej. "la página /admisiones completa"].
Alcance exacto: [qué incluye y qué no].
No modifiques otras páginas ni componentes compartidos sin justificarlo.

STACK
Next.js App Router + TypeScript estricto + Tailwind CSS v4 + shadcn/ui + next/font + next/image. Sin dependencias nuevas sin preguntarme.

DISEÑO
- Usa los tokens de BRIEF.md. No escribas HEX sueltos en los componentes.
- Mobile-first. Verifica 360, 768, 1024 y 1440 px.
- Jerarquía: un h1, secciones con h2, una acción primaria por bloque.
- Tipografía: Fraunces para display, Inter para texto.
- Espaciado generoso; nada de bordes y sombras decorativas sin función.
- Microinteracciones de 150–300 ms, respetando prefers-reduced-motion.

CONTENIDO
- Usa el contenido aprobado del brief o de content/. Donde falte, escribe un TODO visible en el código y en la UI; no inventes cifras, fechas, testimonios ni datos de contacto.
- Todos los datos de contacto salen de la configuración global.

ACCESIBILIDAD
- Landmarks semánticos, skip link, foco visible.
- Labels visibles y errores descritos en texto.
- Contraste AA, navegación por teclado, alt text correcto.
- Nada de divs clickeables sin rol y manejo de teclado.

ENTREGA, EN ESTE ORDEN
1. Plan de 5 bullets: archivos a crear/modificar y decisiones.
2. Implementación completa y tipada.
3. Resumen de cambios y cómo probarlo.
4. Lista de TODO y riesgos.
5. Autoevaluación contra el Definition of Done de BRIEF.md, marcando lo que no se pudo verificar.

PROHIBIDO
- Lorem ipsum.
- Degradados azul-morado o azul-turquesa, glassmorphism, emojis como iconos, carruseles automáticos.
- Inventar datos del colegio o usar imágenes de niños generadas por IA.
- Copiar una plantilla genérica de "tres tarjetas".
- Dejar errores de consola o de hidratación.

Si algo del brief es ambiguo y afecta la implementación, hazme máximo 3 preguntas antes de empezar. Si no, procede con la suposición más conservadora y anótala.
```

---

## Prompt 5 — Implementar una sola sección

Para avanzar por partes sin que el agente rompa lo anterior.

```text
Implementa únicamente la sección "[NOMBRE]" de la página [RUTA].

Contexto: lee BRIEF.md y AGENTS.md. No toques el header, el footer ni otras secciones.
Objetivo de la sección: [una frase].
Contenido: [pega el copy aprobado o indica el archivo].
Componentes permitidos: [lista].
Medidas: desktop [ancho] / mobile [ancho].

Entrega:
- El componente en su archivo propio, tipado y accesible.
- Ningún texto hardcodeado que deba venir de content/ o configuración.
- 3 bullets de decisiones y 1 de riesgos.

Criterios de aceptación:
- [ ] Se ve bien en 360, 768 y 1440.
- [ ] Funciona con teclado y tiene foco visible.
- [ ] No introduce dependencias ni HEX nuevos.
- [ ] No hay errores de consola.
```

---

## Prompt 6 — Auditoría UX y accesibilidad

```text
Actúa como auditor UX senior y especialista en accesibilidad WCAG 2.2 AA.

Revisa [página o enlace / capturas / código] del sitio del Colegio Eugenio Sánchez Osorio.
Objetivo del usuario en esta página: [tarea].
Contexto: familias comparando colegios; la acción principal es agendar una visita.

Entrega una tabla con:
| Hallazgo | Severidad (0–4) | Por qué afecta al usuario | Fix concreto |

Evalúa:
1. Claridad de la propuesta de valor en los primeros 5 segundos.
2. Jerarquía visual y peso de los CTA.
3. Navegación y orientación (¿dónde estoy?, ¿cómo vuelvo?).
4. Formularios: labels, errores, fricción, autocompletado.
5. Mobile: tamaño de toque, CTA accesible, legibilidad.
6. Accesibilidad: contraste, foco, teclado, headings, alt text, movimiento.
7. Confianza: contenido real, fechas, contacto, privacidad.
8. Rendimiento percibido: peso de imágenes, fuentes, layout shift.

Reglas:
- No propongas un rediseño total.
- Cada fix debe ser ejecutable en menos de 1 hora o estar marcado como "estructural".
- Si no tienes evidencia, dilo; no inventes problemas.
- Termina con las 3 acciones de mayor impacto y las 3 que pueden esperar.
```

---

## Prompt 7 — Copy y microcopy

```text
Actúa como editor de contenido y UX writer en español neutro.

Proyecto: sitio del Colegio Eugenio Sánchez Osorio. Audiencia: familias que comparan colegios. Tono: cercano, claro, seguro; sin superlativos vacíos.

Escribe el copy para [página/sección], usando el BRIEF.md y estos datos reales: [pega datos].

Entrega una tabla:
| Sección | Copy final | Límite de caracteres | Nota |

Incluye:
- Titular y bajada.
- Textos de los CTA (máximo 4 palabras).
- Microcopy de formulario: labels, placeholders, ayuda, error, éxito.
- Estados vacíos y de carga si aplican.
- FAQ con respuestas de 2–3 frases.
- Texto de privacidad del formulario en una frase clara.

Reglas:
- Nada de "excelencia", "formación integral", "líderes del mañana", "potenciar talentos" ni "comunidad educativa" sin una prueba concreta.
- Frases de máximo 20 palabras.
- Voz activa y verbos concretos.
- No inventes cifras, fechas ni testimonios; marca TODO.
- Cada CTA debe decir qué pasa al hacer clic.
```

---

## Prompt 8 — Dirección de imágenes (sin niños generados por IA)

```text
Actúa como director de arte fotográfico.

Necesito un moodboard y una guía de imágenes para el sitio del Colegio Eugenio Sánchez Osorio. Concepto: institucional luminoso y riguroso, con blanco dominante y azul rey; fotografía documental, luz natural, momentos reales de aprendizaje y convivencia.

Entrega:
1. 3 arquetipos de foto por página (Inicio, Admisiones, Niveles, Vida escolar).
2. Descripción de encuadre, luz, momento y emoción para cada una.
3. Qué evitar explícitamente.
4. Una guía de selección: cómo elegir fotos reales del archivo del colegio.
5. Instrucciones para generar SOLO texturas, patrones o ilustraciones abstractas de apoyo, no personas.

Reglas:
- Nunca generar niños o docentes con IA para este sitio.
- No usar stock con personas sonriendo a cámara.
- Priorizar fotos reales con consentimiento de imagen.
- Toda imagen debe tener propósito narrativo, no solo decorar.
- No incluir texto legible ni logos dentro de las imágenes generadas.
```

---

## Prompt 9 — Cierre de fase / decisión

Úsalo cuando tengas varias propuestas y necesites elegir.

```text
Actúa como facilitador de decisión de diseño.

Te presento [2–3 propuestas / enlaces / capturas]. El objetivo del sitio es que las familias agenden una visita; la audiencia son padres comparando colegios; la marca debe sentirse cálida y rigurosa.

Evalúa cada propuesta con una matriz:
| Criterio (peso) | Propuesta A | B | C |
- Claridad de la propuesta de valor (25%)
- Facilidad para agendar (25%)
- Confianza y credibilidad (20%)
- Accesibilidad (15%)
- Facilidad de mantenimiento (15%)

Puntúa de 1 a 5, pondera, y recomienda una. Explica qué debería tomarse de las otras dos. Termina con la decisión en una frase y el primer paso de implementación.
```
