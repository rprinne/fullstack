import * as yup from 'yup';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import useSignIn from '../hooks/useSignIn';
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
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm = ({onSubmit, errorMessage}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View onSubmit={formik.handleSubmit} style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.textBox}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        secureTextEntry
        onChangeText={formik.handleChange('password')}
        style={styles.textBox}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable
        testID='signInButton'
        onPress={formik.handleSubmit}
        style={styles.submitButton}>
        <Text color="textWhite">Sign in</Text>
      </Pressable>
      <Text style={{ color: 'red' }}>{errorMessage}</Text>
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { data, loading, error }] = useSignIn();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      if (error?.message) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return <SignInForm onSubmit={onSubmit} errorMessage={errorMessage} />
};

export default SignIn;