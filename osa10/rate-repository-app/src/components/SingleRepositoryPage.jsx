import { StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import Text from "./Text";

import useRepository from "../hooks/useRepository";
import { RepositoryItem } from "./RepositoryItem";
import { ReviewList } from "./ReviewList";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const SingleRepositoryPage = () => {
  const { repoId } = useParams();
  const { repository, loading, fetchMore, error } = useRepository(repoId);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading the repository</Text>;
  }
  if (!repository) {
    return <Text> No repository found with the id {repoId} </Text>; 
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <ReviewList
      listHeaderComponent={
        <RepositoryItem item={repository} singleView />
      }
      reviews={repository.reviews}
      onEndReach = {onEndReach}
    />
  );
};

export default SingleRepositoryPage;