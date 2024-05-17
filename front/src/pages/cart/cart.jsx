import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartProduct } from "../../components/cart-product/cart-product";
import { Loading } from "../../components/loading/loading";
import { path, store } from "../../const";
import "./cart.css";

const initialUser = {
  name: "",
  email: "",
};

function Cart({ cart, setCart }) {
  const [user, setUser] = useState(initialUser);
  const token = window.localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [currentStore, setCurrentStore] = useState(store.chelny);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const price = products.length ? sumPrice(cart, products) : 0;
  console.log(cart, currentStore, price);
  useEffect(() => {
    if (cart.length) {
      setIsLoading(true);

      const promise = axios.get("http://localhost:3001/products");

      promise
        .then((responce) => responce.data)
        .then((data) => setProducts(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, []);
  

  useEffect(() => {
    if (cart.length) {
      try {
        if (token) {
          setIsLoading(true);
          const promise = axios.get("http://localhost:3001/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          promise
            .then((responce) => responce.data)
            .then((data) => setUser(data.userData))
            .catch((error) => navigate(path.login))
            .finally(() => setIsLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  if (!cart.length) {
    return (
      <div className="loading">
        <h1 className="loading__title">КОРЗИНА ПУСТА</h1>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  async function createOrder() {
    try {
      if (!user.email) {
        navigate(path.login);
        return;
      }
      setIsLoading(true);
      const responce = await axios.post(
        "http://localhost:3001/orders",
        {
          products: cart,
          address: currentStore,
          price,
          user: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responce.status === 200) {
        navigate(path.user);
      }
    } catch (error) {
      console.log(error);
      alert("Не удалось создать заказ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="cart">
      <h1 className="title">Корзина</h1>
      <div className="cart__products">
        {cart.map((item) => {
          const cartProduct = products.find(
            (product) => product._id === item.id
          );
          return (
            <CartProduct
              key={item.id}
              product={cartProduct}
              cart={cart}
              setCart={setCart}
              count={item.count}
            />
          );
        })}
      </div>
      <h2 className="subtitle">Итого: {price} руб.</h2>
      <div className="stores__block">
        <h2 className="subtitle">Выбор магазина</h2>
        <div className="stores__buttons">
          <button
            className={`store__button ${
              currentStore === store.chelny ? "store__button--active" : ""
            }`}
            onClick={() => {
              setCurrentStore(store.chelny);
            }}
          >
            {store.chelny}
          </button>
          <button
            className={`store__button ${
              currentStore === store.kazan ? "store__button--active" : ""
            }`}
            onClick={() => {
              setCurrentStore(store.kazan);
            }}
          >
            {store.kazan}
          </button>
          <button
            className={`store__button ${
              currentStore === store.almetevsk ? "store__button--active" : ""
            }`}
            onClick={() => {
              setCurrentStore(store.almetevsk);
            }}
          >
            {store.almetevsk}
          </button>
        </div>
      </div>
      <button className="cart__button" onClick={createOrder}>
        Оформить заказ
      </button>
    </div>
  );
}

function sumPrice(cart, products) {
  const sum = cart.reduce((sum, current) => {
    const price = products.find((product) => product._id === current.id).price;
    return sum + current.count * price;
  }, 0);
  return sum;
}

export { Cart };
