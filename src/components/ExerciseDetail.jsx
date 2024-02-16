import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NewSetInput from "./NewSetInput";

const ExerciseDetail = ({ exercise }) => {
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    return (
        <View style={styles.container}>
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
            <NewSetInput exerciseName={exercise.name} />
        </View>
    )
}
export default ExerciseDetail;

const styles = StyleSheet.create({
    container: {
        gap: 5,
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