import { Container, SimpleGrid } from '@mantine/core';
import { FilterTodosType, TodoListLCDataType } from '@/App.page';
import { TodoItem } from '../TodoItem/TodoItem';

interface CardsMockDataType {
  mockData: TodoListLCDataType[];
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: 'active' | 'done') => void;
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
  const cards = mockData.map((todoItem, i) =>
    todoItem.status !== filterTodos && (
      <TodoItem
        key={i}
        {...todoItem}
        removeTask={removeTask}
        changeStatus={changeStatus}
        filterTodos={filterTodos}
        editTask={editTask}
      />
    )
  );

  return (
    <Container size="xl" py="xl">
      <SimpleGrid cols={{ base: 1 }} spacing="xl" mt={50}>
        {cards}
      </SimpleGrid>
    </Container>
  );
};
