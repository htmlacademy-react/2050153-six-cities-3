import {Link} from 'react-router-dom';
import CardComponent from '../../../components/card-component/card-component';
import {cards} from '../../../components/card-component/card-data';
import {Cities} from '../../../const';

function FavoritesLocationsComponents(): JSX.Element {
  return (
    <>
      {Cities.map((city: string) => (
        // eslint-disable-next-line react/jsx-key
        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#todo">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cards.map((card) => (
              card.isFavorite && (card.city === city) ?
                (
                  <CardComponent
                    key={card.id}
                    title={card.title}
                    type={card.type}
                    price={card.price}
                    isPremium={card.isPremium}
                    rating={card.rating}
                    previewImage={card.previewImage}
                    city={card.city}
                    isFavorite={false}
                  />
                )
                : null
            ))}
          </div>
        </li>
      ))}
    </>
  );
}

export default FavoritesLocationsComponents;
