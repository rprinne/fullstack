import { StyleSheet, View} from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import BodyMassIndexCalculator from './BMI';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/bmi" element={<BodyMassIndexCalculator />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/"  replace />} />
      </Routes>
    </View>
  );
};

export default Main;