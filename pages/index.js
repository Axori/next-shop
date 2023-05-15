import Head from 'next/head'
import Title from "@/components/Title";
import {getProducts} from "@/lib/products";
import ProductCard from "@/components/ProductCard";

// This function it gets called during building the application
export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),// seconds
  }
}

export default function Home({products}) {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="p-2">
        <Title>Next Shop</Title>
        <ul className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product}/>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
