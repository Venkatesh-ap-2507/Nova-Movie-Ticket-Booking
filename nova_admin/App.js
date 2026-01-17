import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthLoadingScreen from './src/Pages/AuthLoadingScreen/AuthLoadingScreen';
import LoginScreen from './src/Pages/LoginPage/LoginPage';
import DashBoard from './src/Pages/DashBoard/DashBoard';
import CustomDrawer from './src/Components/CustomDrawer/CustomDrawer';
import ScreensPage from './src/Pages/ScreensPage/ScreensPage';
import BlankScreen from './src/Pages/Blank';
import { useNavigation, useRoute } from '@react-navigation/native';
import AddNewScreen from './src/Pages/AddNewScreen/AddNewScreen';
import ScreenDetail from './src/Pages/ScreenDetail/ScreenDetail';
import MoviesDashboard from './src/Pages/MoviesDashboard/MoviesDashboard';
import AddCast from './src/Pages/Cast/AddCast';
import Cast from './src/Pages/Cast/Cast';
import MovieCastList from './src/Pages/Cast/MovieCastList';
import MovieBoard from './src/Pages/MovieBoard/MovieBoard';
import ShowsDashboard from './src/Pages/ShowsDashboard/ShowsDashboard';
import AddMovie from './src/Pages/MovieBoard/AddMovie';
import MovieOverview from './src/Pages/MovieOverview/MovieOverview';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews', // suppress just this warning
]);

// import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs({ initialTab }) {
  return (
    <Tab.Navigator
      initialRouteName={initialTab || 'DashBoard'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = {
            DashBoard: 'home',
            Screens: 'grid',
            Movies: 'film',
            Shows: 'tv',
          }[route.name] || 'ellipse';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="DashBoard" component={DashBoard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Screens" component={ScreensPage} options={{ title: 'Screens' }} />
      <Tab.Screen name="Movies" component={MoviesDashboard} />
      <Tab.Screen name="Shows" component={ShowsDashboard} />

    </Tab.Navigator>
  );
}

function BottomTabsWrapper() {
  const route = useRoute();
  const screen = route.params?.screen;

  return <BottomTabs initialTab={screen} />;
}

// function BottomTabsWrapper({ route }) {
//   const { screen } = route.params || {};
//   return <BottomTabs initialTab={screen} />;
// }


function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="DashboardDrawer"
        component={BottomTabsWrapper}
        initialParams={{ screen: 'DashBoard' }}
        options={{ title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="ScreensDrawer"
        component={BottomTabsWrapper}
        initialParams={{ screen: 'Screens' }}
        options={{ title: 'Screens' }}
      />
      <Drawer.Screen
        name="BlankDrawer"
        component={BottomTabsWrapper}
        initialParams={{ screen: 'Screens' }}
        options={{ title: 'Blank Screen' }}
      />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="addNewScreen" component={AddNewScreen} options={{ title: 'Add new screen' }} />
        <Stack.Screen name="ScreenDetail" component={ScreenDetail} options={{ title: 'Screen Info' }} />

        {/* <Stack.Screen name="Cast" component={Cast} options={{ title: 'Cast' }} /> */}
        <Stack.Screen
          name="Cast"
          component={Cast}
          options={({ navigation }) => ({
            title: 'Cast',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddCast')}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="add" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="AddCast" component={AddCast} options={{ title: 'Add Cast' }} />

        <Stack.Screen
          name="MovieBoard"
          component={MovieBoard}
          options={({ navigation }) => ({
            title: 'Movie Board',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddMovie')}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="add" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="MovieOverview"
          component={MovieOverview}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="MovieCastList"
          component={MovieCastList}
          options={({ route, navigation }) => ({
            title: " Casts of " + route.params?.title || 'Cast',
          })}
        />

        <Stack.Screen name="AddMovie" component={AddMovie} 
        // options={{ title: 'Add Movie' }} 
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
