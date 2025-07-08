# Sistema de Reservas de Áreas Comunes

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Mejoras Futuras](#mejoras-futuras)
- [Acerca del Proyecto](#acerca-del-proyecto)
- [Licencia](#licencia)

---

## Descripción

Este proyecto es un sistema de reservas para áreas comunes (como canchas deportivas, salas de reuniones, etc.) que permite a los usuarios registrarse, iniciar sesión, consultar las áreas disponibles, reservar horarios y administrar sus reservas.

---

## Características

- Registro e inicio de sesión de usuarios con autenticación basada en JWT.
- Visualización de áreas agrupadas por categoría.
- Selección de fecha para reservar espacios.
- Visualización de horarios disponibles y ya reservados.
- Modal para realizar nuevas reservas.
- Sección para que los usuarios puedan consultar y cancelar sus reservas.
- Diseño limpio usando React con Next.js.
- Backend desarrollado con Express y Sequelize (PostgreSQL).

---

## Tecnologías

- **Frontend:** React, Next.js, TypeScript, CSS Modules
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Autenticación:** JWT
- **Gestión de cookies:** js-cookie

---

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/nelrecarte/pruebaCIT.git

2. Instalar dependencias para frontend y backend:
    cd client
    npm install
    cd ../server
    npm install

3. Configurar variables de entorno en .env para la base de datos y JWT.

4. Ejecutar migraciones o sincronizar la base de datos.
    cd server
    node sync.js

5. Ejecutar el SQL de los datos simulados para poblar la base de datos

6. Instalar dependencia para poder ejecutar el proyecto 
    npm install 

7. Ejecutar el proyecto 
    npm run dev 

## Uso
- Regístrate o inicia sesión para acceder al sistema.
- Selecciona una fecha y un área para ver horarios disponibles.
- Reserva un horario en la ventana modal.
- Visualiza y administra tus reservas en la pestaña "Mis Reservas".

## Estructura del Proyecto
/server
  ├── controllers/
  ├── models/
  ├── routes/
  ├── services/
  ├── sync.js
  ├── db.js
  └── server.js
/client
  ├── components/
  ├── app/
  ├── services/
  └── next.config.js

## Enpoints de la API 
- POST /api/auth/login – Iniciar sesión y obtener token JWT.
- POST /api/users/ - Crear un usuario
- GET /api/users/:id – Obtener datos del usuario.
- GET /api/areas – Obtener lista de áreas.
- GET /api/reservations – Obtener reservas filtradas por usuario, área o fecha.
- POST /api/reservations – Crear nueva reserva.
- DELETE /api/reservations/:id – Cancelar reserva.

## Mejoras futuras 
- Implementar roles y permisos (admin, usuario).
- Añadir notificaciones y recordatorios.
- Soporte para reservas recurrentes.
- Mejorar la UI/UX con librerías como Tailwind o Material UI.
- Integrar pago en línea para reservas con costo.

## Acerca del Proyecto 
El proyecto desarrollado no contiene nada fuera de la normal. No utiliza librerias externas, mas que las necesarias para poder ejecutar el proyecto. El proyecto cumple con lo requerido, el cual es la creacion de usuarios y poder hacer reservas de espacios comunes. 

## Licencia 
Este proyecto está bajo la licencia MIT. 

