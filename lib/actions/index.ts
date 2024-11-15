"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { Product, User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";




// export async function scrapeAndStoreProduct(productUrl: string) {
// //   if(!productUrl) return;

//   try {
//     connectToDB();

//     const scrapedProduct = await scrapeAmazonProduct(productUrl);

//     if(!scrapedProduct) return;

//     let product = scrapedProduct;

//     const existingProduct = await Product.findOne({ url: scrapedProduct.url });

//     if(existingProduct) {
//       const updatedPriceHistory: any = [
//         ...existingProduct.priceHistory,
//         { price: scrapedProduct.currentPrice }
//       ]

//       product = {
//         ...scrapedProduct,
//         priceHistory: updatedPriceHistory,
//         lowestPrice: getLowestPrice(updatedPriceHistory),
//         highestPrice: getHighestPrice(updatedPriceHistory),
//         averagePrice: getAveragePrice(updatedPriceHistory),
//       }
//     }

//     const newProduct = await Product.findOneAndUpdate(
//       { url: scrapedProduct.url },
//       product,
//       { upsert: true, new: true }
//     );

//     revalidatePath(`/products/${newProduct._id}`);
//   } catch (error: any) {
//     throw new Error(`Failed to create/update product: ${error.message}`)
//   }
// }

// export async function getProductById(productId: string) {
//   try {
//     connectToDB();

//     const product = await Product.findOne({ _id: productId });

//     if(!product) return null;

//     return product;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getProductById(productId: string) {
  const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/productos/${productId}/historial-precios`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;


}

export async function getProductStats(productData: { fecha: string; precio: number }[]) {
 

  const priceStats = calculatePriceStats(productData);
 // console.log(priceStats);

  return priceStats;
}

function calculatePriceStats(historyData: { fecha: string; precio: number }[]) {
  if (historyData.length === 0) {
    return {
      currentPrice: 0,
      averagePrice: 0,
      highestPrice: 0,
      lowestPrice: 0
    };
  }

  const prices = historyData.map(d => parseFloat(d.precio.toString()));

  const currentPrice = prices[prices.length - 1]; // Último precio en el historial
  const averagePrice = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);



  return {
    currentPrice,
    averagePrice,
    highestPrice,
    lowestPrice
  };
}

export async function getDataGrafica ()  {
  try {
    const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/productos/grafica`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }

}

export async function getAllProducts(page: number = 1) {
  try {
    const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/productos?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();


    return data;

  } catch (error) {
    console.log(error);
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/productos/categoria/${category}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/productos/similares/${productId}`); 

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
//  console.log(data);

  return data;
}

export async function getProductsearch(productId: string) {
  const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/producto/${productId}`); 

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  //console.log(data);

  return data;
}

export async function getHistroyData (prouctId: string)
{
  const response = await fetch(`https://ecuaprecios-api-production.up.railway.app/api/productos/${prouctId}/historial-precios`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  //console.log(data);

  return data;
}


// export async function getSimilarProducts(productId: string) {
//   try {
//     connectToDB();

//     const currentProduct = await Product.findById(productId);

//     if(!currentProduct) return null;

//     const similarProducts = await Product.find({
//       _id: { $ne: productId },
//     }).limit(3);

//     return similarProducts;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function addUserEmailToProduct(productId: string, userEmail: string) {
//   try {
//     const product = await Product.findById(productId);

//     if(!product) return;

//     const userExists = product.users.some((user: User) => user.email === userEmail);

//     if(!userExists) {
//       product.users.push({ email: userEmail });

//       await product.save();

//       const emailContent = await generateEmailBody(product, "WELCOME");

//       await sendEmail(emailContent, [userEmail]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }