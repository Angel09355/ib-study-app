# IB Study App - Aplicación de Estudio para Bachillerato Internacional

Una aplicación web completa para estudiantes de Bachillerato Internacional con IA, seguimiento de progreso y sistema de motivación.

## 🚀 Estado del Proyecto

**Fase 1 (MVP) - En Desarrollo**

✅ Estructura del proyecto creada  
✅ Sistema de almacenamiento local implementado  
✅ Dashboard con contador de racha  
✅ Sistema de temas (oscuro/claro)  
✅ Layout responsive con navegación  
✅ Componentes básicos del dashboard  
🔄 Sistema de tareas (próximamente)  
🔄 Sistema de cuestionarios (próximamente)  

## 📋 Requisitos Previos

Para ejecutar esta aplicación necesitas:

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)

### Instalar Node.js

Si no tienes Node.js instalado:

1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador
4. Verifica la instalación abriendo PowerShell y ejecutando:
   ```bash
   node --version
   npm --version
   ```

## 🛠️ Instalación

1. **Abre PowerShell en la carpeta del proyecto:**
   ```bash
   cd C:\Users\anmob\.gemini\antigravity\scratch\ib-study-app
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:**
   ```
   http://localhost:5173
   ```

## 🎨 Características Implementadas

### Dashboard
- **Contador de Racha**: Seguimiento automático de días consecutivos de estudio
- **Mensaje del Mentor**: Saludos contextuales y motivación personalizada
- **Próximos Exámenes**: Lista de los 5 exámenes/entregas más cercanos con countdown
- **Añadir Horas Rápido**: Modal para registrar sesiones de estudio manualmente

### Diseño
- **Tema Oscuro por Defecto**: Diseño moderno con paleta de colores vibrante
- **Modo Claro**: Disponible en Ajustes
- **Responsive**: Funciona en móvil, tablet y desktop
- **Navegación**: Sidebar en desktop, barra inferior en móvil

### Almacenamiento
- **localStorage**: Todos los datos se guardan localmente en tu navegador
- **Persistencia**: Los datos permanecen aunque cierres la aplicación
- **Exportación**: Sistema para respaldar datos (Fase 4)

## 📚 Asignaturas Configuradas

Por defecto, la app incluye tus asignaturas:

**High Level (HL):**
- Matemáticas
- Química

**Standard Level (SL):**
- Historia
- Lengua
- Física
- Inglés

**Otras:**
- TDC (Teoría del Conocimiento)
- Educación Física LOMLOE
- Dibujo Técnico LOMLOE

## 🎯 Próximos Pasos (Fase 1)

- [ ] Sistema completo de Tareas (estilo Microsoft To-Do)
- [ ] Creación manual de cuestionarios
- [ ] Realización de cuestionarios con timer
- [ ] Revisión de resultados
- [ ] Sistema básico de notas

## 🔮 Fases Futuras

### Fase 2
- Cuadernos con subida de archivos
- Gráficas de progreso
- Timer Pomodoro
- Historial de sesiones

### Fase 3
- Generación de cuestionarios con IA (Gemini API)
- Mentor IA conversacional
- Detección de inactividad inteligente

### Fase 4
- Sincronización con Google Calendar
- Sistema de logros y gamificación
- Exportación/importación de datos
- Tutorial interactivo

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool ultra-rápido
- **Zustand**: Gestión de estado
- **React Router**: Navegación
- **date-fns**: Manejo de fechas
- **Lucide React**: Iconos
- **CSS Modules**: Estilos scoped

## 📂 Estructura del Proyecto

```
ib-study-app/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── dashboard/   # Componentes del dashboard
│   │   ├── layout/      # Layout y navegación
│   │   ├── tasks/       # Sistema de tareas
│   │   └── ...
│   ├── pages/           # Páginas principales
│   ├── store/           # Estado global (Zustand)
│   ├── types/           # Definiciones TypeScript
│   ├── utils/           # Utilidades y helpers
│   ├── styles/          # Estilos globales
│   └── services/        # APIs y servicios externos
├── public/              # Archivos estáticos
└── package.json
```

## 💡 Tips de Uso

1. **Racha**: La racha se actualiza automáticamente. Abre la app cada día para mantenerla.
2. **Tema**: Puedes cambiar entre modo oscuro y claro en Ajustes.
3. **Datos**: Tus datos están seguros en tu navegador. No se pierden al cerrar.
4. **Mobile**: La app funciona perfectamente en el móvil. Añade a pantalla de inicio para acceso rápido.

## 🐛 Desarrollo

Si encuentras problemas:

1. Asegúrate de tener Node.js instalado
2. Borra `node_modules` y ejecuta `npm install` de nuevo
3. Limpia la caché del navegador
4. Revisa la consola del navegador (F12) para errores

## 📝 Notas

- La aplicación guarda todos los datos en localStorage
- No se requiere conexión a internet para las funciones básicas
- Las funciones de IA requerirán conexión (Fase 3)

## 🎓 Hecho para estudiantes IB

Esta aplicación está diseñada específicamente para ayudarte a organizarte, estudiar de forma inteligente y mantenerte motivado durante el Bachillerato Internacional.

¡Buena suerte con tus estudios! 📚🔥
