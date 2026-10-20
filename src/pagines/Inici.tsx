// src/pagines/Inici.tsx
// Pàgina d'inici: hero "Supera els teus límits." + productes destacats

import { Link } from 'react-router';
import clsx from 'clsx';
import TargetaProducte from '../components/TargetaProducte';
import { PRODUCTES } from '../dades/productes';
import styles from './Inici.module.css';

// Mostrem els 4 primers productes en estoc com a "destacats"
const PRODUCTES_DESTACATS = PRODUCTES
  .filter((p) => p.estoc > 0)
  .slice(0, 4);

export default function Inici() {
  return (
    <>
      {/* ── Glow + Hero ── */}
      <div className={styles['seccio-hero']}>
        <div className={styles.glow} aria-hidden="true" />

        <section className={styles.hero}>
          {/* Badge col·lecció */}
          <div className={styles['pill-col-leccio']} role="status">
            <span className={styles['punt-pulse']} aria-hidden="true" />
            Col·lecció Pro 2025
          </div>

          {/* Títol + descripció */}
          <div className={styles['hero-content']}>
            <h1 className={styles['hero-titol']}>
              Supera els teus <span className={styles['hero-accent']}>límits.</span>
            </h1>
            <p className={styles['hero-descripcio']}>
              Equipament d'alt rendiment i accessoris de precisió dissenyats per a atletes exigents. Eleva la teva rutina esportiva amb tecnologia capdavantera.
            </p>
          </div>

          {/* CTA + badge de garantia */}
          <div className={styles['hero-accions']}>
            <Link to="/cataleg" className={styles['boto-hero']}>
              <span>Explora el catàleg</span>
              <span className={clsx('material-symbols-outlined', styles.iconaHero)}>arrow_downward</span>
            </Link>

            <div className={styles['hero-badge-text']}>
              <span
                className={clsx('material-symbols-outlined', styles['hero-badge-icona'], styles.iconaHeroBadge)}
                aria-hidden="true"
              >
                verified
              </span>
              <span>Enginyeria d'alt rendiment testada</span>
            </div>
          </div>
        </section>
      </div>

      {/* ── Proposicions de valor ── */}
      <section className={styles['seccio-valors']} aria-label="Per què ActivePrat">
        <div className={styles['valors-interior']}>
          <div className={styles['valors-grid']}>
            <div className={styles['valor-card']}>
              <div className={styles['valor-icona']}>
                <span className={clsx('material-symbols-outlined', styles.iconaValor)}>local_shipping</span>
              </div>
              <div className={styles['valor-text']}>
                <h4 className={styles['valor-titol']}>Enviament gratuït a partir de 50 €</h4>
                <p className={styles['valor-descripcio']}>Lliurament garantit en 24/48h a tot el territori català.</p>
              </div>
            </div>

            <div className={styles['valor-card']}>
              <div className={styles['valor-icona']}>
                <span className={clsx('material-symbols-outlined', styles.iconaValor)}>verified_user</span>
              </div>
              <div className={styles['valor-text']}>
                <h4 className={styles['valor-titol']}>Garantia oficial de 3 anys</h4>
                <p className={styles['valor-descripcio']}>Materials de grau professional sotmesos a proves de fatiga.</p>
              </div>
            </div>

            <div className={styles['valor-card']}>
              <div className={styles['valor-icona']}>
                <span className={clsx('material-symbols-outlined', styles.iconaValor)}>published_with_changes</span>
              </div>
              <div className={styles['valor-text']}>
                <h4 className={styles['valor-titol']}>Canvis i devolucions en 30 dies</h4>
                <p className={styles['valor-descripcio']}>Sense preguntes ni gestions complexes des del teu perfil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Productes destacats ── */}
      <section className={styles['seccio-destacats']} aria-label="Productes destacats">
        <div className={styles['destacats-interior']}>
          <div className={styles['destacats-capcal']}>
            <h2 className={styles['destacats-titol']}>Productes Destacats</h2>
            <Link to="/cataleg" className={styles['boto-veure-tot']}>
              <span>Veure tot el catàleg</span>
              <span className={clsx('material-symbols-outlined', styles.iconaVeureTot)}>arrow_forward</span>
            </Link>
          </div>

          <div className={styles['productes-grid']}>
            {PRODUCTES_DESTACATS.map((producte) => (
              <TargetaProducte key={producte.id} producte={producte} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
