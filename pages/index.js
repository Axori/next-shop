import Head from 'next/head'
import Link from 'next/Link'
import Title from "@/components/Title";
import {getProducts} from "@/lib/products";

// This function it gets called during building the application
export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
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
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`products/${product.id}`}>
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
