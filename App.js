import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "./screens/Login.js";
import Regis from "./screens/Regis.js";
import Welco from "./screens/Welco.js";
import product from "./screens/product.js";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welco" headerMode="none">
        <Stack.Screen name="Home" component={Welco} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Regist" component={Regis}/>
        <Stack.Screen name="Main" component={product}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "./screens/Login.js";
import Regis from "./screens/Regis.js";
import Welco from "./screens/Welco.js";
import product from "./screens/product.js";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="Main" component={product}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;*/

