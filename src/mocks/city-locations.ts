import { CityProps, CoordinateProps, LocationProps } from '../types/offer';
import { ZOOM } from '../const';
import { getRandomInteger } from '../utils/utils';

export const getOfferLocation = (coordinates: CoordinateProps[]): LocationProps => {
  const coordinate = coordinates[getRandomInteger(0, coordinates.length - 1)];
  const lat = coordinate.lat;
  const lng = coordinate.lng;

  return {
    latitude: lat,
    longitude: lng,
    zoom: ZOOM
  };
};

export const cities: CityProps[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: ZOOM
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: ZOOM
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: ZOOM
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: ZOOM
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: ZOOM
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: ZOOM
    }
  }
];
