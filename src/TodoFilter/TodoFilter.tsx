import { Button, Container, Flex } from '@mantine/core';
import { FilterTodosType } from '@/App.page';

type TodoFilter = {
  setFilterTodos: (value: FilterTodosType) => void;
};

export const TodoFilter: React.FC<TodoFilter> = ({ setFilterTodos }) => {
  return (
    <Container size="sm">
      <Flex direction="row" justify="center" gap="sm" mt="lg">
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={() => setFilterTodos('all')}
          w="120"
        >
          Все
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={() => setFilterTodos('done')}
          w="120"
        >
          Активные
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={() => setFilterTodos('active')}
          w="120"
        >
          Выполненные
        </Button>
      </Flex>
    </Container>
  );
};
