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

            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-snug">
  Análisis del Mercado E-Commerce
</h1>
<p className="text-lg text-gray-600 mb-6">
  Creando un dataset apartir de precios en el mercado actual, enfocándonos en cómo 
  el incremento del IVA, el alza de la gasolina y la inflación afectan a diversos productos. 
  Este análisis contribuirá a modelos de machine learning que permitirán predecir tendencias 
  y ajustar estrategias según las variables económicas.
</p>

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
