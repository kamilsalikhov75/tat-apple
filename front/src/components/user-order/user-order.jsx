import { orderStatus } from '../../const';
import './user-order.css';

function UserOrder({ orderNumber, createdAt, products, price, status }) {
  const statusClass = getStatusClass(status);

  return (
    <div className="order">
      <div className="order__top">
        <p className="order__text">Заказ №{orderNumber}</p>
        <p className={`order__status ${statusClass}`}>{status}</p>
      </div>
      <p className="order__text">{createdAt}</p>
      <div className="order__products">
        Товары:
        {products.map((product) => (
          <p key={product._id} className="order__product">
            {`${product.id.title} ${product.count} шт.`}
          </p>
        ))}
      </div>
      <p className="order__text">{price} ₽</p>
    </div>
  );
}

function getStatusClass(status) {
  switch (status) {
    case orderStatus.new:
      return 'order__status--blue';
    case orderStatus.done:
      return 'order__status--green';
    case orderStatus.canceled:
      return 'order__status--red';
    default:
      return '';
  }
}

export { UserOrder };
