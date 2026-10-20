// src/utils/generarNumeroComanda.ts
// Funció pura per generar un número de comanda únic i llegible

/**
 * Genera un número de comanda amb format: AP-YYYYMMDD-XXXX
 * on XXXX és un número aleatori de 4 dígits.
 * Exemple: AP-20251020-4823
 */
export function generarNumeroComanda(): string {
  const ara = new Date();
  const anyActual = ara.getFullYear();
  const mes = String(ara.getMonth() + 1).padStart(2, '0');
  const dia = String(ara.getDate()).padStart(2, '0');
  const aleatori = String(Math.floor(Math.random() * 9000) + 1000);
  return `AP-${anyActual}${mes}${dia}-${aleatori}`;
}
