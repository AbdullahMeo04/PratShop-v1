// src/pagines/Carro.tsx
// Pàgina del carro de la compra. Estat aixecat a App (B10, B11, B12).
// Totals i subtotals derivats en temps de renderització (mai duplicats a l'estat).

import { Link } from 'react-router';
import clsx from 'clsx';
import type { LiniaCarro } from '../tipus';
import SelectorQuantitat from '../components/SelectorQuantitat';
import {
  calcularTotal,
  calcularSubtotal,
  esEnviamentGratuit,
  LLINDAR_ENVIAMENT_GRATUIT,
} from '../utils/calcularTotal';
import { formatPreu } from '../utils/formatPreu';
import styles from './Carro.module.css';

interface Props {
  linies: LiniaCarro[];
  onCanviarQuantitat: (idProducte: string, novaQuantitat: number) => void;
  onEliminarLinia: (idProducte: string) => void;
  onBuidarCarro: () => void;
}

export default function Carro({
  linies,
  onCanviarQuantitat,
  onEliminarLinia,
  onBuidarCarro,
}: Props) {
  // Càlculs derivats durant el render (B10)
  const subtotal = calcularTotal(linies);
  const teEnviamentGratuit = esEnviamentGratuit(subtotal);
  const costEnviament = teEnviamentGratuit ? 0 : 4.95;
  const totalFinal = subtotal + costEnviament;
  const faltaPerGratuit = Math.max(0, LLINDAR_ENVIAMENT_GRATUIT - subtotal);

  if (linies.length === 0) {
    return (
      <div className={styles.pagina}>
        <h1 className={styles.titolSeccio}>Cistella de la compra</h1>
        <div className={styles.estatBuit}>
          <div className={styles.iconaBuit}>
            <span className="material-symbols-outlined">production_quantity_limits</span>
          </div>
          <h2 className={styles.titolBuit}>El teu carro és buit</h2>
          <p className={styles.descripcioBuit}>
            Encara no has afegit cap equipament esportiu a la cistella. Explora el nostre catàleg per trobar el millor material tècnic.
          </p>
          <Link to="/cataleg" className={styles.botoTramitar}>
            <span>Descobreix el catàleg</span>
            <span className={clsx('material-symbols-outlined', styles.iconaBoto)}>arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pagina}>
      <h1 className={styles.titolSeccio}>Cistella de la compra</h1>

      <div className={styles.graella}>
        {/* Columna d'articles */}
        <div className={styles.llistaArticles}>
          {/* Banner informatiu d'enviament gratuït (llindar 50 €) */}
          <div
            className={clsx(
              styles.bannerEnviament,
              teEnviamentGratuit && styles.bannerEnviamentGratis,
            )}
          >
            <span className={clsx('material-symbols-outlined', styles.iconaEnviament)}>
              {teEnviamentGratuit ? 'verified' : 'local_shipping'}
            </span>
            <span>
              {teEnviamentGratuit ? (
                <>Enviament gratuït aplicat a la teva comanda!</>
              ) : (
                <>
                  Afegeix <strong>{formatPreu(faltaPerGratuit)}</strong> més per aconseguir <strong>enviament gratuït</strong>.
                </>
              )}
            </span>
          </div>

          {/* Llista de productes al carro */}
          {linies.map((linia) => {
            const subtotalLinia = calcularSubtotal(linia);
            return (
              <div key={linia.producte.id} className={styles.targetaLinia}>
                <div className={styles.contenidorImatge}>
                  <img
                    src={linia.producte.imatge}
                    alt={linia.producte.nom}
                    className={styles.imatgeProducte}
                  />
                </div>

                <div className={styles.infoLinia}>
                  <span className={styles.categoriaLinia}>{linia.producte.categoria}</span>
                  <Link
                    to={`/producte/${linia.producte.id}`}
                    className={styles.nomLinia}
                  >
                    {linia.producte.nom}
                  </Link>
                  <span className={styles.preuUnitari}>
                    {formatPreu(linia.producte.preu)} / unitat
                  </span>
                </div>

                <div className={styles.zonaQuantitat}>
                  <SelectorQuantitat
                    valor={linia.quantitat}
                    minim={1}
                    maxim={linia.producte.estoc}
                    onCanvi={(novaQuantitat) =>
                      onCanviarQuantitat(linia.producte.id, novaQuantitat)
                    }
                  />
                </div>

                <div className={styles.zonaSubtotal}>
                  <span className={styles.subtotalLinia}>
                    {formatPreu(subtotalLinia)}
                  </span>
                  <button
                    type="button"
                    className={styles.botoEliminar}
                    onClick={() => onEliminarLinia(linia.producte.id)}
                    aria-label={`Eliminar ${linia.producte.nom} del carro`}
                  >
                    <span className={clsx('material-symbols-outlined', styles.iconaEliminar)}>
                      delete
                    </span>
                  </button>
                </div>
              </div>
            );
          })}

          <div className={styles.accionsCarro}>
            <button
              type="button"
              className={styles.botoBuidar}
              onClick={onBuidarCarro}
            >
              <span className={clsx('material-symbols-outlined', styles.iconaEliminar)}>
                remove_shopping_cart
              </span>
              <span>Buidar la cistella</span>
            </button>
          </div>
        </div>

        {/* Resum de la comanda */}
        <aside className={styles.resumComanda} aria-label="Resum de la comanda">
          <h2 className={styles.titolResum}>Resum de la comanda</h2>

          <div className={styles.filaResum}>
            <span>Subtotal</span>
            <span className={styles.valorResum}>{formatPreu(subtotal)}</span>
          </div>

          <div className={styles.filaResum}>
            <span>Despeses d'enviament</span>
            {teEnviamentGratuit ? (
              <span className={styles.valorGratis}>Gratuït</span>
            ) : (
              <span className={styles.valorResum}>{formatPreu(costEnviament)}</span>
            )}
          </div>

          <div className={styles.divisorResum} />

          <div className={styles.filaTotal}>
            <span className={styles.etiquetaTotal}>Total</span>
            <span className={styles.valorTotal}>{formatPreu(totalFinal)}</span>
          </div>

          <div className={styles.ivaText}>IVA del 21% inclòs</div>

          <Link to="/compra" className={styles.botoTramitar}>
            <span>Tramitar comanda</span>
            <span className={clsx('material-symbols-outlined', styles.iconaBoto)}>
              arrow_forward
            </span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
