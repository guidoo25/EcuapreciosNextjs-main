import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/actions";
import { Product } from "@/types";
import { get } from "http";
import { Metadata } from "next";

interface Props {
    params : { categoria: string }
    }


const ProductCategory = async ({ params: { categoria } }: Props) => {  
    const productlist = await getProductsByCategory(categoria);
    console.log(productlist);


    return (


        <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-16 mt-16 md:mt-24 lg:mt-32">
            {productlist?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductCategory