import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface MetricItem {
    waterIntake: number;
    sleep: number;
    mood: string;
    date: string; // Assuming date is a string to be converted to Date object
};

export default function HistoryScreen() {
    const authContext = useContext(AuthContext); // Ensure user type is defined in AuthContext

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { token } = authContext;
    const [metrics, setMetrics] = useState<MetricItem[]>([]); // Store the health metrics data
    const [loading, setLoading] = useState(true); // Loading indicator state

    // Fetch the metrics data when the component is mounted
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                let api = "http://10.0.2.2:3000/api/metrics"
                const response = await axios.get(api,{
                    headers:{
                        Authorization: `Bearer ${token}` 
                    }
                });
                
                setMetrics(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            } 
        };

        console.log(loading)

        fetchMetrics();
    },[]);

    // If data is still loading, show a loading indicator
    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
        </View>
        );
    }

    // // If there are no metrics to display, show a placeholder message
    // if (!loading) {
    //     return (
    //     <View style={styles.container}>
    //         <Text style={styles.noDataText}>No health metrics found.</Text>
    //     </View>
    //     );
    // }

    // Render the list of metrics
    if(!loading){
        return (
            <View style={styles.container}>
            <FlatList
                data={metrics}
                renderItem={({item }) => (
                <View style={styles.metricItem}>
                    <Text style={styles.metricText}>Water Intake: {item.waterIntake} L</Text>
                    <Text style={styles.metricText}>Sleep Hours: {item.sleep} hours</Text>
                    <Text style={styles.metricText}>Mood: {item.mood}</Text>
                    <Text style={styles.metricDate}>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
                )}
            />
            </View>
        );
    }
}

// Styles for the screen components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    metricItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    metricText: {
        fontSize: 16,
        marginBottom: 4,
    },
    metricDate: {
        fontSize: 14,
        color: '#888',
        marginTop: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});
