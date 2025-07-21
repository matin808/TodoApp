import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Retry = ({ refetch }: { refetch: () => void,}) => {
  return (
    <View style={styles.viewCentered}>
      <Text>Something went wrong, please try again leter</Text>
      <TouchableOpacity onPress={refetch}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  viewCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Retry;
