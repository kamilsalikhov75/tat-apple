import { CategoryCard } from '../../components/category-card/category-card';
import { ProductCard } from '../../components/product-card/product-card';
import { path } from '../../const';
import { airpodsIcon, applewatchIcon, caseIcon, chargerIcon, iphoneIcon } from '../../icons';
import './catalog.css';

function Catalog() {
  return (
    <div className="catalog">
      <CategoryCard path={path.iphone} img={iphoneIcon} text="iPhone" />
      <CategoryCard path={path.airpods} img={airpodsIcon} text="AirPods" />
      <CategoryCard path={path.applewatch} img={applewatchIcon} text="AppleWatch" />
      <CategoryCard path={path.case} img={caseIcon} text="Чехлы" />
      <CategoryCard path={path.charger} img={chargerIcon} text="Зарядные устройства" />
    </div>
  );
}


export { Catalog };
