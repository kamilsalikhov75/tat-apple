import { addPoductIcon } from '../../icons';
import './product-card.css';

function ProductCard({ product, cart, setCart }) {
  function handleClick() {
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

  return (
    <div className="product__card">
      <img
        src={`http://localhost:3001${product?.imageUrl}`}
        className="product__card-img"
      />
      <h3 className="product__card-title">{product.title}</h3>
      <p className="product__card-text">Цена: {product.price} ₽</p>
      <button className="product__card-button" onClick={handleClick}>
        <img src={addPoductIcon} className="product__card-icon" />
        Добавить в корзину
      </button>
    </div>
  );
}

export { ProductCard };
