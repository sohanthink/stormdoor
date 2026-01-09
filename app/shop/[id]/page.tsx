import { notFound } from "next/navigation";
import ProductDetail from "../components/ProductDetail";
import { getProductById } from "../data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

