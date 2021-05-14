import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { getCurrentUTCTime } from '../utils/getCurrentUTCTime';

type City = {
  section: string;
  label: string;
  time_zone: string;
};

export const Navbar: React.FC<{ cities?: City[] }> = ({ cities = [] }) => {
  // Here i used local state to control current active city
  const [activeCity, changeActiveCity] = useState({ section: '', label: '' });

  // And here to contol "underscore" element position
  const [underlinePosition, changeUnderlinePosition] = useState({
    left: 0,
    width: 0,
  });

  // These refs are used to place "underscore" element after middle list element
  const middleLiElement = useRef<HTMLLIElement>(null);
  const nextToMiddleLiElement = useRef<HTMLLIElement>(null);

  const middleLiElementIndex = Math.floor((cities.length - 1) / 2);
  const nextToMiddleLiElementIndex = middleLiElementIndex + 1;

  // Simple function to update active city and "underscore"
  function changeActiveElement(e: React.MouseEvent<HTMLLIElement>, city: City) {
    changeActiveCity(city);

    changeUnderlinePosition({
      left: (e.target as HTMLElement).offsetLeft,
      width: (e.target as HTMLElement).offsetWidth,
    });
  }

  // Use effect fires on component's mount event, to place "underscore" at rigth position
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
              // Here i used refs to get middle and next-to-middle elements
              // to obtain their position for "underscore"
              ref={
                i === middleLiElementIndex
                  ? middleLiElement
                  : i === nextToMiddleLiElementIndex
                  ? nextToMiddleLiElement
                  : null
              }
            >
              {city.label}
              <small className='cities-time'>
                {getCurrentUTCTime(city.time_zone)}
              </small>
            </li>
          );
        })}
      </ul>
      <span
        // Here i dynamically set position for "underscore" element
        style={{ left: underlinePosition.left, width: underlinePosition.width }}
        className='underline'
      ></span>
    </nav>
  );
};
