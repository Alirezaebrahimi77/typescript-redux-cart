import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'
import CartSidebar from "./CartSidebar";
import {AnimatePresence } from "framer-motion"
import { useAppSelector } from '../redux/hooks';

type LayoutProps = {
  children: ReactNode
}

function Layout({children}: LayoutProps) {
  const {showCart} = useAppSelector(state => state.cart)
  return (
    <div className='w-full h-full w-min-screen h-min-screen relative overflow-x-hidden layout'>
        <Header />
        <AnimatePresence>
        {showCart && (
            <CartSidebar />
            )}
        </AnimatePresence>
        <main className='px-8 py-6 relative overflow-x-hidden'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout