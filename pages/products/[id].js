import Head from "next/head";
import Title from "@/components/Title";
import {getProduct, getProducts} from "@/lib/products";
import {ApiError} from "@/lib/api";

export async function getStaticPaths() {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: {id: product.id.toString()}
    })),
    fallback: "blocking",
  }
}

export async function getStaticProps({params}) {
  try {
    const product = await getProduct(params.id)
    return {
      props: {
        product
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds

    }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      // flag from nextJS
      return {notFound: true};
    }

    throw e;
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