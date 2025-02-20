import { memo, useState } from 'react';
import { SortOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chosenSortOption } from '../../store/offers/offers';
import { getSortOption } from '../../store/offers/selectors';

function PlaceSorting(): JSX.Element {
  const currentSortOption = useAppSelector(getSortOption);
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSortOptionClick = (sortOption: string) => {
    dispatch(chosenSortOption({sortOption: sortOption}));
    setIsMenuOpen(false);
  };

  const handleSortMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick = {(evt) => {
          evt.preventDefault();
          handleSortMenuClick();
        }}
      >
        {currentSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isMenuOpen ? 'places__options--opened' : ''}`}>
        {SortOptions.map((option: string) => (
          <li
            className="places__option"
            key={option}
            onClick = {(evt) => {
              evt.preventDefault();
              handleSortOptionClick(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedPlaceSorting = memo(PlaceSorting);

export default MemoizedPlaceSorting;
