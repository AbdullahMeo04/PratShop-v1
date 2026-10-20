// src/pagines/Confirmacio.tsx
// Pàgina de confirmació de compra amb resum de comanda i número d'identificador (B14).
// Si s'hi accedeix directament sense comanda prèvia, redirigeix a l'inici.

import { useLocation, Link, Navigate } from 'react-router';
import clsx from 'clsx';
import type { Comanda } from '../tipus';
import { formatPreu } from '../utils/formatPreu';
import { calcularSubtotal } from '../utils/calcularTotal';
import styles from './Confirmacio.module.css';

interface Props {
  comandaFallback?: Comanda | null;
}

export default function Confirmacio({ comandaFallback }: Props) {
  const ubicacio = useLocation();
  const estat = ubicacio.state as { comanda?: Comanda } | null;
  const comanda = estat?.comanda ?? comandaFallback;

  // Si no hi ha cap comanda vàlida a l'estat → redirigim fora (B14)
  if (!comanda) {
    return <Navigate to="/cataleg" replace />;
  }

  function formatarData(iso: string): string {
    try {
      return new Intl.DateTimeFormat('ca-ES', {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function textMetodePagament(metode: string): string {
    switch (metode) {
      case 'targeta':
        return 'Targeta bancària (Stripe SSL)';
      case 'transferencia':
        return 'Transferència bancària SEPA';
      case 'contrareemborsament':
        return 'Pagament contra reemborsament';
      default:
        return metode;
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.contenidor}>
        {/* Insígnia d'èxit */}
        <div className={styles.iconaExit} aria-hidden="true">
          <span className="material-symbols-outlined">check</span>
        </div>

        <h1 className={styles.titol}>Comanda confirmada!</h1>
        <p className={styles.subtitol}>
          Gràcies per confiar en ActivePrat. Hem enviat un resum detallat amb el número de seguiment al teu correu <strong>{comanda.dadesCompra.correu}</strong>.
        </p>

        {/* Caixa amb número de comanda únic */}
        <div className={styles.caixaNumero}>
          <span className={styles.etiquetaNumero}>Identificador de comanda</span>
          <span className={styles.valorNumero}>{comanda.numero}</span>
        </div>

        {/* Resum de l'enviament i pagament */}
        <div className={styles.detallsComanda}>
          <h2 className={styles.titolDetall}>Dades del lliurament</h2>

          <div className={styles.graellaInfo}>
            <div className={styles.grupInfo}>
              <span className={styles.labelInfo}>Destinatari</span>
              <span className={styles.valorInfo}>{comanda.dadesCompra.nom}</span>
            </div>

            <div className={styles.grupInfo}>
              <span className={styles.labelInfo}>Adreça d'enviament</span>
              <span className={styles.valorInfo}>
                {comanda.dadesCompra.adreca}, {comanda.dadesCompra.codiPostal}
              </span>
            </div>

            <div className={styles.grupInfo}>
              <span className={styles.labelInfo}>Data de registre</span>
              <span className={styles.valorInfo}>{formatarData(comanda.dataCreacio)}</span>
            </div>

            <div className={styles.grupInfo}>
              <span className={styles.labelInfo}>Mètode de pagament</span>
              <span className={styles.valorInfo}>
                {textMetodePagament(comanda.dadesCompra.metodePagament)}
              </span>
            </div>
          </div>

          <div className={styles.divisor} />

          <h3 className={styles.titolDetall}>Articles adquirits</h3>

          <div className={styles.llistaComprats}>
            {comanda.linies.map((linia) => (
              <div key={linia.producte.id} className={styles.filaComprat}>
                <span className={styles.nomComprat}>
                  {linia.producte.nom} × {linia.quantitat}
                </span>
                <span className={styles.preuComprat}>
                  {formatPreu(calcularSubtotal(linia))}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.divisor} />

          <div className={styles.filaTotal}>
            <span className={styles.etiquetaTotal}>Total abonat</span>
            <span className={styles.valorTotal}>{formatPreu(comanda.total)}</span>
          </div>
        </div>

        {/* Botó de retorn */}
        <Link to="/cataleg" className={styles.botoTornar}>
          <span>Tornar a la botiga</span>
          <span className={clsx('material-symbols-outlined', styles.iconaBoto)}>
            storefront
          </span>
        </Link>
      </div>
    </div>
  );
}
