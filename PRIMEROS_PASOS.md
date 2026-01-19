# 🚀 Pasos para Ejecutar la App IB Study

## ⚠️ IMPORTANTE: Reinicia PowerShell

Después de instalar Node.js, debes **cerrar completamente PowerShell y volver a abrirlo** para que reconozca los comandos `node` y `npm`.

## Pasos para Ejecutar

### 1️⃣ Cierra esta ventana de PowerShell

Cierra completamente la terminal actual.

### 2️⃣ Abre una nueva PowerShell

Abre PowerShell de nuevo (búscalo en el menú de Windows).

### 3️⃣ Navega a la carpeta del proyecto

```powershell
cd C:\Users\anmob\.gemini\antigravity\scratch\ib-study-app
```

### 4️⃣ Verifica que Node.js esté instalado

```powershell
node --version
npm --version
```

Deberías ver algo como:
- `v24.13.0` (o similar para node)
- `10.x.x` (o similar para npm)

### 5️⃣ Instala las dependencias del proyecto

```powershell
npm install
```

Este comando descargará todas las librerías necesarias (React, TypeScript, etc.). Tomará unos minutos.

### 6️⃣ Inicia el servidor de desarrollo

```powershell
npm run dev
```

### 7️⃣ Abre en el navegador

El comando anterior debería abrir automáticamente tu navegador en:
```
http://localhost:5173
```

Si no se abre automáticamente, cópialo y pégalo en tu navegador.

## ✅ ¡Listo!

Deberías ver la aplicación IB Study funcionando con:
- 🔥 Contador de racha
- 📅 Próximos exámenes
- 🤖 Mensaje del mentor
- ➕ Botón para añadir horas

## 🐛 Si hay problemas

**Si los comandos `node` o `npm` siguen sin funcionar:**
1. Verifica que cerraste y volviste a abrir PowerShell
2. Reinicia tu computadora si es necesario
3. Verifica la instalación en Panel de Control > Programas

**Si hay errores durante `npm install`:**
- Asegúrate de estar en la carpeta correcta
- Verifica tu conexión a internet
- Intenta ejecutar PowerShell como administrador

## 📱 Probando la App

Una vez que esté corriendo, prueba:

1. **Racha**: Debería mostrar "1 Día de racha" (es tu primer día)
2. **Tema**: Ve a Ajustes y cambia entre modo oscuro/claro
3. **Añadir horas**: Click en el botón morado para registrar tiempo de estudio
4. **Navegación**: Prueba todas las pestañas del menú lateral

## 🔄 Para Detener el Servidor

Presiona `Ctrl + C` en PowerShell cuando quieras parar la app.

## 🎯 Próximos Pasos

Una vez que veas que todo funciona, me avisas y continuaremos implementando:
- Sistema de Tareas completo
- Sistema de Cuestionarios
- Y más funcionalidades!

---

**¿Todo listo?** Avísame cuando tengas la app corriendo y me cuentas qué te parece! 🚀
