// src/dades/productes.ts
// Catàleg de productes d'ActivePrat – mínim 12 productes, 3 categories, ≥2 esgotats
// Imatges: SVG gradient locals (no hotlinks externs)

import type { Producte } from '../tipus';

export const PRODUCTES: Producte[] = [
  // ─── ENTRENAMENT ──────────────────────────────────────────
  {
    id: 'hyperion-pro-32',
    nom: 'Manuells Ajustables Hyperion Pro 32kg',
    categoria: 'Entrenament',
    preu: 349.00,
    estoc: 8,
    descripcio:
      'Sistema de manuells ajustables d\'alta precisió Hyperion Pro. Rang de 2 a 32 kg en intervals de 2 kg. Estructura d\'acer forjat amb revestiment de cautxú antilliscant. Mecanisme de bloqueig ràpid certificat ISO 9001. Ideal per a entrenament de força funcional i hipertròfia.',
    imatge: '/img/hyperion-pro.svg',
    etiqueta: 'Novetat',
  },
  {
    id: 'kettlebell-titan-24',
    nom: 'Kettlebell Titan Forge 24kg',
    categoria: 'Entrenament',
    preu: 89.95,
    estoc: 15,
    descripcio:
      'Kettlebell de ferro colat d\'una peça sense costures. Mànec ergonòmic de 35mm de diàmetre amb acabat mat antilliscant. Base plana per a estabilitat màxima. Certificació CE per a ús professional i domèstic.',
    imatge: '/img/kettlebell-titan.svg',
    etiqueta: 'Top Vendes',
  },
  {
    id: 'bandes-elastiques-pro',
    nom: 'Kit de Bandes Elàstiques Pro',
    categoria: 'Entrenament',
    preu: 39.95,
    estoc: 30,
    descripcio:
      'Set de 5 bandes de resistència progressiva (2–60 kg) fabricades en làtex natural de doble capa. Inclou manetes ergonòmiques, ancoratge de porta i guia d\'exercicis en català. Ideals per a rehabilitació i entrenament funcional.',
    imatge: '/img/bandes-elastiques.svg',
    etiqueta: 'Top Vendes',
  },
  {
    id: 'barra-olimpica-power',
    nom: 'Barra Olímpica PowerLift 20kg',
    categoria: 'Entrenament',
    preu: 219.00,
    estoc: 4,
    descripcio:
      'Barra olímpica de 20 kg amb nucli d\'acer al carboni (resistència 200.000 PSI). Longitud 220 cm, diàmetre 28mm al mànec. Rodaments de boles d\'alta velocitat. Acabat cromat tricrom antioxidant. Homologada per a competició.',
    imatge: '/img/barra-olimpica.svg',
    etiqueta: 'Edició Limitada',
  },
  {
    id: 'corda-salt-speed',
    nom: 'Corda de Salt Speed Pro',
    categoria: 'Entrenament',
    preu: 34.90,
    estoc: 0, // ESGOTADA
    descripcio:
      'Corda de salt de velocitat amb cable d\'acer revestit de 3mm. Rodaments de boles de precisió als mànecs d\'alumini CNC. Longitud ajustable fins a 3m. Comptador digital integrat. Usada per atletes de CrossFit i boxa.',
    imatge: '/img/corda-salt.svg',
  },

  // ─── ACCESSORIS ───────────────────────────────────────────
  {
    id: 'titan-gps-pulse',
    nom: 'Rellotge Titan GPS Pulse',
    categoria: 'Accessoris',
    preu: 289.90,
    estoc: 6,
    descripcio:
      'Rellotge esportiu multisensor amb GPS multifreqüència i altímetre barométric. Pantalla AMOLED 1,4" de 454×454px. Resistència WR100 (100m d\'immersió). Bateria: 14 dies en mode smartwatch, 35h en mode GPS. Compatible ANT+ i Bluetooth 5.3.',
    imatge: '/img/rellotge-titan.svg',
  },
  {
    id: 'cintura-neoprena-lumbar',
    nom: 'Cintura Lumbar Neoprena Pro',
    categoria: 'Accessoris',
    preu: 49.95,
    estoc: 20,
    descripcio:
      'Cintura de suport lumbar de neoprena de 7mm d\'espessor. Tancament de velcro triple amb reforç lateral. Disseny ergonòmic que s\'adapta a qualsevol morfologia. Recomanada per aixecament de pesos i treball de força màxima.',
    imatge: '/img/cintura-lumbar.svg',
  },
  {
    id: 'guants-entrena-grip',
    nom: 'Guants d\'Entrenament GripTech',
    categoria: 'Accessoris',
    preu: 29.95,
    estoc: 25,
    descripcio:
      'Guants de palma oberta amb grip de silicona tridimensional. Ventilació perforada en el dors. Tancament de canell ajustable. Material: 60% neoprena, 30% nylon, 10% elastà. Disponibles en S, M, L, XL.',
    imatge: '/img/guants-grip.svg',
    etiqueta: 'Novetat',
  },
  {
    id: 'ampolla-shaker-pro',
    nom: 'Ampolla Shaker NutriPro 750ml',
    categoria: 'Accessoris',
    preu: 19.95,
    estoc: 0, // ESGOTADA
    descripcio:
      'Shaker d\'esport fabricat en Tritan sense BPA. Capacitat 750ml amb graduació interior i malla mezcladora d\'acer inoxidable. Tapa hermètica amb rosca i ansa de transport. Apta per a rentavaixelles.',
    imatge: '/img/shaker-nutri.svg',
  },

  // ─── RECUPERACIÓ ──────────────────────────────────────────
  {
    id: 'corro-foam-fusion',
    nom: 'Corró de Foam Fusion Grip',
    categoria: 'Recuperació',
    preu: 44.50,
    estoc: 0, // ESGOTADA (de l'export Stitch)
    descripcio:
      'Corró de massatge miofascial de densitat alta (EPP 90g/L). Superfície texturada amb protuberàncies per a activació de punts gatell. Longitud 45cm, diàmetre 15cm. Suporta fins a 150kg. Ideal per a recuperació post-entrenament.',
    imatge: '/img/corro-foam.svg',
  },
  {
    id: 'pistola-massatge-pro',
    nom: 'Pistola de Massatge RecoveryPro',
    categoria: 'Recuperació',
    preu: 129.00,
    estoc: 9,
    descripcio:
      'Pistola de massatge percussiu de 6 nivells d\'intensitat (1200–3200 RPM). Motor sense escombretes de 40W. Soroll <45dB. Autonomia de 6 hores. Inclou 6 capçals intercanviables. Certificació CE/RoHS.',
    imatge: '/img/pistola-massatge.svg',
    etiqueta: 'Novetat',
  },
  {
    id: 'estirament-lacrosse',
    nom: 'Pilota de Lacrosse MioFlex',
    categoria: 'Recuperació',
    preu: 12.90,
    estoc: 50,
    descripcio:
      'Pilota de goma sòlida per a automassatge i alliberament miofascial. Diàmetre 6,3cm. Duresa 70 Shore A. Ideal per a zones difícils com planta del peu, glutis i escàpules. Latex-free.',
    imatge: '/img/pilota-lacrosse.svg',
  },
  {
    id: 'banda-compressio-cames',
    nom: 'Bandes de Compressió Run Recover',
    categoria: 'Recuperació',
    preu: 34.95,
    estoc: 18,
    descripcio:
      'Mànigues de compressió graduada per a cames (20-30 mmHg). Teixit de microfibra transpirable amb tractament antibacterià. Redueix la fatiga muscular i accelera la recuperació post-carrera. Mida S–XL.',
    imatge: '/img/bandes-compressio.svg',
    etiqueta: 'Novetat',
  },
];

// Exportem totes les categories per als filtres del catàleg
export const CATEGORIES = ['Entrenament', 'Accessoris', 'Recuperació'] as const;
