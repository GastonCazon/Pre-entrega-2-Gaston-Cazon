// Función que calcula la cuota mensual de un préstamo
function calcularCuota({ capital, tasaInteresAnual, plazoEnAnios }) {
  const tasaInteresMensual = tasaInteresAnual / 100 / 12;
  const numeroDePagos = plazoEnAnios * 12;
  const x = Math.pow(1 + tasaInteresMensual, numeroDePagos);
  return (capital * x * tasaInteresMensual) / (x - 1);
}

// Función para validar los datos del préstamo
function esPréstamoVálido({ capital, tasaInteresAnual, plazoEnAnios }) {
  return (
    !isNaN(capital) &&
    capital > 0 &&
    !isNaN(tasaInteresAnual) &&
    tasaInteresAnual > 0 &&
    !isNaN(plazoEnAnios) &&
    plazoEnAnios > 0
  );
}

// Función principal del simulador
function simuladorPrestamos() {
  console.log("Bienvenido al simulador de préstamos");

  let prestamos = [];
  let repetir = true;

  while (repetir) {
    // Recoger datos del usuario
    let prestamo = {
      capital: parseFloat(
        prompt("Ingrese el monto del préstamo que desea solicitar:")
      ),
      tasaInteresAnual: parseFloat(
        prompt("Ingrese la tasa de interés anual (en porcentaje):")
      ),
      plazoEnAnios: parseInt(
        prompt("Ingrese el plazo del préstamo en años:"),
        10
      ),
    };

    // Validar datos
    if (esPréstamoVálido(prestamo)) {
      // Calcular cuota mensual
      prestamo.cuotaMensual = calcularCuota(prestamo);

      // Almacenar el préstamo en el array
      prestamos.push(prestamo);

      // Mostrar resultados
      console.log(`Monto del préstamo: $${prestamo.capital}`);
      console.log(`Tasa de interés anual: ${prestamo.tasaInteresAnual}%`);
      console.log(`Plazo del préstamo: ${prestamo.plazoEnAnios} años`);
      console.log(`Pago mensual: $${prestamo.cuotaMensual.toFixed(2)}`);
    } else {
      console.log("Por favor, ingrese valores válidos.");
    }

    // Preguntar si el usuario quiere hacer otra simulación
    repetir = confirm("¿Desea realizar otra simulación?");
  }

  // Procesar todas las simulaciones
  if (prestamos.length > 0) {
    const totalPrestamos = prestamos.length;
    const promedioCuotaMensual =
      prestamos
        .map((p) => p.cuotaMensual)
        .reduce((acc, cuota) => acc + cuota, 0) / totalPrestamos;

    console.log(`Resumen de ${totalPrestamos} simulaciones:`);
    prestamos.forEach((p, index) => {
      console.log(`Simulación ${index + 1}:`);
      console.log(`  Monto del préstamo: $${p.capital}`);
      console.log(`  Tasa de interés anual: ${p.tasaInteresAnual}%`);
      console.log(`  Plazo del préstamo: ${p.plazoEnAnios} años`);
      console.log(`  Pago mensual: $${p.cuotaMensual.toFixed(2)}`);
    });
    console.log(`Cuota mensual promedio: $${promedioCuotaMensual.toFixed(2)}`);
  }

  console.log("Gracias por usar el simulador de préstamos. ¡Hasta luego!");
}

simuladorPrestamos();
