import React from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const HamburgerIcon = (props) => {

  const toggleDrawer = () => {

    props.navigationProps.toggleDrawer();

  }
  return (

    <View style={{ flexDirection: 'row' }}>

      <TouchableOpacity onPress={toggleDrawer} >

        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />

      </TouchableOpacity>

    </View>

  );
}

const CustomSidebar = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const {
            drawerLabel,
            activeTintColor,
            groupName
          } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionView}>
                  <Text key={groupName} style={{ marginLeft: 10 }}>
                    {groupName}
                  </Text>
                  <View style={styles.separatorLine} />
                </View>
              ) : null}
              <DrawerItem
                key={route.key}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                }
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};