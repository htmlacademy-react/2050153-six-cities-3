import leaflet, { LayerGroup as LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect, useRef } from 'react';
import { CityProps, OffersProps } from '../../types/offer';
import { URL_PIN_ACTIVE, URL_PIN_DEFAULT } from '../../const';
import useMap from './map-hooks/use-map';

type MapProps = {
  city: CityProps;
  offers: OffersProps[];
  currentOffer?: OffersProps;
  activeOfferId?: string | null;
  mapClassName: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [(27 / 2), 39],
});

const activeCustomIcon = leaflet.icon({
  iconUrl: URL_PIN_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [(27 / 2), 39],
});

function Map({city, offers, currentOffer, activeOfferId, mapClassName}: MapProps): JSX.Element {
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
      if (currentOffer) {
        leaflet.marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        }, {icon: activeCustomIcon})
          .addTo(cityMarkersLayer.current);
      }
    }
  }, [map, activeOfferId, offers, currentOffer]);

  return (
    <section
      className={`${mapClassName}__map map`}
      ref={mapRef}
    >
    </section>
  );
}

const MemoizedMap = memo(Map);

export default MemoizedMap;
