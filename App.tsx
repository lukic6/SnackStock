import { StyleSheet, Text, View, Pressable } from 'react-native';
import colors from './assets/Colors';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './Screens/Home';
import Settings from './Screens/Settings';
import Recipes from './Screens/Recipes';
import Saved from './Screens/Saved';
import ShoppingList from './Screens/ShoppingList';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '@tamagui/toast';

const Tab = createBottomTabNavigator();
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  colors: string;
}) {
  return <FontAwesome size={32} style={{ marginBottom: -8, color: props.colors }} {...props} />;
}

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{
    tabBarStyle: { position: 'absolute' },
    tabBarBackground: () => (
      <BlurView tint="light" intensity={60} style={StyleSheet.absoluteFill} />
    ),
    headerStyle: styles.header,
    headerShadowVisible: false
  }}>
    <Tab.Screen 
    name="Home" 
    component={Home} 
    options={{
      title: "Home",
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" colors={focused ? colors.darkGreen : color} />,
      headerShown: false,
      }}        
      />
    <Tab.Screen 
    name="Recipes" 
    component={Recipes}
    options={{
      title: "Recipes",
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: colors.darkGreen,
      tabBarIcon: ({ color, focused }) => <TabBarIcon name="cutlery" colors={focused ? colors.darkGreen : color}/>}} />
    <Tab.Screen 
    name="ShoppingList" 
    component={ShoppingList}
    options={{
      title: "ShoppingList",
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: colors.darkGreen,
      tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" colors={color} />}} />
    <Tab.Screen 
    name="Saved" 
    component={Saved}
    options={{
      title: "Saved",
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, focused }) => <TabBarIcon name="bookmark-o" colors={focused ? colors.darkGreen : color}/>}} 
      />
  </Tab.Navigator>
);

export default function App() { 
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  header: {
      backgroundColor: colors.white,
  },
  
});