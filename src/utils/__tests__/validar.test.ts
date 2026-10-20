// src/utils/__tests__/validar.test.ts
import { describe, it, expect } from 'vitest';
import { validar } from '../validar';
import type { DadesCompra } from '../../tipus';

describe('validar (Funció pura de validació de compra)', () => {
  const dadesValides: DadesCompra = {
    nom: 'Joan Garcia',
    correu: 'joan.garcia@pratesport.cat',
    adreca: 'Avinguda del Remolar 42, 3r 1a',
    codiPostal: '08820',
    metodePagament: 'targeta',
    acceptaCondicions: true,
  };

  it('valida correctament unes dades completes i correctes', () => {
    const errors = validar(dadesValides);
    expect(Object.keys(errors).length).toBe(0);
  });

  it('detecta nom buit o massa curt', () => {
    const errorsBuit = validar({ ...dadesValides, nom: '' });
    expect(errorsBuit.nom).toBeDefined();

    const errorsCurt = validar({ ...dadesValides, nom: 'A' });
    expect(errorsCurt.nom).toBe('El nom ha de tenir com a mínim 2 caràcters.');
  });

  it('detecta correu invàlid o buit', () => {
    const errorsBuit = validar({ ...dadesValides, correu: '' });
    expect(errorsBuit.correu).toBeDefined();

    const errorsFormat = validar({ ...dadesValides, correu: 'correu-sense-arrova.cat' });
    expect(errorsFormat.correu).toBe('Introdueix un correu electrònic vàlid.');
  });

  it('detecta adreça massa curta o buida', () => {
    const errorsBuit = validar({ ...dadesValides, adreca: '   ' });
    expect(errorsBuit.adreca).toBeDefined();

    const errorsCurta = validar({ ...dadesValides, adreca: 'C/' });
    expect(errorsCurta.adreca).toBe("L'adreça ha de tenir com a mínim 5 caràcters.");
  });

  it('valida estrictament el codi postal de 5 dígits (cas límit)', () => {
    const errors4Digits = validar({ ...dadesValides, codiPostal: '8820' });
    expect(errors4Digits.codiPostal).toBe('El codi postal ha de tenir exactament 5 dígits.');

    const errorsLletres = validar({ ...dadesValides, codiPostal: '0882A' });
    expect(errorsLletres.codiPostal).toBe('El codi postal ha de tenir exactament 5 dígits.');

    const errors6Digits = validar({ ...dadesValides, codiPostal: '088201' });
    expect(errors6Digits.codiPostal).toBe('El codi postal ha de tenir exactament 5 dígits.');

    const valid5Digits = validar({ ...dadesValides, codiPostal: '08820' });
    expect(valid5Digits.codiPostal).toBeUndefined();
  });

  it('exigeix acceptar les condicions legals', () => {
    const senseCondicions = validar({ ...dadesValides, acceptaCondicions: false });
    expect(senseCondicions.acceptaCondicions).toBe("Has d'acceptar les condicions generals.");
  });
});
