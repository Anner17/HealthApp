import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HealthMetricsScreen from '../screens/HealthMetricsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { Text } from 'react-native';


export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    HealthMetrics: undefined;
    History: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="HealthMetrics" component={HealthMetricsScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
