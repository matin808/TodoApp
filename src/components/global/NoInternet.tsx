import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, View } from "react-native";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";

export default function NoInternet({ setIsConnected }: {setIsConnected: (val: boolean) => void}) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="wifi-off" size={64} color="#ff4d4f" />
        </View>
        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.subtitle}>
          Please check your connection and try again.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setIsConnected(true)}>
          <Text style={styles.buttonText}>Try it</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fafbfc',
      padding: 24,
    },
    iconContainer: {
      marginBottom: 24,
      backgroundColor: '#ffeaea',
      borderRadius: 50,
      padding: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 8,
      color: '#333',
    },
    subtitle: {
      color: '#888',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 32,
    },
    button: {
      backgroundColor: '#ff4d4f',
      paddingHorizontal: 40,
      paddingVertical: 14,
      borderRadius: 30,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
  });