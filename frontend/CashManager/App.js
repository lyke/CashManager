import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ManagerConnection from './screens/ManagerConnection';
import ManagerCategoryInterface from './screens/ManagerCategoryInterface';
import ManagerProductInterface from './screens/ManagerProductInterface';
import BillInterface from './screens/BillInterface';
import PaimentInterface from './screens/PaimentInterface';
import ManagerInterface from './screens/ManagerInterface';
import ManagerAddProduct from './screens/ManagerAddProduct';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="BillInterface" component={BillInterface} options={{headerShown: false}} />
        <Stack.Screen name="PaimentInterface" component={PaimentInterface} options={{headerShown: false}} />
        <Stack.Screen name="ManagerConnection" component={ManagerConnection} options={{headerShown: false}} />
        <Stack.Screen name="ManagerInterface" component={ManagerInterface} options={{headerShown: false}} />
        <Stack.Screen name="ManagerCategoryInterface" component={ManagerCategoryInterface} options={{headerShown: false}} />
        <Stack.Screen name="ManagerProductInterface" component={ManagerProductInterface} options={{headerShown: false}} />
        <Stack.Screen name="ManagerAddProduct" component={ManagerAddProduct} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
