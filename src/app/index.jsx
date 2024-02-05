import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

import ExerciseListItem from "../components/ExerciseListItem";
import graphQLClient from "../graphqlClient.js";

const exercisesQuery = gql`
query exercises($muscle: String, $name: String) {
  exercises(muscle: $muscle, name: $name) {
    name
    muscle
    equipment
  }
}
`;


export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const { exercises } = await graphQLClient.request({ document: exercisesQuery, });
      return exercises;
    },
  }
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <ExerciseListItem exercise={item} />}
        keyExtractor={(__, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
