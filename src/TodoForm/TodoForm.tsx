import { ChangeEvent, useState } from 'react';
import { playSound } from 'react-sounds';
import { Button, Container, Flex, TextInput } from '@mantine/core';
import { TodoItemAnimationType } from '@/pages/Todo-page/Todo.page';

type TodoFormType = {
  addTask: (value: string) => void;
  setTodoItemAnimation: (value: TodoItemAnimationType) => void;
};

export const TodoForm: React.FC<TodoFormType> = ({ addTask, setTodoItemAnimation }) => {
  const [error, setError] = useState<
    '' | '*название не должно превышать 140 символов!' | '*название не может быть пустым!'
  >('');
  const [inputText, setInputText] = useState<string>('');
  const addTaskSound = () => playSound('ui/input_focus');
  const addTaskSoundError = () => playSound('notification/error');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setInputText(e.currentTarget.value);
  };

  const onAddTask = () => {
    if (!inputText.trim().length) {
      addTaskSoundError();
      setError('*название не может быть пустым!');
      return;
    }

    if (inputText.length > 140) {
      addTaskSoundError();
      return setError('*название не должно превышать 140 символов!');
    }
    addTaskSound();
    setTodoItemAnimation('animate__animated animate__bounceIn');
    addTask(inputText);
    setInputText('');
    setTimeout(() => {
      setTodoItemAnimation('');
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!inputText.trim().length) {
        addTaskSoundError();
        return setError('*название не может быть пустым!');
      }

      if (inputText.length > 140) {
        addTaskSoundError();
        return setError('*название не должно превышать 140 символов!');
      }
      addTaskSound();
      setTodoItemAnimation('animate__animated animate__bounceIn');
      addTask(inputText);
      setInputText('');
      setTimeout(() => {
        setTodoItemAnimation('');
      }, 500);
    }
  };

  return (
    <Container size="xl" mt="xs">
      <Flex direction="row" justify="space-between" align="start" gap={10}>
        <div style={{ position: 'relative', minHeight: '40px', width: '100%' }}>
          <TextInput
            error={!!error && error}
            value={inputText}
            placeholder="Введите название задачи"
            size="xs"
            w="100%"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
          />
        </div>

        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size="xs"
          onClick={onAddTask}
          mt={0}
        >
          +
        </Button>
      </Flex>
    </Container>
  );
};
