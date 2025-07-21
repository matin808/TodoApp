import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/constants/color';

const AddTodoBtn = React.memo(({handleAddTodo} :{ handleAddTodo : () => void}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      accessibilityLabel="Add new todo"
      accessibilityRole="button"
      style={styles.fab}
      onPress={handleAddTodo}
    >
      <Icon name="plus" size={25} color={colors.lightGrey} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: colors.black,
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
});

export default AddTodoBtn;
