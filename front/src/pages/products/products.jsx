import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { ProductCard } from '../../components/product-card/product-card';
import './products.css';

function Products({cart, setCart}) {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const filtredProducts = products.filter(
    (product) => product.category === category
  );

  useEffect(() => {
    setIsLoading(true);

    const promise = axios.get('http://localhost:3001/products');

    promise
      .then((responce) => responce.data)
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="products">
      {filtredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export { Products };
