// src/components/Boto.tsx
// Botó reutilitzable amb variants i suport per a children

import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Boto.module.css';

type Variant = 'primari' | 'secundari' | 'fantasma' | 'perill';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  petit?: boolean;
  amplada?: boolean; // amplada completa
}

export default function Boto({
  children,
  variant = 'primari',
  petit = false,
  amplada = false,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        styles.boto,
        styles[variant],
        petit && styles.petit,
        amplada && styles['amplada-completa'],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
