import Cart from "../types/Cart";

class SessionStorageHelper {
    static getCart() : Cart {
        var cart: Cart = new Cart();
        var cartJSON = sessionStorage.getItem("cart");

        console.log(cartJSON);

        if (cartJSON != null) {
            const object = JSON.parse(cartJSON);
            cart.lineItems = object.lineItems;
        }

        return cart;
    }

    static updateCart(cart: Cart): void {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    static getToken(): string {
        var token = sessionStorage.getItem("token");
        
        if (token === null) {
            token = "";
        }

        return token;
    }

    static updateToken(token: string): void {
        sessionStorage.setItem("token", token);
    }
}

export default SessionStorageHelper;