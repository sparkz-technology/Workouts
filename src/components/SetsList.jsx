import { ActivityIndicator, Text, FlatList, StyleSheet } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import graphQLClient from "../graphqlClient.js";

const setsQuery = gql`
  query MyQuery($exercise: String!) {
    sets(exercise: $exercise){
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: [`sets ${exerciseName}`], // 👈 query key is an array with the query name and the exercise name
        queryFn: () => graphQLClient.request(setsQuery, { exercise: exerciseName }),
    });

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }
    return (
        <FlatList
            data={data.sets.documents}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Text style={styles.stack}>
                    {item.reps} x {item.weight}
                </Text>
            )}
            keyExtractor={(item) => item._id.toString()}
        />
    );
};

export default SetsList;

const styles = StyleSheet.create({
    stack: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 5,
        overflow: "hidden",
    }
});