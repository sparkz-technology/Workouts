import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { useAuth } from '../providers/AuthContext';

const AuthScreen = () => {
    const [localUsername, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setUsername, username } = useAuth();

    const onSignIn = () => {
        setUsername(localUsername);
    };

    if (username) {
        return <Redirect href={'/'} />;
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (

        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign In" }} />
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    value={localUsername}
                    onChangeText={setLocalUsername}
                    placeholder="Enter your username"
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Enter your password"
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text >
                Forgot your password ?{' '}
                <Text style={{ color: 'blue' }} onPress={() => console.log('Forgot password')}>
                    Reset
                </Text>
            </Text>
            <TouchableOpacity onPress={onSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        color: 'dimgray',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gainsboro',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    eyeButton: {
        padding: 10,
        position: 'absolute',
        right: 0,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,

    },
});

export default AuthScreen;
