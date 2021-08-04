import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './views/Login';
import Home from './views/Home';
import ProductForm from './views/ProductForm';
import ProductList from './views/ProductList';
import Checkout from './views/Checkout';
import CartList from './views/CartList';
import CartUserList from './views/CartUserList';
import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'
import CartListAdmin from './views/cartListAdmin';
import ProductListAdmin from './views/ProductListAdmin';
import UserForm from './views/UserForm';
// import DetailPet from './views/DetailPet';


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
                <Login/>
          </Route>
          <Route exact path="/inicio">
                <Home/>
          </Route>
          <Route exact path="/product/new">
                <ProductForm/>
          </Route>
          <Route exact path="/product/edit/:id">
              <ProductForm/>
          </Route>
          <Route exact path="/comprar">
              <ProductList/>
          </Route>
          <Route exact path="/checkout/">
              <Checkout/>
          </Route>
          <Route exact path="/mispedidos">
              <CartList/>
          </Route>
          <Route exact path="/pedidos">
              <CartListAdmin/>
          </Route>
          <Route exact path="/productos">
              <ProductListAdmin/>
          </Route>
          <Route exact path="/misdatos">
              <UserForm/>
          </Route>
          
          {/* <Route exact path="/pets/new">
              <FormPet/>
          </Route>
          <Route exact path="/pets/:id/edit">
              <FormPet/>
          </Route>
          <Route exact path="/pets/:id">
              <DetailPet/>
          </Route> */}
        </Switch>
      </Router>
      <WhatsAppWidget phoneNumber='56971882482' textReplyTime='Respondemos en minutos' />
    </div>
  );
}

export default App;