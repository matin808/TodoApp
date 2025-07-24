/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import NoInternet from './src/components/global/NoInternet';
import Loading from './src/components/global/Loading';

function App() {
  const [isConnected, setIsConnected] = useState<undefined | boolean>();
  const [isChecked, setIschecked] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
      setIschecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!isChecked) {
    <Loading />
  }

  if (isChecked && !isConnected) {
    return <NoInternet setIsConnected={setIsConnected} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
