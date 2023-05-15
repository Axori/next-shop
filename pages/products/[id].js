import Head from "next/head";
import Image from "next/image";
import Title from "@/components/Title";
import {getProduct, getProducts} from "@/lib/products";
import {ApiError} from "@/lib/api";

export async function getStaticPaths() {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: {id: product.id.toString()}
    })), fallback: "blocking",
  }
}

export async function getStaticProps({params}) {
  try {
    const product = await getProduct(params.id)
    return {
      props: {
        product
      }, revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds

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
  return (<>
    <Head>
      <title>Next Shop</title>
    </Head>
    <main className="py-4 px-6">
      <Title>{product.title}</Title>

      <div className="flex flex-col lg:flex-row ">

        <div><Image src={product.image} alt={product.title} width={640} height={480}/></div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
        </div>
      </div>
    </main>
  </>);
};

export default Product;