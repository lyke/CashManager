import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ManagerConnection from './screens/ManagerConnection';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="ManagerConnection" component={ManagerConnection} options={{headerShown: false}} />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
