import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import MainTop from './MainTop';
import LoginAnJoin from './LoginAnJoin';
import FoodListDetails from './FoodListDetails'
import ShoppingCart from './ShoppingCart'
import GoToOrder from './GoToOrder'
import Payment from './Payment'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainTop} options={{ drawerLabel: 'Home', drawerIcon: ({ focused, size }) => (<FontAwesome size={size} name={'home'} />) }}></Drawer.Screen>
      <Drawer.Screen name="Details" component={LoginAnJoin} options={{ drawerLabel: 'Users', drawerIcon: ({ focused, size }) => (<FontAwesome size={size} name={'users'} />) }}></Drawer.Screen>
      <Drawer.Screen name="ShoppingCart" component={ShoppingCart} options={{ drawerLabel: 'Cart', drawerIcon: ({ focused, size }) => (<FontAwesome size={size} name={'shopping-cart'} />) }}></Drawer.Screen>
    </Drawer.Navigator>
  )
}
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="FoodListDetails" component={FoodListDetails} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="GoToOrder" component={GoToOrder} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}


