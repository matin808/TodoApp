import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addTodo, editTodo } from '../../store/todo/todoSlice';
import { TodoFormScreenProps } from '../../navigation/types';
import { colors } from '../../utils/constants/color';

const TodoForm: React.FC<TodoFormScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const { item, isEdit } = route?.params ?? {};
  const [todoText, setTodoText] = useState<string | undefined>(isEdit ? item?.title : '');
  const dispatch = useDispatch<AppDispatch>();

  const handleEditTodo = () => {
    try {
      const newTodo = {
        ...item,
        title: todoText && todoText.trim(),
        updatedAt: new Date().toString(),
      };

      dispatch(editTodo(newTodo));
      setTodoText('');
      Alert.alert('Success', 'Task Edited successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add task item. Please try again.');
    }
  }
  
  const handleAddTodo =  () => {
      const newTodo = {
        id: Date.now().toString(),
        title: todoText && todoText.trim(),
        completed: false,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };

      dispatch(addTodo(newTodo));

      setTodoText('');
      Alert.alert('Success', 'Task item added successfully!');
    
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Icon name="arrow-back" size={25} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Add Today Task</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your todo item..."
            placeholderTextColor={colors.placeholder}
            value={todoText}
            onChangeText={setTodoText}
            multiline={true}
            maxLength={200}
            returnKeyType="done"
            onSubmitEditing={handleAddTodo}
          />
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={isEdit ? handleEditTodo : handleAddTodo}
          disabled={!todoText}
          activeOpacity={0.8}
        >
  
          <Text style={styles.addButtonText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_80
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection:"row",
    alignItems:"center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginLeft: 10
  },
  formContainer: {
    padding: 20,
    flex: 1
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    minHeight: 80,
    maxHeight: 120,
    textAlignVertical: 'top',
    paddingRight: 40
  },

  addButton: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: 15
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8
  }
})

export default TodoForm