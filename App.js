import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from './Components/config';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Dashboard from './Screens/Dashboard';
import ForgotPass from './Screens/ForgotPass';
import BookSeat from './Screens/BookSeat';
import CheckRegStaff from './Screens/CheckRegStaff';
import LostFoundStaff from './Screens/LostFoundStaff';
import StudentLostFound from './Screens/StudentLostFound';
import StudentLocation from './Screens/StudentLocation';
import RegistrationStudent from './Screens/RegistrationStudent';
import EmergencyRegisterStudent from './Screens/EmergencyRegisterStudent';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  //handle user state changes
  function onAuthStateChanged(user){
    setUser(user);

    if(initializing)
      setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(!user){
    return (
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
        </Stack.Navigator>
    );
  }

  return(
    <Stack.Navigator screenOptions = {{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name='CheckRegStaff' component={CheckRegStaff}/>
      <Stack.Screen name='LostFoundStaff' component={LostFoundStaff}/>
      <Stack.Screen name="BookSeat" component={BookSeat} />
      <Stack.Screen name='StudentLostFound' component={StudentLostFound}/>
      <Stack.Screen name='StudentLocation' component={StudentLocation}/>
      <Stack.Screen name='RegistrationStudent' component={RegistrationStudent}/>
      <Stack.Screen name='EmergencyRegisterStudent' component={EmergencyRegisterStudent}/>
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}