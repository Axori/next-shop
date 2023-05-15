import {fetcher} from "@/lib/api";

const CMS_URL = "http://localhost:1337";

export async function getProducts() {
  const products = await fetcher(CMS_URL + "/products");
  return products.map(stripProduct);
}

export async function getProduct(id) {
  const product = await fetcher(`${CMS_URL}/products/${id}`)
  return stripProduct(product);
}


function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
  };
}