import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

render(
  <section className="container">
    <App />
    <footer>
      <p className="footer">BOÄRDÉ</p>
    </footer>
  </section>,
  document.getElementById('root')
);
