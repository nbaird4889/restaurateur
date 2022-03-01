import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, ScrollView, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import restaurants from './restaurants.js'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const image = require('./assets/images/home-background.jpg')

const MyTheme = {
  dark: true,
  colors: {
    primary: '#bcbcbc',
    background: 'white',
    card: '#10564F',
    text: 'white',
    border: '#10564F',
    notification: 'rgb(255, 69, 58)',
  },
};


const HomeScreen = (props) => {
  return (
  <View style={styles.container}>
   <ImageBackground source={image} style={{ width: '100%', height: '100%'}}>
      <View style={styles.imagecontainer}>
        <Text style={styles.headline}>Restaurateur</Text>
        <Text style={styles.subhead}>Want to try a new restaurant? Or can't decide what you're craving? Restaurateur can help!</Text>
        <Text style={styles.subhead}>Just click on <Text style={{fontStyle: 'italic'}}>Where to Eat</Text> for recommended restaurants or <Text style={{fontStyle: 'italic'}}>Randomize</Text> if you want us to help you decide!</Text>
      </View>
   </ImageBackground>
  </View>
  )
};

const RandomizeScreen = (props) => {
  return (
  <View style={styles.container}>
    
  </View>
  )
};

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.restaurantContainer}>
    <ScrollView>
      {restaurants.map((restaurant, index) => {
        {if(index % 2 === 0 )
          return (
            <View style={styles.restaurantCard}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.details}>{restaurant.part_of_town}</Text>
              <Text style={styles.details}>{restaurant.type}</Text>
              <Text style={styles.details}>{restaurant.price}</Text>
              <Text style={styles.details}>
                <Text
                  style={styles.hyperlinkStyle}
                  onPress={() => {
                  Linking.openURL(restaurant.website);
              }}>Website</Text></Text>
            </View>
        )
        }  
          return (
            <View style={styles.restaurantCardOdd}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.details}>{restaurant.part_of_town}</Text>
              <Text style={styles.details}>{restaurant.type}</Text>
              <Text style={styles.details}>{restaurant.price}</Text>
              <Text style={styles.details}>
                <Text
                  style={styles.hyperlinkStyle}
                  onPress={() => {
                  Linking.openURL(restaurant.website);
              }}>Website</Text></Text>
            </View>
        )
      })}
    </ScrollView>
    </SafeAreaView>
  )
};

const AddScreen = () => {
  return (
  <View style={styles.container}>
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
        tabBarInactiveTintColor: 'white',
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}/>
    <Tab.Screen 
      name="Restaurants"
      component={IndexScreen}
      options={{
        tabBarInactiveTintColor: 'white',
        tabBarLabel: 'Where to Eat',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="silverware-fork-knife" color={color} size={size} />
        ),
      }} />

      <Tab.Screen 
      name="Randomize" 
      component={RandomizeScreen}
      options={{
        tabBarInactiveTintColor: 'white',
        tabBarLabel: 'Randomize',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="pasta" color={color} size={size} />
        ),
      }}/>

    <Tab.Screen 
      name="Add"
      component={AddScreen}
      options={{
        tabBarInactiveTintColor: 'white',
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
    <NavigationContainer theme={MyTheme}>
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

  restaurantContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  restaurantCard: {
    backgroundColor: '#43AA8B', 
    padding: 20,
  },

  restaurantCardOdd: {
    backgroundColor: '#FF6F59', 
    padding: 20,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
  },

  imagecontainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },

  headline: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  subhead: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    margin: 20,
  }
});
