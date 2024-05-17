import { minusIcon, plusIcon, trashIcon } from '../../icons';
import './cart-product.css';

function CartProduct({ product, cart, setCart, count }) {
  function addProduct() {
    if (cart.find((item) => item.id === product._id)) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.id === product._id) {
          return { ...cartItem, count: cartItem.count + 1 };
        } else {
          return cartItem;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, { id: product._id, count: 1 }]);
    }
  }

  function minusProduct() {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === product._id) {
        return { ...cartItem, count: cartItem.count - 1 };
      } else {
        return cartItem;
      }
    });
    setCart(newCart);
  }

  function deleteProduct() {
    const newCart = cart.filter((item) => item.id !== product._id);
    setCart(newCart);
  }
  return (
    <div className="cart__product">
      <img
        src={`http://localhost:3001${product?.imageUrl}`}
        className="cart__product-img"
      />
      <h3 className="cart__product-title">{product?.title}</h3>
      <p className="cart__text">Цена: {product?.price} ₽</p>
      <div className="count__block">
        {count <= 1 ? (
          <button className="count__button" onClick={deleteProduct}>
            <img src={trashIcon} className="count__img" />
          </button>
        ) : (
          <button className="count__button" onClick={minusProduct}>
            <img src={minusIcon} className="count__img" />
          </button>
        )}
        <p className="count__text">{count}</p>
        <button className="count__button" onClick={addProduct}>
          <img src={plusIcon} className="count__img" />
        </button>
      </div>
    </div>
  );
}

export { CartProduct };
