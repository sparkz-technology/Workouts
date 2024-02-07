import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import graphQLClient from "../graphqlClient.js";


const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster0"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = ({ exerciseName }) => {
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");

    const { mutate, isPending, error } = useMutation({
        mutationFn: (newSet) => graphQLClient.request(mutationDocument, { newSet }),
        onError: (error) => console.error(error),
        onSettled: () => console.log("Mutation completed"),

    })
    const handleAddSet = () => {
        console.log("Add set", reps, weight);
        mutate({
            reps: parseInt(reps), weight: parseFloat(weight)
            , exercise: exerciseName
        });


        setReps("");
        setWeight("");
    };
    return (
        <View style={styles.container}>
            <View style={styles.row} >
                <TextInput placeholder="Reps" style={styles.input} value={reps}
                    onChangeText={setReps} keyboardType='numeric' />
                <TextInput placeholder="Weight" style={styles.input} value={weight}
                    onChangeText={setWeight} keyboardType='numeric' />
                <Button title={isPending ? "Adding..." : "Add Set"}
                    style={styles.button} onPress={handleAddSet} />
            </View>
            {error &&
                <Text style={{ color: "red" }}>
                    Failed to add set
                </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        gap: 5,
    },
    row: {
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