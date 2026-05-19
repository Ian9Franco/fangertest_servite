# Autenticación en Entornos de Tiendas

La gestión de usuarios y autenticación debe cumplir con políticas estrictas de Apple y Google para ser aprobada.

## 1. Políticas Obligatorias de Apple
Apple requiere que si una app ofrece login de terceros (como Google o Facebook), **debe ofrecer obligatoriamente "Sign in with Apple"**.

### Implementación Recomendada:
- **Firebase Auth**: Facilita la integración de múltiples proveedores y cumple con los estándares de seguridad.
- **JWT (JSON Web Tokens)**: Asegurar que el backend valide correctamente cada sesión.

## 2. Eliminación de Cuentas
Tanto Apple como Google requieren que el usuario pueda **eliminar su cuenta y sus datos personales directamente desde la app**.
- Implementar un botón en el Perfil: "Eliminar mi cuenta".
- El proceso debe ser claro y no requerir contacto manual (email) si es posible.

## 3. Persistencia de Sesión
- Utilizar `SecureStorage` (en Capacitor/Cordova) o `EncryptedSharedPreferences` (Android nativo) para guardar tokens.
- No utilizar `localStorage` para datos sensibles en apps productivas.

## 4. Requisitos para el Revisor
Para que la app sea aprobada, se debe proporcionar una **cuenta de prueba activa** en las notas de revisión:
- **Usuario**: `test_reviewer@servite.com`
- **Password**: `Servite2026!`
- Esta cuenta debe tener acceso a todas las funcionalidades (carga de saldo simulada, mapa, etc.).
