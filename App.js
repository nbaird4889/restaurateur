import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, ScrollView, Linking, Pressable, TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import restaurants from './restaurants.js'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useState } from 'react';

const image = require('./assets/images/home-background.jpg')
const imageTwo = require('./assets/images/randomize.jpg')

const MyTheme = {
  dark: true,
  colors: {
    primary: '#0C4767',
    background: 'white',
    card: '#E0DFD5',
    text: 'black',
    border: '#E0DFD5',
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
  const [restaurant, setRestaurant] = useState('Hampton + Hudson')
  const [town, setTown] = useState('Inman Park')
  const [type, setType] = useState('American')
  const [price, setPrice] = useState('$$')
  const [website, setWebsite] = useState('https://www.hamptonandhudson.com/')

  const getPlace = (event) => {
    event.preventDefault();
    let restaurant = restaurants[Math.floor((Math.random() * restaurants.length))];
    setRestaurant(restaurant.name);
    setTown("Part of Town: " + restaurant.part_of_town);
    setType("Type: " + restaurant.type);
    setPrice("Price Point: " + restaurant.price)
    setWebsite(restaurant.website)
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageTwo} style={{ width: '100%', height: '100%'}}>
      <View style={styles.imagecontainer}>
        <Text style={styles.name}>{restaurant}</Text>
        <Text style={styles.details}>{town}</Text>
        <Text style={styles.details}>{type}</Text>
        <Text style={styles.details}>{price}</Text>
        <Text style={styles.details}>
          <Text
              style={styles.hyperlink}
              onPress={() => {
              Linking.openURL(website);
              }}>Website</Text></Text>
        <Pressable
          style={styles.button}
          onPress={getPlace}
        >
          <Text style={styles.text}>Randomize</Text>
          </Pressable>
        </View>
      </ImageBackground>
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
            <View key={index} style={styles.restaurantCard}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Part of Town: </Text>{restaurant.part_of_town}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Type: </Text> {restaurant.type}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Price Point: </Text> {restaurant.price}</Text>
              <Text style={styles.details}>
                <Text
                  style={styles.hyperlink}
                  onPress={() => {
                  Linking.openURL(restaurant.website);
              }}>Website</Text></Text>
            </View>
        )
        }  
          return (
            <View style={styles.restaurantCardOdd}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Part of Town: </Text>{restaurant.part_of_town}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Type: </Text> {restaurant.type}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Price Point: </Text> {restaurant.price}</Text>
              <Text style={styles.details}>
                <Text
                  style={styles.hyperlink}
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
  const [name, setName] = useState('')
  const [part_of_town, setPartOfTown] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [website, setWebsite] = useState('')

  const restaurantArr = restaurants

  const handleSubmit = (event) => {
    event.preventDefault();
    restaurantArr.push({name, part_of_town, type, price, website});
    setName({name: ""})
};

  return (
  <View style={styles.form}>
    <Text style={styles.label}>Restaurant Name:</Text>
    <TextInput
      style={styles.input} 
      onChangeText = {(value) => setName(value)}
      placeholder='Hampton + Hudson'
    />
    <Text style={styles.label}>Part of Town:</Text>
    <TextInput
      style={styles.input} 
      onChangeText = {(value) => setPartOfTown(value)}
      placeholder='Inman Park'
    />
    <Text style={styles.label}>Type:</Text>
    <TextInput
      style={styles.input} 
      onChangeText = {(value) => setType(value)}
      placeholder='American'
    />
    <Text style={styles.label}>Price Point:</Text>
    <TextInput
      style={styles.input} 
      onChangeText = {(value) => setPrice(value)}
      placeholder='Scale of $ - $$$$'
    />
    <Text style={styles.label}>Website (URL):</Text>
    <TextInput
      style={styles.input} 
      onChangeText = {(value) => setWebsite(value)}
      placeholder='https://www.hamptonandhudson.com/'
    />
    <Pressable style={styles.submit} onPress={handleSubmit}>
      <Text style={styles.text}>Add Restaurant</Text>
    </Pressable>
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
        tabBarInactiveTintColor: '#8896AB',
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}/>
    <Tab.Screen 
      name="Restaurants"
      component={IndexScreen}
      options={{
        tabBarInactiveTintColor: '#8896AB',
        tabBarLabel: 'Where to Eat',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="silverware-fork-knife" color={color} size={size} />
        ),
      }} />

      <Tab.Screen 
      name="Randomize" 
      component={RandomizeScreen}
      options={{
        tabBarInactiveTintColor: '#8896AB',
        tabBarLabel: 'Randomize',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="pasta" color={color} size={size} />
        ),
      }}/>

    <Tab.Screen 
      name="Add"
      component={AddScreen}
      options={{
        tabBarInactiveTintColor: '#8896AB',
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
  form: {
    flex: 1,
    backgroundColor: '#0B6E4F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#E0DFD5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  restaurantContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  restaurantCard: {
    backgroundColor: '#e6c619', 
    padding: 20,
  },

  restaurantCardOdd: {
    backgroundColor: '#0B6E4F', 
    padding: 20,
  },

  name: {
    textAlign: 'center',
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 26,
    paddingBottom: 10
  },

  details: {
    textAlign: 'center',
    color: 'white', 
    fontSize: 20,
    paddingBottom: 8
  },

  hyperlink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold', 
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
  },

  imageTwo: {
    flex: 1, 
    resizeMode: 'cover'
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
  },

  button: {
    backgroundColor: '#0B6E4F',
    padding: 10,
    margin: 25
  },

  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    padding: 10, 
    backgroundColor: '#f5f5f5',
    width: '75%', 
    marginBottom: 20
  }, 

  label: {
    color: 'white',
    fontWeight: 'bold', 
    fontSize: 22, 
    paddingBottom: 10
  },

  submit: {
    backgroundColor: '#AA1155',
    padding: 10,
    margin: 10
  }

});
