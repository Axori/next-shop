import Image from "next/image";
import {getProduct, getProducts} from "@/lib/products";
import {ApiError} from "@/lib/api";
import Page from "@/components/Page";

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
  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row ">
        <div><Image src={product.image} alt={product.title} width={640} height={480}/></div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
        </div>
      </div>

    </Page>)
};

export default Product;