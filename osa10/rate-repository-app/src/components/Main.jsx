import { StyleSheet, SafeAreaView} from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SingleRepositoryPage from "./SingleRepositoryPage";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SubmitReview from "./ReviewForm";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  }
});

const Main = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:repoId" element={<SingleRepositoryPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<SubmitReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/"  replace />} />
      </Routes>
    </SafeAreaView>
  );
};

export default Main;