import { ThemeProvider } from '@material-ui/core';
import './App.css';

import { materialTheme } from './utils/materialUiTheme';

import { Routes } from './routes';

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <div className="App">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
