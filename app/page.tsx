import HeroCarousel from "@/components/HeroCarousel"
import Image from "next/image"
import { getAllProducts, getDataGrafica } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"
import { useState } from 'react';
import ChartGlobal from "@/components/chartglobal";
import PriceHistoryGlobal from "@/components/chartglobal";

const Home = async () => {
  const allProducts = await getAllProducts();
  const datagrafica = await getDataGrafica();
  

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center"> 
            <p className="small-text">
            Análisis de precios ecommerce a lo largo del año 
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="hero-title">
            Análisis de todos los productos en el mercado actual ecommerce
            </h1>
            {/* <PriceHistoryGlobal data={datagrafica} selectedCategory="Celulares" /> */}

          </div>
            <HeroCarousel data={datagrafica} /> 
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Tendencia</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
  {allProducts?.data.map((product: any) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
      </section>
    </>
  )
}

export default Home
