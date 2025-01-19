import { Award, Coins, Store, Eye, List, HelpingHand, Leaf } from 'lucide-react';

export const data = [
  { name: 'Vocal for Local', icon: <Store /> },
  { name: 'Support Local Farmers', icon: <HelpingHand /> },
  { name: 'Natural and Organic', icon: <Leaf /> }
];

export const features = [
  {
    title: 'Product Quality',
    description:
      'Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh',
    icon: <Award />
  },
  {
    title: 'Cost Efficient',
    description:
      'Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh',
    icon: <Coins />
  },
  {
    title: 'Transparency',
    description:
      'Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh',
    icon: <Eye />
  },
  {
    title: 'Product Variety',
    description:
      'Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh',
    icon: <List />
  }
];
