import { ActivityIndicator, Text, FlatList, StyleSheet } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import graphQLClient from "../graphqlClient.js";

const setsQuery = gql`
  query MyQuery {
    sets {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ ListHeaderComponent }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["sets"],
        queryFn: () => graphQLClient.request(setsQuery)
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