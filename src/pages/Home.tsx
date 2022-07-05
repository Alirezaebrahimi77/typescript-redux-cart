import { useEffect } from "react";
import Layout from "../components/Layout";
import SingleProduct from "../components/SingleProduct";
import { clearErrors, fetchProducts } from "../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {toast} from "react-hot-toast"

const Home = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(
    (state) => state.products
  );
  const { error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    if(error){
      toast.error("Couldn't add product to the cart", {position: "bottom-center"})
    }
    dispatch(clearErrors())
 
  }, [error, dispatch]);

  return (
    <Layout>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="max-w-[1300px] m-auto flex flex-wrap justify-center items-center gap-12 p-6 overflow-x-hidden">
          {products?.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
