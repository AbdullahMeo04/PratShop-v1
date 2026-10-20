// src/App.tsx
// Component arrel amb l'estat global del carro (B10, B11, B12) i definició de rutes (B6).

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import type { LiniaCarro, Producte, Comanda } from './tipus';
import { calcularTotalUnitats } from './utils/calcularTotal';

import Disposicio from './components/Disposicio';
import Inici from './pagines/Inici';
import Cataleg from './pagines/Cataleg';
import DetallProducte from './pagines/DetallProducte';
import Carro from './pagines/Carro';
import Compra from './pagines/Compra';
import Confirmacio from './pagines/Confirmacio';
import NoTrobada from './pagines/NoTrobada';

const CLAU_STORAGE = 'pratshop_carro_v1';

export default function App() {
  // Inicialització per mandra (lazy initializer) amb try/catch per prevenir caigudes si localStorage està corrupte (B12)
  const [carro, setCarro] = useState<LiniaCarro[]>(() => {
    try {
      const guardat = localStorage.getItem(CLAU_STORAGE);
      if (guardat) {
        const parsed = JSON.parse(guardat);
        if (Array.isArray(parsed)) {
          return parsed as LiniaCarro[];
        }
      }
    } catch {
      // Si el JSON està danyat, retornem carro buit de manera segura
    }
    return [];
  });

  // Estat auxiliar per si l'usuari refresca /confirmacio
  const [ultimaComanda, setUltimaComanda] = useState<Comanda | null>(null);

  // Persistència reactiva a localStorage en canviar el carro (B12)
  useEffect(() => {
    try {
      localStorage.setItem(CLAU_STORAGE, JSON.stringify(carro));
    } catch {
      // Gestió segura en cas de quota excedida
    }
  }, [carro]);

  // Càlcul derivat del total d'articles al carro (B10, B11)
  const totalUnitats = calcularTotalUnitats(carro);

  // ─── Funcions per manipular l'estat del carro (immutables) ───

  function afegirAlCarro(producte: Producte, quantitat: number) {
    if (producte.estoc <= 0 || quantitat <= 0) return;

    setCarro((prevCarro) => {
      const indexExistent = prevCarro.findIndex(
        (linia) => linia.producte.id === producte.id,
      );

      if (indexExistent >= 0) {
        // El producte ja és al carro: incrementem quantitat sense superar l'estoc
        return prevCarro.map((linia, idx) => {
          if (idx === indexExistent) {
            const novaQuantitat = Math.min(
              linia.quantitat + quantitat,
              producte.estoc,
            );
            return { ...linia, quantitat: novaQuantitat };
          }
          return linia;
        });
      }

      // Nou article al carro
      const quantitatLimitada = Math.min(quantitat, producte.estoc);
      return [...prevCarro, { producte, quantitat: quantitatLimitada }];
    });
  }

  function canviarQuantitat(idProducte: string, novaQuantitat: number) {
    setCarro((prevCarro) =>
      prevCarro.map((linia) => {
        if (linia.producte.id === idProducte) {
          const quantitatAjustada = Math.max(
            1,
            Math.min(novaQuantitat, linia.producte.estoc),
          );
          return { ...linia, quantitat: quantitatAjustada };
        }
        return linia;
      }),
    );
  }

  function eliminarLinia(idProducte: string) {
    setCarro((prevCarro) =>
      prevCarro.filter((linia) => linia.producte.id !== idProducte),
    );
  }

  function buidarCarro() {
    setCarro([]);
  }

  function handleComandaCompletada(comanda: Comanda) {
    setUltimaComanda(comanda);
    buidarCarro(); // B14: Buidem el carro en validar la compra
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Disposicio totalUnitats={totalUnitats} />}>
          <Route index element={<Inici />} />
          <Route path="cataleg" element={<Cataleg />} />
          <Route
            path="producte/:id"
            element={<DetallProducte onAfegirAlCarro={afegirAlCarro} />}
          />
          <Route
            path="carro"
            element={
              <Carro
                linies={carro}
                onCanviarQuantitat={canviarQuantitat}
                onEliminarLinia={eliminarLinia}
                onBuidarCarro={buidarCarro}
              />
            }
          />
          <Route
            path="compra"
            element={
              <Compra
                linies={carro}
                onComandaCompletada={handleComandaCompletada}
              />
            }
          />
          <Route
            path="confirmacio"
            element={<Confirmacio comandaFallback={ultimaComanda} />}
          />
          <Route path="*" element={<NoTrobada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
