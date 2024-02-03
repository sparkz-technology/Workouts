import { StyleSheet, Text, View } from "react-native";

const ExerciseListItem = ({ exercise }) => {
    return (
        <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseSubtitle}>
                <Text style={styles.subValue}>
                    {exercise.muscle}
                </Text> |{" "}
                <Text style={styles.subValue}>
                    {exercise.equipment}
                </Text>
            </Text>
        </View>
    );
};

export default ExerciseListItem;


const styles = StyleSheet.create({
    exerciseContainer: {
        backgroundColor: "#f9c2ff",
        padding: 10,
        borderRadius: 10,
        gap: 10,
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
});