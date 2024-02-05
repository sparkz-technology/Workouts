import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from 'expo-router';
import { gql, request } from "graphql-request";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import graphQLClient from "../graphqlClient.js";
import { ActivityIndicator } from "react-native";


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
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />
      <View style={styles.panel} >
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
          <Text style={styles.subValue}>{exercise.equipment}</Text>
        </Text>
      </View>
      <View style={styles.panel} >
        <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3} >{exercise.instructions}</Text>
        <Text style={styles.seeMore}
          onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
        >
          {isInstructionExpanded ? "See Less" : "See More"}
        </Text>
      </View>
    </ScrollView >
  );
};
export default ExerciseDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  seeMore: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600",
    padding: 5,
  },
});
