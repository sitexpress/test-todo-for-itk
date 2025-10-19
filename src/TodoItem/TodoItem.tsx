import { ChangeEvent, useState } from 'react';
import { IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { playSound } from 'react-sounds';
import { Button, Checkbox, CloseButton, Flex, Paper, Text, TextInput } from '@mantine/core';
import { FilterTodosType, StatusTodosType, TodoItemAnimationType } from '@/App.page';
import classes from './TodoItem.module.css';

type CardComponentTodoItem = {
  id: string;
  title: string;
  status: StatusTodosType;
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: StatusTodosType) => void;
  filterTodos: FilterTodosType;
  editTask: (id: string, newTitle: string) => void;
  newTitle: string;
  setNewTitle: (newTitle: string) => void;
  todoItemAnimation: TodoItemAnimationType;
  setTodoItemAnimation: (value: TodoItemAnimationType) => void;
  addedTaskId: string;
  editedTaskId: string;
  setEditedTaskId: (value: string) => void;
};

export const TodoItem: React.FC<CardComponentTodoItem> = ({
  id,
  title,
  status,
  removeTask,
  changeStatus,
  editTask,
  newTitle,
  setNewTitle,
  todoItemAnimation,
  setTodoItemAnimation,
  addedTaskId,
  editedTaskId,
  setEditedTaskId,
}) => {
  const [error, setError] = useState<
    '' | '*название не должно превышать 140 символов!' | '*название не может быть пустым!'
  >('');
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const doneTaskSound = () => playSound('ui/tab_close');
  const undoneTaskSound = () => playSound('ui/radio_select');
  const errAddTaskSound = () => playSound('notification/error');
  const removeTaskSound = () => playSound('ui/toggle_on');
  const editTaskSound = () => playSound('ui/window_close');
  const saveTaskSound = () => playSound('ui/window_open');
  const rejectTaskSound = () => playSound('system/lock');

  const onCloseHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    removeTask(id);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setError('');
    const value = e.currentTarget.value;
    if (!value.trim().length) {
      setNewTitle('');
      return setError('*название не может быть пустым!');
    } else if (addedTaskId === id) {
      setNewTitle(value);
    }
    setNewTitle(value);
  };

  const onEditTitleHandler = (actionType: string, id?: string) => {

    if (actionType === 'edit') {
      setIsTitleEdit(true);
      editTaskSound();
      setNewTitle(title);
      setTodoItemAnimation('animate__animated animate__bounceIn');
      setTimeout(() => {
        setTodoItemAnimation('');
      }, 500);
    }
    if (actionType === 'save') {
  
      if (isTitleEdit) {
        if (!newTitle.trim().length) {
          errAddTaskSound();
          return setError('*название не может быть пустым!');
        }
        if (newTitle.length > 140) {
          errAddTaskSound();
          return setError('*название не должно превышать 140 символов!');
        }
        setIsTitleEdit(false);
        saveTaskSound();
        setError('');
        id && editTask(id, newTitle);
        setTodoItemAnimation('animate__animated animate__bounceIn');
        setTimeout(() => {
          setTodoItemAnimation('');
        }, 500);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, title: string, id?: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!newTitle.trim().length) {
        errAddTaskSound();
        return setError('*название не может быть пустым!');
      }

      if (newTitle.length > 140) {
        errAddTaskSound();
        return setError('*название не должно превышать 140 символов!');
      }
      saveTaskSound();
      setError('');
      setIsTitleEdit(false);
      id && editTask(id, newTitle);
      setTodoItemAnimation('animate__animated animate__bounceIn');
      setTimeout(() => {
        setTodoItemAnimation('');
      }, 500);
    }

    if (e.key === 'Escape') {
      rejectTaskSound();
      setError('');
      e.preventDefault();
      setNewTitle(title);
      setIsTitleEdit(false);
    }
  };

  const onChangeStatusHandler = (id: string, status: StatusTodosType) => {
    // if (isTitleEdit) {
    //   return;
    // }

    changeStatus(id, status === 'active' ? 'done' : 'active');
    status === 'active' && doneTaskSound();
    status === 'done' && undoneTaskSound();
  };

  return (
    <Paper
      withBorder
      mt={0}
      radius="md"
      className={`${addedTaskId === id && todoItemAnimation}, ${status === 'done' ? classes.card_done : classes.card}`}
      onClick={() => onChangeStatusHandler(id, status)}
    >
      <Text
        fz="sm"
        fw={500}
        c="white"
        w="20"
        className={`${addedTaskId === id && todoItemAnimation}, ${classes.status}`}
      >
        {status}
      </Text>

      <Flex justify="space-between" align="center" gap={10} wrap="wrap">
        <Flex justify="center" align="center" gap={10}>
          <Checkbox
            onChange={() => onChangeStatusHandler(id, status)}
            checked={status === 'done'}
            iconColor="dark.8"
            size="md"
            color="teal.3"
            pl={10}
          />
          {isTitleEdit && id === editedTaskId ? (
            <TextInput
              className={`${editedTaskId === id && todoItemAnimation}`}
              w="250"
              autoFocus
              error={!!error && error}
              value={newTitle}
              placeholder="Введите название задачи"
              size="xs"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e, id)}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e, title, id)}
            />
          ) : (
            <Text
              className={`${editedTaskId === id && todoItemAnimation} ${classes.title}`}
              size="md"
              style={{ maxWidth: '600px' }}
              maw={600}
              miw={100}
              w="100%"
              ta="left"
              truncate="end"
              c={status === 'done' ? 'dimmed' : ''}
              td={status === 'done' ? 'line-through' : ''}
              p={10}
            >
              {title}
            </Text>
          )}
        </Flex>
        <Flex justify="end" align="center" gap={10} flex="1">
          <Button
            variant="light"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            size="xs"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onEditTitleHandler('edit', id);
              setEditedTaskId(id);
            }}
          >
            <IconEdit />
          </Button>
          <Button
            variant="light"
            gradient={{ from: 'green', to: 'cyan', deg: 90 }}
            color="teal.4"
            size="xs"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onEditTitleHandler('save', id);
            }}
          >
            <IconDeviceFloppy />
          </Button>

          <Button
            size="xs"
            variant="light"
            color="red.4"
            onClick={(e) => {
              onCloseHandler(e, id);
              removeTaskSound();
            }}
          >
            <CloseButton component="span" variant="transparent" />
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
};
