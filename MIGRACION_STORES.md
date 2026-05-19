# Guía de Migración a Tiendas (App Store & Play Store)

Esta documentación detalla los pasos necesarios para empaquetar y distribuir la aplicación Servite en las tiendas oficiales.

## 1. Requisitos Previos
- **Cuenta de Desarrollador Apple**: Necesaria para iOS (costo anual ~99 USD).
- **Cuenta de Desarrollador Google**: Necesaria para Android (pago único ~25 USD).
- **Framework de Distribución**: Se recomienda el uso de **Capacitor** o **React Native** para envolver esta aplicación Next.js en un contenedor nativo.

## 2. Preparación de Assets
- **Iconos**: Generar set completo de iconos (desde 20x20 hasta 1024x1024).
- **Splash Screens**: Pantallas de carga adaptadas a diferentes resoluciones y modo oscuro.
- **Screenshots**: Capturas de pantalla para marketing (iPhone 6.5", 5.5" y iPad; Android Phone y Tablet).

## 3. Pasos para Android (Play Store)
1. Configurar `AndroidManifest.xml` con los permisos necesarios (Internet, Localización).
2. Generar un **Upload Key** y un **Keystore** para firmar la aplicación.
3. Configurar el `build.gradle` con el `applicationId` final (ej: `com.servite.app`).
4. Generar el archivo `.aab` (Android App Bundle).
5. Subir a Google Play Console y configurar la ficha técnica.

## 4. Pasos para iOS (App Store)
1. Crear el Identificador de App en el portal de desarrolladores de Apple.
2. Configurar los **Certificados de Distribución** y el **Provisioning Profile**.
3. En Xcode, configurar el `Bundle Identifier` y la versión.
4. Asegurar que el `Info.plist` incluya las descripciones de privacidad para el uso de GPS (`NSLocationWhenInUseUsageDescription`).
5. Realizar el "Archive" y subir a TestFlight para pruebas.
6. Enviar a revisión desde App Store Connect.

## 5. Checklist de Revisión
- [ ] La app no tiene links rotos.
- [ ] El modo oscuro es consistente.
- [ ] La localización funciona correctamente.
- [ ] No hay contenido de prueba o "Lorem Ipsum".
