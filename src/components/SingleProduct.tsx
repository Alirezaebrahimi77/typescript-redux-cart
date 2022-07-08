import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import type {Product} from "../redux/features/productTypes/ProductTypes"
import {increaseQty, toggleCart} from "../redux/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {toast} from "react-hot-toast"
import {isItemInCart} from "../utils/isItemInCart"

interface Props {
    product: Product
}
const SingleProduct: React.FC<Props> = (props) => {
    const {_id, name, images, price} = props.product
    const url = images[0].url
    const dispatch = useAppDispatch()
    const {cartItems, error, showCart} = useAppSelector(state => state.cart)


    const cartHandler = () => {
      dispatch(increaseQty(_id))
      if(error === null){
        toast.success("Product added to cart successfully.", {position: "bottom-center"})
      }
    }
    const openCart = () => {
      window.scrollTo(0, 0)
      dispatch(toggleCart())
    }
    useEffect(()=> {
      if(showCart){
        document.getElementsByTagName("body")[0].style.overflowY = "hidden"
      }else{
        document.getElementsByTagName("body")[0].style.overflowY = "scroll"
      }

    },[showCart])

  return (
    
    <div className="w-full md:w-[250px] h-full flex flex-col p-2 overflow-hidden" data-testId={`${_id}`}>
      <Link to={`/${_id}`}>
        <div className="w-full md:w-[220px] h-auto md:h-[150px] relative overflow-hidden">
            <img src={url} alt={name} className="w-full h-full object-contain"/>
        </div>
        <div className="px-1">

        
        <p className="text-gray-500 mt-7 flex-1 text-sm" data-testId="productName">{name}</p>
    
        <p className="mt-2 mb-3 font-semibold">{price} €</p>
        </div>
        </Link>

        {
          isItemInCart(cartItems, _id) ? (
            <button onClick={openCart} className="py-2 px-4 w-full bg-black text-white border border-black transition duration-150 hover:bg-white hover:text-black" data-testId="addToCart">In Cart</button>

          ): (
            <button onClick={cartHandler} className="py-2 px-4 w-full bg-black text-white border border-black transition duration-150 hover:bg-white hover:text-black" data-testId="addToCart">Add To Cart</button>
          )

        }
    </div>
  )
}

export default SingleProduct