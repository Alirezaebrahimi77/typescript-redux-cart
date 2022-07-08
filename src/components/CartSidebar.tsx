import { VscChromeClose } from "react-icons/vsc";
import { motion } from "framer-motion";
import { toggleCart } from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CartItem from "./CartItem";

function CartSidebar() {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const numOfCartItems = cartItems.reduce(
    (total, current) => total + current.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, current) => total + current.price * current.quantity,
    0
  );
  const checkoutHandler = () => {
    alert(`Total price is: ${totalPrice}`)
  }

  const fade = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 0.1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const slide = {
    hidden: { x: "100%" },
    show: {
      x: "0%",
      transition: { type: "tween", duration: 0.2 },
    },
    exit: {
      x: "100%",
    },
  };

  return (
    <>
      <motion.div
        onClick={() => dispatch(toggleCart())}
        variants={fade}
        animate="show"
        initial="hidden"
        className="absolute w-screen h-full overflow-x-hidden right-0 top-0 bottom-0 left-0 bg-black z-20"
      />
      <motion.div
        variants={slide}
        animate="show"
        initial="hidden"
        exit={slide.exit}
        className="absolute right-0 top-0 w-screen md:w-[350px] h-screen bg-white z-50 shadow-lg p-4 m-0 overflow-hidden flex flex-col"
        data-setId="cartWrapper"
      >
        
          <div className="flex justify-end">
            <VscChromeClose
              className="cursor-pointer"
              onClick={() => dispatch(toggleCart())}
              data-testId="closeCart"
            />
          </div>
          <h2 className="text-lg font-bold mb-3 text-center tracking-wide">{`You have ${
            numOfCartItems !== 0 ? numOfCartItems : "no"
          } product${numOfCartItems > 1 ? "s" : ""} in the cart`}</h2>
          <hr />
          <div className="flex-1 p-2 overflow-y-scroll no-scrollbar">
            {/* Looping cartItems here */}
            {cartItems?.map((item) => (
              <CartItem
                key={item._id}
                url={item.images[0].url}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                id={item._id}
              />
            ))}
          </div>
          {numOfCartItems > 0 && (
            <div className="absolute bottom-0 p-2 w-full pr-8 bg-white">
              <div className="w-full flex items-center justify-between py-4">
                <p className="text-lg">Total</p>
                <p className="text-xl font-bold">{totalPrice.toFixed(2)}€</p>
              </div>
              <div className="py-4 flex justify-center">
                <button onClick={checkoutHandler} className="rounded-full py-2 px-8 border bg-black text-white transition duration-150 hover:bg-white hover:border-black hover:text-black">
                  Proceed to checkout
                </button>
              </div>
            </div>
          )}
      </motion.div>
    </>
  );
}

export default CartSidebar;
