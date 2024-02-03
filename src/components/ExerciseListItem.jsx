import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from 'expo-router';

const ExerciseListItem = ({ exercise }) => {
    return (
        <Link href={`/${exercise.name}`} asChild >
            <Pressable style={styles.exerciseContainer}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseSubtitle}>
                    <Text style={styles.subValue}>
                        {exercise.muscle}
                    </Text> |{" "}
                    <Text style={styles.subValue}>
                        {exercise.equipment}
                    </Text>
                </Text>
            </Pressable>
        </Link>
    );
};

export default ExerciseListItem;


const styles = StyleSheet.create({
    exerciseContainer: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 10,
        gap: 10,
        marginHorizontal: 2,
        // shadow from https://ethercreative.github.io/react-native-shadow-generator/
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
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