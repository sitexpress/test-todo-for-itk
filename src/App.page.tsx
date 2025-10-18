import { useEffect, useReducer, useState } from 'react';
import { v4 } from 'uuid';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Welcome } from './components/Welcome/Welcome';
import { TodoFilter } from './TodoFilter/TodoFilter';
import { TodoForm } from './TodoForm/TodoForm';
import { TodoList } from './TodoList/TodoList';
import { TodoStats } from './TodoStats/TodoStats';

export type FilterTodosType = 'all' | 'active' | 'done';
export type StatusTodosType = 'active' | 'done';
export type TodoListLCDataType = {
  id: string;
  title: string;
  status: StatusTodosType;
};

const initialData: TodoListLCDataType[] = [];

type Action =
  | { type: 'INITIALIZE_TODO'; initialData: TodoListLCDataType[] }
  | { type: 'ADD_TASK'; title: string }
  | { type: 'EDIT_TASK'; id: string; newTitle: string }
  | { type: 'REMOVE_TASK'; id: string }
  | { type: 'CHANGE_STATUS'; id: string; status: StatusTodosType };

export function AppPage() {
  const [filterTodos, setFilterTodos] = useState<FilterTodosType>('all');
  const [todoListLCData, dispatch] = useReducer(reducer, initialData);

  function reducer(state: TodoListLCDataType[], action: Action): TodoListLCDataType[] {
    switch (action.type) {
      case 'INITIALIZE_TODO':
        return [...action.initialData];
      case 'ADD_TASK':
        return [{ id: v4(), title: action.title, status: 'active' }, ...state];
      case 'EDIT_TASK':
        return state.map((item) =>
          item.id === action.id
            ? { id: item.id, title: action.newTitle, status: item.status }
            : item
        );
      case 'CHANGE_STATUS':
        return state.map((item) =>
          item.id === action.id ? { id: action.id, title: item.title, status: action.status } : item
        );

      case 'REMOVE_TASK':
        return state.filter((item) => item.id !== action.id);
      default:
        todoListLCData;
        throw new Error('Unknown action type');
    }
  }
  const initializeTodoList = (value: TodoListLCDataType[]) => {
    dispatch({ type: 'INITIALIZE_TODO', initialData: value });
  };

  const addTask = (title: string) => {
    dispatch({ type: 'ADD_TASK', title });
  };

  const editTask = (id: string, newTitle: string) => {
    dispatch({ type: 'EDIT_TASK', id, newTitle });
  };

  const removeTask = (id: string) => {
    dispatch({ type: 'REMOVE_TASK', id });
  };

  const changeStatus = (id: string, status: StatusTodosType) => {
    dispatch({ type: 'CHANGE_STATUS', id, status });
  };

  useEffect(() => {
    const savedData = localStorage.getItem('todo-list-test');
    if (!savedData) {
      localStorage.setItem('todo-list-test', JSON.stringify([]));
      initializeTodoList([]);
    } else {
      const parsedData = JSON.parse(savedData);
      initializeTodoList([...parsedData]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-list-test', JSON.stringify(todoListLCData));
  }, [todoListLCData]);

  return (
    <>
      <Header />
      <Welcome />
      <TodoStats todoListLCData={todoListLCData} />
      <TodoForm addTask={addTask} />
      <TodoFilter filterTodos={filterTodos} setFilterTodos={setFilterTodos} />
      <TodoList
        mockData={todoListLCData}
        removeTask={removeTask}
        changeStatus={changeStatus}
        filterTodos={filterTodos}
        editTask={editTask}
      />
      <Footer />
    </>
  );
}
