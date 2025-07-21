import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import TodoForm from '../screens/TodoForm';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={TodoForm} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;