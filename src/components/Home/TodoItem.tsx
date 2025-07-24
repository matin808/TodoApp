import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/constants/color';
import CheckBox from '@react-native-community/checkbox';

export interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  updatedAt: string;
  createdAt: string;
}

interface ITodoItem {
  item: Item;
  onToggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  handleEditForm: (item: Item) => void;
}

const formatDate = (dateInput: string) => {
  const date = new Date(dateInput);

  return date?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true   
  });
};

const TodoItem = React.memo(
  ({ item, onToggleComplete, deleteTodo, handleEditForm }: ITodoItem) => {
    return (
      <View
        style={[
          styles.todoCard,
          item?.completed
            ? { borderLeftColor: 'green' }
            : { borderLeftColor: 'grey' },
        ]}
      >
        <View style={styles.todoHeader}>
          <View style={{ maxWidth: '70%' }}>
            <Text
              style={[
                styles.todoTitle,
                item.completed && styles.completedTitle,
              ]}
            >
              {item.title}
            </Text>
            <Text style={styles.statusText}>
              {item.completed ? '✅ Completed' : '⏳ Pending'}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEditForm(item)}
              activeOpacity={0.7}
            >
              <Icon name="mode-edit" color={'grey'} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => deleteTodo(item.id)}
              activeOpacity={0.7}
            >
              <Icon name="delete-forever" color={'red'} size={20} />
            </TouchableOpacity>
            <CheckBox
              tintColors={{
                true: '#4cd137',
                false: '#222',
              }}
              boxType="circle"
              value={item?.completed}
              onValueChange={() => {
                onToggleComplete(item.id);
              }}
            />
          </View>
        </View>

        {/* Timestamps */}
        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>
            Created: {formatDate(item.createdAt)}
          </Text>
          <Text style={styles.timestamp}>
            Updated: {formatDate(item.updatedAt)}
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  todoCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 7,
  },
  todoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flex: 1,
    width: '100%',
  },

  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
    lineHeight: 22,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.darkGrey,
  },
  statusText: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timestampContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  timestamp: {
    fontSize: 12,
    color: colors.black,
    marginBottom: 2,
  },
});

export default TodoItem;
