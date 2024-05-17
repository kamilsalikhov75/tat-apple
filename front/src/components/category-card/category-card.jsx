import { Link } from 'react-router-dom';
import { iphoneIcon } from '../../icons';
import './category-card.css';

function CategoryCard({path, img, text}) {
  return (
    <Link to={path} className="category__link">
      <img src={img} className="category__img" />
      {text}
    </Link>
  );
}
iphoneIcon;

export { CategoryCard };
