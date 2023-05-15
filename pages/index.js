import Head from 'next/head'
import Title from "@/components/Title";
import {useState} from "react";
import {getProducts} from "@/lib/products";

// This function it gets callend during building the application
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
    revalidate: 5 * 60, // seconds
  }
}

// to make our application refetch data on every page load we need to use getServerSideProps
// server side fetch passed as a props to component!!
// export async function getServerSideProps() {
//   const products = await getProducts();
//   return {
//     props: {
//       products,
//     },
//   }
// }

export default function Home() {
  const [products, setProducts] = useState([]);

  // fetching CMS directly
  // useEffect(() => {
  //   getProducts().then(setProducts);
  // }, [])
  // fetching api trough proxy defined in api/products.js
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("/api/products");
  //     const products = await res.json();
  //     setProducts(products);
  //   })();
  // }, [])

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
                  {product.title}
                </li>
            ))}
          </ul>
        </main>
      </>
  )
}
