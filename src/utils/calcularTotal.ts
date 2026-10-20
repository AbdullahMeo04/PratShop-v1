// src/utils/calcularTotal.ts
// Funcions pures per calcular totals del carro (mai muten l'estat)

import type { LiniaCarro } from '../tipus';

/** Llindar per a enviament gratuït */
export const LLINDAR_ENVIAMENT_GRATUIT = 50;

/**
 * Calcula el total d'unitats al carro.
 * Suma totes les quantitats de totes les línies.
 */
export function calcularTotalUnitats(linies: LiniaCarro[]): number {
  return linies.reduce((acc, linia) => acc + linia.quantitat, 0);
}

/**
 * Calcula el subtotal d'una línia (preu × quantitat).
 */
export function calcularSubtotal(linia: LiniaCarro): number {
  return linia.producte.preu * linia.quantitat;
}

/**
 * Calcula el total del carro (suma de tots els subtotals).
 * El valor és DERIVAT en cada render, mai s'emmagatzema a l'estat.
 */
export function calcularTotal(linies: LiniaCarro[]): number {
  return linies.reduce((acc, linia) => acc + calcularSubtotal(linia), 0);
}

/**
 * Determina si l'enviament és gratuït (total ≥ 50 €).
 */
export function esEnviamentGratuit(total: number): boolean {
  return total >= LLINDAR_ENVIAMENT_GRATUIT;
}
