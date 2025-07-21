import { StackScreenProps } from '@react-navigation/stack';
import { Item } from '../components/Home/TodoItem';

export type RootStackParamList = {
  Home: undefined;
  Form: {item?: Item | undefined, isEdit?: boolean | undefined } | undefined;
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type TodoFormScreenProps = StackScreenProps<RootStackParamList, 'Form'>;
