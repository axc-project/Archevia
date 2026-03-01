import type { Metadata } from 'next';
import PathwayExplorer from './PathwayExplorer';

export const metadata: Metadata = {
  title: 'Pathway Explorer',
  description:
    'Searchable database of interventions, molecular pathways, and evidence grades from Cancer Across Time and Civilizations. Educational reference for researchers and clinicians.',
};

export default function PathwaysPage() {
  return <PathwayExplorer />;
}
