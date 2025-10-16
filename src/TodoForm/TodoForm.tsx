import { ChangeEvent, useState } from 'react';
import { Button, Container, Flex, TextInput } from '@mantine/core';

type TodoFormType = {
  addTask: (value: string) => void;
};

export const TodoForm: React.FC<TodoFormType> = ({ addTask }) => {
  const [error, setError] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!inputText.trim().length) {
      setError(false);
    }
    setInputText(e.currentTarget.value);
  };

  const onAddTask = () => {
    if (!inputText.trim().length ) {
      setError(true);
      return;
    }
    addTask(inputText);
    setInputText('');
  };

  return (
    <Container size="xl" mt="xl">
      <Flex direction="row" justify="center" align="center" gap={10}>
        <TextInput
          error={error}
          value={inputText}
          placeholder="Введите название задачи"
          size="xs"
          w="50%"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={onAddTask}
        >
          Добавить
        </Button>
      </Flex>
    </Container>
  );
};
