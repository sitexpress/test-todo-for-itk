import { playSound } from 'react-sounds';
import { Button, Container, Flex } from '@mantine/core';
import { FilterTodosType } from '@/App.page';

type TodoFilter = {
  filterTodos: FilterTodosType;
  setFilterTodos: (value: FilterTodosType) => void;
};

export const TodoFilter: React.FC<TodoFilter> = ({ filterTodos, setFilterTodos }) => {
  const tabsSound = () => playSound('ui/input_focus');

  return (
    <Container size="sm">
      <Flex direction="row" justify="center" gap="sm" mt="lg">
        <Button
          variant={filterTodos === 'all' ? 'gradient' : 'light'}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={() => {setFilterTodos('all');tabsSound()}}
          w="120"
        >
          Все
        </Button>
        <Button
          variant={filterTodos === 'done' ? 'gradient' : 'light'}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={() => {setFilterTodos('done');tabsSound()}}
          w="120"
        >
          Активные
        </Button>
        <Button
          variant={filterTodos === 'active' ? 'gradient' : 'light'}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={() => {setFilterTodos('active');tabsSound()}}
          w="120"
        >
          Завершены
        </Button>
      </Flex>
    </Container>
  );
};
