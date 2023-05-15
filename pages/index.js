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
    // server side fetching will fetch the data only during the build time!!
    // so it is NOT refetched on every page load !!! to mitigate that we need
    // revalidate: 60seconds means that the page will be revalidated every 60 seconds
    // this is called ISR
    revalidate: 30, // seconds
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
