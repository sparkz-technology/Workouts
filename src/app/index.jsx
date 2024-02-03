import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";

import exercises from "../../assets/data/exercises.json";
import ExerciseListItem from "../components/ExerciseListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
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
