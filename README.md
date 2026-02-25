# 💊 DosísPed MX — Calculadora Pediátrica PWA

Calculadora de dosis pediátrica para médicos en México.  
Funciona **100% offline** como app instalable en Android e iOS.

---

## 📁 Estructura del Proyecto

```
dosisped-pwa/
├── index.html          ← App principal (toda la lógica aquí)
├── manifest.json       ← Configuración PWA (nombre, iconos, colores)
├── sw.js               ← Service Worker (soporte offline)
├── netlify.toml        ← Configuración de headers y redirects
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md           ← Este archivo
```

---

## 🚀 Cómo Subir a Netlify

### Opción A — Arrastrar y Soltar (más fácil)
1. Ve a [netlify.com](https://netlify.com) e inicia sesión
2. En tu Dashboard haz clic en **"Add new site"** → **"Deploy manually"**
3. **Arrastra toda la carpeta `dosisped-pwa`** al área de drop
4. ¡Listo! Netlify te dará una URL tipo `https://nombre-aleatorio.netlify.app`

### Opción B — Con Git (recomendado para actualizaciones)
1. Sube la carpeta a un repositorio en GitHub
2. En Netlify: **"Add new site"** → **"Import an existing project"**
3. Conecta tu repositorio
4. Build settings: dejar todo en blanco (sitio estático)
5. Deploy

### Opción C — Netlify CLI
```bash
npm install -g netlify-cli
cd dosisped-pwa
netlify deploy --prod
```

---

## 📲 Cómo Instalar en tu Celular

### Android (Chrome)
1. Abre la URL de tu app en Chrome
2. Aparecerá un banner de instalación automáticamente
3. O: menú (⋮) → **"Añadir a pantalla de inicio"**
4. ✅ Se instala como app nativa

### iOS (Safari)
1. Abre la URL en **Safari** (no Chrome en iOS)
2. Toca el botón de **Compartir** (□↑)
3. Selecciona **"Añadir a pantalla de inicio"**
4. ✅ Se instala como app nativa

> ⚠️ En iOS debes usar Safari obligatoriamente para instalar PWAs.

---

## ✨ Características

- **24 medicamentos pediátricos** con dosis por peso
- Cálculo automático de volúmenes por concentración
- Horario de tomas con mL por dosis
- BSA (Mosteller), IMC, grupo etario
- Funciona **sin internet** (Service Worker)
- Modo offline completo
- Instalable como app nativa
- Adaptada a presentaciones disponibles en México
- Basada en: CENETEC, NOM-007-SSA2, Taketomo Handbook

---

## ⚕️ Aviso Médico

Esta herramienta es exclusivamente para uso por profesionales de la salud capacitados. Las dosis son orientativas — siempre individualiza según el paciente y verifica con las guías clínicas vigentes.

---

## 🔧 Personalización

Para agregar medicamentos edita el array `DRUGS` en `index.html`.  
Para cambiar colores edita las variables CSS en `:root`.

---

*DosísPed MX v1.0 · Hecho con ❤️ para médicos en México*
