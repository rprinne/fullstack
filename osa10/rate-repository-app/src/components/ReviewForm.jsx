import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  textBox: {
    width: '100%',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  submitButton: {
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  reviewText: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Username is required'),
  repositoryName: yup
    .string()
    .required('Password is required'),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0).max(100).integer(),
});

export const ReviewForm = ({onSubmit, errorMessage}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View onSubmit={formik.handleSubmit} style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={styles.textBox}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={styles.textBox}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating"
        keyboardType='numeric'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={styles.textBox}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Write the optional review here"
        multiline={true}
        value={formik.values.reviewText}
        onChangeText={formik.handleChange('reviewText')}
        style={styles.textBox}
      />
      <Pressable
        testID='reviewButton'
        onPress={formik.handleSubmit}
        style={styles.submitButton}>
        <Text color="textWhite">Create a review</Text>
      </Pressable>
      <Text style={{ color: 'red' }}>{errorMessage}</Text>
    </View>
  );
};

const SubmitReview = () => {
  const [addReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, reviewText } = values;
    
    try {
      const result = await addReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text: reviewText,
      });
      console.log("from onsubmit", result)
      
      if (result.data) {
        navigate(`/repository/${result.data.createReview.repositoryId}`)
      };
    } catch (error) {
      console.log(error);
    }
  }

  return <ReviewForm onSubmit={onSubmit}/>
}

export default SubmitReview;