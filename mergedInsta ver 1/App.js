import React from 'react';
import StackNavigation from './login/navigation/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

//redux
import rootReducer from './redux/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
