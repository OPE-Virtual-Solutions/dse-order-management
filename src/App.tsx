import { ThemeProvider } from '@material-ui/core';
import './App.css';

import { materialTheme } from './utils/materialUiTheme';

import { Routes } from './routes';

import { OrderProvider } from 'contexts/OrderContext/OrderContext';

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <div className="App">
        <OrderProvider>
          <Routes />
        </OrderProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
