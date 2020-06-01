/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import React from 'react';
import HomeScreen from './components/screens/home'
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers/cartReducres';
import App from './routing/indexRouting';

const store = createStore(reducers);

const AppContainer =()=>
<Provider store ={store}>
<App/>
</Provider>

AppRegistry.registerComponent(appName, () => AppContainer);
