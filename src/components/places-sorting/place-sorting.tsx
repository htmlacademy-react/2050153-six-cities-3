import { useState } from 'react';
import { SortOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chosenSortOption } from '../../store/offers-process/offers-process';
import { getSortOption } from '../../store/offers-process/selectors';

function PlaceSorting(): JSX.Element {
  const currentSortOption = useAppSelector(getSortOption);
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOnOptionClick = (sortOption: string) => {
    dispatch(chosenSortOption({sortOption: sortOption}));
    setIsMenuOpen(false);
  };

  const handleOnSortManuClick = () => {
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
          handleOnSortManuClick();
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
              handleOnOptionClick(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlaceSorting;
