import { v4 as uuidv4 } from 'uuid';

export interface Basket {
    id: string;
    items: BasketItem[];
}

export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    brand: string;
    type: string;
}

export interface BasketTotals {
    shippingCost: number;
    subtotal: number;
    total: number;
}

export class BasketImpl implements Basket {
    id = uuidv4();
    items: BasketItem[] = [];
}