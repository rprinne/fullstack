import { useMutation } from "@apollo/client";
import { DELETE_REVIEW} from "../graphql/mutations";
import { ME } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (reviewId) => {
    const result = await mutate({
      variables: {
        deleteReviewId: reviewId,
      },
      refetchQueries: [{
        query: ME,
        variables: { includeReviews: true}
        },
      ],
      awaitRefetchQueries: true,
    });
    return result;
  };

  return [deleteReview, result];
};

export default useDeleteReview;