import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import {
  fetchSingleProduct
} from "../redux/features/products/productSlice";
import {clearErrors} from "../redux/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import toast from "react-hot-toast";
import { addItem } from "../redux/features/cart/cartSlice";

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const dispatch = useAppDispatch();

  const { singleProduct, loading } = useAppSelector(
    (state) => state.products
  );

  const { error, showCart } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(`${params.id}`));
  }, [params, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Couldn't add product to the cart", { position: "bottom-center" });
      dispatch(clearErrors());
    }
  }, [error, dispatch])

  const decreaseHandler = () => {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
  };

  const addItemHandler = () => {
    dispatch(
      addItem({ id: `${singleProduct?._id}`, quantity: quantity })
    )
    if(error === null){
      toast.success("Product added to cart successfully.", {position: "bottom-center"})
    }
  }
  useEffect(()=> {
    if(showCart){
      document.getElementsByTagName("body")[0].style.overflowY = "hidden"
    }else{
      document.getElementsByTagName("body")[0].style.overflowY = "scroll"

    }

  },[showCart])

  return (
    <Layout>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row w-full p-4 md:p-12 relative">
            <div className="flex w-full md:w-[60%]">
              {/* Images here */}
              <div className="relative h-auto md:h-[400px] w-full mr-0 md:mr-14 overflow-hidden pb-6 md:pb-12">
                <img
                  src={singleProduct?.images[0].url}
                  alt={singleProduct?.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="w-full md:w-[40%]">
              {/* right side */}
              <h1 className="font-bold text-xl">{singleProduct?.name}</h1>
              <div className="w-[70px] h-[1px] bg-black my-3" />
              <p className="text-xl font-bold">{singleProduct?.price}$</p>
              {/* Ratings */}

              <div className="mt-6">
                <p className="text-gray-500 text-md">
                  {singleProduct?.description}
                </p>
              </div>

              <div className="flex justify-start items-center space-x-6">
                <p>Quantity</p>
                <div className="flex items-center space-x-2 my-6">
                  <button
                    onClick={decreaseHandler}
                    className="rounded-full w-[22px] h-[22px] text-center bg-black text-white inline-flex flex-col justify-center items-center text-[15px]"
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => setQuantity((prevState) => prevState + 1)}
                    className="rounded-full w-[22px] h-[22px] text-center bg-black text-white inline-flex flex-col justify-center items-center text-[15px]"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={addItemHandler}
                className="w-full border border-black text-white py-1 bg-black hover:bg-white hover:text-black transition duration-300"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default ProductPage;
