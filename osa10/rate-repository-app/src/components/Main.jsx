import { StyleSheet, SafeAreaView} from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepositoryPage from './SingleRepositoryPage';
import AppBar from './AppBar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
});

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:repoId" element={<SingleRepositoryPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/"  replace />} />
      </Routes>
    </SafeAreaView>
  );
};

export default Main;