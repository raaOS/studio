import { CartProvider } from '@/contexts/CartContext';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
