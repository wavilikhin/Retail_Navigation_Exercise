import * as React from 'react';
import { useState } from 'react';

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

  function changeActiveElement(e: React.MouseEvent<HTMLLIElement>, city: City) {
    changeActiveCity(city);

    changeUnderlinePosition({
      left: (e.target as HTMLElement).offsetLeft,
      width: (e.target as HTMLElement).offsetWidth,
    });
  }

  return (
    <nav className='cities'>
      <ul className='cities-list'>
        {cities.map((city) => (
          <li
            className={`cities-item ${
              city.section === activeCity.section ? 'cities-item--active' : ''
            }`}
            onClick={(e) => changeActiveElement(e, city)}
            key={city.section + city.label}
          >
            {city.label}
          </li>
        ))}
      </ul>
      <span
        style={{ left: underlinePosition.left, width: underlinePosition.width }}
        className='underline'
      ></span>
    </nav>
  );
};
