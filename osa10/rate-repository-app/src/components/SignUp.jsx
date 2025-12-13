import * as yup from "yup";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import useCreateUser from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  textBox: {
    width: "100%",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  submitButton: {
    width: "100%",
    alignSelf: "flex-start",
    backgroundColor: "#0366d6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

const initialValues = {
  username: "",
  password1: "",
  password2: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password1: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  password2: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password1"), null], "Passwords do not match"),
});

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={styles.textBox}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password1}
        secureTextEntry
        onChangeText={formik.handleChange("password1")}
        style={styles.textBox}
      />
      {formik.touched.password1 && formik.errors.password1 && (
        <Text style={{ color: "red" }}>{formik.errors.password1}</Text>
      )}
      <TextInput
        placeholder="Password confirmation"
        value={formik.values.password2}
        secureTextEntry
        onChangeText={formik.handleChange("password2")}
        style={styles.textBox}
      />
      {formik.touched.password2 && formik.errors.password2 && (
        <Text style={{ color: "red" }}>{formik.errors.password2}</Text>
      )}
      <Pressable
        testID='signUpButton'
        onPress={formik.handleSubmit}
        style={styles.submitButton}>
        <Text color="textWhite">Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [addUser] = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password1 } = values;
    const addUserResult = await addUser({ username, password: password1 });

    if (addUserResult.data) {
      const signInResult = await signIn({username, password: password1});
      if (signInResult) { navigate("/"); };
      console.log("signed up!", addUserResult, signInResult);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;