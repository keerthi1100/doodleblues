import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/screens/home';
import PlaceOrder from '../components/screens/PlaceOrder';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="paceOrderScreen" component={PlaceOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;