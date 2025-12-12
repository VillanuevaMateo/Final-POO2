Proyecto POO2 – Trabajo Práctico Final (Primera y Segunda Parte)

Descripción
------------

Este proyecto corresponde al Trabajo Práctico Final de Programación Orientada a Objetos 2 (POO2).  
Su objetivo es desarrollar un sistema que permita a una compañía:

- Vender paquetes prepago a clientes.
- Registrar consumos de internet y llamadas.
- Manejar la validez de los paquetes.
- Permitir préstamos de datos o minutos entre clientes, respetando reglas de negocio.

Funcionalidades Implementadas
-----------------------------

1. Cliente

   Cada cliente tiene:
   - Nombre completo
   - Número de línea
   - Cuenta prepago asociada

   Puede:
   - Consultar el saldo de su cuenta prepago
   - Comprar paquetes, si cumple las condiciones:
       - No tener un paquete activo que no esté agotado o vencido
       - Tener saldo suficiente
   - Configurar renovación automática de paquetes
   - Registrar consumos de internet y llamadas
   - Recibir préstamos de datos o minutos y agregarlos automáticamente como un paquete temporal

2. Cuenta Prepago

   Permite:
   - Consultar saldo
   - Cargar saldo positivo
   - Debitar montos, si hay saldo suficiente
   - Controla accesos y mantiene la privacidad del saldo

3. Paquete

   Contiene:
   - GB de datos
   - Minutos de llamadas
   - Duración en días
   - Costo
   - Fecha de compra

   Funcionalidades:
   - Verificar si está agotado (GB y minutos = 0)
   - Verificar si está vencido (fecha de compra + duración)
   - Descontar consumo de datos o minutos con validaciones:
       - No se puede consumir más de lo disponible
       - No se puede consumir una cantidad negativa
       - Tipo de consumo debe ser válido (internet o llamadas)

4. Consumo

   Representa un consumo individual (internet o llamadas)

   Almacena:
   - Tipo
   - Cantidad
   - Fecha de inicio y fin

   Se integra con el cliente para registrar cada evento de consumo

5. Préstamos (Segunda Parte)

   Los clientes pueden prestar GB o minutos a otros clientes

   Reglas de negocio:
   - El receptor no puede tener un paquete activo para recibir un préstamo
   - El receptor no puede tener un préstamo vigente para recibir un nuevo préstamo
   - El donante debe tener paquete activo y no agotado para otorgar un préstamo
   - La fecha de vencimiento del préstamo coincide con la del paquete del donante

   Al recibir un préstamo:
   - Se registra en el historial de préstamos recibidos
   - Se crea un paquete temporal en el receptor con la cantidad prestada y vigencia correspondiente

   Al otorgar un préstamo:
   - Se registra en el historial de préstamos otorgados
   - Se descuentan los GB o minutos prestados del paquete del donante

Estructura del Proyecto
-----------------------

- `src/` contiene los prototipos de los objetos
- `test/` contiene los tests escritos con Jest, siguiendo TDD

Cómo Ejecutar los Tests
-----------------------

1. Instalar dependencias:
    npm install

2. Ejecutar tests:
    npm test

Cambios agregados respecto a la primera versión
-----------------------------------------------

- Se agregó la sección de Préstamos, detallando reglas de negocio y comportamiento al otorgar y recibir préstamos.
- Se mencionó que los préstamos generan paquetes temporales en el receptor.
- Se incluyó la validación de paquetes activos y préstamos vigentes al recibir préstamos.
- Se aclaró que la fecha de vencimiento del préstamo coincide con la del paquete del donante.
