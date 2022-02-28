import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import restaurants from './restaurants.js'


const HomeScreen = (props) => {
  return (
  <View style={styles.layout}>

  </View>
  )
};

const RandomizeScreen = (props) => {
  return (
  <View style={styles.layout}>
    
  </View>
  )
};

const IndexScreen = () => {
  return (
    <View style={styles.layout}>
      {restaurants.map(restaurant => {
        return (
          <Text style={styles.title}>{restaurant.name}</Text>
        )
      })}
    </View>
  )
};

const AddScreen = () => {
  return (
  <View style={styles.layout}>
    <Text style={styles.title}>Add a Restaurant</Text>
  </View>
  )
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}/>
    <Tab.Screen 
      name="Restaurants"
      component={IndexScreen}
      options={{
        tabBarLabel: 'Where to Eat',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="silverware-fork-knife" color={color} size={size} />
        ),
      }} />

      <Tab.Screen 
      name="Randomize" 
      component={RandomizeScreen}
      options={{
        tabBarLabel: 'Randomize',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="pasta" color={color} size={size} />
        ),
      }}/>

    <Tab.Screen 
      name="Add"
      component={AddScreen}
      options={{
        tabBarLabel: 'Add Restaurant',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus" color={color} size={size} />
        ),
      }} />
  </Tab.Navigator>
  )
};

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
