## start:

**Descripción**: Inicia la aplicación ejecutando el archivo JavaScript compilado ./dist/src/index.js.
**Uso**: Este script generalmente se usa en un entorno de producción, donde la aplicación ya ha sido compilada y está lista para ejecutarse.

## test:

Descripción: Ejecuta las pruebas utilizando jest, asegurándose de correr en un solo proceso (--runInBand) y sin mostrar salidas de consola innecesarias (--silent).
Uso: Se utiliza para ejecutar todas las pruebas localmente de manera ordenada y silenciosa.

**Descripción**: Ejecuta las pruebas con jest en modo silencioso (--silent).
**Uso**: Este script suele utilizarse en entornos de integración continua (CI), donde se busca que las pruebas se ejecuten sin generar demasiada salida en la consola.

## npm run dev:

**Descripción**: Construye la documentación Swagger (swagger:build) y luego inicia el servidor en modo desarrollo usando ts-node-dev con soporte para los alias de TypeScript (tsconfig-paths/register).
**Uso**: Se utiliza durante el desarrollo local de la aplicación, recompilando automáticamente al hacer cambios en el código.

## dev:docker:

**Descripción**: Levanta la base de datos tecno-db mediante Docker Compose, genera la documentación Swagger y luego ejecuta el servidor en modo desarrollo con ts-node-dev.
**Uso**: Este script se utiliza cuando necesitas tener tu base de datos tecno-db en ejecución mediante Docker mientras trabajas en la aplicación localmente.

## dev:sql:

Descripción: Genera la documentación Swagger y ejecuta el servidor en modo desarrollo con ts-node-dev.
Uso: Similar a dev, pero está pensado para escenarios donde el desarrollo está relacionado con el manejo de SQL.

## build:

**Descripción**: Compila el código TypeScript (tsc), ajusta los alias de TypeScript (tsc-alias), y copia el archivo swagger.yaml compilado a la carpeta de distribución (./dist).
**Uso**: Se utiliza para preparar la aplicación para producción, asegurándose de que tanto el código como la documentación Swagger estén listos para desplegar.

## db:seed:

**Descripción**: Restaura la base de datos (db:drop), luego ejecuta los scripts de seed (poblar datos) definidos en src/utils/seed/index.ts. Utiliza la variable de entorno SEED=true.
**Uso**: Se utiliza para poblar la base de datos con datos de prueba o iniciales.

## db:drop:

**Descripción**: Ejecuta el script para eliminar la base de datos o sus tablas, definido en src/utils/seed/drop.ts.
**Uso**: Se utiliza para vaciar o eliminar la base de datos, generalmente antes de volver a poblarla.

## swagger:build:

**Descripción**: Usa swagger-cli para compilar los archivos de definición Swagger desde src/docs/index.yaml y genera un archivo de salida swagger.yaml en src/docs/build.
**Uso**: Se utiliza para compilar y generar la documentación Swagger de la API.

## format:

**Descripción**: Aplica el formato a todos los archivos en el directorio src utilizando prettier.
**Uso**: Se utiliza para asegurarse de que todo el código cumpla con un estilo de formato uniforme.

## lint:staged:

**Descripción**: Ejecuta lint-staged para revisar y corregir el código que ha sido modificado (staged) antes de realizar un commit.
**Uso**: Se utiliza como parte del flujo de trabajo de pre-commit para asegurarse de que el código modificado cumpla con las reglas de linting antes de ser enviado al repositorio.
