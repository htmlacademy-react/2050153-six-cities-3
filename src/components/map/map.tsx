import leaflet, { LayerGroup as LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { CityProps, OffersProps } from '../../types/offer';
import { URL_PIN_ACTIVE, URL_PIN_DEFAULT } from '../../const';
import useMap from './map-hooks/use-map';

type MapProps = {
  city: CityProps;
  offers: OffersProps[];
  activeOfferId?: string | null;
  mapClassName: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeCustomIcon = leaflet.icon({
  iconUrl: URL_PIN_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({city, offers, activeOfferId, mapClassName}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement>(null);
  const map = useMap({mapRef: mapRef, city: city.location});
  const cityMarkersLayer = useRef<LayerGroup>(new leaflet.LayerGroup());

  useEffect(() => {
    if(map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      cityMarkersLayer.current.addTo(map);
      cityMarkersLayer.current.clearLayers();
    }
  },[city, map]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOfferId)
              ? activeCustomIcon
              : defaultCustomIcon,
          })
          .addTo(cityMarkersLayer.current);
      });
    }
  }, [map, activeOfferId, offers]);

  return (
    <section
      className={`${mapClassName}__map map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
