import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetTodosQuery } from '../../services/api/todoApi';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../components/global/Loading';
import AddTodoBtn from '../../components/Home/AddTodoBtn';
import TodoItem, { type Item } from '../../components/Home/TodoItem';
import { HomeScreenProps } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { colors } from '../../utils/constants/color';
import { deleteTodo } from '../../store/todo/todoSlice';

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [todosData, setTodosData] = useState<any>([]);
  const { isLoading } = useGetTodosQuery();
  const todos = useSelector((state: RootState) => state.todo.data);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'done'>('all');
  const dispatch = useDispatch()
  const totalTodos = todosData.length;
  const completedTodos = useMemo(
    () => todosData.filter((todo: Item) => todo?.completed)?.length,
    [todosData],
  );

  useEffect(() => {
      setTodosData(todos);
  }, [todos]);

  const onToggleComplete = useCallback((id: number) => {
    setTodosData((prevTodos: Item[]) =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date(),
            }
          : todo,
      ),
    );
  }, []);

  // delete Todo
  const deleteTodoItem = (id: number) => {
    const filteredList =  [...todosData].filter((todo: Item) => todo.id === id)
    dispatch(deleteTodo(filteredList[0]?.id))
  };

  // Edit todo
  const handleEditForm = useCallback((item: Item) => {
    navigation.navigate('Form', { item, isEdit: true });
  }, []);

  const filteredAndSortedTodos = () => {
    let filtered = todosData;

    // Filter data
    if (filterBy === 'active') {
      filtered = filtered.filter((todo: Item) => !todo.completed);
    } else if (filterBy === 'done') {
      filtered = filtered.filter((todo: Item) => todo.completed);
    }

    if (sortBy === 'recent') {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    if (sortBy === 'oldest') {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    return filtered;
  };

    // show loader
  if (isLoading) {
      return <Loading />;
  }
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, marginBottom: insets.bottom }]}>

      <Text style={styles.header}>Today Task</Text>
      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>
        Total: {totalTodos} | Completed: {completedTodos} | Remaining{' '}
        {totalTodos - completedTodos}
      </Text>

      {/* Filter Buttons */}
      <View style={styles.controlsContainer}>
        <View style={styles.filterRow}>
          {['all', 'active', 'done'].map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilterBy(type as any)}
            >
              <Text
                style={filterBy === type ? styles.activeFilter : styles.filter}
              >
                {type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    {/* Todo Lists */}
      <FlatList
        ListHeaderComponent={() => (
          <TouchableOpacity onPress={() => sortBy === 'recent' ? setSortBy('oldest') : setSortBy('recent')} style={styles.sortBtn}>
            <Text style={{color: colors.white}}>{sortBy === 'recent' ? 'Sort By Oldest first' : 'Sort By Latest first'}</Text>
          </TouchableOpacity>
        )}
        data={filteredAndSortedTodos()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggleComplete={onToggleComplete}
            deleteTodo={deleteTodoItem}
            handleEditForm={handleEditForm}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <AddTodoBtn handleAddTodo={() => navigation.navigate('Form')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.greyish,
    textAlign: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  separator: {
    height: 12,
  },
  controlsContainer: { paddingTop: 10 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-around' },
  filter: { padding: 6, color: '#888' },
  activeFilter: { padding: 6, fontWeight: 'bold', color: '#000' },
  sortBtn: {
    backgroundColor:colors.black,
    alignSelf: 'flex-end', 
    marginBottom: 10,
    borderRadius: 10,
    padding: 6,
    paddingHorizontal: 15,
  }
});

export default Home;
