import { Box, LoadingOverlay } from '@mantine/core';
import { useEffect, useReducer, useState } from 'react';
import { playSound } from 'react-sounds';
import { v4 } from 'uuid';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Welcome } from './components/Welcome/Welcome';
import { TodoFilter } from './TodoFilter/TodoFilter';
import { TodoForm } from './TodoForm/TodoForm';
import { TodoList } from './TodoList/TodoList';
import { TodoStats } from './TodoStats/TodoStats';

export type TodoItemAnimationType = 'animate__animated animate__bounceIn' | '';

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
  | { type: 'ADD_TASK'; title: string; id: string }
  | { type: 'EDIT_TASK'; id: string; newTitle: string }
  | { type: 'REMOVE_TASK'; id: string }
  | { type: 'CHANGE_STATUS'; id: string; status: StatusTodosType };

export function AppPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterTodos, setFilterTodos] = useState<FilterTodosType>('all');
  const [todoListLCData, dispatch] = useReducer(reducer, initialData);
  const [todoItemAnimation, setTodoItemAnimation] = useState<TodoItemAnimationType>('');
  const [addedTaskId, setAddedId] = useState('');

  const systemBootUp = () => playSound('system/boot_up');

  function reducer(state: TodoListLCDataType[], action: Action): TodoListLCDataType[] {
    switch (action.type) {
      case 'INITIALIZE_TODO':
        return [...action.initialData];
      case 'ADD_TASK':
        return [{ id: action.id, title: action.title, status: 'active' }, ...state];
      case 'EDIT_TASK':
        return state.map((item) =>
          item.id === action.id
            ? { id: item.id, title: action.newTitle, status: item.status }
            : item
        );
      case 'CHANGE_STATUS':
        return state.map((item) =>
          item.id === action.id ? { ...item, status: action.status } : item
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
    const addedTaskId = v4();
    setAddedId(addedTaskId);
    dispatch({ type: 'ADD_TASK', title, id: addedTaskId });
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

  useEffect(() => {
    systemBootUp();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  return (
    <>
      <Box pos="relative" style={{ minHeight: '100vh' }}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
        <Header />
        <Welcome isLoading={isLoading} />
        <TodoStats todoListLCData={todoListLCData} />
        <TodoForm addTask={addTask} setTodoItemAnimation={setTodoItemAnimation} />
        <TodoFilter filterTodos={filterTodos} setFilterTodos={setFilterTodos} />
        <TodoList
          mockData={todoListLCData}
          removeTask={removeTask}
          changeStatus={changeStatus}
          filterTodos={filterTodos}
          editTask={editTask}
          todoItemAnimation={todoItemAnimation}
          setTodoItemAnimation={setTodoItemAnimation}
          addedTaskId={addedTaskId}
        />
        <Footer />
      </Box>
    </>
  );
}
