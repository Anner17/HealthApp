import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Define the shape of the decoded JWT token
interface DecodedToken {
    id: string;
    email: string;
    username: string;
}

// Define types for the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = authContext;

    const authenticate = async () => {
        try {
            let api = "http://10.0.2.2:3000/api/login"
            const response = await axios.post(api, { email, password });
            login(response.data.token);
            navigation.navigate('HealthMetrics');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
        />
        <Button title="Login" onPress={authenticate} />
        <Text onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
