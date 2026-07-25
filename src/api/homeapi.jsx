
import { axiosInstance } from "../../public/config/axiosInstance";


export const getAllCategories = async () => {
  try {
   
    const { data: categories } = await axiosInstance.get(
      "https://dummyjson.com/products/categories"
    );

    
    const result = await Promise.all(
      categories.map(async (category) => {
        const { data } = await axiosInstance.get(
          `https://dummyjson.com/products/category/${category.slug}?limit=1`
        );

        return {
          ...category,
          cat_image: data.products[0]?.images[0] || data.products[0]?.thumbnail,
        };
      })
    );

    return result;
  } catch (e) {
    console.error("Error in API:", e);
    return [];
  }
};

export const getTopRatedProducts = async () => {
  try {
    const { data } = await axiosInstance.get(
      "https://dummyjson.com/products?limit=10"
    );

    return data.products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  } catch (e) {
    console.log("Error:", e);
    return [];
  }
};

export const getNewArrivals = async () => {
  try {
    const { data } = await axiosInstance.get(
      "https://dummyjson.com/products?limit=200"
    );

    return data.products
      .sort((a, b) => b.id - a.id)
      .slice(0, 8);
  } catch (e) {
    console.log("Error:", e);
    return [];
  }
};