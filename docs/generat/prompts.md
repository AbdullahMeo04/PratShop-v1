# Prompts utilitzats a Google Stitch (ActivePrat)

Aquest document recull els prompts i especificacions d'estil enviats a Google Stitch per a la generació del sistema de disseny i les interfícies de catàleg per a l'aplicació **ActivePrat**.

---

## 1. Identitat de Marca i Sistema de Disseny (`DESIGN.md`)

```text
Crea un sistema de disseny complet per a una botiga d'esports premium anomenada "ActivePrat".
- Estètica: Nocturna, tecnològica, atlètica d'alt rendiment (dark mode per defecte amb suport light).
- Colors primaris: Superfícies fosques de baix contrast (surface #111317, container #1e2024), vora subtil 1px outline-variant (#444933) sense ombres pesades.
- Color d'accent: Volt Lime (#c3f400 / #ccff00) per a botons d'acció cridaners (CTAs), preus destacats, estat actiu de filtres i anell de focus.
- Tipografia: 'Plus Jakarta Sans' per a encapçalaments tècnics i 'Inter' per a textos de lectura i interfície.
- Radi de curvatura: 4px, 8px, 12px, 16px, 24px i píndola completa (9999px).
- Genera la paleta de tokens seguint l'especificació Material Design 3 i documenta-la en Markdown amb taules de colors, tipografia, espaiat i components base.
```

---

## 2. Pantalla de Catàleg d'Escriptori (`cataleg-desktop-generat.html`)

```text
Dissenya la pàgina de catàleg per a resolució d'escriptori (1280px+) per a la botiga "ActivePrat".
- Capçalera enganxosa (sticky) amb efecte vidre (backdrop-blur), logotip d'ActivePrat amb icona de llampec volt, enllaços de navegació ("Inici", "Catàleg") i icona de cistella amb comptador d'articles.
- Barra de cerca superior amb icona de cerca i camp de text gran.
- Filtre de categories per xips ("Tot", "Entrenament", "Accessoris", "Recuperació") amb estat actiu en volt lime.
- Barra de control amb comptador d'articles "N de M productes" i selector d'ordenació ("Destacats", "Preu ↑", "Preu ↓", "Puntuació").
- Graella adaptativa de targetes de producte (mínim 240px per columna).
- Cada targeta ha d'incloure: contenidor d'imatge amb ràtio d'aspecte, etiquetes ("Novetat", "Top Vendes", "Edició Limitada"), indicador d'estoc, nom del producte, preu en format tabular amb etiqueta "IVA inclòs", i botó d'acció.
- Estat visual de producte esgotat: imatge en escala de grisos, insígnia "Esgotat" en vermell, preu desactivat i botó "Avisa'm quan estigui disponible" deshabilitat.
- Peu de pàgina complert amb columnes informatives, enllaços tècnics, garantia i drets d'autor en català.
```

---

## 3. Pantalla de Catàleg Mòbil 390px (`cataleg-mobil-generat.html`)

```text
Adapta la pantalla de catàleg per a dispositius mòbils amb amplada de visualització de 390px (iPhone 14 / modern smartphones).
- Capçalera compacta (alçada 60px) amb logotip simplificat i icona de cistella amb insígnia.
- Barra de cerca i xips de categories amb desplaçament horitzontal si cal.
- Graella d'1 o 2 columnes per a productes.
- Barra de navegació inferior fixa (bottom tab bar) amb enllaços ràpids: "Botiga", "Inici" i "Carro" amb comptador d'unitats.
- Mantenir el contrast accessible i l'accent volt lime.
```
