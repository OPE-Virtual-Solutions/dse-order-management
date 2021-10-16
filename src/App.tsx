import { ThemeProvider } from '@material-ui/core';
import './App.css';

import { materialTheme } from './utils/materialUiTheme';

import { Routes } from './routes';

import { CartProvider } from 'contexts/CartContext/CartContext';

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <div className="App">
        <CartProvider>
          <Routes />
        </CartProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
