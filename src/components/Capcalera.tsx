// src/components/Capcalera.tsx
// Capçalera enganxosa de vidre amb nav desktop i barra inferior mòbil.
// Rep el total d'unitats del carro des d'App (B11).

import { NavLink, Link } from 'react-router';
import clsx from 'clsx';
import styles from './Capcalera.module.css';

interface Props {
  totalUnitats: number; // total d'unitats al carro (B11)
}

export default function Capcalera({ totalUnitats }: Props) {
  return (
    <>
      {/* ── Capçalera desktop/tablet ── */}
      <header className={styles.capcalera}>
        <div className={styles.interior}>

          {/* Logo + nav principal */}
          <div className={styles.esquerra}>
            <Link to="/" className={styles['logo-link']} aria-label="ActivePrat – Pàgina d'inici">
              <div className={styles['logo-icona']}>
                {/* SVG Icona inline - llampec volt sobre fosc */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M11 2L4 11H10L9 18L16 9H10L11 2Z" fill="currentColor"/>
                </svg>
              </div>
              <span className={styles['logo-nom']}>ActivePrat</span>
            </Link>

            {/* Navegació principal (oculta a mòbil) */}
            <nav className={styles.nav} aria-label="Navegació principal">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  clsx(styles['nav-link'], isActive && styles['nav-link-actiu'])
                }
              >
                Inici
              </NavLink>
              <NavLink
                to="/cataleg"
                className={({ isActive }) =>
                  clsx(styles['nav-link'], isActive && styles['nav-link-actiu'])
                }
              >
                Catàleg
              </NavLink>
            </nav>
          </div>

          {/* Accions: cistella */}
          <div className={styles.dreta}>
            <NavLink
              to="/carro"
              className={styles['boto-accio']}
              aria-label={`Cistella de la compra${totalUnitats > 0 ? ` – ${totalUnitats} articles` : ''}`}
            >
              <span className={clsx('material-symbols-outlined', styles.iconaCarro)}>
                shopping_bag
              </span>
              {/* Badge d'unitats: NOMÉS es renderitza quan > 0 (B11) */}
              {totalUnitats > 0 && (
                <span className={styles['badge-carro']} aria-hidden="true">
                  {totalUnitats}
                </span>
              )}
            </NavLink>
          </div>

        </div>
      </header>

      {/* ── Barra de navegació inferior (només mòbil) ── */}
      <nav className={styles['nav-bottom']} aria-label="Navegació mòbil">
        <div className={styles['nav-bottom-interior']}>
          <NavLink
            to="/cataleg"
            className={({ isActive }) =>
              clsx(styles['nav-bottom-item'], isActive && styles['nav-bottom-actiu'])
            }
          >
            <span className={clsx('material-symbols-outlined', styles.iconaBottom)}>
              storefront
            </span>
            <span>Botiga</span>
          </NavLink>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              clsx(styles['nav-bottom-item'], isActive && styles['nav-bottom-actiu'])
            }
          >
            <span className={clsx('material-symbols-outlined', styles.iconaBottom)}>
              home
            </span>
            <span>Inici</span>
          </NavLink>

          <NavLink
            to="/carro"
            className={({ isActive }) =>
              clsx(styles['nav-bottom-item'], isActive && styles['nav-bottom-actiu'])
            }
            aria-label={`Carro${totalUnitats > 0 ? ` – ${totalUnitats}` : ''}`}
          >
            <span className={clsx('material-symbols-outlined', styles.iconaBottom)}>
              shopping_cart
            </span>
            {/* Badge al carro mòbil */}
            {totalUnitats > 0 && (
              <span className={styles['badge-carro']} aria-hidden="true">
                {totalUnitats > 9 ? '9+' : totalUnitats}
              </span>
            )}
            <span>Carro</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
