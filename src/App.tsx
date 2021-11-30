import { ThemeProvider } from '@material-ui/core';
import './App.css';

import { materialTheme } from './utils/materialUiTheme';

import { Routes } from './routes';

import { UserProvider } from 'contexts/UserContext/UserContext';
import { CartProvider } from 'contexts/CartContext/CartContext';


function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <UserProvider>
        <CartProvider>
          <div className="App lightTheme">
            <Routes />
          </div>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
