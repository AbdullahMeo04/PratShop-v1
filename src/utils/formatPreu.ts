// src/utils/formatPreu.ts
// Funció pura per formatar preus en euros amb Intl.NumberFormat en català

/**
 * Formata un número com a preu en euros (ca-ES).
 * Exemple: 349.00 → "349,00 €"
 */
export function formatPreu(preu: number): string {
  return new Intl.NumberFormat('ca-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(preu);
}
