import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import PriceHistoryChart from "@/components/historychart";
import { getProductById, getProductStats, getProductsearch, getSimilarProducts } from "@/lib/actions"
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string }
}

 export async function GenerateMetadata({params : {id}}:Props) : Promise<Metadata> {
   const product = await getProductsearch(id);

   return {
       title: `${product!.nombre} - ${product!.lugar}`,
       description: `Pagina del producto ${product!.nombre}`,
     
  }
 }



// export async function generateStaticParams() {
//   return [
//       {
//           params : { id }
//       }
//   ]
// }



const ProductDetails = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);
  const productcontext = await getProductsearch(id);
  const productStats = await getProductStats(product); 
  

  if(!product) redirect('/')

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image 
            src={productcontext!.photo}
            alt={productcontext!.nombre}
            width={290} // 580 / 2
            height={200} // 400 / 2
            className="mx-auto"

          />
          <PriceHistoryChart historyData={product} />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {productcontext!.nombre}
              </p>

              <Link
                href={productcontext!.urlproducto}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visitar Producto
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image 
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">
                  {productcontext!.lugar}
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image 
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10">
        
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://preciosecuador.tech')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Image 
                    src="/assets/icons/share.svg"
                    alt="share"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                $ {formatNumber(productStats.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                $ {formatNumber(productStats.averagePrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image 
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  {/* <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || '25'}
                  </p> */}
                </div>

                <div className="product-reviews">
                  <Image 
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  {/* <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p> */}
                </div>
              </div>

              {/* <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93% </span> of
                buyers have recommeded this.
              </p> */}
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard 
                title="Precio Actual"
                iconSrc="/assets/icons/price-tag.svg"
                value={`$ ${formatNumber(productStats.currentPrice)}`}
              />
              <PriceInfoCard 
                title="Precio Promedio"
                iconSrc="/assets/icons/chart.svg"
                value={`$ ${formatNumber(productStats.averagePrice)}`}
              />
              <PriceInfoCard 
                title="Precio mas alto"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`$ ${formatNumber(productStats.highestPrice)}`}
              />
              <PriceInfoCard 
                title="Precio mas bajo"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`$ ${formatNumber(productStats.lowestPrice)}`}
              />
            </div>
          </div>

          {/* <Modal productId={id} /> */}
        </div>
      </div>


      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Productos Similares</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails