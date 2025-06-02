# Sistema de Autenticación con JWT en Node.js

Este proyecto implementa un sistema de autenticación de usuarios utilizando JSON Web Tokens (JWT) en Node.js, Express y MongoDB.

## Características

* **Registro de Usuarios:** Permite a los nuevos usuarios crear una cuenta con un nombre de usuario, email y contraseña. Las contraseñas se almacenan de forma segura utilizando hashing (bcrypt).
* **Login de Usuarios:** Autentica a los usuarios y genera un token JWT válido para futuras solicitudes.
* **Rutas Protegidas:** Demuestra cómo proteger rutas que solo son accesibles para usuarios autenticados mediante la verificación del token JWT.
* **Información del Perfil:** Un endpoint protegido para que el usuario logueado pueda ver sus propios datos.
* **Conexión a Base de Datos:** Utiliza MongoDB para almacenar la información del usuario.
* **Manejo de Errores:** Incluye middlewares para un manejo de errores robusto.
* **Validación de Datos:** Validación de esquemas de entrada para registro y login.

## Tecnologías Utilizadas

* **Node.js**
* **Express.js**
* **JSON Web Tokens (JWT)**
* **Mongoose** (para interacción con MongoDB)
* **Bcrypt.js** (para hashing de contraseñas)
* **Dotenv** (para variables de entorno)
* **Joi** (para validación de esquemas)

## Requisitos

* Node.js (versión 14 o superior)
* MongoDB (corriendo localmente o una instancia en la nube como MongoDB Atlas)

## Configuración e Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```
    MONGO_URI=mongodb://localhost:27017/auth_db # Reemplaza con tu URI de MongoDB
    JWT_SECRET=tu_secreto_jwt_muy_seguro        # ¡CAMBIA ESTO POR UN SECRETO FUERTE Y ALEATORIO!
    PORT=3000
    NODE_ENV=development # o production
    ```

4.  **Iniciar el servidor:**
    ```bash
    npm start
    ```
    El servidor se ejecutará en `http://localhost:3000` (o el puerto que hayas configurado).

## Cómo Probar

Se recomienda usar Postman o Insomnia para probar los endpoints.

### Endpoints Disponibles:

* **POST /api/auth/register**
    * **Propósito:** Registrar un nuevo usuario.
    * **Body (JSON):**
        ```json
        {
            "username": "nombreusuario",
            "email": "usuario@example.com",
            "password": "password123"
        }
        ```
    * **Respuesta Exitosa:** Un token JWT para el usuario registrado.

* **POST /api/auth/login**
    * **Propósito:** Iniciar sesión y obtener un token JWT.
    * **Body (JSON):**
        ```json
        {
            "email": "usuario@example.com",
            "password": "password123"
        }
        ```
    * **Respuesta Exitosa:** Un token JWT para el usuario.

* **GET /api/user/profile**
    * **Propósito:** Obtener la información del perfil del usuario logueado.
    * **Headers:**
        * `Authorization: Bearer <TU_TOKEN_JWT>` (el token obtenido del login o registro)
    * **Respuesta Exitosa:** Información del usuario (sin contraseña).

* **POST /api/user/protected-register** (Ejemplo de ruta protegida para registro, si se usa un flujo de administrador)
    * **Propósito:** Ruta de ejemplo para un registro que requiere autenticación (ej. por un administrador).
    * **Headers:**
        * `Authorization: Bearer <TU_TOKEN_JWT_DE_ADMINISTRADOR>`
    * **Body (JSON):** (Puede ser similar al registro normal si es para crear un usuario)
    * **Respuesta Exitosa:** Un mensaje indicando que es una ruta protegida.

---

### Colección de Postman/Insomnia

Puedes importar la siguiente colección (ejemplo para Postman) para probar rápidamente los endpoints.

**postman_collection.json** (Este archivo debe ser creado y exportado desde Postman/Insomnia)

```json
{
	"info": {
		"_postman_id": "YOUR_POSTMAN_COLLECTION_ID",
		"name": "Node.js JWT Auth System",
		"schema": "[https://schema.getpostman.com/json/collection/v2.1.0/collection.json](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)",
		"_collection_link": "YOUR_POSTMAN_COLLECTION_LINK"
	},
	"item": [
		{
			"name": "Register User",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\": \"testuser\",\n    \"email\": \"test@example.com\",\n    \"password\": \"password123\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/auth/register",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"auth",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "Login User",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"email\": \"test@example.com\",\n    \"password\": \"password123\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/auth/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get User Profile (Protected)",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer {{jwt_token}}",
						"type": "text",
						"description": "Reemplaza {{jwt_token}} con el token obtenido del login o registro"
					}
				],
				"url": {
					"raw": "http://localhost:3000/api/user/profile",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"user",
						"profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "Protected Register (Example)",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer {{jwt_token}}",
						"type": "text",
						"description": "Reemplaza {{jwt_token}} con un token de administrador si aplica"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\": \"admincreateduser\",\n    \"email\": \"adminuser@example.com\",\n    \"password\": \"adminpass\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/user/protected-register",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"user",
						"protected-register"
					]
				}
			},
			"response": []
		}
	],
	"variable": [
		{
			"key": "jwt_token",
			"value": ""
		}
	]
}