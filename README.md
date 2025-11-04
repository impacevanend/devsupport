# devsupport — Gestor de incidencias (API)

Pequeña API en **Node.js + Express + PostgreSQL** para registrar y consultar tickets de soporte.  
El objetivo de esta primera entrega es dejar el entorno corriendo de forma reproducible (Docker), con validaciones, ORM, pruebas mínimas y documentación clara para que cualquier compañero o profesor lo ejecute sin sufrir.

---

## Stack

- **Node 20** + **Express**
- **PostgreSQL 15**
- **Prisma ORM 5.x**
- **Zod** (validación de payload)
- **Helmet**, **CORS**, **morgan** (seguridad y logs)
- **Jest + Supertest** (pruebas)

---

## Requisitos

- Docker y Docker Compose (recomendado)  
  _o_, si no usas Docker:
  - Node.js 20
  - PostgreSQL 15 local

> La forma más rápida es con Docker (API + DB orquestados).

---

## Cómo correr con Docker (recomendado)

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/impacevanend/devsupport.git
   cd devsupport

2. (Opcional) revisar/ajustar .env
    Para Docker ya viene listo; la API usa el host de servicio db y la DB el usuario app.

3. Levantar servicios
    docker compose -f docker/docker-compose.yml up -d

4. Generar cliente de Prisma y sincronizar schema
    npx prisma generate
    npx prisma db push

5. Verificar salud
    Navegador: http://localhost:3000/health
    Debe responder:
    { "status": "ok" }

## Pruebas
npm test
Verás algo como:
    PASS tests/health.spec.js
    PASS tests/tickets.spec.js

## Endpoints

1. GET /health
    Responde 200 con { "status": "ok" }

2. POST /tickets
    
    Body (JSON):
        {
            itle": "Bug en login",
            escription": "No deja iniciar sesión con usuario válido",
            riority": "HIGH",
            uthorEmail": "jose@example.com",
            uthorName": "Jose"
        }
    
    Respuestas:
        201: ticket creado
        400: payload inválido (Zod)
        500: error inesperado

3. GET /tickets
    Lista de tickets (200)

## Variables de entorno
Archivo .env (la API las lee en src/config/env.js):
    
### En Docker usamos el host "db" (nombre del servicio en docker-compose)

    DATABASE_URL="postgres://app:app@db:5432/tickets"
    PORT=3000

Archivo de ejemplo: .env.example (con placeholders) también está incluido en el repo.


## Estructura de carpetas

    /docker
      api.Dockerfile
      docker-compose.yml
    /prisma
      schema.prisma
    /src
      /config
        env.js          
      /core
        errors.js
        prisma.js       
        validate.js     
      /modules
        app.js          
        server.js       
      /tests
        utils/db.js
        teardown.js
        health.spec.js
        tickets.spec.js
    .env
    .env.example
    jest.config.js
    README.md

## Arranque sin Docker (opcional)

Si prefieres usar tu PostgreSQL local:

1. Crea una base tickets y un usuario con permisos.

2. Configura tu .env así:

    DATABASE_URL="postgres://<USER>:<PASS>@localhost:5432/tickets"
    PORT=3000

3. Instala y arranca:

    npm ci
    npx prisma generate
    npx prisma db push
    npm run dev

4. Abre http://localhost:3000/health


## Scripts útiles

    # nodemon
    npm run dev
    
    # node src/server.js       
    npm start     

    # jest + supertest    
    npm test  

    # prisma db push
    npm run db:push  


## Problemas comunes (y cómo los resolví)

 1. Prisma P1012: “Environment variable not found: DATABASE_URL.”: 
    Asegúrate de tener .env y que DATABASE_URL exista.
    En Docker, la URL debe apuntar a db (no a localhost).

 2. Prisma P1000: “Authentication failed…” o “Role ‘postgres’ does not exist.”:
    Estabas usando credenciales diferentes a las del contenedor.
    En este proyecto la DB de Docker usa app/app y DB tickets.
    
    Si cambiaste credenciales o se quedó algo viejo en el volumen:
        
        docker compose -f docker/docker-compose.yml down -v
        docker compose -f docker/docker-compose.yml up -d
        npx prisma db push
 
 3. La API arranca pero /tickets falla:
    Revisa que npx prisma db push haya corrido sin errores y que la cadena de conexión use el host correcto (db en Docker).

## Notas de diseño

- Validación con Zod en POST /tickets para evitar datos incompletos o mal tipeados.
- Helmet + CORS + morgan activados en app.js.
- Prisma con modelos User, Ticket, Comment mínimos para esta fase (se irá ampliando).
- Pruebas cubren /health y flujo básico de /tickets.


## Notas de diseño

- Autenticación básica para autores de tickets.
- Estados y transiciones del ticket (OPEN, IN_PROGRESS, RESOLVED).
- CI/CD con GitHub Actions (lint, test, build).
- Documentación OpenAPI (Swagger) y más pruebas.

Cualquier sugerencia o bug que encuentres, ¡me dices y lo ajustamos!