// proxy between our CMS and the client so location of our server is not exposed
// we need to use it when fetching on client side
import {getProducts} from "@/lib/products";

export default async function handler(req, res) {
  try {
    const products = await getProducts()
    res.status(200).json(products)
  } catch (e) {
    res.status(500).json("Error fetching products")
  }
}
