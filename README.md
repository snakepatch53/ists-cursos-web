# 📝 RESUMEN DE LA APLICACION WEB

<div style="text-align:center">
    <img src="./public/img/logo.png" style="width:200px;aspect-ratio:1/1;object-fit:cover;background:white;border-radius:50%;margin:50px" />
</div>

## 📋 DATOS GENERALES

<ul>
    <li><b>Cliente:</b> ✅ Instituto Superior Tecnológico Sucua</li>
    <li><b>Estado:</b> 🎉 Producción</li>
    <li><b>Version:</b> 🚀 1.0.0</li>
    <li><b>Nombre:</b> 😎 Cursos ISTS - WEB</li>
</ul>

## 📋 DESCRIPCION

<p>
    Este proyect es una WEB APP que permite a los estudiantes del Instituto Superior Tecnológico Sucua, poder visualizar los cursos que se imparten en la institución, así como también a los docentes poder gestionar los cursos que imparten.
    <br>
    Esta desarrollada bajo las tecnologias web principales: <b>HTML, CSS, JAVASCRIPT, REACT y TAILWIND</b>
    <br>
    El lenguaje de programacion principal es <b>JAVASCRIPT</b> con la libreria <b>REACT</b>
    <br>
</p>

## 📋 REQUISITOS

<ul>
    <li><b>React Versión:</b> 18.2.0</li>
</ul>

## 📝 LICENCIA

<p>
    Este proyecto es de código abierto, ¡lo que significa que es completamente libre! 🙌 Puedes usarlo, copiarlo, modificarlo y distribuirlo como desees para tus propios proyectos sin ningún tipo de restricciones. 🚀
    <br>
    Nos encanta la idea de que más personas puedan utilizar y mejorar nuestro código. 🤓
    <br>
    ¡Gracias por visitarnos y disfruta del código! 😎
    <br>
</p>

# 📦 DOCUMENTACION DE INSTALACION

## 📄 VARIABLES DE ENTORNO

Crea el archivo <b><i>.env</i></b> en base al archivo <b><i>.env.example</i></b> y configuralo. Principalmente las variables de entorno que se deben configurar son:

```env
    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE={{YOUR_DB_NAME}}
    DB_USERNAME={{YOUR_DB_USER}}
    DB_PASSWORD={{YOUR_DB_PASS}}
```

## 🐬 MYSQL

Crea la base de datos

```sql
  CREATE DATABASE {{YOUR_DB_NAME}};
```

-   Asegurate de que el nombre de la base de datos sea el mismo que el que usas en el archivo .env
-   Si estas en CPANEL tendras que crearla con ayuda de la interfaz grafica.

### 🛠 CONFIGURACION

Para migrar las tablas de la base de datos puedes ejecutar el siguiente comando

```bash
  php artisan migrate
```

Suponiendo que CPANEL no te da acceso a una consola, puedes habilitarte el servicio en CPANEL de REMOTE MYSQL y desde tu proyecto en local puedes conectarte a la base de datos remota. Con eso puedes ejecutar el comando de migracion desde tu consola local.
Posteriormente puedes deshabilitar el servicio de REMOTE MYSQL para que no se conecte desde cualquier lugar.

## 🪶 APACHE

#### 🛠 En caso de que tu proyecto ya este funcionando con un dominio y quieras usar _https_, puedes agregar esta configuracion en _htaccess_

```htaccess
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
  Header always set Content-Security-Policy "upgrade-insecure-requests;"
```

## CONFIGURACION DE VERSION DE PHP

En caso de que tu _CPANEL_ o tu entorno _LOCAL_ no tenga la version de _PHP_ minimamente _8.0_ debes asegurarte de instalarla y activarla.
