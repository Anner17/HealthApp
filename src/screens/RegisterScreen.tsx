import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native'; // Import NavigationProp type

// Define the props type for the component
interface RegisterScreenProps {
  navigation: NavigationProp<any>; // Navigation type
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [username, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const register = async (): Promise<void> => {
        try {
            let api = "http://10.0.2.2:3000/api/register"
            await axios.post(api, { username, email, password }).then((res)=>{
                console.log(`res: ${res}`)
            });
            navigation.navigate('Login');
        } catch (error: any) { // Optional: Explicitly type the error as 'any' for now
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Name"
            value={username}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
        />
        <Button title="Register" onPress={register} />
        <Text onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default RegisterScreen;
