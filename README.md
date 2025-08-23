# Desafío Node.js – API (clases)
API simple en Node.js + TypeScript usando Fastify, Drizzle ORM (PostgreSQL) y Zod. Incluye documentación Swagger/Scalar en entorno de desarrollo.

## Requisitos
- Node.js 22+
- Docker y Docker Compose
- npm (u otro gestor, pero el proyecto usa `package-lock.json`)

## Tecnologías
- Fastify 5
- TypeScript
- Drizzle ORM + PostgreSQL
- Zod (validación)
- Swagger/OpenAPI + Scalar API Reference (en `/docs` cuando `NODE_ENV=development`)

## Configuración
1. Clona el repositorio y accede a la carpeta del proyecto.
2. Instala las dependencias:
```bash
npm install
```
3. Levanta la base de datos PostgreSQL con Docker:
```bash
docker compose up -d
```
4. Crea un archivo `.env` en la raíz con:
```bash
# URL de la base de datos (Docker local por defecto)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
# Activa la documentación en /docs
NODE_ENV=development
```
5. Ejecuta las migraciones (Drizzle):
```bash
npm run db:migrate
```
(opcional) Para inspeccionar el esquema/estado con Drizzle Studio:
```bash
npm run db:studio
```

## Ejecutando el servidor
```bash
npm run dev
```
- Puerto por defecto: `http://localhost:3333`
- Logs legibles habilitados
- Documentación de la API (en desarrollo): `http://localhost:3333/docs`

## Endpoints
URL base: `http://localhost:3333`
- **POST** `/courses`
  - Crea un curso
  - Cuerpo (JSON):
    ```json
    { "title": "Curso de Docker" }
    ```
  - Respuestas:
    - 201: `{ "courseId": "<uuid>" }`
- **GET** `/courses`
  - Lista todos los cursos
  - 200: `{ "courses": [{ "id": "<uuid>", "title": "..." }] }`
- **GET** `/courses/:id`
  - Busca un curso por ID
  - Parámetros: `id` (UUID)
  - Respuestas:
    - 200: `{ "course": { "id": "<uuid>", "title": "...", "description": "... | null" } }`
    - 404: vacío

Hay un archivo `requisicoes.http` con ejemplos listos (compatible con extensiones de REST Client).

## Modelos (schema)
Tablas principales definidas en `src/database/schema.ts`:
- `courses`
  - `id` (uuid, pk, por defecto aleatorio)
  - `title` (texto, único, obligatorio)
  - `description` (texto, opcional)
- `users` (ejemplo para estudios)
  - `id` (uuid, pk, por defecto aleatorio)
  - `name` (texto, obligatorio)
  - `email` (texto, único, obligatorio)

## Flujo principal (Mermaid)
```mermaid
sequenceDiagram
  participant C as Client
  participant S as Fastify Server
  participant V as Zod Validator
  participant DB as Drizzle + PostgreSQL
  C->>S: POST /courses {title}
  S->>V: Validar body
  V-->>S: OK o Error 400
  alt válido
    S->>DB: INSERT INTO courses (title)
    DB-->>S: {id}
    S-->>C: 201 {courseId}
  else inválido
    S-->>C: 400
  end
  C->>S: GET /courses
  S->>DB: SELECT id,title FROM courses
  DB-->>S: lista
  S-->>C: 200 {courses: [...]}
  C->>S: GET /courses/:id
  S->>V: Validar param id (uuid)
  V-->>S: OK o Error 400
  alt encontrado
    S->>DB: SELECT * FROM courses WHERE id=...
    DB-->>S: course
    S-->>C: 200 {course}
  else no encontrado
    S-->>C: 404
  end
```

## Scripts
- `npm run dev`: inicia el servidor con recarga y carga las variables de `.env`
- `npm run db:generate`: genera artefactos de Drizzle a partir del esquema
- `npm run db:migrate`: aplica migraciones en la base de datos
- `npm run db:studio`: abre Drizzle Studio

## Consejos y solución de problemas
- Conexión rechazada a PostgreSQL: confirma que `docker compose up -d` esté ejecutándose y que el puerto `5432` no esté en uso.
- Variable `DATABASE_URL` ausente: verifica tu archivo `.env`. Drizzle requiere esta variable para `db:generate`, `db:migrate` y `db:studio`.
- La documentación no aparece en `/docs`: asegúrate de que `NODE_ENV=development` esté en el `.env` y reinicia el servidor.

## Licencia
ISC (ver `package.json`).

