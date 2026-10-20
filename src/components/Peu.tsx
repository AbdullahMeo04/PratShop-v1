// src/components/Peu.tsx
// Peu de pàgina (footer) amb columnes de navegació i copyright.

import { Link } from 'react-router';
import clsx from 'clsx';
import styles from './Peu.module.css';

export default function Peu() {
  return (
    <footer className={styles.peu}>
      <div className={styles.interior}>
        <div className={styles.columnes}>

          {/* ── Columna de marca ── */}
          <div className={styles.marca}>
            <Link to="/" className={styles['marca-logo']} aria-label="ActivePrat – Pàgina d'inici">
              <div className={styles['marca-icona']}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M11 2L4 11H10L9 18L16 9H10L11 2Z" fill="currentColor"/>
                </svg>
              </div>
              <span className={styles['marca-nom']}>ActivePrat</span>
            </Link>
            <p className={styles['marca-descripcio']}>
              Equipament d'alt rendiment i maquinària funcional dissenyada per a esportistes d'elit i corredors urbans a Catalunya.
            </p>
            <div className={styles.xarxes}>
              <a href="#comunitat" className={styles['boto-xarxa']} aria-label="Comunitat esportiva">
                <span className={clsx('material-symbols-outlined', styles.iconaXarxa)}>sports_score</span>
              </a>
              <a href="#multimedia" className={styles['boto-xarxa']} aria-label="Canal multimèdia">
                <span className={clsx('material-symbols-outlined', styles.iconaXarxa)}>play_circle</span>
              </a>
              <a href="#entrenament" className={styles['boto-xarxa']} aria-label="Punt d'entrenament">
                <span className={clsx('material-symbols-outlined', styles.iconaXarxa)}>fitness_center</span>
              </a>
              <a href="#botigues" className={styles['boto-xarxa']} aria-label="Ubicacions de botigues">
                <span className={clsx('material-symbols-outlined', styles.iconaXarxa)}>location_on</span>
              </a>
            </div>
          </div>

          {/* ── Catàleg tècnic ── */}
          <div className={styles.columna}>
            <span className={styles['columna-titol']}>Catàleg Tècnic</span>
            <div className={styles['columna-links']}>
              <Link to="/cataleg?categoria=Entrenament" className={styles['columna-link']}>Equipament d'Entrenament</Link>
              <Link to="/cataleg?categoria=Accessoris" className={styles['columna-link']}>Accessoris Esportius</Link>
              <Link to="/cataleg?categoria=Recuperaci%C3%B3" className={styles['columna-link']}>Recuperació i Benestar</Link>
              <Link to="/cataleg" className={styles['columna-link']}>Novetats de la Temporada</Link>
            </div>
          </div>

          {/* ── Atenció al client ── */}
          <div className={styles.columna}>
            <span className={styles['columna-titol']}>Atenció al Client</span>
            <div className={styles['columna-links']}>
              <Link to="/carro" className={styles['columna-link']}>Estat de la Cistella</Link>
              <span className={styles['columna-link']}>Enviaments en 24h</span>
              <span className={styles['columna-link']}>Devolució en 30 dies</span>
              <span className={styles['columna-link']}>Guia de Talles</span>
              <span className={styles['columna-link']}>Contacte Directe</span>
            </div>
          </div>

          {/* ── ActivePrat Lab ── */}
          <div className={styles.columna}>
            <span className={styles['columna-titol']}>ActivePrat Lab</span>
            <div className={styles['columna-links']}>
              <span className={styles['columna-link']}>La Nostra Història</span>
              <span className={styles['columna-link']}>Compromís de Sostenibilitat</span>
              <span className={styles['columna-link']}>Instal·lacions al Prat</span>
              <span className={styles['columna-link']}>Treballa amb Nosaltres</span>
            </div>
          </div>

        </div>

        {/* ── Copyright ── */}
        <div className={styles.copyright}>
          <p className={styles['copyright-text']}>
            © 2025 ActivePrat Esports S.L. Tots els drets reservats. Dissenyat per al rendiment nocturn.
          </p>
          <div className={styles['copyright-links']}>
            <span className={styles['copyright-link']}>Avís Legal</span>
            <span className={styles['copyright-link']}>Política de Privadesa</span>
            <span className={styles['copyright-link']}>Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
