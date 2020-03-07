import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTop from './MainTop';
import LoginAnJoin from './LoginAnJoin';
import FoodListDetails from './FoodListDetails'
import ShoppingCart from './ShoppingCart'
import GoToOrder from './GoToOrder'


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={MainTop} options={{ title: 'Overview' }}></Stack.Screen>
            <Stack.Screen name="Details" component={LoginAnJoin} options={{ title: 'MyPage' }}></Stack.Screen>
            <Stack.Screen name="FoodListDetails" component={FoodListDetails} options={{ title: 'Details' }}></Stack.Screen>
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ title: 'ShoppingCart' }}></Stack.Screen>
            <Stack.Screen name="GoToOrder" component={GoToOrder} options={{ title: 'GoToOrder' }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}


