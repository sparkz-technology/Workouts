import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from 'expo-router';
import { gql, } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";

import graphQLClient from "../graphqlClient.js";
import SetsList from "../components/SetsList.jsx";
import ExerciseDetail from "../components/ExerciseDetail.jsx";


const exercisesQuery = gql`
query exercises($name: String) {
  exercises(name: $name) {
    name
    muscle
    equipment
    instructions
  }
}
`;

const ExerciseDetailScreen = () => {
  const { name } = useLocalSearchParams();
  const { data: exercise, isLoading, error } = useQuery({
    queryKey: [`exercises ${name}`],
    queryFn: async () => {
      const { exercises } = await graphQLClient.request({
        document: exercisesQuery,
        variables: { name },
      });
      return exercises[0];
    },
  }
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!exercise) {
    return (
      <View>
        <Text>Exercise not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />
      <SetsList
        exerciseName={exercise.name}
        ListHeaderComponent={() =>
          <ExerciseDetail
            exercise={exercise}
          />} />
    </View >
  );
};
export default ExerciseDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
