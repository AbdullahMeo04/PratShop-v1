# ActivePrat – PR1 · PratShop v1

> **Mòdul 0488:** Desenvolupament d'interfícies (DAM2)  
> **Tema botiga:** ActivePrat (Equipament i material d'alt rendiment per a atletes exigents)  
> **Estat de qualitat:** 100% lliure d'errors de linter (`npm run lint`), compilació estricta de TypeScript (`npm run build`) i tests unitaris completats (`npm test`).

---

## 1. Descripció del Projecte

**ActivePrat** és una aplicació web de comerç electrònic d'alt rendiment dissenyada amb una identitat visual nocturna, tecnològica i estètica esportiva professional (inspirada en la generació assistida de Google Stitch). La interfície està desenvolupada completament en **català**, utilitzant tokens de disseny centralitzats a `:root` mitjançant CSS Custom Properties i estils modulars amb **CSS Modules**.

El projecte implementa un flux complet de compra:
- Pàgina d'inici amb hero i productes destacats.
- Catàleg amb cerca sincronitzada a la URL (`?cerca=`), filtre per categories ("Entrenament", "Accessoris", "Recuperació"), ordenació per preu i puntuació, i gestió visual de productes esgotats.
- Fitxa de detall del producte amb selector de quantitats controlat (mínim 1, màxim estoc).
- Cistella de la compra persistent a `localStorage` amb derivació dinàmica de subtotals i llindar d'enviament gratuït a partir de 50 €.
- Formulari de pagament controlat amb validació pura d'errors i protecció de dades.
- Pantalla de confirmació amb número únic de comanda.
- Pàgina 404 personalitzada.

---

## 2. Enllaç al Projecte Stitch

- **Disseny original a Google Stitch:** [ActivePrat Sports Storefront (Google Stitch)](https://stitch.design/projects/activeprat-storefront-dam2) *(enllaç de referència de la plantilla de disseny)*
- Els fitxers exportats originals sense modificar es troben arxivats a [`docs/generat/`](docs/generat/).

---

## 3. Instruccions d'Execució

### Requisits previs
- Node.js ≥ v20 (recomanat v24 LTS)
- npm ≥ 10

### Instal·lació i comandes
```bash
# 1. Instal·lar dependències
npm install

# 2. Executar el servidor de desenvolupament local (Vite HMR)
npm run dev

# 3. Executar verificació de tipus TypeScript i generació de producció
npm run build

# 4. Executar linter ESLint (zero advertències i zero errors)
npm run lint

# 5. Executar suite de proves unitàries amb Vitest
npm test

# 6. Previsualitzar el build de producció
npm run preview
```

---

## 4. Estructura de Carpetes

```text
pratshop-v1/
├── docs/
│   ├── disseny/                 # Captures de pantalla (desktop i mòbil)
│   │   ├── cataleg-desktop.png
│   │   └── cataleg-mobil.png
│   └── generat/                 # Exportació directa de Google Stitch + prompts
│       ├── DESIGN.md
│       ├── cataleg-desktop-generat.html
│       ├── cataleg-mobil-generat.html
│       └── prompts.md
├── public/
│   ├── favicon.svg              # Icona d'ActivePrat
│   ├── icons.svg
│   └── img/                     # 13 il·lustracions vectorials SVG autòctones
│       ├── hyperion-pro.svg
│       ├── kettlebell-titan.svg
│       ├── bandes-elastiques.svg
│       └── ...
├── src/
│   ├── components/              # Components reutilitzables (default export + .module.css)
│   │   ├── Boto.tsx / Boto.module.css
│   │   ├── Capcalera.tsx / Capcalera.module.css
│   │   ├── Disposicio.tsx / Disposicio.module.css
│   │   ├── Peu.tsx / Peu.module.css
│   │   ├── SelectorQuantitat.tsx / SelectorQuantitat.module.css
│   │   └── TargetaProducte.tsx / TargetaProducte.module.css
│   ├── dades/
│   │   └── productes.ts         # Catàleg de 13 productes, 3 categories, 3 esgotats
│   ├── pagines/                 # Pantalles principals de l'aplicació
│   │   ├── Inici.tsx / Inici.module.css
│   │   ├── Cataleg.tsx / Cataleg.module.css
│   │   ├── DetallProducte.tsx / DetallProducte.module.css
│   │   ├── Carro.tsx / Carro.module.css
│   │   ├── Compra.tsx / Compra.module.css
│   │   ├── Confirmacio.tsx / Confirmacio.module.css
│   │   └── NoTrobada.tsx / NoTrobada.module.css
│   ├── utils/                   # Funcions pures de negoci i càlcul
│   │   ├── calcularTotal.ts     # Càlculs de subtotals i enviament gratuït
│   │   ├── formatPreu.ts        # Formatador d'euros ca-ES amb Intl
│   │   ├── generarNumeroComanda.ts # Generador d'identificadors únics
│   │   ├── validar.ts           # Validació pura del formulari de compra
│   │   └── __tests__/           # Proves unitàries de validació i càlculs
│   │       ├── calcularTotal.test.ts
│   │       └── validar.test.ts
│   ├── tipus.ts                 # Interfícies i tipus TypeScript (strict)
│   ├── App.tsx                  # Gestió de rutes i estat aixecat del carro
│   ├── main.tsx                 # Punt d'arrencada React 19
│   ├── index.css                # Tokens de disseny (:root, mode fosc i mode clar)
│   └── vite-env.d.ts
├── eslint.config.js             # Configuració ESLint 9 pla
├── tsconfig.json                # Configuració estricta TypeScript
├── vite.config.ts               # Configuració del bundler Vite
├── package.json
├── MEMORIA.md                   # Esborrany complet de la memòria tècnica
└── README.md                    # Aquest document
```

---

## 5. Taula de Rutes de l'Aplicació

| Ruta | Component | Descripció | Paràmetres / Estat |
| :--- | :--- | :--- | :--- |
| `/` | `Inici` | Hero de marca i aparador de productes destacats | Cap |
| `/cataleg` | `Cataleg` | Graella adaptativa amb cerca i filtres de categories | URL Params: `?cerca=...&categoria=...&ordre=...` |
| `/producte/:id` | `DetallProducte` | Fitxa tècnica, selector de quantitat i acció d'afegir al carro | Path Param: `:id` (redirecció a 404 si l'id no existeix) |
| `/carro` | `Carro` | Llista de productes al carro, ajust d'unitats, avís d'enviament | Accions de carro aixecat a `App` |
| `/compra` | `Compra` | Formulari de tramitació amb validació pura d'errors | Redirecció a `/carro` si el carro és buit |
| `/confirmacio` | `Confirmacio` | Resum de comanda, identificador únic i dades d'enviament | Location state: `{ comanda: Comanda }` |
| `*` | `NoTrobada` | Pàgina d'error 404 amb botó de retorn a l'inici | Qualsevol URL desconeguda |

---

## 6. Decisions de Disseny i Arquitectura

1. **Tokens centralitzats**: Seguint l'especificació de Stitch, tots els colors, radis, alçades i tipografies s'emmagatzemen com a variables CSS a `:root` d'`index.css`. No s'utilitza cap color hexadecimal ni format `rgb()` fora d'aquest fitxer.
2. **CSS Modules vs. Tailwind**: L'exportació HTML utilitzava classes utilitàries de Tailwind per CDN. Per garantir modularitat, mantenibilitat i compliment de la pauta educativa, s'ha refactoritzat íntegrament a CSS Modules purs per component.
3. **Estat aixecat i immutabilitat**: L'estat de la cistella viu a `App.tsx` i mai es muta directament (s'utilitzen mètodes immutables `map`, `filter` i `spread`). Els totals i subtotals es calculen en temps de render com a valors derivats, evitant inconsistències d'estat.
4. **Resiliència d'emmagatzematge**: La càrrega del carro des de `localStorage` utilitza un *lazy initializer* protegit amb `try/catch`. Si les dades del navegador són corruptes o invàlides, l'aplicació inicialitza un carro buit sense bloquejar-se.
5. **Assets locals**: S'han substituït els enllaços temporals de Google User Content per gràfics vectorials SVG optimitzats a `/public/img/`.

---

## 7. Declaració d'Ús d'Intel·ligència Artificial

- **Eines utilitzades**: Google Stitch per a la ideació visual i la generació del sistema de disseny inicial (`DESIGN.md` i prototips HTML/Tailwind); Antigravity (Google DeepMind) com a assistent d'enginyeria per a la refactorització a React 19 + TypeScript.
- **Per a què s'ha utilitzat**:
  - Extracció i normalització de la paleta de tokens a variables CSS `:root`.
  - Conversió del marcatge HTML estàtic i classes de Tailwind a components JSX amb CSS Modules.
  - Generació de les 13 il·lustracions vectorials SVG autòctones a `/public/img/`.
  - Redacció de proves unitàries amb Vitest per a la funció de validació i càlculs.
- **Canvis i adaptacions manuals d'enginyeria**:
  - Reemplaçament del filtratge amb JavaScript vanilla per l'ús de `useSearchParams` de React Router.
  - Implementació estricta de la gestió d'estoc límit i deshabilitació de productes esgotats.
  - Creació de la funció pura `validar.ts` amb comprovacions específiques del codi postal de 5 dígits i acceptació legal.
  - Normalització de tota la interfície a la llengua catalana amb tipografia de precisió (punt volat, accents oberts/tancats).
