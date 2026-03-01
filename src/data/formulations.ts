export interface Ingredient {
  name: string;
  amount: string;
  standardisation?: string;
  arabicName?: string;
  hebrewName?: string;
  role: string;
  modernEquivalent?: string;
}

export interface Formulation {
  slug: string;
  name: string;
  tradeName: string;
  category: 'digestive' | 'cognitive' | 'respiratory' | 'botanical' | 'cardiovascular' | 'urological' | 'metabolic' | 'longevity';
  tagline: string;
  historicalSource: string;
  historicalSourceHebrew?: string;
  historicalSourceArabic?: string;
  primaryScholar: string;
  period: string;
  summary: string;
  serving: string;
  keyIngredients: Ingredient[];
  otherIngredients: string;
  clinicalNotes: string;
  researchStatus: 'peer-reviewed' | 'historical' | 'in-progress';
  image?: string;
  dossierUrl?: string;
  productUrl?: string;
  disclaimer: string;
}

export const formulations: Formulation[] = [
  {
    slug: 'digestive-metabolic-core',
    name: 'Digestive Metabolic Core\u2122',
    tradeName: 'DMC-1',
    category: 'digestive',
    tagline: 'Gastrointestinal equilibrium rooted in nine centuries of clinical observation.',
    historicalSource: 'Regimen of Health (Hanhagat HaBriut)',
    historicalSourceHebrew: '\u05d4\u05e0\u05d4\u05d2\u05ea \u05d4\u05d1\u05e8\u05d9\u05d0\u05d5\u05ea',
    historicalSourceArabic: '\u062a\u062f\u0628\u064a\u0631 \u0627\u0644\u0635\u062d\u0629',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE \u2014 Cairo, Egypt',
    summary:
      'This formulation draws on the dietetic and pharmacognostic principles laid out by Maimonides in his Regimen of Health, composed for Sultan al-Afdal circa 1198 CE. The text systematically addresses gastric temperament, humoral balance, and the role of aromatic botanicals in supporting digestive fire (al-harara al-ghariziyya). Modern phytochemical analysis reveals strong mechanistic alignment with contemporary GI research including smooth muscle relaxation, bile flow stimulation, and gastroprokinetic support.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Coriander Seed Extract (10:1)', amount: '250 mg', arabicName: '\u0643\u0632\u0628\u0631\u0629 (kuzbara)', hebrewName: '\u05db\u05d5\u05e1\u05d1\u05e8\u05d4', role: 'Cooling digestive; anti-flatulent', modernEquivalent: 'Coriandrum sativum \u2014 linalool, geraniol' },
      { name: 'Fennel Seed Extract (10:1)', amount: '200 mg', arabicName: '\u0634\u0645\u0627\u0631 (shamm\u0101r)', hebrewName: '\u05e9\u05d5\u05de\u05e8', role: 'Spasmolytic; promotes gastric motility', modernEquivalent: 'Foeniculum vulgare \u2014 trans-anethole' },
      { name: 'Artichoke Leaf Extract', amount: '200 mg', standardisation: '2.5% cynarin', role: 'Bitter hepatic tonic; bile flow stimulation', modernEquivalent: 'Cynara scolymus \u2014 cynarin, chlorogenic acid' },
      { name: 'Ginger Root Extract', amount: '150 mg', standardisation: '5% gingerols', arabicName: '\u0632\u0646\u062c\u0628\u064a\u0644 (zanjab\u012bl)', hebrewName: '\u05d6\u05e0\u05d2\u05d1\u05d9\u05dc', role: 'Thermogenic digestive stimulant; anti-emetic', modernEquivalent: 'Zingiber officinale \u2014 gingerols, shogaols' },
      { name: 'Peppermint Leaf Extract (4:1)', amount: '150 mg', role: 'GI smooth muscle relaxation', modernEquivalent: 'Mentha x piperita \u2014 menthol' },
      { name: 'Black Pepper Extract (BioPerine\u00ae)', amount: '5 mg', standardisation: '95% piperine', role: 'Bioavailability enhancer', modernEquivalent: 'Piper nigrum \u2014 piperine' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Preclinical and early-phase clinical evidence supports the anti-inflammatory, prokinetic, and mucosal-protective activities of the component botanicals. Cochrane-reviewed evidence exists for peppermint oil in supporting gastrointestinal comfort (NNT \u22483) and ginger for supporting normal digestive function.',
    researchStatus: 'in-progress',
    image: '/images/formulas/digestive-metabolic-core.png',
    dossierUrl: '/dossiers/digestive-metabolic-core-dossier.pdf',
    disclaimer: 'This formulation is presented for educational and historical research purposes only. Statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    slug: 'cellular-resilience-complex',
    name: 'Cellular Resilience Complex\u2122',
    tradeName: 'CRC-2',
    category: 'botanical',
    tagline: 'Nrf2 activation, NF-\u03baB modulation, and immune terrain support from four synergistic compounds.',
    historicalSource: 'Regimen of Health & Canon of Medicine',
    historicalSourceArabic: '\u062a\u062f\u0628\u064a\u0631 \u0627\u0644\u0635\u062d\u0629 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0641\u064a \u0627\u0644\u0637\u0628',
    primaryScholar: 'Maimonides / Ibn S\u012bn\u0101',
    period: '11th\u201312th century CE',
    summary:
      'This formula targets three core signaling axes: Nrf2 activation via broccoli sprout sulforaphane, NF-\u03baB modulation via curcumin phytosome, and beta-glucan immune modulation via Turkey Tail PSK/PSP. Vitamin D3 regulates immune cell differentiation via VDR expression. Note: the term kurkum in Ibn S\u012bn\u0101\\\'s Canon can refer to both turmeric and saffron depending on context \u2014 careful textual analysis is required.',
    serving: '3 Capsules',
    keyIngredients: [
      { name: 'Vitamin D3 (Cholecalciferol)', amount: '2,000 IU (50 mcg)', role: 'Immune cell differentiation via VDR', modernEquivalent: 'Cholecalciferol' },
      { name: 'Broccoli Sprout Extract', amount: '300 mg', standardisation: 'min. 10% glucoraphanin', role: 'Nrf2 activation; Phase II enzyme upregulation', modernEquivalent: 'Brassica oleracea \u2014 sulforaphane' },
      { name: 'Turkey Tail Extract', amount: '1,000 mg', standardisation: '30% polysaccharides', role: 'Innate immune modulation; NK cell enhancement', modernEquivalent: 'Trametes versicolor \u2014 PSK, PSP, beta-glucans' },
      { name: 'Curcumin Phytosome (Meriva-type)', amount: '250 mg', role: 'NF-\u03baB inhibition; anti-inflammatory', modernEquivalent: 'Curcuma longa \u2014 curcumin (29x improved bioavailability)' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Meta-analysis of 13 RCTs supports Turkey Tail PSK for immune system support alongside standard care. Curcumin inhibits CYP3A4 \u2014 significant drug interaction potential. Consult physician if on narrow-therapeutic-index drugs or undergoing medical treatment.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/cellular-resilience-complex.png',
    dossierUrl: '/dossiers/cellular-resilience-complex-dossier.pdf',
    disclaimer: 'This formulation is presented for educational and historical research purposes only. Statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    slug: 'circulatory-vitality-core',
    name: 'Circulatory Vitality Core\u2122',
    tradeName: 'CVC-3',
    category: 'cardiovascular',
    tagline: 'Cardiac tonics prescribed by Maimonides, validated by Cochrane-reviewed evidence.',
    historicalSource: 'Maq\u0101la f\u012b Bay\u0101n Ba\u02bfd al-A\u02bbr\u0101d',
    historicalSourceArabic: '\u0645\u0642\u0627\u0644\u0629 \u0641\u064a \u0628\u064a\u0627\u0646 \u0628\u0639\u0636 \u0627\u0644\u0623\u0639\u0631\u0627\u0636 \u0648\u0627\u0644\u062c\u0648\u0627\u0628 \u0639\u0646\u0647\u0627',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE \u2014 Fustat (Old Cairo), Egypt',
    summary:
      'Composed as a private treatise for the Ayyubid court, the Maimonidean source text presents the most detailed pre-modern account of cardiovascular tonic therapy in the Judeo-Arabic tradition. Olive leaf oleuropein and grape seed OPCs support nitric oxide bioavailability and endothelial function. Hawthorn has Cochrane-reviewed evidence for supporting cardiovascular function (Pittler 2008, 14 RCTs). Pomegranate punicalagins are metabolised to urolithins supporting healthy cellular recycling processes.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Olive Leaf Extract', amount: '300 mg', standardisation: '20% oleuropein', role: 'eNOS upregulation; NO bioavailability', modernEquivalent: 'Olea europaea \u2014 oleuropein, hydroxytyrosol' },
      { name: 'Hawthorn Extract', amount: '300 mg', standardisation: '18.75% OPCs', arabicName: '\u0632\u0639\u0631\u0648\u0631 (za\u02bfr\u016br)', role: 'Positive inotrope; coronary vasodilator', modernEquivalent: 'Crataegus monogyna \u2014 OPCs, vitexin' },
      { name: 'Pomegranate Extract', amount: '250 mg', standardisation: '40% ellagic acid', arabicName: '\u0631\u0645\u0627\u0646 (rumm\u0101n)', hebrewName: '\u05e8\u05d9\u05de\u05d5\u05df', role: 'Urolithin A \u2192 mitophagy; eNOS activation', modernEquivalent: 'Punica granatum \u2014 punicalagins, ellagic acid' },
      { name: 'Aged Garlic Extract', amount: '150 mg', standardisation: '1.2% SAC', arabicName: '\u062b\u0648\u0645 (thawm)', role: 'Vascular antioxidant; mild antiplatelet', modernEquivalent: 'Allium sativum \u2014 S-allyl cysteine' },
      { name: 'Grape Seed Extract', amount: '150 mg', standardisation: '95% OPCs', role: 'OPC-mediated eNOS activation; LDL oxidation inhibition', modernEquivalent: 'Vitis vinifera \u2014 OPCs, catechins' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Strong Cochrane-reviewed evidence for hawthorn in supporting cardiovascular function (Pittler 2008, 14 RCTs). Pomegranate inhibits CYP3A4 (similar to grapefruit). Aged garlic and grape seed have mild antiplatelet activity \u2014 discontinue 7\u201310 days before surgery.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/circulatory-vitality-core.png',
    dossierUrl: '/dossiers/circulatory-vitality-core-dossier.pdf',
    disclaimer: 'This formulation is presented for educational and historical research purposes only. Persons with cardiac conditions must consult a qualified physician.',
  },
  {
    slug: 'urinary-flow-support',
    name: 'Urinary Flow Support\u2122',
    tradeName: 'UFS-4',
    category: 'urological',
    tagline: 'Phytosterol-based urological support from the Northern European phytotherapy tradition.',
    historicalSource: 'European Phytotherapy & Regimen of Health',
    primaryScholar: 'European tradition / Maimonides',
    period: '12th\u201319th century CE',
    summary:
      'Urinary difficulties were among the most common complaints in medieval medicine. This formula draws primarily from Northern European phytotherapy (saw palmetto, nettle, pumpkin seed) while maintaining cross-civilisational recognition that urinary function requires active nutritional support. Saw palmetto (320 mg liposterolic extract) is the most studied prostate-support botanical.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Saw Palmetto Extract (CO\u2082)', amount: '320 mg', standardisation: '85\u201395% fatty acids', role: '5-alpha-reductase inhibition; prostatic anti-inflammatory', modernEquivalent: 'Serenoa repens \u2014 fatty acids, phytosterols' },
      { name: 'Pumpkin Seed Extract', amount: '300 mg', standardisation: 'std. fatty acids/sterols', role: 'Phytosterol-mediated 5-AR modulation', modernEquivalent: 'Cucurbita pepo \u2014 delta-7-sterols' },
      { name: 'Nettle Root Extract (5:1)', amount: '250 mg', role: 'SHBG modulation; aromatase inhibition', modernEquivalent: 'Urtica dioica \u2014 lignans, lectins' },
      { name: 'Beta-Sitosterol', amount: '60 mg', role: '5-AR inhibition; anti-inflammatory', modernEquivalent: 'Mixed plant sterols' },
      { name: 'Lycopene (tomato oleoresin)', amount: '10 mg', role: 'Prostate tissue-specific antioxidant', modernEquivalent: 'Solanum lycopersicum \u2014 all-trans-lycopene' },
      { name: 'Zinc (as zinc picolinate)', amount: '15 mg', role: 'Prostate cell apoptosis regulation', modernEquivalent: 'Zinc picolinate' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Cochrane review (Tacklind 2012): modest LUTS improvements with saw palmetto. Berges et al. (1995) Lancet RCT for beta-sitosterol. Intended for adult men. Changes in urinary habits should always be evaluated by a healthcare professional.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/urinary-flow-support.png',
    dossierUrl: '/dossiers/urinary-flow-support-dossier.pdf',
    disclaimer: 'Intended for adult men. Changes in urinary habits should always be evaluated by a healthcare professional. Not a substitute for medical evaluation.',
  },
  {
    slug: 'metabolic-resilience-support',
    name: 'Metabolic Resilience Support\u2122',
    tradeName: 'MRS-5',
    category: 'metabolic',
    tagline: 'AMPK-mediated metabolic sensing via the most-studied alkaloid in modern phytotherapy.',
    historicalSource: 'Canon of Medicine & Regimen of Health',
    historicalSourceArabic: '\u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0641\u064a \u0627\u0644\u0637\u0628',
    primaryScholar: 'Ibn S\u012bn\u0101 (Avicenna) / Maimonides',
    period: '11th\u201312th century CE',
    summary:
      'Berberis species were documented in Ibn S\u012bn\u0101\\\'s Canon of Medicine for cooling, astringent, and anti-inflammatory properties. The classical tradition described metabolic overload \u2014 failure to properly process dietary excess \u2014 as a primary concern of the physician. Berberine is a potent AMPK agonist supported by 54+ systematic reviews addressing metabolic markers.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Berberine HCl', amount: '500 mg', standardisation: '\u226597% from Berberis aristata', arabicName: '\u0628\u0631\u0628\u0631\u064a\u0633 (barbar\u012bs)', role: 'AMPK activation; gluconeogenesis suppression; fatty acid oxidation', modernEquivalent: 'Berberis aristata \u2014 berberine, palmatine' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Inhibits CYP3A4, CYP2D6, and P-glycoprotein \u2014 the broadest drug interaction profile in the Archevia system. Consult healthcare provider before use with ANY prescription medications. May support healthy blood glucose levels already within normal range. Do not combine with blood-sugar-lowering medications without physician supervision.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/metabolic-resilience-support.png',
    dossierUrl: '/dossiers/metabolic-resilience-support-dossier.pdf',
    disclaimer: 'Consult healthcare provider before use with any prescription medications. May support healthy blood glucose levels already within normal range. Not a substitute for medical supervision.',
  },
  {
    slug: 'cellular-vitality-complex',
    name: 'Cellular Vitality Complex\u2122',
    tradeName: 'CVC-6',
    category: 'longevity',
    tagline: 'NAD+ biosynthesis, mitochondrial electron transport, and PGC-1\u03b1 signaling for cellular energy.',
    historicalSource: 'Regimen of Health',
    historicalSourceHebrew: '\u05d4\u05e0\u05d4\u05d2\u05ea \u05d4\u05d1\u05e8\u05d9\u05d0\u05d5\u05ea',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE',
    summary:
      'Rambam identified innate heat (al-harara al-ghariziyya) and innate moisture (al-rutuba al-ghariziyya) as the fundamental determinants of vitality. Modern biology has identified these as mitochondrial ATP production and cellular membrane integrity. NMN raises NAD+, resveratrol activates pathways associated with caloric restriction in preclinical models (note: direct SIRT1 activation is debated \u2014 Howitz 2003 vs. Pacholec 2010), ubiquinol maintains mitochondrial electron transport, and PQQ stimulates mitochondrial biogenesis via PGC-1\u03b1.',
    serving: '3 Capsules',
    keyIngredients: [
      { name: 'Nicotinamide Mononucleotide (NMN)', amount: '250 mg', standardisation: '\u226599%', role: 'NAD+ biosynthesis; sirtuin activation', modernEquivalent: 'Beta-NMN' },
      { name: 'Coenzyme Q10 (Ubiquinol)', amount: '100 mg', role: 'Mitochondrial electron transport; membrane antioxidant', modernEquivalent: 'Reduced CoQ10 (QH2)' },
      { name: 'Trans-Resveratrol', amount: '150 mg', standardisation: '\u226598%', role: 'AMPK activation; indirect SIRT1 engagement', modernEquivalent: 'Polygonum cuspidatum / Vitis vinifera' },
      { name: 'PQQ Disodium Salt', amount: '10 mg', role: 'Mitochondrial biogenesis via PGC-1\u03b1', modernEquivalent: 'Pyrroloquinoline quinone' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Systematic review of 12 RCTs confirms NMN significantly elevates blood NAD+. Q-SYMBIO trial (Mortensen 2014): CoQ10 supports cardiovascular function. Ubiquinol particularly relevant for individuals on statin medications. Resveratrol has mild CYP3A4 activity.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/cellular-vitality-complex.png',
    dossierUrl: '/dossiers/cellular-vitality-complex-dossier.pdf',
    disclaimer: 'Resveratrol has mild CYP3A4 activity. Ubiquinol may reduce warfarin efficacy. Consult physician before use.',
  },
  {
    slug: 'cognitive-vitality-complex',
    name: 'Cognitive Vitality Complex\u2122',
    tradeName: 'CVC-7',
    category: 'cognitive',
    tagline: 'NGF biosynthesis, synaptic plasticity, and the mood-cognition interface from four continents of scholarship.',
    historicalSource: 'Kit\u0101b al-Tays\u012br & Regimen of Health',
    historicalSourceArabic: '\u0643\u062a\u0627\u0628 \u0627\u0644\u062a\u064a\u0633\u064a\u0631 \u0641\u064a \u0627\u0644\u0645\u062f\u0627\u0648\u0627\u0629 \u0648\u0627\u0644\u062a\u062f\u0628\u064a\u0631',
    primaryScholar: 'Ibn Zuhr (Avenzoar) / Maimonides',
    period: '12th century CE',
    summary:
      'Rambam prescribed saffron (za\\\'faran) specifically for strengthening the brain and clarifying the mind. Bacopa (Brahmi) has been used in Ayurvedic medicine for over three thousand years as a medhya rasayana (brain tonic). Lion\\\'s Mane erinacines are the only known dietary compound to stimulate NGF biosynthesis. Saffron crocin/safranal supports the mood-cognition interface via serotonin and BDNF pathways.',
    serving: '3 Capsules',
    keyIngredients: [
      { name: 'Lion\\\'s Mane Extract (fruiting body)', amount: '1,000 mg', standardisation: '30% beta-glucans', role: 'NGF synthesis stimulation; myelin support', modernEquivalent: 'Hericium erinaceus \u2014 hericenones, erinacines' },
      { name: 'Bacopa monnieri Extract', amount: '300 mg', standardisation: '\u226550% bacosides', arabicName: '\u0628\u0631\u0627\u0647\u0645\u064a (br\u0101hm\u012b)', role: 'Synaptic plasticity; memory consolidation', modernEquivalent: 'Bacopa monnieri \u2014 bacosides A & B' },
      { name: 'Phosphatidylserine (sunflower)', amount: '100 mg', role: 'Neuronal membrane fluidity; cortisol modulation', modernEquivalent: 'Phosphatidylserine (FDA qualified health claim)' },
      { name: 'Saffron Extract', amount: '30 mg', standardisation: '\u22653.5% lepticrosalides', arabicName: '\u0632\u0639\u0641\u0631\u0627\u0646 (za\u02bffar\u0101n)', hebrewName: '\u05db\u05e8\u05db\u05d5\u05dd', role: 'Serotonin reuptake modulation; BDNF expression', modernEquivalent: 'Crocus sativus \u2014 crocin, safranal' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Kongkeaw et al. (2014) meta-analysis of 9 RCTs: significant Bacopa cognitive improvements. Hausenblas et al. (2013) meta-analysis: saffron supports healthy mood. Cleanest interaction profile in the system \u2014 no CYP3A4 inhibitors, no antiplatelet agents. Effects typically require 8\u201312 weeks continuous use.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/cognitive-vitality-complex.png',
    dossierUrl: '/dossiers/cognitive-vitality-complex-dossier.pdf',
    disclaimer: 'Bacopa may have additive effects with cholinergic medications. Saffron has mild serotonergic activity \u2014 use caution with SSRIs. Consult a healthcare professional before use.',
  },
];

export function getFormulationBySlug(slug: string): Formulation | undefined {
  return formulations.find((f) => f.slug === slug);
}

export function getFormulationsByCategory(category: Formulation['category']): Formulation[] {
  return formulations.filter((f) => f.category === category);
}
