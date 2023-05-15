import Head from "next/head";
import Title from "@/components/Title";
import {getProduct, getProducts} from "@/lib/products";

export async function getStaticPaths() {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: {id: product.id.toString()}
    })),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const product = await getProduct(params.id)

  return {
    props: {
      product
    }
  }
}

const Product = ({product}) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="p-2">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  );
};

export default Product;