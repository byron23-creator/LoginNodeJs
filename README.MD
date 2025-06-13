# Login JWT en Node.js con MySQL

Este proyecto implementa un sistema de autenticación de usuarios utilizando JSON Web Tokens en Node.js, Express y MySQL. Incluye funcionalidades de registro, login y rutas protegidas.

## Características

* **Registro de Usuarios**: Permite la creación de nuevas cuentas de usuario.
* **Login de Usuarios**: Autentica a los usuarios y genera un JWT válido para futuras solicitudes.
* **Endpoint Protegido**: Una ruta `/api/user/me` que solo es accesible si se proporciona un token JWT válido, mostrando la información del usuario logueado.
* **Conexión a Base de Datos MySQL**: Utiliza `mysql2` para la interacción con la base de datos.
* **Manejo de Errores**: Captura y responde con errores apropiados en el API.

## Características Técnicas

* **Node.js**
* **Express**
* **JSON Web Tokens (JWT)**
* **Bcrypt.js**
* **MySQL2**
* **Dotenv**
* **Express-Validator**

## Requisitos

* Node.js 
* MySQL Server 

## Configuración de la Base de Datos

1.  Es necesario tener un servidor MySQL en funcionamiento.
2.  Crea una base de datos para este proyecto. agregar un nombre un nombre ..


3.  El script de la aplicación (`app.js`) automáticamente creará la tabla `users` si no existe al iniciar el servidor.


## Instalación y Ejecución

1.  Clonar repositorio

2.  Instalar las dependencias:

3.  Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno. 

4.  Inicia el servidor:
    

## Cómo Probar (Colección de Postman/Insomnia)

Se incluye una colección de Postman para facilidad de las pruebas.

