// src/pagines/Compra.tsx
// Pàgina de compra (checkout) amb formulari totalment controlat (B13, B14).
// Valida les dades amb la funció pura validar() i mostra un error per camp.

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import clsx from 'clsx';
import type { LiniaCarro, DadesCompra, ErrorsFormulari, Comanda } from '../tipus';
import { validar } from '../utils/validar';
import {
  calcularTotal,
  calcularSubtotal,
  esEnviamentGratuit,
} from '../utils/calcularTotal';
import { formatPreu } from '../utils/formatPreu';
import { generarNumeroComanda } from '../utils/generarNumeroComanda';
import styles from './Compra.module.css';

interface Props {
  linies: LiniaCarro[];
  onComandaCompletada: (comanda: Comanda) => void;
}

export default function Compra({ linies, onComandaCompletada }: Props) {
  const navegar = useNavigate();

  // Formulari totalment controlat amb React state (B13)
  const [dades, setDades] = useState<DadesCompra>({
    nom: '',
    correu: '',
    adreca: '',
    codiPostal: '',
    metodePagament: 'targeta',
    acceptaCondicions: false,
  });

  const [errors, setErrors] = useState<ErrorsFormulari>({});

  // Càlculs derivats en temps de render
  const subtotal = calcularTotal(linies);
  const teEnviamentGratuit = esEnviamentGratuit(subtotal);
  const costEnviament = teEnviamentGratuit ? 0 : 4.95;
  const total = subtotal + costEnviament;

  // Si s'accedeix a /compra amb el carro buit → redirigim a /carro (B14)
  if (linies.length === 0) {
    return <Navigate to="/carro" replace />;
  }

  function handleCampCanvi(camp: keyof DadesCompra, valor: string | boolean) {
    setDades((prev) => ({ ...prev, [camp]: valor }));
    // Si hi havia un error en aquest camp, el netegem en escriure
    if (errors[camp]) {
      setErrors((prev) => ({ ...prev, [camp]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validació pura amb el mòdul utils/validar.ts (B13)
    const nousErrors = validar(dades);
    setErrors(nousErrors);

    // Si no hi ha errors, generem la comanda i buidem el carro (B14)
    if (Object.keys(nousErrors).length === 0) {
      const novaComanda: Comanda = {
        numero: generarNumeroComanda(),
        linies: [...linies],
        total,
        enviamentGratuit: teEnviamentGratuit,
        dadesCompra: { ...dades },
        dataCreacio: new Date().toISOString(),
      };

      onComandaCompletada(novaComanda);
      // Naveguem a /confirmacio passant la comanda com a estat
      navegar('/confirmacio', { state: { comanda: novaComanda }, replace: true });
    }
  }

  return (
    <div className={styles.pagina}>
      <h1 className={styles.titolSeccio}>Tramitació de la comanda</h1>

      <div className={styles.graella}>
        {/* Secció del Formulari */}
        <section className={styles.seccioFormulari} aria-label="Dades d'enviament i pagament">
          <h2 className={styles.titolFormulari}>Dades d'enviament i pagament</h2>

          <form noValidate onSubmit={handleSubmit} className={styles.formulari}>
            {/* Nom complet */}
            <div className={styles.grupCamp}>
              <label htmlFor="nom" className={styles.etiqueta}>
                Nom i cognoms *
              </label>
              <input
                id="nom"
                type="text"
                className={clsx(styles.campText, errors.nom && styles.campError)}
                value={dades.nom}
                onChange={(e) => handleCampCanvi('nom', e.target.value)}
                placeholder="Ex. Arnau Soler i Valls"
                aria-invalid={Boolean(errors.nom)}
                aria-describedby={errors.nom ? 'error-nom' : undefined}
                required
              />
              {errors.nom && (
                <span id="error-nom" className={styles.missatgeError} role="alert">
                  {errors.nom}
                </span>
              )}
            </div>

            {/* Correu electrònic */}
            <div className={styles.grupCamp}>
              <label htmlFor="correu" className={styles.etiqueta}>
                Correu electrònic *
              </label>
              <input
                id="correu"
                type="email"
                className={clsx(styles.campText, errors.correu && styles.campError)}
                value={dades.correu}
                onChange={(e) => handleCampCanvi('correu', e.target.value)}
                placeholder="Ex. arnau.soler@exemple.cat"
                aria-invalid={Boolean(errors.correu)}
                aria-describedby={errors.correu ? 'error-correu' : undefined}
                required
              />
              {errors.correu && (
                <span id="error-correu" className={styles.missatgeError} role="alert">
                  {errors.correu}
                </span>
              )}
            </div>

            {/* Adreça i Codi Postal */}
            <div className={styles.filaDoble}>
              <div className={styles.grupCamp}>
                <label htmlFor="adreca" className={styles.etiqueta}>
                  Adreça postal *
                </label>
                <input
                  id="adreca"
                  type="text"
                  className={clsx(styles.campText, errors.adreca && styles.campError)}
                  value={dades.adreca}
                  onChange={(e) => handleCampCanvi('adreca', e.target.value)}
                  placeholder="Carrer, número, pis"
                  aria-invalid={Boolean(errors.adreca)}
                  aria-describedby={errors.adreca ? 'error-adreca' : undefined}
                  required
                />
                {errors.adreca && (
                  <span id="error-adreca" className={styles.missatgeError} role="alert">
                    {errors.adreca}
                  </span>
                )}
              </div>

              <div className={styles.grupCamp}>
                <label htmlFor="codiPostal" className={styles.etiqueta}>
                  Codi postal (5 dígits) *
                </label>
                <input
                  id="codiPostal"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  className={clsx(styles.campText, errors.codiPostal && styles.campError)}
                  value={dades.codiPostal}
                  onChange={(e) => handleCampCanvi('codiPostal', e.target.value)}
                  placeholder="08820"
                  aria-invalid={Boolean(errors.codiPostal)}
                  aria-describedby={errors.codiPostal ? 'error-codiPostal' : undefined}
                  required
                />
                {errors.codiPostal && (
                  <span id="error-codiPostal" className={styles.missatgeError} role="alert">
                    {errors.codiPostal}
                  </span>
                )}
              </div>
            </div>

            {/* Mètode de pagament */}
            <div className={styles.grupCamp}>
              <label htmlFor="metodePagament" className={styles.etiqueta}>
                Mètode de pagament *
              </label>
              <select
                id="metodePagament"
                className={clsx(styles.selectMetode, errors.metodePagament && styles.campError)}
                value={dades.metodePagament}
                onChange={(e) => handleCampCanvi('metodePagament', e.target.value)}
                aria-invalid={Boolean(errors.metodePagament)}
                aria-describedby={errors.metodePagament ? 'error-metode' : undefined}
              >
                <option value="targeta">Targeta de crèdit / dèbit (Stripe SSL)</option>
                <option value="transferencia">Transferència bancària (SEPA)</option>
                <option value="contrareemborsament">Pagament contra reemborsament</option>
              </select>
              {errors.metodePagament && (
                <span id="error-metode" className={styles.missatgeError} role="alert">
                  {errors.metodePagament}
                </span>
              )}
            </div>

            {/* Acceptació de condicions */}
            <div className={styles.grupCheckbox}>
              <label className={styles.etiquetaCheckbox}>
                <input
                  type="checkbox"
                  className={styles.inputCheckbox}
                  checked={dades.acceptaCondicions}
                  onChange={(e) => handleCampCanvi('acceptaCondicions', e.target.checked)}
                  aria-invalid={Boolean(errors.acceptaCondicions)}
                  aria-describedby={errors.acceptaCondicions ? 'error-condicions' : undefined}
                />
                <span>
                  He llegit i accepto les condicions generals de venda, la política de privadesa i el dret de desistiment de 30 dies. *
                </span>
              </label>
              {errors.acceptaCondicions && (
                <span id="error-condicions" className={styles.missatgeError} role="alert">
                  {errors.acceptaCondicions}
                </span>
              )}
            </div>

            {/* Botó de pagament */}
            <button type="submit" className={styles.botoPagar}>
              <span>Confirmar i pagar {formatPreu(total)}</span>
              <span className={clsx('material-symbols-outlined', styles.iconaBoto)}>
                lock
              </span>
            </button>
          </form>
        </section>

        {/* Resum Lateral */}
        <aside className={styles.resumLateral} aria-label="Resum de la comanda">
          <h3 className={styles.titolResum}>Articles a la comanda</h3>

          <div className={styles.llistaMiniArticles}>
            {linies.map((linia) => (
              <div key={linia.producte.id} className={styles.miniArticle}>
                <span className={styles.miniNom}>
                  {linia.producte.nom} × {linia.quantitat}
                </span>
                <span className={styles.miniPreu}>
                  {formatPreu(calcularSubtotal(linia))}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.divisor} />

          <div className={styles.filaTotal}>
            <span className={styles.etiquetaTotal}>Total comanda</span>
            <span className={styles.valorTotal}>{formatPreu(total)}</span>
          </div>

          <div className={styles.garantiaInfo}>
            <span className={clsx('material-symbols-outlined', styles.iconaGarantia)}>
              shield
            </span>
            <span>Pagament 100% encriptat amb certificat SSL TLS 1.3</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
