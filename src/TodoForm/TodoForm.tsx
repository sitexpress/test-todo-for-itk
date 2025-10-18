import { ChangeEvent, useState } from 'react';
import { Button, Container, Flex, TextInput } from '@mantine/core';

type TodoFormType = {
  addTask: (value: string) => void;
};

export const TodoForm: React.FC<TodoFormType> = ({ addTask }) => {
  const [error, setError] = useState<
    '' | '*название не должно превышать 140 символов!' | '*название не может быть пустым!'
  >('');
  const [inputText, setInputText] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!inputText.trim().length) {
      setError('*название не может быть пустым!');
    }

    setError('');
    setInputText(e.currentTarget.value);
  };

  const onAddTask = () => {
    if (!inputText.trim().length) {
      setError('*название не может быть пустым!');
      return;
    }

    if (inputText.length > 140) {
      return setError('*название не должно превышать 140 символов!');
    }
    addTask(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!inputText.trim().length) {
        return setError('*название не может быть пустым!');
      }

      if (inputText.length > 140) {
        return setError('*название не должно превышать 140 символов!');
      }
      setError('');
      addTask(inputText);
      setInputText('');
    }
  };

  return (
    <Container size="xl" mt="xl">
      <Flex direction="row" justify="space-between" align="center" gap={10}>
        <TextInput
          error={!!error && error}
          value={inputText}
          placeholder="Введите название задачи"
          size="xs"
          w="100%"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={onAddTask}
        >
          +
        </Button>
      </Flex>
    </Container>
  );
};
