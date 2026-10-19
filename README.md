# Colegio Eugenio Sánchez Osorio — punto de partida

Este directorio contiene el brief y los prompts para diseñar e implementar el sitio web del Colegio Eugenio Sánchez Osorio. La idea es que cualquier persona o agente pueda empezar a trabajar sin adivinar: primero se define, luego se diseña, luego se construye y al final se valida. La identidad visual parte de **blanco dominante y azul rey institucional**.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `BRIEF.md` | Fuente de verdad: objetivo, público, arquitectura, dirección visual, tokens, requisitos y criterios de aceptación. |
| `PROMPTS.md` | Prompts listos para pegar en Figma Make, v0, Claude/OpenCode o cualquier agente, ordenados por etapa. |
| `AGENTS.md` | Reglas técnicas y de diseño que debe seguir el agente que implemente el código. |
| `README.md` | Este archivo: cómo usar todo junto. |

## Ruta recomendada

1. **Corrige el brief (30 min).** Reemplaza los `[placeholders]` con datos reales. Si algo no está confirmado, déjalo marcado como `TODO`; no lo inventes.
2. **Reúne contenido real (2–3 h).** Textos, fotos con consentimiento, fechas de admisión, datos de contacto, nombres de niveles. El diseño se cae si se hace con lorem ipsum.
3. **Define la arquitectura (1–2 h).** Usa el Prompt 1 de `PROMPTS.md`. Valida que cada página tenga una sola tarea principal.
4. **Explora la dirección visual (2–4 h).** Usa el Prompt 2. Elige una dirección, no una mezcla de tres.
5. **Prototipa en Figma Make (medio día).** Usa el Prompt 3. Prueba el prototipo con 5 personas haciendo tareas concretas.
6. **Implementa (2–4 días).** Usa el Prompt 4 con `AGENTS.md`: una sección a la vez, con criterios de aceptación.
7. **Audita y publica (1 día).** Usa el Prompt 6. Rendimiento, accesibilidad, formularios, SEO y analítica.

## Dos rutas de implementación

### Ruta A — Next.js + Tailwind + shadcn/ui (recomendada)

- Control total del diseño, rendimiento y accesibilidad.
- Ideal si habrá formularios, CMS, noticias o portal de familias.
- Permite iterar contigo en el código y mantener el sitio a largo plazo.
- Requiere Node 22+ (ya está instalado en este equipo).

### Ruta B — Framer (sin código)

- Publicas en horas, no en días.
- Excelente para una landing institucional con buen acabado visual.
- Menos control sobre formularios complejos, integraciones y lógica propia.
- Usa el mismo `BRIEF.md` y el Prompt 3; ignora `AGENTS.md` y el Prompt 4.

## Regla de oro

La IA acelera la ejecución, no decide qué es intuitivo. Antes de pedir “hazlo bonito”, define:

- Quién llega a la página.
- Qué viene a resolver.
- Cuál es la única acción principal.
- Qué contenido real va a leer.

## Siguiente paso

Abrir `BRIEF.md`, corregir los supuestos y luego pegar el Prompt 0 de `PROMPTS.md` para detectar huecos antes de diseñar.
