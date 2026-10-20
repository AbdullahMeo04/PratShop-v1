// src/tipus.ts
// Definicions de tipus TypeScript per a PratShop v1

// ─── Categories de producte ───────────────────────────────
export type Categoria = 'Entrenament' | 'Accessoris' | 'Recuperació';

// ─── Etiquetes especials d'un producte ────────────────────
export type Etiqueta = 'Novetat' | 'Edició Limitada' | 'Top Vendes' | 'Oferta';

// ─── Producte del catàleg ─────────────────────────────────
export interface Producte {
  id: string;
  nom: string;
  categoria: Categoria;
  preu: number;           // en euros, sense IVA → ja inclou IVA en el nostre cas
  estoc: number;          // 0 = esgotat
  descripcio: string;
  imatge: string;         // ruta relativa a /public/img o URL local
  etiqueta?: Etiqueta;    // opcional: badge sobre la targeta
  preуAnterior?: number;  // preu tachado si hi ha oferta
}

// ─── Línia del carro de la compra ────────────────────────
export interface LiniaCarro {
  producte: Producte;
  quantitat: number;
}

// ─── Dades del formulari de compra ───────────────────────
export interface DadesCompra {
  nom: string;
  correu: string;
  adreca: string;         // adreça d'enviament
  codiPostal: string;     // exactament 5 dígits
  metodePagament: 'targeta' | 'transferencia' | 'contrareemborsament';
  acceptaCondicions: boolean;
}

// ─── Errors de validació del formulari ───────────────────
export type ErrorsFormulari = Partial<Record<keyof DadesCompra, string>>;

// ─── Comanda confirmada ───────────────────────────────────
export interface Comanda {
  numero: string;         // generat aleatòriament
  linies: LiniaCarro[];
  total: number;
  enviamentGratuit: boolean;
  dadesCompra: DadesCompra;
  dataCreacio: string;    // ISO 8601
}

// ─── Estat que es passa a /confirmacio via navigate state ─
export interface EstatConfirmacio {
  comanda: Comanda;
}
