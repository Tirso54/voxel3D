# Voxel3D - Plataforma Integral de Creación 3D con IA

Una plataforma completa de generación 3D potenciada por IA, inspirada en Hi3D pero construida desde cero con arquitectura moderna.

## 🚀 Características Principales

### Generación 3D
- **Texto a 3D v3.0** - Resolución 2048³, geometría precisa, estilos artísticos
- **Imagen a 3D** - Reconstrucción fiel con completación de geometría oculta
- **Texto a Imagen** - Múltiples modelos IA (Nano Banana, GPT Image 2, etc.)

### Texturas y Materiales
- **Texturas PBR 8K** - Albedo, Roughness, Metalness, Normal, AO, Height, Emission
- **Estilos ilimitados** - Fotorrealista, pintado a mano, cel-shaded, low-poly

### Preparación para Impresión
- **División Inteligente** - Conectores automáticos (dovetail, pins, magnets, screws)
- **Multicolor** - Detección IA de regiones, matching filamentos AMS/MMU/ERCF
- **Listo para Imprimir** - Reparación, soportes, orientación óptima, slicing directo

### Servicios
- **Impresión bajo demanda** - 15+ materiales, envío global, tracking tiempo real
- **API completa** - RESTful, WebSockets, SDKs oficiales (JS/TS, Python, Go)

## 🛠 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript 5.5
- **Estilos**: Tailwind CSS 3.4 + CSS Variables
- **Base de datos**: PostgreSQL + Prisma ORM
- **Autenticación**: NextAuth.js v5
- **Pagos**: Stripe
- **3D**: Three.js + React Three Fiber + Drei
- **Animaciones**: Framer Motion + GSAP
- **Estado**: Zustand
- **Formularios**: React Hook Form + Zod
- **Despliegue**: Vercel + Railway/PlanetScale

## 📦 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/voxel3d.git
cd voxel3d

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Configurar base de datos
npx prisma db push
npx prisma db seed

# Desarrollo
npm run dev
```

## 🔧 Variables de Entorno Requeridas

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL de la app (ej. http://localhost:3000) |
| `OPENAI_API_KEY` | Para generación de imágenes |
| `REPLICATE_API_TOKEN` | Para modelos 3D |
| `STRIPE_SECRET_KEY` | Pagos y suscripciones |
| `AWS_*` | Almacenamiento de modelos 3D |

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router pages
│   ├── api/               # API Routes
│   ├── auth/              # Auth pages
│   ├── workspace/         # Taller principal
│   ├── showcase/          # Galería comunitaria
│   ├── pricing/           # Precios
│   └── api-docs/          # Documentación API
├── components/
│   ├── ui/                # Componentes base (Button, Card, etc.)
│   └── sections/          # Secciones de landing
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Utilidades
├── hooks/                 # Custom hooks
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```

## 🎨 Personalización

### Temas
Edita `tailwind.config.ts` para personalizar:
- Colores primarios/secundarios
- Tipografía (Inter, Space Grotesk, JetBrains Mono)
- Espaciado, sombras, animaciones
- Breakpoints responsivos

### Componentes 3D
Los visores 3D están en `src/components/3d/` y usan React Three Fiber.

## 🚀 Despliegue

### Vercel (Frontend)
```bash
vercel --prod
```

### Railway/PlanetScale (Database)
```bash
# Conectar base de datos PostgreSQL
# Ejecutar migraciones
npx prisma migrate deploy
```

### Variables de Producción
Asegúrate de configurar todas las variables en tu plataforma de despliegue.

## 📚 Documentación API

Visita `/api-docs` en tu despliegue para la referencia completa interactiva.

### Endpoints Principales
```
POST   /api/v1/3d/text-to-3d
POST   /api/v1/3d/image-to-3d
POST   /api/v1/textures/generate
POST   /api/v1/print/split
POST   /api/v1/print-service/quote
GET    /api/v1/projects
```

## 🤝 Contribuir

1. Fork el repo
2. Crea tu feature branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT Licens
Hecho con ❤️ para la comunidad de makers y creadores 3D.
