Guía Rápida para Probar Sistema de Autenticación Node.js

1. Iniciar el Servidor Node.js

Abrir la terminal.
Navegar hasta la carpeta raíz del proyecto.
Ejecuta el siguiente comando para iniciar el servidor:

npm start

nos dara un mensajes en la terminal indicando que la base de datos está conectada y que el servidor está escuchando en un puerto 3000.




2. Prueba de Registro de Usuario
Este endpoint permite crear una nueva cuenta de usuario en el sistema.

En Postman:

Método HTTP: POST
URL: http://localhost:3000/api/auth/register
Cuerpo (Body):
Seleccionar la opción raw.
Eligir el tipo JSON en el menú desplegable.
Introducir el siguiente objeto JSON, utilizando la propia informacion
JSON

{
    "username": "nombre_de_usuario",
    "email": "email@ejemplo.com",
    "password": "password_segura"
}
Clic en Send.

Salida:

Si es exitoso (Registro Creado): se recibira un código de estado 201 Created. La respuesta JSON incluirá el _id del nuevo usuario, el username, el email y un token. 

Si hay un error (Datos Inválidos / Usuario Existente): Mostrará un código de estado 400 Bad Request. La respuesta JSON contendrá un mensaje explicando el problema por ejemplo, "El usuario o email ya existe" o un error de validación de datos.




3. Prueba de Inicio de Sesión (Login)
Este endpoint permite autenticar un usuario existente y obtener un nuevo token de sesión.

En Postman:

Crea una nueva solicitud.
Método HTTP: POST
URL: http://localhost:3000/api/auth/login
Cuerpo (Body):
Seleccionar la opción raw.
Eligir el tipo JSON.
Introducir email y la password utlizado al registrar el usuario al registrar el usuario:
JSON

{
    "email": "email@ejemplo.com",
    "password": "password_segura"
}
Haz clic en Send.

Salida:

Si es exitoso (Autenticación Exitosa): se recibira un código de estado 200 OK. La respuesta JSON contendrá la información del usuario y un nuevo token. 

Si hay un error (Credenciales Incorrectas): generará un código de estado 401 Unauthorized. 




4. Prueba de Obtener Perfil de Usuario (Ruta Protegida)
Este endpoint demuestra cómo las rutas del API pueden ser protegidas, requiriendo un token JWT válido para el acceso.

En Postman:

Crea una nueva solicitud.
Método HTTP: GET
URL: http://localhost:3000/api/user/profile
Cabeceras (Headers):
Añadir una nueva Key llamada Authorization.
En el campo Value correspondiente, escribir la palabra Bearer (seguida de un espacio) y luego pegar el token JWT obtenido de ultimo
 Ejemplo : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWJkYmIxZWE2NjgxZGJkZWUzMzQ3MSIsImlhdCI6MTcxNzQ4NDIyNSwiZXhwIjoxNzE3NDg3ODI1fQ.EJ8sP-r-oKj_zM0W1mQo_3D-Y9aJ2X-u-pB_6q
Clic en Send.

Si es exitoso (Acceso Autorizado): muestra un código de estado 200 OK

Si hay un error (Acceso No Autorizado): muestra un código de estado 401 Unauthorized
