import * as React from 'react';
import { Navbar } from './Navbar';

import * as navigation from '../__mocks__/navigation.json';

export const Header: React.FC = () => {
  return (
    <header>
      <Navbar cities={navigation.cities} />
    </header>
  );
};
