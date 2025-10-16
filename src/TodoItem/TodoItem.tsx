import { FilterTodosType } from '@/App.page';
import {
  Button,
  Checkbox,
  CloseButton,
  Flex,
  Group,
  Paper,
  Text,
  TextInput
} from '@mantine/core';
import { IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import classes from './TodoItem.module.css';

type CardComponentTodoItem = {
  id: string;
  title: string;
  status: 'active' | 'done';
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: 'active' | 'done') => void;
  filterTodos: FilterTodosType;
  editTask: (id: string, newTitle: string) => void;
};

export const TodoItem: React.FC<CardComponentTodoItem> = ({
  id,
  title,
  status,
  removeTask,
  changeStatus,
  editTask,
}) => {
  const [error, setError] = useState<"" | "*название не должно превышать 140 символов!" | "*название не может быть пустым!">("");
  const [newTitle, setNewtitle] = useState<string>(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const onCloseHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    removeTask(id);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const value = e.currentTarget.value;
    if (!value.trim().length) {
      setNewtitle(value);
      return setError("*название не может быть пустым!");
    }

    setNewtitle(value);
  };

  const onEditTitleHandler = (actionType: string, id?: string) => {
    if (actionType === 'edit') {
      setIsTitleEdit(true);
    }
    if (actionType === 'save') {
      if (isTitleEdit) {
        if (!newTitle.trim().length) {
          return setError("*название не может быть пустым!");
        }
        if (newTitle.length > 140) {
          return setError("*название не должно превышать 140 символов!");
        }
        setError("");
        setIsTitleEdit(false);
        id && editTask(id, newTitle);
      }
    }
  };

  return (
    <Paper
      withBorder
      radius="md"
      className={classes.card}
      onClick={() => changeStatus(id, status === 'active' ? 'done' : 'active')}
    >
      <div className={classes.card_wrapper}>
        <Flex justify="center" align="center" gap={10}>
          <Checkbox
            onChange={() => changeStatus(id, status === 'active' ? 'done' : 'active')}
            checked={status === 'done'}
            iconColor="dark.8"
            size="md"
            color="teal.3"
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
            />
          ) : (
            <Text
              className={classes.title}
              size="lg"
              style={{ maxWidth: '600px' }}
              maw={600}
              miw={100}
              w="100%"
              ta="left"
              lineClamp={3}
              truncate="end"
              c={status === 'done' ? 'dimmed' : ''}
              td={status === 'done' ? 'line-through' : ''}
              p={10}
            >
              {title}
            </Text>
          )}
        </Flex>
        <Group>
          <Flex justify="center" align="center" gap={20}>
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
              c="teal.4"
              color="teal.4"
              size="xs"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onEditTitleHandler('save', id);
              }}
            >
              <IconDeviceFloppy />
            </Button>
            <Text fz="xs" c={status === 'done' ? 'teal.6' : 'orange.8'} w="20">
              {status}
            </Text>
            <CloseButton variant="transparent" onClick={(e) => onCloseHandler(e, id)} />
          </Flex>
        </Group>
      </div>
    </Paper>
  );
};
