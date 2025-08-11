import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-screens';

// Example Colors object (replace with your own)
const Colors = {
  white: '#f6f6f6ff',
};

type Props = {};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.searchbar}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchbar:{
    flex:1,
    backgroundColor: "#ffff",
    borderRadius:5,
    paddingVertical:8,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
