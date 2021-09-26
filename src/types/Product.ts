import Sku from "./Sku";

export default interface Product {
    id?: number,
    name: string,
    description: string,
    childSkus: [Sku]
}