import Head from "next/head";
import Title from "@/components/Title";
import NavBar from "@/components/NavBar";

const Page = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <header>
        <NavBar/>
      </header>
      <main className="py-4 px-6">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  )
}

export default Page