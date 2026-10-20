// src/components/SelectorQuantitat.tsx
// Selector de quantitat controlat. Props exactes per B9.

import clsx from 'clsx';
import styles from './SelectorQuantitat.module.css';

// Prop types exactes per especificació B9
type Props = {
  valor: number;
  minim?: number;   // per defecte 1
  maxim: number;    // = estoc
  onCanvi: (nouValor: number) => void;
};

export default function SelectorQuantitat({
  valor,
  minim = 1,
  maxim,
  onCanvi,
}: Props) {
  const potDisminuir = valor > minim;
  const potAugmentar = valor < maxim;

  function disminuir() {
    // No es pot baixar de minim (per defecte 1)
    if (potDisminuir) onCanvi(valor - 1);
  }

  function augmentar() {
    // No es pot superar l'estoc (maxim)
    if (potAugmentar) onCanvi(valor + 1);
  }

  return (
    <div className={styles.contenidor} role="group" aria-label="Seleccionar quantitat">
      <button
        className={styles.botoControl}
        onClick={disminuir}
        disabled={!potDisminuir}
        aria-label="Reduir quantitat"
        type="button"
      >
        <span className={clsx('material-symbols-outlined', styles.iconaControl)}>remove</span>
      </button>

      <div className={styles.divisor} />

      <span className={styles.valor} aria-live="polite" aria-label={`Quantitat: ${valor}`}>
        {valor}
      </span>

      <div className={styles.divisor} />

      <button
        className={styles.botoControl}
        onClick={augmentar}
        disabled={!potAugmentar}
        aria-label="Augmentar quantitat"
        type="button"
      >
        <span className={clsx('material-symbols-outlined', styles.iconaControl)}>add</span>
      </button>
    </div>
  );
}
