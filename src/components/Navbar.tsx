import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

type City = {
  section: string;
  label: string;
};

export const Navbar: React.FC<{ cities?: City[] }> = ({ cities = [] }) => {
  const [activeCity, changeActiveCity] = useState({ section: '', label: '' });

  const [underlinePosition, changeUnderlinePosition] = useState({
    left: 205,
    width: 68,
  });

  const middleLiElement = useRef<HTMLLIElement>(null);
  const nextToMiddleLiElement = useRef<HTMLLIElement>(null);

  const middleLiElementIndex = Math.floor((cities.length - 1) / 2);
  const nextToMiddleLiElementIndex = middleLiElementIndex + 1;

  function changeActiveElement(e: React.MouseEvent<HTMLLIElement>, city: City) {
    changeActiveCity(city);

    changeUnderlinePosition({
      left: (e.target as HTMLElement).offsetLeft,
      width: (e.target as HTMLElement).offsetWidth,
    });
  }

  useEffect(() => {
    if (middleLiElement.current && nextToMiddleLiElement.current) {
      const underlineStartingPoint =
        middleLiElement.current.offsetLeft +
        middleLiElement.current.offsetWidth;

      const underlineStartingWidth =
        (nextToMiddleLiElement.current?.offsetLeft - underlineStartingPoint) *
        0.6;

      changeUnderlinePosition({
        left: underlineStartingPoint,
        width: underlineStartingWidth,
      });
    }
  }, []);

  return (
    <nav className='cities'>
      <ul className='cities-list'>
        {cities.map((city, i) => {
          return (
            <li
              className={`cities-item ${
                city.section === activeCity.section ? 'cities-item--active' : ''
              }`}
              onClick={(e) => changeActiveElement(e, city)}
              key={city.section + city.label}
              ref={
                i === middleLiElementIndex
                  ? middleLiElement
                  : i === nextToMiddleLiElementIndex
                  ? nextToMiddleLiElement
                  : null
              }
            >
              {city.label}
            </li>
          );
        })}
      </ul>
      <span
        style={{ left: underlinePosition.left, width: underlinePosition.width }}
        className='underline'
      ></span>
    </nav>
  );
};
