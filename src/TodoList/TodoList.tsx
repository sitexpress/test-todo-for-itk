import { Container, SimpleGrid } from '@mantine/core';
import { FilterTodosType, StatusTodosType, TodoListLCDataType } from '@/App.page';
import { TodoItem } from '../TodoItem/TodoItem';
import { useState } from 'react';

interface CardsMockDataType {
  mockData: TodoListLCDataType[];
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: StatusTodosType) => void;
  filterTodos: FilterTodosType;
  editTask:(id: string, newTitle: string) => void;
}

export const TodoList: React.FC<CardsMockDataType> = ({
  mockData,
  removeTask,
  changeStatus,
  filterTodos,
  editTask
}) => {
    const [newTitle, setNewTitle] = useState<string>("");
  const cards = mockData.map((todoItem, i) =>
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
      />
    )
  );

  return (
    <Container size="xl" py="xl">
      <SimpleGrid cols={{ base: 1 }} spacing="xs" >
        {cards}
      </SimpleGrid>
    </Container>
  );
};
