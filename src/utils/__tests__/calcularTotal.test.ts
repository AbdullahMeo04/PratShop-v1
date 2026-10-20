// src/utils/__tests__/calcularTotal.test.ts
import { describe, it, expect } from 'vitest';
import {
  calcularTotal,
  calcularSubtotal,
  calcularTotalUnitats,
  esEnviamentGratuit,
  LLINDAR_ENVIAMENT_GRATUIT,
} from '../calcularTotal';
import type { LiniaCarro } from '../../tipus';

describe('calcularTotal i regles de negoci del carro', () => {
  const liniesExemple: LiniaCarro[] = [
    {
      producte: {
        id: '1',
        nom: 'Guants',
        categoria: 'Accessoris',
        preu: 20,
        estoc: 10,
        descripcio: '',
        imatge: '',
      },
      quantitat: 2,
    },
    {
      producte: {
        id: '2',
        nom: 'Cintura',
        categoria: 'Accessoris',
        preu: 15,
        estoc: 5,
        descripcio: '',
        imatge: '',
      },
      quantitat: 1,
    },
  ];

  it('calcula correctament el subtotal per línia (preu * quantitat)', () => {
    expect(calcularSubtotal(liniesExemple[0])).toBe(40);
    expect(calcularSubtotal(liniesExemple[1])).toBe(15);
  });

  it('calcula el total de la comanda sense mutar les dades', () => {
    expect(calcularTotal(liniesExemple)).toBe(55);
  });

  it('calcula el total d unitats sumant quantitats', () => {
    expect(calcularTotalUnitats(liniesExemple)).toBe(3);
  });

  it('aplica la regla d enviament gratuït a partir de 50 €', () => {
    expect(esEnviamentGratuit(LLINDAR_ENVIAMENT_GRATUIT)).toBe(true);
    expect(esEnviamentGratuit(49.99)).toBe(false);
    expect(esEnviamentGratuit(50.00)).toBe(true);
    expect(esEnviamentGratuit(120)).toBe(true);
  });
});
