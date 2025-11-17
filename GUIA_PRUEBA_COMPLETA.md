# 🧪 Guía de Prueba Completa - Sistema de Autenticación y Datos

## ✅ Estado Actual del Sistema

### **Autenticación Implementada:**
- ✅ Login con Google OAuth
- ✅ Registro automático de usuarios
- ✅ Sesiones en base de datos PostgreSQL
- ✅ Protección de rutas del dashboard
- ✅ Aislamiento de datos por usuario

### **Endpoints Protegidos:**
- ✅ `/api/emails` - Lista emails del usuario autenticado
- ✅ `/api/emails/stats` - Estadísticas del usuario
- ✅ `/api/emails/import` - Importa emails al usuario actual
- ✅ `/api/emails/process` - Procesa emails del usuario
- ✅ `/api/emails/kanban` - Actualiza Kanban del usuario
- ✅ `/api/emails/update` - Actualiza email individual

---

## 📋 Prueba End-to-End (Paso a Paso)

### **Paso 1: Iniciar Sesión**

1. **Abre el navegador**: http://localhost:3000
2. **Click en "Comenzar ahora"** (te lleva a `/login`)
3. **Click en "Continuar con Google"**
4. **Selecciona tu cuenta de Google** y autoriza
5. **✅ Deberías estar en**: http://localhost:3000/dashboard

**Verifica que:**
- ✅ Aparece tu nombre en el header del dashboard
- ✅ Aparece tu foto de perfil de Google
- ✅ Las estadísticas muestran 0 emails (primera vez)

---

### **Paso 2: Importar Emails de Prueba**

**Opción A: Desde el Dashboard Home**

1. En el dashboard, **click en "Importar Emails"**
2. **Selecciona el archivo**: `public/assets/sample-emails.json`
3. **Espera la confirmación** (debería mostrar "Importados 10 emails")
4. **Las estadísticas se actualizan** automáticamente:
   - Total de Emails: 10
   - Emails sin Procesar: 10
   - Tareas Pendientes: 0
   - Tareas Completadas: 0

**Opción B: Desde la Vista de Emails**

1. Ve a **"Ver Todos los Emails"** o http://localhost:3000/dashboard/emails
2. **Click en "Importar JSON"** (botón arriba a la derecha)
3. **Selecciona** `public/assets/sample-emails.json`
4. **Verás** los 10 emails en la tabla

---

### **Paso 3: Visualizar Emails**

1. **Ve a**: Dashboard > Ver Todos los Emails
2. **Deberías ver** una tabla con:
   - Remitente
   - Asunto
   - Fecha
   - Estado (sin procesar)
3. **Prueba buscar**: Escribe "urgente" en el buscador
   - ✅ Debería filtrar emails con "urgente" en asunto o remitente
4. **Ordena por fecha**: Click en el dropdown de ordenamiento
5. **Click en una fila**: Se abre un modal con el email completo

---

### **Paso 4: Ver Kanban (Vacío por ahora)**

1. **Ve a**: Dashboard > Ir al Kanban
2. **Deberías ver**: Tablero con 3 columnas vacías
   - Por hacer (0)
   - En progreso (0)
   - Completado (0)

**Nota:** El Kanban solo muestra emails marcados como "tareas". Como aún no hemos procesado con IA, no hay tareas detectadas.

---

### **Paso 5: Prueba Multi-Usuario (Aislamiento de Datos)**

**Para verificar que los datos están aislados por usuario:**

1. **Abre una ventana de incógnito** o usa otro navegador
2. **Inicia sesión** con una **cuenta de Google diferente**
3. **Verás**: Dashboard con 0 emails (limpio)
4. **Importa emails** en esta segunda cuenta
5. **Verifica**:
   - ✅ La cuenta 1 solo ve sus 10 emails
   - ✅ La cuenta 2 solo ve sus emails recién importados
   - ✅ **NO se comparten datos entre usuarios**

---

### **Paso 6: Cerrar Sesión**

1. **Click en tu nombre/avatar** en el header
2. **Click en "Cerrar sesión"**
3. **Deberías volver a**: `/login`
4. **Intenta acceder a**: http://localhost:3000/dashboard
   - ✅ Te redirige automáticamente a `/login`

---

## 🔍 Verificación de Seguridad

### **Prueba 1: Acceso sin autenticación**

```bash
# Abre una terminal y ejecuta:
curl http://localhost:3000/api/emails
```

**Resultado esperado:**
```json
{
  "error": "No autorizado. Debes iniciar sesión."
}
```

### **Prueba 2: Sesión persistente**

1. Inicia sesión
2. **Cierra el navegador** completamente
3. **Vuelve a abrir** http://localhost:3000/dashboard
4. **✅ Deberías seguir autenticado** (sesión en DB)

### **Prueba 3: Token expiration**

- Las sesiones duran **30 días**
- Después de 30 días sin actividad, se requiere login nuevo

---

## 🗄️ Verificación en Base de Datos

### **Ver datos en Prisma Studio:**

```powershell
npx prisma studio
```

**Verifica:**

1. **Tabla `users`**:
   - ✅ Tu usuario con email de Google
   - ✅ Campo `image` con tu foto de perfil
   
2. **Tabla `accounts`**:
   - ✅ Cuenta OAuth vinculada a tu usuario
   - ✅ `provider: "google"`

3. **Tabla `sessions`**:
   - ✅ Sesión activa con `userId` correcto
   - ✅ `expires` en el futuro

4. **Tabla `emails`**:
   - ✅ 10 emails importados
   - ✅ Todos con `userId` de tu cuenta
   - ✅ Campo `processed: false`
   - ✅ Campo `hasTask: false`

---

## 📊 Flujo de Datos Completo

```
┌─────────────────┐
│  Google OAuth   │
│   (Login)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  NextAuth crea  │
│  Usuario + Sess │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Dashboard     │
│  (Protegido)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Importar JSON   │
│ → API valida    │
│    sesión       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Emails saved    │
│ con userId      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Vista de Emails │
│ filtrada por    │
│ userId actual   │
└─────────────────┘
```

---

## ✅ Checklist de Funcionalidad

- [ ] **Login con Google funciona**
- [ ] **Usuario se crea en BD**
- [ ] **Dashboard muestra nombre/foto del usuario**
- [ ] **Importación de JSON funciona**
- [ ] **Emails se guardan con userId correcto**
- [ ] **Solo veo mis emails, no de otros usuarios**
- [ ] **Búsqueda y filtros funcionan**
- [ ] **Modal de detalle se abre**
- [ ] **Estadísticas se actualizan en tiempo real**
- [ ] **Kanban muestra (vacío por ahora)**
- [ ] **Logout funciona**
- [ ] **Protección de rutas funciona**
- [ ] **No puedo acceder a `/dashboard` sin login**

---

## 🐛 Solución de Problemas

### **No puedo iniciar sesión**
- Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén en `.env`
- Verifica en Google Console que la redirect URI sea: `http://localhost:3000/api/auth/callback/google`

### **Los emails no se importan**
- Verifica que el JSON tenga el formato correcto
- Abre la consola del navegador para ver errores
- Verifica que estés autenticado

### **Veo emails de otro usuario**
- 🚨 **Esto NO debería pasar** - Si ocurre, es un bug crítico
- Verifica en Prisma Studio que los `userId` sean diferentes

---

## 🎯 Próximos Pasos

Una vez que todo esto funcione:

1. **✅ Implementar procesamiento IA** (detectar tareas automáticamente)
2. **✅ Refactoring de endpoints** (optimización)
3. **✅ Testing automatizado**

---

**¡Prueba todo el flujo y confirma que funcione!** 🚀
