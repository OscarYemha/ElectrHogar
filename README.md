# ElectrHogar

Aplicación web full-stack de e-commerce de electrodomésticos desarrollada con React, Redux, Node.js, Express y PostgreSQL.

Permite explorar y buscar productos, filtrarlos por categoría, gestionar un carrito de compras, realizar un proceso de checkout simulado con comprobante por email y administrar productos, categorías y usuarios mediante un panel protegido por roles.

El proyecto fue desarrollado de manera individual como proyecto integrador del Coding Bootcamp de Plataforma5 y posteriormente ampliado y refactorizado.

## Funcionalidades

### Usuario

- Registro e inicio de sesión con email y contraseña.
- Inicio de sesión mediante Facebook.
- Visualización del catálogo de productos.
- Búsqueda de productos.
- Filtrado por categoría.
- Visualización del detalle de cada producto.
- Gestión del carrito de compras.
- Modificación de cantidades y eliminación de productos del carrito.
- Checkout simulado con validación de los datos ingresados.
- Confirmación de la compra antes de finalizar la operación.
- Envío de comprobante de compra por email con productos, cantidades, precios y total.
- Validación del carrito antes de acceder al checkout.

> El proceso de compra es una simulación con fines demostrativos. No se procesan pagos reales ni se almacenan datos de tarjetas.

### Administrador

- Creación, edición y eliminación de productos.
- Creación, edición y eliminación de categorías.
- Visualización de usuarios registrados.
- Promoción de usuarios a administrador.
- Eliminación de usuarios no administradores.
- Restricción para impedir que un administrador elimine a otro administrador.
- Confirmación antes de realizar operaciones destructivas.
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
- Nodemailer
- Helmet
- CORS

## Arquitectura

El proyecto está dividido en una aplicación frontend y una API backend.

```text
ElectrHogar/
├── front/      # Aplicación React
├── back/       # API REST, autenticación y acceso a datos
└── README.md
```

El backend organiza las rutas por dominio para separar las distintas responsabilidades de la aplicación:

```text
back/api/Routes/
├── index.js
├── products.js
├── auth.js
├── admin.js
├── cart.js
└── checkout.js
```

La autenticación utiliza sesiones y las operaciones protegidas obtienen la identidad del usuario desde la sesión del servidor, evitando depender de identificadores de usuario enviados por el cliente.

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

El proyecto incluye un seed para generar una base de datos de demostración:

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
- Middleware de autenticación para las operaciones privadas.
- Middleware de autorización para las rutas administrativas.
- Identificación del propietario del carrito mediante la sesión del servidor.
- Restricción para impedir la eliminación de usuarios administradores.
- Validación y selección explícita de los campos aceptados por endpoints sensibles.
- Respuestas de usuario limitadas a información no sensible.
- Validación de datos en operaciones de carrito y checkout.
- Variables sensibles gestionadas mediante variables de entorno.
- Configuración de CORS para restringir el origen permitido.
- Cabeceras de seguridad mediante Helmet.
- Los datos ficticios de tarjeta utilizados durante el checkout no se envían al backend ni se almacenan.

## Estado del proyecto

El flujo principal de la aplicación se encuentra funcional e incluye:

- Registro y autenticación.
- Catálogo, búsqueda y categorías.
- Carrito de compras.
- Checkout simulado.
- Comprobante por email.
- Panel de administración.
- Gestión de productos, categorías y usuarios.

El proyecto está orientado a demostración y portfolio, por lo que el checkout no utiliza una pasarela de pagos real.

## Autor

**Oscar Ismael Yemha**
