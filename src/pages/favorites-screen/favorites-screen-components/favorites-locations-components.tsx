import CardComponent from '../../components/card-component/card-component';
import {cards} from '../../components/card-component/card-data';
import {Cities} from '/src/const';

function FavoritesLocationsComponents(): JSX.Element {
  return (
    {Cities.map((city: string) => (
      <li class="favorites__locations-items">
        <div class="favorites__locations locations locations--current">
          <div class="locations__item">
            <a class="locations__item-link" href="#">
              <span>{city}</span>
            </a>
          </div>
        </div>
        <div class="favorites__places">
          {cards.map((card) => (
            {{if (card.isFavorite && (card.city == city))
              {
                <CardComponent
                  key={card.id}
                  title={card.title}
                  type={card.type}
                  price={card.price}
                  isPremium={card.isPremium}
                  rating={card.rating}
                  previewImage={card.previewImage}
                />
              }
            }}
          ))}
        </div>
      </li>
    ))}
  );
}

export default FavoritesLocationsComponents;
