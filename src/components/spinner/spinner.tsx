import { BounceLoader } from 'react-spinners';
import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="loading-spinner">
      <BounceLoader
        color={'#4481c3'}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>Loading ...</p>
    </div>
  );
}

export default Spinner;
