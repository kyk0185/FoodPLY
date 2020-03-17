import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import MainTop from './MainTop';
import LoginAnJoin from './LoginAnJoin';
import FoodListDetails from './FoodListDetails';
import ShoppingCart from './ShoppingCart';
import GoToOrder from './GoToOrder';
import Payment from './Payment';
import PaymentResults from './PaymentResults';
import SearchModal from './SearchModal';
import Certification from './Certification';

const { store, persistor } = configureStore();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Menu(props) {
  return (
    <Container>
      <Content>
        <Image source={require('./assets/food8.webp')} style={{ width: 280, height: 150, justifyContent: 'center', alignItems: 'center', resizeMode: 'cover' }} />
        <DrawerItemList {...props} />
      </Content>
    </Container>
  )
}

function DrawerComponent() {
  return (
    <Drawer.Navigator drawerContent={props => <Menu {...props} />}>
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
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="Home"> 
              <Stack.Screen name="Home" component={DrawerComponent} options={{ headerShown: false }}></Stack.Screen>
              <Stack.Screen name="FoodListDetails" component={FoodListDetails} options={{ headerShown: false }}></Stack.Screen>
              <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false }}></Stack.Screen>
              <Stack.Screen name="GoToOrder" component={GoToOrder} options={{ headerShown: false }}></Stack.Screen>
              <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}></Stack.Screen>
              <Stack.Screen name="PaymentResults" component={PaymentResults} options={{ headerShown: false }}></Stack.Screen>
              <Stack.Screen name="SearchModal" component={SearchModal}></Stack.Screen>
              <Stack.Screen name="Certification" component={Certification} options={{ headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}


