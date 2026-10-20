// src/pagines/DetallProducte.tsx
// Detall d'un producte: useParams per obtenir l'id, useNavigate(-1) per tornar.
// Afegeix al carro des d'aquí (B8, B9, B10).

import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router';
import clsx from 'clsx';
import SelectorQuantitat from '../components/SelectorQuantitat';
import { PRODUCTES } from '../dades/productes';
import type { Producte } from '../tipus';
import { formatPreu } from '../utils/formatPreu';
import styles from './DetallProducte.module.css';

interface Props {
  onAfegirAlCarro: (producte: Producte, quantitat: number) => void;
}

export default function DetallProducte({ onAfegirAlCarro }: Props) {
  const { id } = useParams<{ id: string }>();
  const navegar = useNavigate();
  const [quantitat, setQuantitat] = useState(1);
  const [mostrarMissatgeAfegit, setMostrarMissatgeAfegit] = useState(false);

  // Busquem el producte per id
  const producte = PRODUCTES.find((p) => p.id === id);

  // Si l'id no correspon a cap producte → redirigim a 404 (B8)
  if (!producte) {
    return <Navigate to="/404" replace />;
  }

  const estaEsgotat = producte.estoc === 0;

  function gestioAfegirAlCarro() {
    onAfegirAlCarro(producte!, quantitat);
    // Mostrem missatge de confirmació durant 2 segons
    setMostrarMissatgeAfegit(true);
    setTimeout(() => setMostrarMissatgeAfegit(false), 2000);
  }

  return (
    <div className={styles.pàgina}>
      <div className={styles.interior}>

        {/* Botó "Torna" amb useNavigate(-1) */}
        <div className={styles.navegacio}>
          <button
            type="button"
            className={styles['boto-torna']}
            onClick={() => navegar(-1)}
            aria-label="Tornar a la pàgina anterior"
          >
            <span className={clsx('material-symbols-outlined', styles.iconaTorna)}>arrow_back</span>
            <span>Torna</span>
          </button>
        </div>

        {/* ── Graella principal ── */}
        <div className={styles.graella}>

          {/* Columna d'imatge */}
          <div className={styles['imatge-contenidor']}>
            <img
              src={producte.imatge}
              alt={producte.nom}
              className={clsx(styles.imatge, estaEsgotat && styles['imatge-esgotada'])}
            />

            {/* Badges a la imatge */}
            {producte.etiqueta && !estaEsgotat && (
              <div className={styles['imatge-badges']}>
                <span className={styles['badge-etiqueta']}>{producte.etiqueta}</span>
              </div>
            )}

            {estaEsgotat && (
              <div className={styles['badge-esgotat-imatge']}>
                <span className={styles['badge-esgotat-text']}>Esgotat</span>
              </div>
            )}
          </div>

          {/* Columna d'informació */}
          <div className={styles.info}>

            {/* Categoria + estat d'estoc */}
            <div className={styles['info-capcal']}>
              <span className={styles['categoria-label']}>{producte.categoria}</span>

              {estaEsgotat ? (
                <div className={clsx(styles['estat-estoc'], styles.esgotat)}>
                  <span className={clsx(styles['punt-estoc'], styles['punt-esgotat'])} />
                  <span>Temporalment esgotat</span>
                </div>
              ) : (
                <div className={clsx(styles['estat-estoc'], styles['en-estoc'])}>
                  <span className={clsx(styles['punt-estoc'], styles['punt-en-estoc'])} />
                  <span>En estoc — {producte.estoc} disponibles</span>
                </div>
              )}
            </div>

            {/* Nom del producte */}
            <h1 className={styles.nom}>{producte.nom}</h1>

            {/* Preu + IVA */}
            <div className={styles['preu-contenidor']}>
              <span className={styles.preu}>{formatPreu(producte.preu)}</span>
              <span className={styles['iva-label']}>IVA inclòs</span>
            </div>

            <div className={styles.divisor} />

            {/* Descripció */}
            <div>
              <h2 className={styles['descripcio-titol']}>Descripció del producte</h2>
              <p className={styles.descripcio}>{producte.descripcio}</p>
            </div>

            {/* Selector de quantitat (només si en estoc) */}
            {!estaEsgotat && (
              <>
                <div className={styles.divisor} />
                <div className={styles['quantitat-zona']}>
                  <span className={styles['quantitat-label']}>Quantitat</span>
                  <div className={styles['quantitat-fila']}>
                    <SelectorQuantitat
                      valor={quantitat}
                      minim={1}
                      maxim={producte.estoc}
                      onCanvi={setQuantitat}
                    />
                    <span className={styles['estoc-disponible']}>
                      {producte.estoc} unitats disponibles
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* ── Accions ── */}
            <div className={styles.accions}>
              {estaEsgotat ? (
                <button
                  type="button"
                  className={styles['boto-esgotat-avisa']}
                  disabled
                  aria-disabled="true"
                >
                  <span className={clsx('material-symbols-outlined', styles.iconaAccio)}>notifications_paused</span>
                  <span>Avisa'm quan estigui disponible</span>
                </button>
              ) : (
                <button
                  type="button"
                  className={styles['boto-afegir']}
                  onClick={gestioAfegirAlCarro}
                >
                  <span className={clsx('material-symbols-outlined', styles.iconaAccio)}>shopping_cart</span>
                  <span>Afegeix a la cistella</span>
                </button>
              )}
            </div>

            {/* Missatge de confirmació */}
            {mostrarMissatgeAfegit && (
              <div className={styles['missatge-afegit']} role="status" aria-live="polite">
                <span className={clsx('material-symbols-outlined', styles.iconaAccio)}>check_circle</span>
                <span>Producte afegit a la cistella!</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
