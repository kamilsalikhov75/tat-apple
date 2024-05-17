import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { Sidebar } from "./components/sidebar/sidebar";
import { UserInfo } from "./components/user-info/user-info";
import { UserOrders } from "./components/user-orders/user-orders";
import { path } from "./const";
import { Cart } from "./pages/cart/cart";
import { Catalog } from "./pages/catalog/catalog";
import { Login } from "./pages/login/login";
import { Products } from "./pages/products/products";
import { Register } from "./pages/register/register";
import { User } from "./pages/user/user";

const initialUser = {
  data: {},
  token: "",
};

function App() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );

  console.log(cart);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path={path.main} element={<Catalog />} />
          <Route path={path.user} element={<User />} />
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
          <Route
            path={path.cart}
            element={<Cart cart={cart} setCart={setCart} />}
          />
          <Route
            path="/products/:category"
            element={<Products cart={cart} setCart={setCart} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
