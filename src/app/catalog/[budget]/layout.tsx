export default function CatalogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { budget: string };
}) {
  return <>{children}</>;
}
