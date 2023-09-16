import React from 'react';
// import TabNavigator from './TabNavigator'
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyDrawer  from '../screens/drawer'
import Home from "../screens/home";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="ChooseMode" 
    
    
    screenOptions={{ headerShown: false}}
    
    
    drawerContent={props => <MyDrawer {...props} />} 
    
    
    drawerStyle = {{width: '100%'}} drawerType={'slide'} drawerType={'back'}>
        <Drawer.Screen name="Home" component={Home}  screenOptions={{ headerShown: false}} />

    </Drawer.Navigator>
  );
}