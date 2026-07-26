import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Plus, Minus } from "lucide-react";
import Loading from "../components/Loading";
import { axiosInstance } from "../../public/config/axiosInstance";
import useUserData from "../Hooks/useUserData";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cartItems, incrementQty, decrementQty } = useUserData();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axiosInstance.get(
          `https://dummyjson.com/products/${id}`
        );

        setProduct(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Product Not Found
      </div>
    );
  }

  // const finalPrice = (
  //   product.price -
  //   (product.price * product.discountPercentage) / 100
  // ).toFixed(2);
  const finalPrice= product.price;

  const cartItem = cartItems.find((val) => val.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Images */}

        <div>

          <div className="bg-white rounded-3xl p-8">

            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-[450px] object-contain"
            />

          </div>

          <div className="grid grid-cols-4 gap-3 mt-5">

            {product.images.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-2"
              >
                <img
                  src={image}
                  alt=""
                  className="h-20 w-full object-contain"
                />
              </div>
            ))}

          </div>

        </div>

        {/* Details */}

        <div>

          <span className="inline-block bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
            {product.brand}
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {product.title}
          </h1>

          <p className="text-white/60 mt-4">
            {product.description}
          </p>

          <div className="flex items-center gap-5 mt-6">

            <span className="text-yellow-400 text-lg">
              ⭐ {product.rating}
            </span>

            <span className="text-green-400">
              {product.stock} In Stock
            </span>

            <span className="text-white/50">
              {product.category}
            </span>

          </div>

          <div className="mt-8">

            <span className="text-5xl font-bold text-lime-400">
              ${finalPrice}
            </span>

            {/* <span className="ml-4 text-2xl line-through text-white/40">
              ${product.price}
            </span> */}

            {/* <span className="ml-4 bg-red-500 px-3 py-1 rounded-full">
              {product.discountPercentage}% OFF
            </span> */}

          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">

            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-white/50 text-sm">Warranty</p>
              <p>{product.warrantyInformation}</p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-white/50 text-sm">Shipping</p>
              <p>{product.shippingInformation}</p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-white/50 text-sm">Return Policy</p>
              <p>{product.returnPolicy}</p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-white/50 text-sm">Minimum Order</p>
              <p>{product.minimumOrderQuantity}</p>
            </div>

          </div>

          <div className="flex gap-4 mt-10">

            {cartItem ? (
              <div className="flex-1 flex items-center justify-between bg-lime-400 rounded-xl px-6 py-4">
                <button
                  type="button"
                  onClick={() => decrementQty(product.id)}
                  className="text-black hover:bg-lime-500 rounded-full p-2"
                >
                  <Minus size={20} />
                </button>

                <span className="text-black font-bold text-xl">{cartItem.qty}</span>

                <button
                  type="button"
                  onClick={() => incrementQty(product.id)}
                  className="text-black hover:bg-lime-500 rounded-full p-2"
                >
                  <Plus size={20} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex-1 bg-lime-400 text-black font-bold py-4 rounded-xl hover:bg-lime-500"
              >
                Add To Cart
              </button>
            )}

          </div>

        </div>

      </div>

      {/* Reviews */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Customer Reviews
        </h2>

        <div className="space-y-5">

          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 p-5"
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold">
                    {review.reviewerName}
                  </h3>

                  <p className="text-sm text-white/50">
                    {review.reviewerEmail}
                  </p>

                </div>

                <span className="text-yellow-400">
                  ⭐ {review.rating}
                </span>

              </div>

              <p className="mt-3 text-white/70">
                {review.comment}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default ProductPage;