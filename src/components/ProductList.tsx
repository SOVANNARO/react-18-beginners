import { useEffect, useState } from "react";

function ProductList({ category }: { category: string }) {
  const [_product, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching products...", category);
    setProducts(["Product 1", "Product 2", "Product 3"]);
  }, [category]);

  return (
    <div>
      <h2>Product List</h2>
    </div>
  );
}

export default ProductList;
