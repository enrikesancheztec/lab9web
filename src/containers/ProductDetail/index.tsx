import React from "react";
import ProductInfo from "../../components/ProductInfo";
import ProductService from "../../services/ProductService";
import Product from "../../types/Product";

interface ProductState {
    product: Product;
}

/**
 * Product Detail Container
 * @extends {Component<Props, State>}
 */
class ProductDetail extends React.Component<{}, ProductState> {
    state = {
        product: {} as Product
    }

    /**
     * Renders the container.
     * @return {string} - HTML markup for the container
     */
    render() {
        return (
            <ProductInfo product={this.state.product} />
        )
    }

    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const productId = Number(urlParams.get('productId'));

        ProductService.get(productId)
            .then(response => {
                const product = response.data;
                console.log(product);
                this.setState({ product });
            }).catch(error => {
                console.log(error);
            });
    }
}

export default ProductDetail;