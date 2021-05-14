import * as React from 'react';
import { Navbar } from './Navbar';

import * as navigation from '../__mocks__/navigation.json';

// For now i've desided to create a simple header element.
// In the future i would add another component under the header to render
// current city information for example.
export const Header: React.FC = () => {
  return (
    <header className='header'>
      <Navbar cities={navigation.cities} />
    </header>
  );
};
