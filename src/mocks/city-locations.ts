import { CoordinateProps, LocationProps, CityProps } from '../types/offer';
import { ZOOM, Cities } from '../const';
import { getRandomInteger, getRandomArrayElement } from '../utils/utils';

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

export const getCityLocation = (coordinates: CoordinateProps[]): CityProps => {
  let lat = 52.3909553943508;
  let lng = 4.85309666406198;

  const offerCity = getRandomArrayElement(Cities);

  if (offerCity !== 'Amsterdam') {
    const coordinate = coordinates[getRandomInteger(0, coordinates.length - 1)];
    lat = coordinate.lat;
    lng = coordinate.lng;
  }

  return {
    name: offerCity,
    location: {
      latitude: lat,
      longitude: lng,
      zoom: ZOOM
    }};
};
