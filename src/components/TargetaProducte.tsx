// src/components/TargetaProducte.tsx
// Targeta de producte per al catàleg. Mostra imatge, nom, preu i estat d'estoc.

import { Link } from 'react-router';
import clsx from 'clsx';
import type { Producte } from '../tipus';
import { formatPreu } from '../utils/formatPreu';
import styles from './TargetaProducte.module.css';

interface Props {
  producte: Producte;
}

export default function TargetaProducte({ producte }: Props) {
  const estaEsgotat = producte.estoc === 0;

  // Determina la classe del badge d'etiqueta
  function obtenirClasseBadge(): string {
    switch (producte.etiqueta) {
      case 'Edició Limitada': return styles['badge-edicio-limitada'];
      case 'Top Vendes':     return styles['badge-top-vendes'];
      default:               return ''; // 'Novetat' → classe base de badge-etiqueta
    }
  }

  return (
    <Link
      to={`/producte/${producte.id}`}
      className={clsx(styles.targeta, estaEsgotat && styles.esgotada)}
      aria-label={`Veure ${producte.nom}`}
    >
      {/* ── Imatge i badges ── */}
      <div className={styles['imatge-contenidor']}>
        <img
          src={producte.imatge}
          alt={producte.nom}
          className={clsx(styles.imatge, estaEsgotat && styles['imatge-esgotada'])}
          loading="lazy"
        />

        {/* Badge de categoria (quan no hi ha etiqueta especial) */}
        {!producte.etiqueta && !estaEsgotat && (
          <span className={styles['badge-categoria']}>
            {producte.categoria}
          </span>
        )}

        {/* Badge d'etiqueta especial (Novetat, Edició Limitada, Top Vendes) */}
        {producte.etiqueta && !estaEsgotat && (
          <span className={clsx(styles['badge-etiqueta'], obtenirClasseBadge())}>
            {producte.etiqueta}
          </span>
        )}

        {/* Overlay + badge "Esgotat" quan no hi ha estoc */}
        {estaEsgotat && (
          <div className={styles['badge-esgotat']}>
            <span className={styles['badge-esgotat-text']}>Esgotat</span>
          </div>
        )}
      </div>

      {/* ── Cos: estat d'estoc i nom ── */}
      <div className={styles.cos}>
        {estaEsgotat ? (
          <div className={clsx(styles['estat-estoc'], styles['estat-esgotat'])}>
            <span className={clsx(styles['punt-estoc'], styles['punt-esgotat'])} />
            <span>Temporalment esgotat</span>
          </div>
        ) : (
          <div className={styles['estat-estoc']}>
            <span className={styles['punt-estoc']} />
            <span>En estoc</span>
          </div>
        )}

        <h3 className={clsx(styles.nom, estaEsgotat && styles['nom-esgotat'])}>
          {producte.nom}
        </h3>
      </div>

      {/* ── Peu: preu i botó ── */}
      <div className={styles.peu}>
        <div className={styles['fila-preu']}>
          <span className={clsx(styles.preu, estaEsgotat && styles['preu-esgotat'])}>
            {formatPreu(producte.preu)}
          </span>
          <span className={styles['iva-label']}>
            {estaEsgotat ? 'Sense unitats' : 'IVA inclòs'}
          </span>
        </div>

        {estaEsgotat ? (
          <button
            className={clsx(styles['boto-targeta'], styles['boto-esgotat'])}
            disabled
            aria-disabled="true"
            type="button"
            onClick={(e) => e.preventDefault()}
          >
            <span className={clsx('material-symbols-outlined', styles.iconaTargeta)}>
              notifications_paused
            </span>
            <span>Avisa'm quan estigui disponible</span>
          </button>
        ) : (
          <div className={clsx(styles['boto-targeta'], styles['boto-veure'])}>
            <span>Veure producte</span>
            <span className={clsx('material-symbols-outlined', styles.iconaTargeta)}>
              visibility
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
