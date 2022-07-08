import { Link } from "react-router-dom"
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {toggleCart} from "../redux/features/cart/cartSlice"

function Header() {
  const {cartItems} = useAppSelector(state => state.cart)
  const totolItem = cartItems.reduce((total, current) => total + current.quantity, 0)
  const dispatch = useAppDispatch()

  return (
    <header className="w-full py-6 px-8 flex justify-between items-center shadow-sm overflow-hidden">
        <Link to={"/"}><p>TypeScript Cart App</p></Link>
        <div className="flex items-center">
            <nav>
                <ul className="flex items-center space-x-5 text-md">
                </ul>
            </nav>
            <div onClick={() => dispatch(toggleCart())} className="ml-5 relative cursor-pointer">
              <HiOutlineShoppingBag className="text-xl"/>
              <div className="absolute right-[-0.30rem] top-[-0.5rem] w-[15px] h-[15px] rounded-full bg-red-400 text-white flex justify-center items-center"><span className="text-xs" data-testId="cartCount">{totolItem && totolItem}</span></div>
            </div>
        </div>
    </header>
  )
}

export default Header