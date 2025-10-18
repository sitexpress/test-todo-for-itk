import { ChangeEvent, useState } from 'react';
import { IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { Button, Checkbox, CloseButton, Flex, Paper, Text, TextInput } from '@mantine/core';
import { FilterTodosType, StatusTodosType } from '@/App.page';
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
}) => {
  // const [newTitle, setNewtitle] = useState<string>(title);
  const [error, setError] = useState<
    '' | '*название не должно превышать 140 символов!' | '*название не может быть пустым!'
  >('');
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const onCloseHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    removeTask(id);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const value = e.currentTarget.value;
    if (!value.trim().length) {
      setNewTitle('');
      return setError('*название не может быть пустым!');
    }
    setNewTitle(value);
  };

  const onEditTitleHandler = (actionType: string, id?: string) => {
    if (actionType === 'edit') {
      setIsTitleEdit(true);
      setNewTitle(title);
    }
    if (actionType === 'save') {
      if (isTitleEdit) {
        if (!newTitle.trim().length) {
          return setError('*название не может быть пустым!');
        }
        if (newTitle.length > 140) {
          return setError('*название не должно превышать 140 символов!');
        }
        setError('');
        setIsTitleEdit(false);
        id && editTask(id, newTitle);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, title: string, id?: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!newTitle.trim().length) {
        return setError('*название не может быть пустым!');
      }

      if (newTitle.length > 140) {
        return setError('*название не должно превышать 140 символов!');
      }
      setError('');
      setIsTitleEdit(false);
      id && editTask(id, newTitle);
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setNewTitle(title);
      setIsTitleEdit(false);
    }
  };

  const onChangeStatusHandler = (id: string, status: StatusTodosType) => {
    if (isTitleEdit) {
      return;
    }
    changeStatus(id, status === 'active' ? 'done' : 'active');
  };

  return (
    <Paper
      withBorder
      mt={0}
      radius="md"
      className={classes.card}
      onClick={() => onChangeStatusHandler(id, status)}
    >
      <Text
        fz="sm"
        fw={500}
        // c={status === 'done' ? 'teal.6' : 'orange.8'}
        c="white"
        w="20"
        className={classes.status}
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
          {isTitleEdit ? (
            <TextInput
              w="250"
              autoFocus
              error={!!error && error}
              value={newTitle}
              placeholder="Введите название задачи"
              size="xs"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e, title, id)}
            />
          ) : (
            <Text
              className={classes.title}
              size="md"
              style={{ maxWidth: '600px' }}
              maw={600}
              miw={100}
              w="100%"
              ta="left"
              // lineClamp={3}
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
              onEditTitleHandler('edit');
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

          <Button size="xs" variant="light" color="red.4" onClick={(e) => onCloseHandler(e, id)}>
            <CloseButton component="span" variant="transparent" />
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
};
