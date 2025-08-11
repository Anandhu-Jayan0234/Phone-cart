import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>

      <Tabs.Screen name='explore' options={{
        title: 'Home',
        tabBarIcon: ({color}) => (
          <Ionicons name='home-outline' size={22} color={color} />
        )
      }} />

            <Tabs.Screen name='index' options={{
        title: 'Orders',
        tabBarIcon: ({color}) => (
          <Ionicons name='bag-handle-outline' size={22} color={color} />
        )
      }} />

      <Tabs.Screen name='cart' options={{
        title: 'Cart',
        tabBarIcon: ({color}) => (
          <Ionicons name='cart-outline' size={22} color={color} />
        )
      }} />
            <Tabs.Screen name='notifications' options={{
        title: 'Whishlist',
        tabBarIcon: ({color}) => (
          <Ionicons name='heart-outline' size={22} color={color} />
        )
      }} />
      <Tabs.Screen name='profile' options={{
        title: 'Account',
        tabBarIcon: ({color}) => (
          <Ionicons name='person-outline' size={22} color={color} />
        )
      }} />
    </Tabs>
  );
}