# AdminFront Apps (Frontend)

## Descripción

Frontend para la administración de platos y usuarios de Latelier, construido con React + Vite.

---

## 1. Cómo correr el frontend

1. Clona este repositorio:
   ```bash
   git clone https://github.com/FedericoHerreraa/adminfront-apps.git
   cd adminfront-apps
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   VITE_REACT_APP_API_URL=http://localhost:3000
   ```
  VITE_REACT_APP_API_URL=http://localhost:3000
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```
   La app estará disponible en [http://localhost:5173](http://localhost:5173) por defecto.



## 3. Dependencias necesarias

- **Node.js** (v16 o superior recomendado)
- **npm** (v8 o superior)
- **Un backend compatible** (Node.js + Express + MongoDB)

---

## 4. Variables de entorno

Crea un archivo `.env` en la raíz del frontend con:

```
VITE_REACT_APP_API_URL=http://localhost:3000
```
---

## 5. Estructura del sistema

```
adminfront-apps/
├── src/
│   ├── components/         # Componentes React
│   ├── context/            # Contextos globales (Auth, etc.)
│   ├── lib/                # Utilidades
│   ├── pages/              # Páginas principales
│   ├── index.css           # Estilos globales
│   └── App.tsx             # Componente principal
├── public/                 # Archivos estáticos
├── .env                    # Variables de entorno frontend
├── package.json
└── README.md
```

---

## Notas

- El backend debe estar corriendo y accesible desde la URL configurada en `VITE_REACT_APP_API_URL`.
- Para producción (por ejemplo, en Vercel), configura la variable de entorno en el dashboard del proveedor.
```

---

## 6. Estructura del sistema

```
adminfront-apps/
├── src/
│   ├── components/         # Componentes React
│   ├── context/            # Contextos globales (Auth, etc.)
│   ├── lib/                # Utilidades
│   ├── pages/              # Páginas principales
│   ├── index.css           # Estilos globales
│   └── App.tsx             # Componente principal
├── public/                 # Archivos estáticos
├── .env                    # Variables de entorno frontend
├── package.json
└── README.md
```

El backend debe tener una estructura similar a:
```
backend/
├── controllers/
├── models/
├── routes/
├── services/
├── uploads/                # Carpeta para imágenes subidas
├── .env
└── server.js


