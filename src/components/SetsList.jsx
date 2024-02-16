import { ActivityIndicator, Text, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import graphQLClient from "../graphqlClient.js";
import { useAuth } from "../providers/AuthContext.jsx";
import ProgressGraph from "./ProgressGraph.jsx";

const setsQuery = gql`
  query MyQuery($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const Stack = ({ handleFilter, filterOption, data }) => {
    return (
        <>
            {
                data.sets.documents.length === 0 ? (
                    <Text style={{ padding: 10, textAlign: "center" }}>No sets recorded yet</Text>
                ) :
                    <>
                        < ProgressGraph sets={data.sets.documents} />
                        <View style={styles.container}>
                            <Text style={{ padding: 10, fontSize: 20, fontWeight: "600" }}>Sets</Text>
                            <View style={styles.filterContainer}>
                                <TouchableOpacity style={[styles.filterButton, {
                                    backgroundColor: filterOption === "all" ? "#900bfc" : "#fff",
                                    borderColor: filterOption === "all" ? "#fff" : "#900bfc", borderWidth: 1
                                }]}
                                    onPress={() => handleFilter("all")}>
                                    <Text style={[styles.filterButtonTitle, { color: filterOption === "all" ? "#fff" : "#900bfc" },]}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.filterButton, {
                                    backgroundColor: filterOption === "last7" ? "#900bfc" : "#fff",
                                    borderColor: filterOption === "last7" ? "#fff" : "#900bfc", borderWidth: 1
                                }]}
                                    onPress={() => handleFilter("last7")}>
                                    <Text style={[styles.filterButtonTitle, { color: filterOption === "last7" ? "#fff" : "#900bfc" }]} >Last 7 days</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
            }
        </>
    )

}


const SetsList = ({ ListHeaderComponent, exerciseName }) => {
    const { username } = useAuth();
    const { data, error, isLoading } = useQuery({
        queryKey: [`sets ${exerciseName}`], // 👈 query key is an array with the query name and the exercise name
        queryFn: () => graphQLClient.request(setsQuery, { exercise: exerciseName, username }),
    });
    const [filterdata, setFilterdata] = useState([]);
    const [filterOption, setFilterOption] = useState("all");

    const handleFilter = (type) => {
        setFilterOption(type);
        if (type === "all") {
            setFilterdata(data?.sets.documents);
        } else if (type === "last7") {
            const last7Days = data?.sets.documents.slice(-7);
            setFilterdata(last7Days);
        }
    }
    useEffect(() => {
        setFilterdata(data?.sets.documents);
    }, [data]);


    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }
    return (<>
        <FlatList
            data={filterdata}
            ListHeaderComponent={() => (<>
                <ListHeaderComponent />
                <Stack
                    handleFilter={handleFilter}
                    filterOption={filterOption}
                    data={data}
                />
            </>)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <>
                    <Text style={styles.stack}>
                        {item.reps} x {item.weight}
                    </Text>
                </>
            )}
            keyExtractor={(item) => item._id}
        />
    </>
    );
};

export default SetsList;

const styles = StyleSheet.create({
    stack: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 2,
        overflow: "hidden",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 5,
    },

    filterContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        gap: 5,
        paddingHorizontal: 5,
    },
    filterButton: {
        padding: 10,
        backgroundColor: "#900bfc",
        borderRadius: 5,
        marginVertical: 5,
    },
    filterButtonTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    }
});