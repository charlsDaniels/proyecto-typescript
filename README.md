# CharlTops E-commerce

Este proyecto se realizó como práctica para el curso de `React Js` de `coder-house`.

El sistema consiste en un E-commerce que permite ver productos (Camisas y Remeras), seleccionar distintos talles y cantidades de estos y agregarlos a un carrito para su posterior compra.
Los productos pueden visualizarse en su totalidad desde la página principal o clasificados por categoría.

![GIF de demostración.](/public/e-commerce.gif "Demo de una compra.")

# URL del sitio web

https://charltops-ecommerce.web.app/

## Comandos útiles para correr la aplicación

Una vez clonado el proyecto (rama main) y dentro del directorio principal se pueden ejecutar los siguientes comandos:

### `npm install`

Con este comando se creará la carpeta \node_modules y se instalarán allí las dependencias necesarias para correr la aplicación.

### `npm start`

Levanta la app en modo desarrollo en el puerto [http://localhost:3000]

## Librerías utilizadas

* [React Js v18](https://reactjs.org)
* [React Router Dom v6](https://reactrouter.com/docs/en/v6)
* [Material UI v5](https://mui.com/)
* [Firebase v9](https://firebase.google.com/)

## Detalles de implementación

Al momento de visualizar una remera o camisa en particular se optó por dar la posibilidad de elegir el talle de la misma. El stock va a variar dependiendo la opción que se elija. 
Si se agrega una cierta cantidad de un producto al carrito y luego esa cantidad se quiere modificar, el contador iniciará su valor en el que ya haya en el carrito para ese producto. De esta manera se evita que el usuario agregue más de lo disponible.

Para la etapa de check-out se utilizó la misma ruta/vista `/cart` tanto para la visualización de los productos del carrito como para el formulario con los datos personales del comprador. Me pareció que el diseño visual se complementaba bien de ese modo y además, que no era práctico generar otra ruta/vista para solo mostrar el formulario.
Para la validación del formulario (teléfono y email) no se agregó ninguna librería externa.

El sitio cumple con diseño responsive para poder ser visualizado de manera correcta en una tablet/celular.