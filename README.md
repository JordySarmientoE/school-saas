# 🏫 School SaaS - Sistema de Gestión Educativa

[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)

Sistema backend moderno para la gestión integral de instituciones educativas, construido con NestJS, TypeORM y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Prerequisitos](#-prerequisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Migraciones](#-migraciones)
- [Estructura del Proyecto](#-estructura-del-proyecto)

## ✨ Características

### Módulos Principales

- **🔐 Autenticación y Autorización**
  - JWT (JSON Web Tokens)
  - Sistema de roles y permisos
  - Guards personalizados para protección de rutas
  - Estrategia Passport JWT

- **👥 Gestión de Usuarios**
  - CRUD completo de usuarios
  - Roles multinivel
  - Encriptación de contraseñas con bcrypt
  - Soft deletes

- **🏢 Gestión de Escuelas**
  - Administración de instituciones educativas
  - Información de contacto y ubicación
  - Códigos únicos de identificación

- **📚 Gestión de Clases**
  - Administración de cursos y aulas
  - Relaciones entre clases y estudiantes
  - Seguimiento temporal de actividades

### Características Técnicas

- ✅ Validación automática de DTOs con `class-validator`
- 🔄 Transformación de datos con `class-transformer`
- 📝 Logging interceptor para auditoría
- 🔒 Seguridad mejorada con guards y decoradores personalizados
- 🗃️ ORM robusto con TypeORM
- 🐳 Containerización con Docker
- 📖 Documentación automática con Swagger/OpenAPI
- 🧪 Configuración de testing con Jest

## 🛠 Tecnologías

### Backend Framework
- **NestJS 11.x** - Framework progresivo de Node.js
- **TypeScript 5.7** - JavaScript con tipado estático
- **Node.js** - Runtime de JavaScript

### Base de Datos
- **PostgreSQL 15** - Base de datos relacional
- **TypeORM 0.3.x** - ORM para TypeScript y JavaScript

### Autenticación y Seguridad
- **Passport** - Middleware de autenticación
- **JWT** - JSON Web Tokens
- **bcrypt** - Hashing de contraseñas

### Validación y Transformación
- **class-validator** - Validación basada en decoradores
- **class-transformer** - Transformación de objetos
- **Joi** - Validación de esquemas para configuración

### Documentación
- **Swagger/OpenAPI** - Documentación interactiva de API

### DevOps y Herramientas
- **Docker & Docker Compose** - Containerización
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Jest** - Framework de testing

## 🏗 Arquitectura

El proyecto sigue una arquitectura modular basada en los principios de NestJS:

```
src/
├── @common/              # Utilidades compartidas
│   ├── decorators/       # Decoradores personalizados
│   ├── guards/           # Guards de autenticación y autorización
│   ├── interceptors/     # Interceptores globales
│   ├── strategies/       # Estrategias de autenticación
│   └── utils/            # Funciones de utilidad
├── config/               # Configuración de la aplicación
│   ├── typeorm.config.ts # Configuración de TypeORM
│   └── data-source.ts    # DataSource para migraciones
├── modules/              # Módulos de negocio
│   ├── auth/            # Autenticación
│   ├── users/           # Gestión de usuarios
│   ├── schools/         # Gestión de escuelas
│   └── classes/         # Gestión de clases
└── main.ts              # Punto de entrada de la aplicación
```

### Patrones Implementados

- **Repository Pattern** - Repositorios personalizados para acceso a datos
- **DTO Pattern** - Data Transfer Objects para validación
- **Guard Pattern** - Protección de rutas y autorización
- **Interceptor Pattern** - Logging y transformación de respuestas
- **Strategy Pattern** - Estrategias de autenticación

## 📦 Prerequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x o **yarn** >= 1.22
- **Docker** y **Docker Compose** (para desarrollo con contenedores)
- **PostgreSQL** 15.x (si no usas Docker)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd school-saas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar la base de datos con Docker

```bash
docker-compose up -d
```

Este comando levantará un contenedor de PostgreSQL con la siguiente configuración:
- **Puerto:** 5432
- **Usuario:** postgres
- **Contraseña:** password
- **Base de datos:** postgres
- **Timezone:** America/Lima
- **Locale:** es_PE.UTF-8

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Aplicación
PORT=3000
NODE_ENV=development

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
```

### Validación de Configuración

El proyecto utiliza **Joi** para validar las variables de entorno al inicio. Las siguientes variables son obligatorias:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## 🎯 Uso

### Desarrollo

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo debug
npm run start:debug
```

La aplicación estará disponible en `http://localhost:3000`

### Producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar en modo producción
npm run start:prod
```

## 📖 API Documentation

La documentación interactiva de la API está disponible en Swagger una vez que la aplicación esté corriendo:

```
http://localhost:3000/api
```

### Endpoints Principales

#### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario

#### Usuarios
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario (soft delete)

#### Escuelas
- `GET /schools` - Listar escuelas
- `GET /schools/:id` - Obtener escuela por ID
- `POST /schools` - Crear escuela
- `PATCH /schools/:id` - Actualizar escuela
- `DELETE /schools/:id` - Eliminar escuela

#### Clases
- `GET /classes` - Listar clases
- `GET /classes/:id` - Obtener clase por ID
- `POST /classes` - Crear clase
- `PATCH /classes/:id` - Actualizar clase
- `DELETE /classes/:id` - Eliminar clase

### Autenticación

La API utiliza **Bearer Token (JWT)**. Para autenticar las peticiones:

```bash
# 1. Obtener token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# 2. Usar el token en las peticiones
curl http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

### Unit Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch
npm run test:watch

# Coverage
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

### Debug Tests

```bash
npm run test:debug
```

## 🗄 Migraciones

El proyecto utiliza TypeORM para las migraciones de base de datos.

### Comandos Disponibles

```bash
# Crear una nueva migración vacía
npm run migration:create --name=NombreDeLaMigracion

# Generar migración automática basada en cambios de entidades
npm run migration:generate --name=NombreDeLaMigracion

# Ejecutar migraciones pendientes
npm run migration:run

# Revertir la última migración
npm run migration:revert
```

### Ejemplo de Uso

```bash
# 1. Modificar una entidad
# 2. Generar migración
npm run migration:generate --name=AddPhoneToUser

# 3. Ejecutar migración
npm run migration:run
```

## 📁 Estructura del Proyecto

```
school-saas/
├── src/
│   ├── @common/                    # Código compartido
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts  # Decorador de roles
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts   # Guard de autenticación JWT
│   │   │   └── roles.guard.ts      # Guard de autorización por roles
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts # Interceptor de logging
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts     # Estrategia JWT
│   │   ├── types/
│   │   │   └── express.d.ts        # Tipos personalizados
│   │   └── utils/
│   │       └── bcrypt.utils.ts     # Utilidades de encriptación
│   ├── config/
│   │   ├── config.validation.ts    # Validación de variables de entorno
│   │   ├── data-source.ts          # DataSource para migraciones
│   │   └── typeorm.config.ts       # Configuración de TypeORM
│   ├── modules/
│   │   ├── auth/                   # Módulo de autenticación
│   │   │   ├── dto/
│   │   │   ├── interfaces/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   ├── users/                  # Módulo de usuarios
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   ├── users.repository.ts
│   │   │   └── users.service.ts
│   │   ├── schools/                # Módulo de escuelas
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── schools.controller.ts
│   │   │   ├── schools.module.ts
│   │   │   ├── schools.repository.ts
│   │   │   └── schools.service.ts
│   │   └── classes/                # Módulo de clases
│   │       ├── dto/
│   │       ├── entities/
│   │       ├── classes.controller.ts
│   │       ├── classes.module.ts
│   │       ├── classes.repository.ts
│   │       └── classes.service.ts
│   ├── app.module.ts               # Módulo raíz
│   └── main.ts                     # Punto de entrada
├── test/                           # Tests E2E
├── docker-compose.yml              # Configuración de Docker
├── nest-cli.json                   # Configuración de Nest CLI
├── package.json                    # Dependencias del proyecto
├── tsconfig.json                   # Configuración de TypeScript
├── eslint.config.mjs               # Configuración de ESLint
└── README.md                       # Este archivo
```

## 🔒 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Autenticación basada en JWT
- ✅ Guards para protección de rutas
- ✅ Validación de datos de entrada
- ✅ Variables de entorno para secretos
- ✅ CORS habilitado y configurable
- ✅ Soft deletes para preservar datos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Sigue los lineamientos de ESLint configurados
- Usa Prettier para formatear el código
- Escribe tests para nuevas funcionalidades
- Documenta los endpoints en Swagger

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Iniciar en modo desarrollo
npm run start:debug        # Iniciar en modo debug

# Producción
npm run build              # Compilar proyecto
npm run start:prod         # Ejecutar en producción

# Testing
npm test                   # Ejecutar tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov          # Tests con coverage
npm run test:e2e          # Tests E2E

# Code Quality
npm run lint              # Ejecutar linter
npm run lint:fix          # Fix automático de problemas
npm run format            # Formatear código con Prettier

# Database
npm run typeorm           # Ejecutar comandos de TypeORM
npm run migration:create  # Crear migración
npm run migration:generate # Generar migración
npm run migration:run     # Ejecutar migraciones
npm run migration:revert  # Revertir migración
```

## 📄 Licencia

Este proyecto es privado y está bajo la licencia UNLICENSED.

## 👤 Autor

Desarrollado con ❤️ para la gestión educativa moderna.

---

**Nota:** Este es un proyecto en desarrollo. Para cualquier pregunta o sugerencia, por favor abre un issue en el repositorio.
