import {getProducts} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Page from "@/components/Page";

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
    <Page title="Indoor Plants">
      <ul className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product}/>
          </li>
        ))}
      </ul>
    </Page>
  )
}
