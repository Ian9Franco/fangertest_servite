# Gestión de Pagos y Billetera en Tiendas

El manejo de dinero real es una de las áreas más sensibles en el proceso de revisión de aplicaciones móviles.

## 1. Pagos Digitales vs. Bienes Físicos
- **Bienes Digitales / Créditos**: Si el "Saldo" se considera un bien digital que se consume solo dentro de la app, Apple/Google podrían exigir el uso de **In-App Purchases (IAP)**, donde ellos cobran una comisión del 15% al 30%.
- **Servicios de Consumo Físico**: Dado que Servite se utiliza para comprar cerveza física (un bien del mundo real), se permite legalmente el uso de **pasarelas de pago externas** como Mercado Pago, Stripe o dLocal sin pagar comisión a las tiendas.

## 2. Integración con Mercado Pago (SDK)
Para la versión móvil, se recomienda:
1. No usar solo WebViews para el pago.
2. Implementar el **SDK Nativo de Mercado Pago** para una experiencia fluida.
3. Asegurar que el flujo de retorno (Deep Linking) funcione correctamente para volver a la app tras el pago exitoso.

## 3. Seguridad y Cumplimiento (PCI DSS)
- La aplicación **nunca** debe almacenar los números de tarjeta de crédito completos en sus servidores.
- Utilizar la técnica de **Tokenización** proporcionada por la pasarela de pagos.
- Mostrar solo los últimos 4 dígitos (`•••• 1234`) para identificación del usuario.

## 4. Transparencia
- El usuario debe recibir un comprobante o confirmación clara de cada carga de saldo.
- Mantener un historial de transacciones accesible y legible (ya implementado en la sección Billetera).

## 5. Manejo de Errores
- La app debe manejar casos de:
  - Pago rechazado.
  - Tiempo de espera agotado.
  - Pérdida de conexión durante la transacción.
