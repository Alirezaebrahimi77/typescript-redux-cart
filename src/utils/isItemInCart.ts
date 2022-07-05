import type {Product} from "../redux/features/productTypes/ProductTypes"
export const isItemInCart = (cartItems: Product[], id: string): boolean => {
    return !!cartItems.find(item => item._id === id)
}