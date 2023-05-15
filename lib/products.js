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

export async function getProduct(id) {
  const product = await fetch(`http://localhost:1337/products/${id}`)
    .then((res) => res.json());
  return stripProductDetails(product);
}


function stripProductDetails(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
  };
}