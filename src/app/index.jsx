import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from "react-native";
import { gql } from "graphql-request";
import { Redirect, Stack } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";


import ExerciseListItem from "../components/ExerciseListItem";
import graphQLClient from "../graphqlClient.js";
import { useAuth } from "../providers/AuthContext.jsx";


const exercisesQuery = gql`
query exercises($muscle: String, $name: String, $offset: Int) {
  exercises(muscle: $muscle, name: $name, offset: $offset) {
    name
    muscle
    equipment
  }
}
`;


export default function ExercisesScreen() {

  const { username } = useAuth();
  const [search, setSearch] = useState('');
  const searchValue = useDebounce(search?.trim(), 500);

  const { data, isLoading, error, fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["exercises", searchValue],
    queryFn: async ({ pageParam = 0 }) => {
      const { exercises } = await graphQLClient.request(exercisesQuery, { offset: pageParam, name: searchValue });
      return exercises;
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * 10;
    },
  });




  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!data) {
    return <Text>No data</Text>;
  }
  if (!username) {
    return <Redirect href={'/auth'} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={
        {
          headerSearchBarOptions: {
            placeholder: 'Search',
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            hideWhenScrolling: false,
          }
        }
      } />

      <FlatList
        data={data.pages.flatMap(page => page)}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <ExerciseListItem exercise={item} />}
        keyExtractor={(item, index) => item.name + index}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        contentInsetAdjustmentBehavior="automatic"
        style={{ padding: 10 }}
      />
      {isFetching && <ActivityIndicator />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
