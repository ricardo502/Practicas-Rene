document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);

function procesarSimulacion() {
  const montoInput = Number(document.getElementById('monto').value);
  const tasaTexto = document.getElementById('tasa').value.trim();
  const tasaAnualInput = Number(tasaTexto) / 100;
  const plazoMeses = Number(document.getElementById('plazo').value);
  const IVA_VALOR = 0.16;

  if (
    !Number.isFinite(montoInput) || montoInput <= 0 ||
    tasaTexto === '' || !Number.isFinite(tasaAnualInput) || tasaAnualInput < 0 ||
    !Number.isInteger(plazoMeses) || plazoMeses <= 0
  ) {
    alert('Ingrese parámetros numéricos válidos e intente nuevamente.');
    return;
  }

  const amortizacionCapital = montoInput / plazoMeses;
  const tasaMensualEquivalente = tasaAnualInput / 12;
  let saldoInsoluto = montoInput;
  const tablaBody = document.querySelector('#tabla-amortizacion tbody');
  tablaBody.innerHTML = '';

  for (let periodo = 1; periodo <= plazoMeses; periodo++) {
    const capitalDelPeriodo = periodo === plazoMeses ? saldoInsoluto : amortizacionCapital;
    const interesDelPeriodo = saldoInsoluto * tasaMensualEquivalente;
    const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
    const pagoMensualTotal = capitalDelPeriodo + interesDelPeriodo + ivaSobreInteres;
    const saldoFinalPeriodo = Math.max(0, saldoInsoluto - capitalDelPeriodo);

    // Crear fila para la tabla de amortización.
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${periodo}</td>
      <td>$${saldoInsoluto.toFixed(2)}</td>
      <td>$${capitalDelPeriodo.toFixed(2)}</td>
      <td>$${interesDelPeriodo.toFixed(2)}</td>
      <td>$${ivaSobreInteres.toFixed(2)}</td>
      <td>$${pagoMensualTotal.toFixed(2)}</td>
      <td>$${saldoFinalPeriodo.toFixed(2)}</td>
    `;
    tablaBody.appendChild(fila);

    saldoInsoluto = saldoFinalPeriodo;
  }
}
