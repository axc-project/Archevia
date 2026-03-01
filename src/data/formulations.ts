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
    name: 'Digestive Metabolic Core™',
    tradeName: 'DMC-1',
    category: 'digestive',
    tagline: 'Daily digestive comfort — eases bloating, supports gut health, and promotes steady metabolism.',
    historicalSource: 'Regimen of Health (Hanhagat HaBriut)',
    historicalSourceHebrew: 'הנהגת הבריאות',
    historicalSourceArabic: 'تدبير الصحة',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE — Cairo, Egypt',
    summary:
      'This formulation draws on the dietetic and pharmacognostic principles laid out by Maimonides in his Regimen of Health, composed for Sultan al-Afdal circa 1198 CE. The text systematically addresses gastric temperament, humoral balance, and the role of aromatic botanicals in supporting digestive fire (al-harara al-ghariziyya). Modern phytochemical analysis reveals strong mechanistic alignment with contemporary GI research including smooth muscle relaxation, bile flow stimulation, and gastroprokinetic support.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Coriander Seed Extract (10:1)', amount: '250 mg', arabicName: 'كزبرة (kuzbara)', hebrewName: 'כוסברה', role: 'Cooling digestive; anti-flatulent', modernEquivalent: 'Coriandrum sativum — linalool, geraniol' },
      { name: 'Fennel Seed Extract (10:1)', amount: '200 mg', arabicName: 'شمار (shammār)', hebrewName: 'שומר', role: 'Spasmolytic; promotes gastric motility', modernEquivalent: 'Foeniculum vulgare — trans-anethole' },
      { name: 'Artichoke Leaf Extract', amount: '200 mg', standardisation: '2.5% cynarin', role: 'Bitter hepatic tonic; bile flow stimulation', modernEquivalent: 'Cynara scolymus — cynarin, chlorogenic acid' },
      { name: 'Ginger Root Extract', amount: '150 mg', standardisation: '5% gingerols', arabicName: 'زنجبيل (zanjabīl)', hebrewName: 'זנגביל', role: 'Thermogenic digestive stimulant; anti-emetic', modernEquivalent: 'Zingiber officinale — gingerols, shogaols' },
      { name: 'Peppermint Leaf Extract (4:1)', amount: '150 mg', role: 'GI smooth muscle relaxation', modernEquivalent: 'Mentha x piperita — menthol' },
      { name: 'Black Pepper Extract (BioPerine®)', amount: '5 mg', standardisation: '95% piperine', role: 'Bioavailability enhancer', modernEquivalent: 'Piper nigrum — piperine' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Preclinical and early-phase clinical evidence supports the anti-inflammatory, prokinetic, and mucosal-protective activities of the component botanicals. Cochrane-reviewed evidence exists for peppermint oil in supporting gastrointestinal comfort (NNT ≈3) and ginger for supporting normal digestive function.',
    researchStatus: 'in-progress',
    image: '/images/formulas/digestive-metabolic-core.png',
    dossierUrl: '/dossiers/digestive-metabolic-core-dossier.pdf',
    disclaimer: 'This formulation is presented for educational and historical research purposes only. Statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    slug: 'cellular-resilience-complex',
    name: 'Cellular Resilience Complex™',
    tradeName: 'CRC-2',
    category: 'botanical',
    tagline: 'Whole-body cellular defense — supports your immune system, healthy inflammation balance, and antioxidant protection.',
    historicalSource: 'Regimen of Health & Canon of Medicine',
    historicalSourceArabic: 'تدبير الصحة / القانون في الطب',
    primaryScholar: 'Maimonides / Ibn Sīnā',
    period: '11th–12th century CE',
    summary:
      'This formula targets three core signaling axes: Nrf2 activation via broccoli sprout sulforaphane, NF-κB modulation via curcumin phytosome, and beta-glucan immune modulation via Turkey Tail PSK/PSP. Vitamin D3 regulates immune cell differentiation via VDR expression. Note: the term kurkum in Ibn Sīnā\\\'s Canon can refer to both turmeric and saffron depending on context — careful textual analysis is required.',
    serving: '3 Capsules',
    keyIngredients: [
      { name: 'Vitamin D3 (Cholecalciferol)', amount: '2,000 IU (50 mcg)', role: 'Immune cell differentiation via VDR', modernEquivalent: 'Cholecalciferol' },
      { name: 'Broccoli Sprout Extract', amount: '300 mg', standardisation: 'min. 10% glucoraphanin', role: 'Nrf2 activation; Phase II enzyme upregulation', modernEquivalent: 'Brassica oleracea — sulforaphane' },
      { name: 'Turkey Tail Extract', amount: '1,000 mg', standardisation: '30% polysaccharides', role: 'Innate immune modulation; NK cell enhancement', modernEquivalent: 'Trametes versicolor — PSK, PSP, beta-glucans' },
      { name: 'Curcumin Phytosome (Meriva-type)', amount: '250 mg', role: 'NF-κB inhibition; anti-inflammatory', modernEquivalent: 'Curcuma longa — curcumin (29x improved bioavailability)' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Meta-analysis of 13 RCTs supports Turkey Tail PSK for immune system support alongside standard care. Curcumin inhibits CYP3A4 — significant drug interaction potential. Consult physician if on narrow-therapeutic-index drugs or undergoing medical treatment.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/cellular-resilience-complex.png',
    dossierUrl: '/dossiers/cellular-resilience-complex-dossier.pdf',
    disclaimer: 'This formulation is presented for educational and historical research purposes only. Statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    slug: 'circulatory-vitality-core',
    name: 'Circulatory Vitality Core™',
    tradeName: 'CVC-3',
    category: 'cardiovascular',
    tagline: 'Heart and circulation support — promotes healthy blood pressure, blood flow, and cardiovascular wellness.',
    historicalSource: 'Maqāla fī Bayān Baʿd al-Aʻrād',
    historicalSourceArabic: 'مقالة في بيان بعض الأعراض والجواب عنها',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE — Fustat (Old Cairo), Egypt',
    summary:
      'Composed as a private treatise for the Ayyubid court, the Maimonidean source text presents the most detailed pre-modern account of cardiovascular tonic therapy in the Judeo-Arabic tradition. Olive leaf oleuropein and grape seed OPCs support nitric oxide bioavailability and endothelial function. Hawthorn has Cochrane-reviewed evidence for supporting cardiovascular function (Pittler 2008, 14 RCTs). Pomegranate punicalagins are metabolised to urolithins supporting healthy cellular recycling processes.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Olive Leaf Extract', amount: '300 mg', standardisation: '20% oleuropein', role: 'eNOS upregulation; NO bioavailability', modernEquivalent: 'Olea europaea — oleuropein, hydroxytyrosol' },
      { name: 'Hawthorn Extract', amount: '300 mg', standardisation: '18.75% OPCs', arabicName: 'زعرور (zaʿrūr)', role: 'Positive inotrope; coronary vasodilator', modernEquivalent: 'Crataegus monogyna — OPCs, vitexin' },
      { name: 'Pomegranate Extract', amount: '250 mg', standardisation: '40% ellagic acid', arabicName: 'رمان (rummān)', hebrewName: 'רימון', role: 'Urolithin A → mitophagy; eNOS activation', modernEquivalent: 'Punica granatum — punicalagins, ellagic acid' },
      { name: 'Aged Garlic Extract', amount: '150 mg', standardisation: '1.2% SAC', arabicName: 'ثوم (thawm)', role: 'Vascular antioxidant; mild antiplatelet', modernEquivalent: 'Allium sativum — S-allyl cysteine' },
      { name: 'Grape Seed Extract', amount: '150 mg', standardisation: '95% OPCs', role: 'OPC-mediated eNOS activation; LDL oxidation inhibition', modernEquivalent: 'Vitis vinifera — OPCs, catechins' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Strong Cochrane-reviewed evidence for hawthorn in supporting cardiovascular function (Pittler 2008, 14 RCTs). Pomegranate inhibits CYP3A4 (similar to grapefruit). Aged garlic and grape seed have mild antiplatelet activity — discontinue 7–10 days before surgery.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/circulatory-vitality-core.png',
    dossierUrl: '/dossiers/circulatory-vitality-core-dossier.pdf',
    disclaimer: 'This formulation is presented for educational and historical research purposes only. Persons with cardiac conditions must consult a qualified physician.',
  },
  {
    slug: 'urinary-flow-support',
    name: 'Urinary Flow Support™',
    tradeName: 'UFS-4',
    category: 'urological',
    tagline: 'Prostate and urinary comfort — supports healthy urinary flow and nighttime frequency.',
    historicalSource: 'European Phytotherapy & Regimen of Health',
    primaryScholar: 'European tradition / Maimonides',
    period: '12th–19th century CE',
    summary:
      'Urinary difficulties were among the most common complaints in medieval medicine. This formula draws primarily from Northern European phytotherapy (saw palmetto, nettle, pumpkin seed) while maintaining cross-civilisational recognition that urinary function requires active nutritional support. Saw palmetto (320 mg liposterolic extract) is the most studied prostate-support botanical.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Saw Palmetto Extract (CO₂)', amount: '320 mg', standardisation: '85–95% fatty acids', role: '5-alpha-reductase inhibition; prostatic anti-inflammatory', modernEquivalent: 'Serenoa repens — fatty acids, phytosterols' },
      { name: 'Pumpkin Seed Extract', amount: '300 mg', standardisation: 'std. fatty acids/sterols', role: 'Phytosterol-mediated 5-AR modulation', modernEquivalent: 'Cucurbita pepo — delta-7-sterols' },
      { name: 'Nettle Root Extract (5:1)', amount: '250 mg', role: 'SHBG modulation; aromatase inhibition', modernEquivalent: 'Urtica dioica — lignans, lectins' },
      { name: 'Beta-Sitosterol', amount: '60 mg', role: '5-AR inhibition; anti-inflammatory', modernEquivalent: 'Mixed plant sterols' },
      { name: 'Lycopene (tomato oleoresin)', amount: '10 mg', role: 'Prostate tissue-specific antioxidant', modernEquivalent: 'Solanum lycopersicum — all-trans-lycopene' },
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
    name: 'Metabolic Resilience Support™',
    tradeName: 'MRS-5',
    category: 'metabolic',
    tagline: 'Blood sugar and metabolic balance — supports healthy glucose levels, energy regulation, and metabolic flexibility.',
    historicalSource: 'Canon of Medicine & Regimen of Health',
    historicalSourceArabic: 'القانون في الطب',
    primaryScholar: 'Ibn Sīnā (Avicenna) / Maimonides',
    period: '11th–12th century CE',
    summary:
      'Berberis species were documented in Ibn Sīnā\\\'s Canon of Medicine for cooling, astringent, and anti-inflammatory properties. The classical tradition described metabolic overload — failure to properly process dietary excess — as a primary concern of the physician. Berberine is a potent AMPK agonist supported by 54+ systematic reviews addressing metabolic markers.',
    serving: '2 Capsules',
    keyIngredients: [
      { name: 'Berberine HCl', amount: '500 mg', standardisation: '≥97% from Berberis aristata', arabicName: 'بربريس (barbarīs)', role: 'AMPK activation; gluconeogenesis suppression; fatty acid oxidation', modernEquivalent: 'Berberis aristata — berberine, palmatine' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Inhibits CYP3A4, CYP2D6, and P-glycoprotein — the broadest drug interaction profile in the Archevia system. Consult healthcare provider before use with ANY prescription medications. May support healthy blood glucose levels already within normal range. Do not combine with blood-sugar-lowering medications without physician supervision.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/metabolic-resilience-support.png',
    dossierUrl: '/dossiers/metabolic-resilience-support-dossier.pdf',
    disclaimer: 'Consult healthcare provider before use with any prescription medications. May support healthy blood glucose levels already within normal range. Not a substitute for medical supervision.',
  },
  {
    slug: 'cellular-vitality-complex',
    name: 'Cellular Vitality Complex™',
    tradeName: 'CVC-6',
    category: 'longevity',
    tagline: 'Cellular energy and healthy aging — supports mitochondrial function, NAD+ levels, and long-term vitality.',
    historicalSource: 'Regimen of Health',
    historicalSourceHebrew: 'הנהגת הבריאות',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE',
    summary:
      'Rambam identified innate heat (al-harara al-ghariziyya) and innate moisture (al-rutuba al-ghariziyya) as the fundamental determinants of vitality. Modern biology has identified these as mitochondrial ATP production and cellular membrane integrity. NMN raises NAD+, resveratrol activates pathways associated with caloric restriction in preclinical models (note: direct SIRT1 activation is debated — Howitz 2003 vs. Pacholec 2010), ubiquinol maintains mitochondrial electron transport, and PQQ stimulates mitochondrial biogenesis via PGC-1α.',
    serving: '3 Capsules',
    keyIngredients: [
      { name: 'Nicotinamide Mononucleotide (NMN)', amount: '250 mg', standardisation: '≥99%', role: 'NAD+ biosynthesis; sirtuin activation', modernEquivalent: 'Beta-NMN' },
      { name: 'Coenzyme Q10 (Ubiquinol)', amount: '100 mg', role: 'Mitochondrial electron transport; membrane antioxidant', modernEquivalent: 'Reduced CoQ10 (QH2)' },
      { name: 'Trans-Resveratrol', amount: '150 mg', standardisation: '≥98%', role: 'AMPK activation; indirect SIRT1 engagement', modernEquivalent: 'Polygonum cuspidatum / Vitis vinifera' },
      { name: 'PQQ Disodium Salt', amount: '10 mg', role: 'Mitochondrial biogenesis via PGC-1α', modernEquivalent: 'Pyrroloquinoline quinone' },
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
    name: 'Cognitive Vitality Complex™',
    tradeName: 'CVC-7',
    category: 'cognitive',
    tagline: 'Brain health and mental clarity — supports memory, focus, mood balance, and cognitive wellness.',
    historicalSource: 'Kitāb al-Taysīr & Regimen of Health',
    historicalSourceArabic: 'كتاب التيسير في المداواة والتدبير',
    primaryScholar: 'Ibn Zuhr (Avenzoar) / Maimonides',
    period: '12th century CE',
    summary:
      'Rambam prescribed saffron (za\\\'faran) specifically for strengthening the brain and clarifying the mind. Bacopa (Brahmi) has been used in Ayurvedic medicine for over three thousand years as a medhya rasayana (brain tonic). Lion\\\'s Mane erinacines are the only known dietary compound to stimulate NGF biosynthesis. Saffron crocin/safranal supports the mood-cognition interface via serotonin and BDNF pathways.',
    serving: '3 Capsules',
    keyIngredients: [
      { name: 'Lion\\\'s Mane Extract (fruiting body)', amount: '1,000 mg', standardisation: '30% beta-glucans', role: 'NGF synthesis stimulation; myelin support', modernEquivalent: 'Hericium erinaceus — hericenones, erinacines' },
      { name: 'Bacopa monnieri Extract', amount: '300 mg', standardisation: '≥50% bacosides', arabicName: 'براهمي (brāhmī)', role: 'Synaptic plasticity; memory consolidation', modernEquivalent: 'Bacopa monnieri — bacosides A & B' },
      { name: 'Phosphatidylserine (sunflower)', amount: '100 mg', role: 'Neuronal membrane fluidity; cortisol modulation', modernEquivalent: 'Phosphatidylserine (FDA qualified health claim)' },
      { name: 'Saffron Extract', amount: '30 mg', standardisation: '≥3.5% lepticrosalides', arabicName: 'زعفران (zaʿfarān)', hebrewName: 'כרכום', role: 'Serotonin reuptake modulation; BDNF expression', modernEquivalent: 'Crocus sativus — crocin, safranal' },
    ],
    otherIngredients: 'Vegetable cellulose (HPMC capsule), microcrystalline cellulose.',
    clinicalNotes: 'Kongkeaw et al. (2014) meta-analysis of 9 RCTs: significant Bacopa cognitive improvements. Hausenblas et al. (2013) meta-analysis: saffron supports healthy mood. Cleanest interaction profile in the system — no CYP3A4 inhibitors, no antiplatelet agents. Effects typically require 8–12 weeks continuous use.',
    researchStatus: 'peer-reviewed',
    image: '/images/formulas/cognitive-vitality-complex.png',
    dossierUrl: '/dossiers/cognitive-vitality-complex-dossier.pdf',
    disclaimer: 'Bacopa may have additive effects with cholinergic medications. Saffron has mild serotonergic activity — use caution with SSRIs. Consult a healthcare professional before use.',
  },
];

export function getFormulationBySlug(slug: string): Formulation | undefined {
  return formulations.find((f) => f.slug === slug);
}

export function getFormulationsByCategory(category: Formulation['category']): Formulation[] {
  return formulations.filter((f) => f.category === category);
}
