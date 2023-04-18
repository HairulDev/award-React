import Routes from "configs/Routes";
import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "store/reducers";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>

    </Provider >
  );
}

export default App;
