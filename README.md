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
   (Reemplaza la URL por la de tu backend si es necesario)
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```
   La app estará disponible en [http://localhost:5173](http://localhost:5173) por defecto.

---

## 2. Datos del admin inicial

- **Email:** admin@latelier.com
- **Contraseña:** admin123

*(Estos datos pueden variar según la configuración de tu backend.)*

---

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
```

---

## 7. Notas

- Asegúrate de que MongoDB esté corriendo antes de iniciar el backend.
- Para producción, configura correctamente las variables de entorno en tu hosting (Vercel, Render, etc.).
- El sistema soporta subida de imágenes para platos (requiere carpeta `uploads` en backend y configuración de Multer).

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
