import SORT_OPTIONS from '/src/const';

function PlaceSortingComponent(): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabindex="0">
          Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlink:href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_OPTIONS.map((option) => {
          <li
            className="places__option"
            key={option}
            tabIndex="0">
            {option}
          </li>
        })}
      </ul>
    </form>
  );
}

export default PlaceSortingComponent
