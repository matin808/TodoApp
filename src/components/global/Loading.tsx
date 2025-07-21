import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constants/color'

const Loading = () => {
  return (
    <View style={styles.viewCentered}>
    <ActivityIndicator color={colors.black} size={20} />
  </View>
  )
}

const styles = StyleSheet.create({
    viewCentered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Loading