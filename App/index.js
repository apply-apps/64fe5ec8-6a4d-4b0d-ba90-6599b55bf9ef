// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [flirtSpruch, setFlirtSpruch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchFlirtSpruch = async () => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: "Generiere einen neuen Flirtspruch." }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            const resultString = data.response;
            setFlirtSpruch(resultString);
        } catch (error) {
            console.error("Error fetching new flirtSpruch: ", error);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Flirt App</Text>
            <View style={styles.box}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Text style={styles.flirtSpruch}>{flirtSpruch}</Text>
                )}
            </View>
            <Button title="Neuer Flirtspruch" onPress={fetchFlirtSpruch} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    box: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    flirtSpruch: {
        fontSize: 18,
        textAlign: 'center',
    },
});