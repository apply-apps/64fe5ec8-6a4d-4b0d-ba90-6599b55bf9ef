// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
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
            <TouchableOpacity style={styles.button} onPress={fetchFlirtSpruch}>
                <Text style={styles.buttonText}>Neuer Flirtspruch</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 20, // Avoid overlap with status bar
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    box: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    flirtSpruch: {
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});