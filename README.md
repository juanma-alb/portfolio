# Portfolio Next.js

Este proyecto es una landing de portfolio construida con Next.js 15, React 18 y TypeScript. El objetivo es ofrecer una experiencia rápida, accesible y fácil de mantener para mostrar proyectos, experiencia profesional y medios de contacto.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: genera la versión optimizada para producción.
- `npm run start`: ejecuta la aplicación en modo producción (requiere `npm run build` previo).
- `npm run lint`: ejecuta ESLint sobre el código del proyecto.
- `npm run typecheck`: corre la verificación estricta de tipos con TypeScript.
- `npm run test`: ejecuta la suite de pruebas con Jest y Testing Library.
- `npm run test:watch`: ejecuta las pruebas en modo observador.
- `npm run format`: verifica el formato con Prettier.
- `npm run format:write`: reescribe el código siguiendo las reglas de Prettier.
- `npm run ci:check`: comando pensado para pipelines CI (lint + typecheck + test).
- `npm run sitemap`: genera `sitemap.xml` y `robots.txt` utilizando `next-sitemap`.

## Estructura inicial

```
.
├── app/
│   ├── fonts/
│   ├── layout.tsx
│   └── globals.css
├── components/
├── content/
├── lib/
├── public/
├── tests/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Dependencias clave

- **UI y estilos:** Tailwind CSS, shadcn/ui, lucide-react, Framer Motion.
- **Formularios y validación:** React Hook Form, Zod.
- **Infraestructura:** next-themes, next-sitemap, Nodemailer/Resend (API contacto), @vercel/analytics.
- **Calidad:** ESLint, Prettier, Jest, Testing Library.

## Próximos pasos

1. Configurar componentes compartidos (Navbar, Hero, etc.).
2. Implementar secciones de contenido (Projects, Experience, Skills, About, Contacto).
3. Añadir integración del formulario de contacto con API mock/Resend.
4. Completar SEO avanzado, Open Graph y schema.org.
5. Escribir pruebas unitarias para Navbar, ProjectCard y ContactForm.
6. Documentar guía de contenidos y checklist de deploy (se añadirá al final del proyecto).

> Nota: Las imágenes del portfolio deben colocarse en `public/images` y `public/images/projects`. Si aún no contás con los assets definitivos, podés usar placeholders temporales.
