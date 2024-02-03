import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from 'expo-router';


import exercises from "../../assets/data/exercises.json";

const ExerciseDetailScreen = () => {
  const params = useLocalSearchParams();
  const exercise = exercises.find((e) => e.name === params.name);

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
        <Text style={styles.instructions} >{exercise.instructions}</Text>
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
});
