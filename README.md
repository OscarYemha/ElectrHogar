# ElectrHogar

Aplicación web full-stack de e-commerce de electrodomésticos, desarrollada de manera individual como proyecto integrador del Coding Bootcamp de Plataforma5.

La aplicación permite explorar productos, filtrarlos por categoría, realizar búsquedas, registrarse e iniciar sesión, gestionar un carrito de compras y acceder a funcionalidades administrativas.

## Funcionalidades

### Usuario

- Registro e inicio de sesión con email y contraseña.
- Inicio de sesión mediante Facebook.
- Visualización del catálogo de productos.
- Búsqueda de productos.
- Filtrado por categoría.
- Gestión del carrito de compras.

### Administrador

- Creación y edición de productos.
- Creación y eliminación de categorías.
- Visualización de usuarios registrados.
- Promoción de usuarios a administrador.
- Eliminación de usuarios no administradores.
- Protección de endpoints administrativos mediante autorización en el backend.

## Tecnologías

### Frontend

- JavaScript
- React
- Redux
- React Router
- Axios
- React Bootstrap
- Material UI

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL
- Passport
- bcrypt
- express-session
- Helmet
- CORS

## Estructura del proyecto

```text
ElectrHogar/
├── front/      # Aplicación React
├── back/       # API, autenticación y acceso a datos
└── README.md
```

## Requisitos

Para ejecutar el proyecto localmente se necesita:

- Node.js
- npm
- PostgreSQL

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/OscarYemha/ElectrHogar.git
cd ElectrHogar
```

### Backend

Ingresar al directorio e instalar las dependencias:

```bash
cd back
npm install
```

Crear un archivo `.env` utilizando `back/.env.example` como referencia:

```env
SESSION_SECRET=your_session_secret
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CALLBACK_URL=http://localhost:3001/api/auth/facebook/callback
DATABASE_URL=postgres://postgres@localhost:5432/electrodomesticos
PORT=3001
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_app_password
```

Crear previamente en PostgreSQL la base de datos indicada en `DATABASE_URL`.

### Datos de demostración

El proyecto incluye un seed para generar una base de demostración:

```bash
npm run seed
```

El seed reinicia las tablas y crea:

- 16 productos.
- 4 categorías.
- 1 usuario administrador.

Credenciales del administrador de demostración:

```text
Email: soy@admin.com
Contraseña: Admin123!
```

> **Importante:** el seed elimina los datos existentes y recrea la base de demostración. Está bloqueado para evitar su ejecución cuando `NODE_ENV=production`.

### Ejecutar el backend

Desde `back/`:

```bash
npm start
```

Por defecto, la API se ejecuta en:

```text
http://localhost:3001
```

### Frontend

En otra terminal, desde la raíz del repositorio:

```bash
cd front
npm install
npm start
```

Por defecto, la aplicación se ejecuta en:

```text
http://localhost:3000
```

## Seguridad

El proyecto implementa distintas medidas de seguridad y control de acceso:

- Hash de contraseñas mediante bcrypt.
- Autenticación mediante Passport.
- Sesiones de usuario con express-session.
- Middleware de autorización para proteger las rutas administrativas.
- Restricción para impedir la eliminación de usuarios administradores.
- Variables sensibles mediante variables de entorno.
- Configuración de CORS para restringir el origen permitido.
- Cabeceras de seguridad mediante Helmet.

## Autor

**Oscar Yemha**