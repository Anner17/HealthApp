import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Toast from 'react-native-toast-message';

// Define types for the navigation prop
type HealthMetricsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HealthMetrics'>;
type HealthMetricsScreenRouteProp = RouteProp<RootStackParamList, 'HealthMetrics'>;

interface Props {
  navigation: HealthMetricsScreenNavigationProp;
  route: HealthMetricsScreenRouteProp;
}

export default function HealthMetricsScreen({ navigation }: Props) {
    const authContext = useContext(AuthContext); // Ensure user type is defined in AuthContext

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { token } = authContext;

    const [waterIntake, setWaterIntake] = useState<string>('');
    const [sleepHours, setSleepHours] = useState<string>('');
    const [mood, setMood] = useState<string>('Happy');

    const submitMetrics = async () => {
        try {
            let api = "http://10.0.2.2:3000/api/metrics"
            let response = await axios.post(api, {
                waterIntake,
                sleepHours,
                mood,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if(response.data.feedback)
                message(response.data.feedback);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Water Intake (Liters)"
            value={waterIntake}
            keyboardType="numeric"
            onChangeText={setWaterIntake}
        />
        <TextInput
            style={styles.input}
            placeholder="Sleep Hours"
            value={sleepHours}
            keyboardType="numeric"
            onChangeText={setSleepHours}
        />
        <Picker selectedValue={mood} onValueChange={setMood} style={styles.input}>
            <Picker.Item label="Happy" value="Happy" />
            <Picker.Item label="Neutral" value="Neutral" />
            <Picker.Item label="Stressed" value="Stressed" />
        </Picker>
        <Button title="Submit Metrics" onPress={submitMetrics} />
        <Button title="View History" onPress={() => navigation.navigate('History')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
function message(text: string) {
    Toast.show({
        type: 'success',
        text1: text,
        position: 'top',
        text2: 'This is a toast message.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30, 
        bottomOffset: 40
    });
}

