import Head from "next/head";
import Title from "@/components/Title";

const Page = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <main className="py-4 px-6">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  )
}

export default Page