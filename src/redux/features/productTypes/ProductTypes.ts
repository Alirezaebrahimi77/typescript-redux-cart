
interface Product {
    _id: string,
    name: string,
    price: number,
    description: string,
    ratings: number,
    images: [
        {
            public_id: string,
            url: string
        }
    ],
    category: string,
    seller: string,
    stock: number,
    numOfReviews: number,
    reviews: string[],
    createdAt: Date,
    quantity: number

}

export type { Product};