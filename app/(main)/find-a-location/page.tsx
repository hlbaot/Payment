'use client';

import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { useEffect, useMemo, useRef, useState } from 'react';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const mockLocations = [
  {
    id: 'loc-1',
    name: 'Madina Halal Meat & Grocery',
    address: '402 E 11th St',
    distance: '1.8 mi',
    status: 'Closed',
    detail: 'Opens at 11:00 AM',
    services: ['Send money', 'Collect money', 'Bill payment'],
    accent: 'red' as const,
  },
  
  {
    id: 'loc-2',
    name: '7-Eleven, Inc',
    address: '247 3RD AVENUE',
    distance: '2.1 mi',
    status: 'Open 24 Hours',
    detail: '',
    services: ['Fund transfers', 'Send money', 'Bill payment'],
    accent: 'green' as const,
  },
  {
    id: 'loc-3',
    name: '7-Eleven',
    address: '241 Atlantic Ave',
    distance: '2.2 mi',
    status: 'Open 24 Hours',
    detail: '',
    services: ['Fund transfers', 'Send money', 'Bill payment'],
    accent: 'green' as const,
  },
  {
    id: 'loc-4',
    name: 'MBA Grocery & Variety Inc.',
    address: '426 Balwin Ave',
    distance: '2.4 mi',
    status: 'Open until 11:00 PM',
    detail: '',
    services: ['Send money', 'Collect money', 'Bill payment'],
    accent: 'green' as const,
  },
  {
    id: 'loc-5',
    name: 'Serbisyo Pilipino LLC',
    address: '530 Newark Avenue',
    distance: '2.4 mi',
    status: 'Closed',
    detail: 'Opens at 09:00 AM',
    services: ['Send money', 'Collect money', 'Bill payment'],
    accent: 'red' as const,
  },
  {
    id: 'loc-6',
    name: 'Madina Halal Meat & Grocery',
    address: '402 E 11th St',
    distance: '1.8 mi',
    status: 'Closed',
    detail: 'Opens at 11:00 AM',
    services: ['Send money', 'Collect money', 'Bill payment'],
    accent: 'red' as const,
  },
  {
    id: 'loc-7',
    name: 'MBA Grocery & Variety Inc.',
    address: '426 Balwin Ave',
    distance: '2.4 mi',
    status: 'Open until 11:00 PM',
    detail: '',
    services: ['Send money', 'Collect money', 'Bill payment'],
    accent: 'green' as const,
  }
];

const filterServices = [
  'All services',
  'ATM',
  'Bill payment',
  'Check cashing',
  'Collect money',
  'eWallet',
  'Fund transfers',
  'Money order',
  'Send money',
] as const;

export default function FindALocationPage() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoursFilter, setHoursFilter] = useState<'any' | 'open'>('any');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>('mi');
  const [selectedService, setSelectedService] =
    useState<(typeof filterServices)[number]>('All services');
  const mapHostRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const isEmpty = useMemo(() => query.trim().length === 0, [query]);
  const hasMapsKey = GOOGLE_MAPS_API_KEY.trim().length > 0;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent('New York, NY')}&z=6&output=embed`;

  useEffect(() => {
    if (!hasMapsKey) return;
    if (!mapHostRef.current) return;
    if (mapRef.current) return;

    let cancelled = false;

    setOptions({
      key: GOOGLE_MAPS_API_KEY,
      v: 'weekly',
    });

    importLibrary('maps')
      .then(() => {
        if (cancelled) return;
        if (!mapHostRef.current) return;

        const map = new google.maps.Map(mapHostRef.current, {
          center: { lat: 41.2, lng: -74.9 },
          zoom: 6,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          clickableIcons: false,
          gestureHandling: 'greedy',
        });

        new google.maps.Marker({
          map,
          position: { lat: 40.7128, lng: -74.006 },
          title: 'New York',
        });

        mapRef.current = map;
      })
      .catch(() => {
        // If the API fails to load, keep the image fallback.
      });

    return () => {
      cancelled = true;
    };
  }, [hasMapsKey]);

  return (
    <div className="location-page">
      <aside className="location-page__sidebar" aria-label="Location search panel">
        {showFilters ? (
          <div className="location-filter-panel">
            <div className="location-filter-panel__header">
              <h1>Filter</h1>
              <button
                type="button"
                className="location-filter-panel__close"
                aria-label="Close filters"
                onClick={() => setShowFilters(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="location-filter-panel__body">
              <section className="location-filter-group">
                <h2>Hours</h2>
                <div className="location-filter-options">
                  <button
                    type="button"
                    className={`location-filter-option${hoursFilter === 'any' ? ' is-active' : ''}`}
                    onClick={() => setHoursFilter('any')}
                  >
                    <span className="location-filter-radio" />
                    <span>Any time</span>
                  </button>
                  <button
                    type="button"
                    className={`location-filter-option${hoursFilter === 'open' ? ' is-active' : ''}`}
                    onClick={() => setHoursFilter('open')}
                  >
                    <span className="location-filter-radio" />
                    <span>Open now</span>
                  </button>
                </div>
              </section>

              <section className="location-filter-group">
                <h2>Distance units</h2>
                <div className="location-filter-options">
                  <button
                    type="button"
                    className={`location-filter-option${distanceUnit === 'km' ? ' is-active' : ''}`}
                    onClick={() => setDistanceUnit('km')}
                  >
                    <span className="location-filter-radio" />
                    <span>Kilometers</span>
                  </button>
                  <button
                    type="button"
                    className={`location-filter-option${distanceUnit === 'mi' ? ' is-active' : ''}`}
                    onClick={() => setDistanceUnit('mi')}
                  >
                    <span className="location-filter-radio" />
                    <span>Miles</span>
                  </button>
                </div>
              </section>

              <section className="location-filter-group">
                <h2>Services</h2>
                <div className="location-filter-services">
                  {filterServices.map((service) => (
                    <button
                      key={service}
                      type="button"
                      className={`location-filter-service${selectedService === service ? ' is-active' : ''}`}
                      onClick={() => setSelectedService(service)}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="location-filter-panel__footer">
              <button
                type="button"
                className="location-filter-clear text-[16px] font-bold"
                onClick={() => {
                  setHoursFilter('any');
                  setDistanceUnit('mi');
                  setSelectedService('All services');
                }}
              >
                Clear all
              </button>
              <button
                type="button"
                className="location-filter-apply"
                onClick={() => setShowFilters(false)}
              >
                Apply
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="location-search">
              <div className="location-search__input">
                <SearchIcon />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  aria-label="Search locations"
                />
                <button
                  type="button"
                  className="location-search__filters"
                  aria-label="Filters"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersIcon />
                </button>
              </div>
            </div>

            <div className="location-results" role="status" aria-live="polite">
              {isEmpty ? (
                mockLocations.map((location) => (
                  <article
                    key={location.id}
                    className={`location-result-card hover:cursor-pointer`}
                  >
                    <div className="location-result-card__top">
                      <div className="location-result-card__copy">
                        <h2>{location.name}</h2>
                        <p className="location-result-card__address">{location.address}</p>
                      </div>
                      <span className="location-result-card__distance">{location.distance}</span>
                    </div>

                    <p className={`location-result-card__status is-${location.accent}`}>
                      <ClockIcon />
                      <span>{location.status}</span>
                      {location.detail ? <span className="location-result-card__detail">· {location.detail}</span> : null}
                    </p>

                    <p className="location-result-card__services">
                      {location.services.map((service, index) => (
                        <span key={service}>
                          {service}
                          {index < location.services.length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </p>
                  </article>
                ))
              ) : (
                <div className="location-results__empty">
                  <h1>No locations found 🤔</h1>
                  <p>
                    Unable to find a Ria location in that area. Try expanding your search.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </aside>

      <main className="location-page__map" aria-label="Map">
        <div className="location-map">
          {hasMapsKey ? (
            <div ref={mapHostRef} className="location-map__google" aria-hidden="true" />
          ) : (
            <iframe
              src={embedSrc}
              className="location-map__iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google map"
            />
          )}

          <button type="button" className="location-map__search-area">
            <SearchAreaIcon />
            <span>Search this area</span>
          </button>
        </div>
      </main>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 21l-4.3-4.3m1.8-5.1a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h10M18 6h2M10 6v0M4 12h6M14 12h6M4 18h14M20 18h0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 12v0M18 6v0M20 18v0"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchAreaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v3m0 14v3M2 12h3m14 0h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 6.8v5.6l3.4 3.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
