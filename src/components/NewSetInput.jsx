import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const NewSetInput = () => {
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const handleAddSet = () => {
        console.log("Add set", reps, weight);

        setReps("");
        setWeight("");
    };
    return (
        <View style={styles.container}>
            <TextInput placeholder="Reps" style={styles.input} value={reps}
                onChangeText={setReps} keyboardType='numeric' />
            <TextInput placeholder="Weight" style={styles.input} value={weight}
                onChangeText={setWeight} keyboardType='numeric' />
            <Button title="Add" style={styles.button} onPress={handleAddSet} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        gap: 10,
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gainsboro",
        flex: 1,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "dodgerblue",
        color: "white",
    },
});

export default NewSetInput;