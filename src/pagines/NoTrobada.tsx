// src/pagines/NoTrobada.tsx
// Pàgina d'error 404 per a rutes no trobades o URLs inexistents.

import { Link } from 'react-router';
import clsx from 'clsx';
import styles from './NoTrobada.module.css';

export default function NoTrobada() {
  return (
    <div className={styles.pagina}>
      <div className={styles.icona404} aria-hidden="true">
        <span className="material-symbols-outlined">explore_off</span>
      </div>
      <div className={styles.codiError}>404</div>
      <h1 className={styles.titol}>Pàgina no trobada</h1>
      <p className={styles.descripcio}>
        La ruta a la qual intenteu accedir no existeix o ha estat desplaçada. Torneu a la pàgina principal per continuar explorant el material d'ActivePrat.
      </p>
      <Link to="/" className={styles.botoInici}>
        <span>Torna a l'Inici</span>
        <span className={clsx('material-symbols-outlined', styles.iconaBoto)}>
          home
        </span>
      </Link>
    </div>
  );
}
