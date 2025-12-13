import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const addReview = async ({ ownerName, repositoryName, rating, text }) => {
    const result = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating, text },
      },
    });
    apolloClient.resetStore();
    return result;
  };

  return [addReview, result];
};

export default useCreateReview;