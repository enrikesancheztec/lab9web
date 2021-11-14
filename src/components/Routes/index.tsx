import {Switch, Route} from 'react-router-dom'
import LoginPage from '../../containers/LoginPage';
import ProductDetail from "../../containers/ProductDetail";
import ProductList from "../../containers/ProductList";
import ProtectedRoute from '../ProtectedRoute';

/**
 * Routes
 * @returns Routes 
 */
const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={LoginPage} exact/>
            <ProtectedRoute path="/products" component={ProductList}/>
            <ProtectedRoute path="/pdp" component={ProductDetail}/>
        </Switch>
    );
};

export default Routes;