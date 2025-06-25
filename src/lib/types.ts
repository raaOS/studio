export type BudgetItem = {
  id: 'kaki-lima' | 'umkm' | 'e-comm';
  title: string;
  description: string;
  priceRange: string;
  icon: React.ElementType;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  image: string;
  budgets: Array<BudgetItem['id']>;
  category: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brief: string;
  image: string;
};

export type Customer = {
  name: string;
  phone: string;
  telegram: string;
};
