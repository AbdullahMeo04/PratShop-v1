// src/utils/validar.ts
// Funció pura de validació del formulari de compra

import type { DadesCompra, ErrorsFormulari } from '../tipus';

/** Regex per a correu electrònic bàsic */
const RE_CORREU = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Regex per a codi postal espanyol (exactament 5 dígits) */
const RE_CODI_POSTAL = /^\d{5}$/;

/**
 * Valida les dades del formulari de compra.
 * Retorna un objecte amb els errors de cada camp.
 * Si l'objecte és buit, el formulari és vàlid.
 *
 * @param dades - Les dades del formulari a validar
 * @returns Objecte amb errors per camp (buit si tot és correcte)
 */
export function validar(dades: DadesCompra): ErrorsFormulari {
  const errors: ErrorsFormulari = {};

  // Nom: obligatori, mínim 2 caràcters
  if (!dades.nom.trim()) {
    errors.nom = 'El nom és obligatori.';
  } else if (dades.nom.trim().length < 2) {
    errors.nom = 'El nom ha de tenir com a mínim 2 caràcters.';
  }

  // Correu: obligatori, format vàlid
  if (!dades.correu.trim()) {
    errors.correu = 'El correu electrònic és obligatori.';
  } else if (!RE_CORREU.test(dades.correu.trim())) {
    errors.correu = 'Introdueix un correu electrònic vàlid.';
  }

  // Adreça: obligatòria, mínim 5 caràcters
  if (!dades.adreca.trim()) {
    errors.adreca = "L'adreça és obligatòria.";
  } else if (dades.adreca.trim().length < 5) {
    errors.adreca = "L'adreça ha de tenir com a mínim 5 caràcters.";
  }

  // Codi postal: obligatori, exactament 5 dígits
  if (!dades.codiPostal.trim()) {
    errors.codiPostal = 'El codi postal és obligatori.';
  } else if (!RE_CODI_POSTAL.test(dades.codiPostal.trim())) {
    errors.codiPostal = 'El codi postal ha de tenir exactament 5 dígits.';
  }

  // Mètode de pagament: ha d'estar seleccionat
  if (!dades.metodePagament) {
    errors.metodePagament = 'Selecciona un mètode de pagament.';
  }

  // Acceptació de condicions: obligatòria
  if (!dades.acceptaCondicions) {
    errors.acceptaCondicions = "Has d'acceptar les condicions generals.";
  }

  return errors;
}
