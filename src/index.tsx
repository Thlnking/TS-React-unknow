import React from 'react';
import { render } from 'react-dom';
import aPng from './assets/images/02.png';
import './index.scss';

try {
  const rootElement = document.getElementById('root');
  console.log('运行');
  const App = () => (
    <div className="hello">
      <img src={aPng} alt="123" />
    </div>
  );
  render(<App />, rootElement);
} catch (e) {
  console.log('e', e);
}
