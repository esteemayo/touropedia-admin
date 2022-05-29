import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from 'features/store';
import reportWebVitals from './reportWebVitals';

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
