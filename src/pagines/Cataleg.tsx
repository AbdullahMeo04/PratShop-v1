// src/pagines/Cataleg.tsx
// Catàleg de productes amb cerca per nom, filtre per categoria i ordenació.
// La cerca viu a la URL (?cerca=…&categoria=…&ordre=…) via useSearchParams (B7).

import { useSearchParams } from 'react-router';
import clsx from 'clsx';
import TargetaProducte from '../components/TargetaProducte';
import { PRODUCTES, CATEGORIES } from '../dades/productes';
import styles from './Cataleg.module.css';

// Opcions d'ordenació (extra voluntari 1)
type OpcioOrdre = 'destacats' | 'preu-asc' | 'preu-desc' | 'puntuacio';

export default function Cataleg() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Llegim els paràmetres de la URL
  const cerca = searchParams.get('cerca') ?? '';
  const categoria = searchParams.get('categoria') ?? 'Tot';
  const ordre = (searchParams.get('ordre') ?? 'destacats') as OpcioOrdre;

  // ─── Handlers per actualitzar la URL ───────────────────

  function actualitzarCerca(valor: string) {
    setSearchParams((prev) => {
      const nou = new URLSearchParams(prev);
      if (valor) {
        nou.set('cerca', valor);
      } else {
        nou.delete('cerca');
      }
      return nou;
    });
  }

  function actualitzarCategoria(cat: string) {
    setSearchParams((prev) => {
      const nou = new URLSearchParams(prev);
      if (cat === 'Tot') {
        nou.delete('categoria');
      } else {
        nou.set('categoria', cat);
      }
      return nou;
    });
  }

  function actualitzarOrdre(valor: string) {
    setSearchParams((prev) => {
      const nou = new URLSearchParams(prev);
      if (valor === 'destacats') {
        nou.delete('ordre');
      } else {
        nou.set('ordre', valor);
      }
      return nou;
    });
  }

  function reiniciarFiltres() {
    setSearchParams({});
  }

  // ─── Filtratge i ordenació ───────────────────────────

  let productesFiltrats = PRODUCTES.filter((p) => {
    const coincideixCerca = cerca === '' || p.nom.toLowerCase().includes(cerca.toLowerCase());
    const coincideixCategoria = categoria === 'Tot' || p.categoria === categoria;
    return coincideixCerca && coincideixCategoria;
  });

  // Ordenació
  productesFiltrats = [...productesFiltrats].sort((a, b) => {
    switch (ordre) {
      case 'preu-asc':  return a.preu - b.preu;
      case 'preu-desc': return b.preu - a.preu;
      // 'destacats' i 'puntuacio' → ordre original del catàleg
      default:          return 0;
    }
  });

  const totalMostrat = productesFiltrats.length;
  const totalTotal = PRODUCTES.length;

  // ─── Render ──────────────────────────────────────────

  return (
    <div className={styles.pàgina}>
      {/* ── Barra de filtres enganxosa ── */}
      <section className={styles['seccio-filtres']} aria-label="Filtres del catàleg">
        <div className={styles['filtres-interior']}>

          {/* Fila: cerca + categories */}
          <div className={styles['fila-filtres']}>
            {/* Camp de cerca */}
            <div className={styles['cerca-contenidor']}>
              <span className={styles['cerca-icona']}>
                <span className={clsx('material-symbols-outlined', styles.iconaCerca)}>search</span>
              </span>
              <input
                id="cerca-productes"
                type="text"
                className={styles['cerca-input']}
                placeholder="Cerca material esportiu..."
                value={cerca}
                onChange={(e) => actualitzarCerca(e.target.value)}
                aria-label="Cerca productes per nom"
              />
            </div>

            {/* Chips de categoria */}
            <div className={styles['chips-contenidor']} role="group" aria-label="Filtra per categoria">
              {/* Chip "Tot" */}
              <button
                type="button"
                className={clsx(styles.chip, categoria === 'Tot' && styles['chip-actiu'])}
                onClick={() => actualitzarCategoria('Tot')}
                aria-pressed={categoria === 'Tot'}
              >
                Tot
              </button>

              {/* Chips de cada categoria */}
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={clsx(styles.chip, categoria === cat && styles['chip-actiu'])}
                  onClick={() => actualitzarCategoria(cat)}
                  aria-pressed={categoria === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Fila: comptador + ordenació */}
          <div className={styles['fila-meta']}>
            {/* Comptador de productes */}
            <div className={styles.comptador} aria-live="polite" aria-atomic="true">
              <span className={styles['punt-verd']} aria-hidden="true" />
              <span>
                <span className={styles['comptador-valor']}>{totalMostrat}</span>
                {' '}de{' '}
                <span className={styles['comptador-valor']}>{totalTotal}</span>
                {' '}productes
              </span>
            </div>

            {/* Selector d'ordenació */}
            <div className={styles.ordenacio}>
              <label htmlFor="ordre-select" className={styles['ordenacio-label']}>
                Ordenar per:
              </label>
              <div className={styles['ordenacio-select-contenidor']}>
                <select
                  id="ordre-select"
                  className={styles['ordenacio-select']}
                  value={ordre}
                  onChange={(e) => actualitzarOrdre(e.target.value)}
                >
                  <option value="destacats">Destacats</option>
                  <option value="preu-asc">Preu ↑</option>
                  <option value="preu-desc">Preu ↓</option>
                  <option value="puntuacio">Puntuació</option>
                </select>
                <span className={styles['ordenacio-icona']}>
                  <span className={clsx('material-symbols-outlined', styles.iconaSelect)}>expand_more</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Graella de productes ── */}
      <section className={styles['seccio-grid']} aria-label="Productes del catàleg">
        <div className={styles['grid-interior']}>
          {totalMostrat > 0 ? (
            <div className={styles['productes-grid']}>
              {productesFiltrats.map((producte) => (
                <TargetaProducte key={producte.id} producte={producte} />
              ))}
            </div>
          ) : (
            /* Estat buit quan no hi ha resultats */
            <div className={styles['estat-buit']} role="status" aria-live="polite">
              <div className={styles['estat-buit-icona']}>
                <span className={clsx('material-symbols-outlined', styles.iconaBuit)}>search_off</span>
              </div>
              <h3 className={styles['estat-buit-titol']}>Cap resultat trobat</h3>
              <p className={styles['estat-buit-desc']}>
                No hem trobat cap producte que coincideixi amb la teva cerca.
              </p>
              <button
                type="button"
                className={styles['boto-reiniciar']}
                onClick={reiniciarFiltres}
              >
                <span className={clsx('material-symbols-outlined', styles.iconaReiniciar)}>restart_alt</span>
                Reiniciar filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
