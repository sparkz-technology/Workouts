import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#4f05e2",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,// white color
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
    propsForLabels: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#7300ff"
    }

};


const ProgressGraph = ({ sets }) => {
    const idToDay = (id) => {
        const timestamp = parseInt(id.substr(0, 8), 16) * 1000;
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    };

    const last7Days = sets && sets.length > 0 ? sets.slice(-7) : [];

    const points = last7Days.map((set) => ({
        day: idToDay(set._id),
        value: set.reps * set.weight,
    }));


    const data = {
        labels: points.map((point) => point.day),
        datasets: [
            {
                data: points.map((point) => Math.round(point.value)),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 5
            }
        ],
        legend: ["Weight x Reps"] // optional
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progress  Graph</Text>
            <LineChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                decorator={() => <Text style={styles.last7Sets}> Last 7 Sets</Text>}
            />

        </View>
    );
};

export default ProgressGraph;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    last7Sets: {
        position: 'absolute',
        right: 40 % screenWidth,
        top: 10,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    }

});