import { useState } from 'react';
import { Container, SimpleGrid } from '@mantine/core';

import { TodoItem } from '../TodoItem/TodoItem';
import { FilterTodosType, StatusTodosType, TodoItemAnimationType, TodoListLCDataType } from '@/pages/Todo-page/Todo.page';

interface CardsMockDataType {
  mockData: TodoListLCDataType[];
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: StatusTodosType) => void;
  filterTodos: FilterTodosType;
  editTask: (id: string, newTitle: string) => void;
  todoItemAnimation: TodoItemAnimationType;
  setTodoItemAnimation: (value: TodoItemAnimationType) => void;
  addedTaskId: string;
}

export const TodoList: React.FC<CardsMockDataType> = ({
  mockData,
  removeTask,
  changeStatus,
  filterTodos,
  editTask,
  todoItemAnimation,
  addedTaskId,
  setTodoItemAnimation,
}) => {
  const [newTitle, setNewTitle] = useState<string>('');
    const [editedTaskId, setEditedTaskId] = useState('');
  const cards = mockData.map(
    (todoItem, i) =>
      todoItem.status !== filterTodos && (
        <TodoItem
          key={i}
          {...todoItem}
          removeTask={removeTask}
          changeStatus={changeStatus}
          filterTodos={filterTodos}
          editTask={editTask}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          todoItemAnimation={todoItemAnimation}
          addedTaskId={addedTaskId}
          setTodoItemAnimation={setTodoItemAnimation}
          editedTaskId={editedTaskId}
          setEditedTaskId={setEditedTaskId}
        />
      )
  );

  return (
    <Container size="xl" py="xl" style={{ minHeight: '25vh' }}>
      <SimpleGrid cols={{ base: 1 }} spacing="xs">
        {cards}
      </SimpleGrid>
    </Container>
  );
};
