Proyecto POO2 – Trabajo Práctico Final (Primera Parte)

Descripción
------------
Este proyecto es la Primera Parte del Trabajo Práctico Final de Programación Orientada a Objetos 2 (POO2).
El objetivo es desarrollar un sistema que permita a una compañía vender paquetes prepago a clientes, 
registrar su consumo y manejar la validez de los paquetes.

Funcionalidades Implementadas
-----------------------------

1. Cliente
   - Cada cliente tiene:
       - Nombre completo
       - Número de línea
       - Cuenta prepago asociada
   - Puede:
       - Consultar el saldo de su cuenta prepago
       - Comprar paquetes, si cumple las condiciones:
           - No tener un paquete activo que no esté agotado o vencido
           - Tener saldo suficiente
       - Configurar renovación automática de paquetes

2. Cuenta Prepago
   - Permite:
       - Consultar saldo
       - Cargar saldo positivo
       - Debitar montos, si hay saldo suficiente

3. Paquete
   - Contiene:
       - GB de datos
       - Minutos de llamadas
       - Duración en días
       - Costo
       - Fecha de compra
   - Funcionalidades:
       - Verificar si está agotado (GB y minutos = 0)
       - Verificar si está vencido (fecha de compra + duración)
       - Descontar consumo de datos o minutos con validaciones:
           - No se puede consumir más de lo disponible
           - No se puede consumir una cantidad negativa
           - Tipo de consumo debe ser válido (internet o llamadas)

4. Consumo
   - Representa un consumo individual (internet o llamadas)
   - Almacena:
       - Tipo
       - Cantidad
       - Fecha de inicio y fin
   - Se integra con el cliente para registrar cada evento de consumo

Estructura del Proyecto
-----------------------
- src/ contiene los prototipos de los objetos
- test/ contiene los tests escritos con Jest, siguiendo TDD

Cómo Ejecutar los Tests
-----------------------
1. Instalar dependencias:
   npm install
2. Ejecutar tests:
   npm test
