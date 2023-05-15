function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
  };
}

export async function getProducts() {
  const products = await fetch("http://localhost:1337/products")
  .then((res) => res.json());
  return products.map(stripProduct);
}
