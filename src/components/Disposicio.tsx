// src/components/Disposicio.tsx
// Layout comú: Capcalera + <Outlet/> + Peu (B6)

import { Outlet } from 'react-router';
import Capcalera from './Capcalera';
import Peu from './Peu';
import styles from './Disposicio.module.css';

interface Props {
  totalUnitats: number;
}

export default function Disposicio({ totalUnitats }: Props) {
  return (
    <div className={styles.contenidor}>
      <Capcalera totalUnitats={totalUnitats} />
      <main className={styles.principal}>
        <Outlet />
      </main>
      <Peu />
    </div>
  );
}
