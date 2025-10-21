import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { Center, Flex, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import { TodoListLCDataType } from '@/App.page';

type NumberOfTasksType = {
  todoListLCData: TodoListLCDataType[];
};

export const TodoStats: React.FC<NumberOfTasksType> = ({ todoListLCData }) => {
  const allTasks = todoListLCData.length;
  const activeTasks = todoListLCData.filter(item => item.status === 'active' && item).length;
  const finishedTasks = todoListLCData.filter(item => item.status === 'done' && item).length;

  const activeTasksPercentage = (activeTasks / allTasks) * 100;
  const activeFinishedTasksPercentage = (finishedTasks / allTasks) * 100;

  const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
  };

  const data = [
    { label: 'Все задачи', stats: `${allTasks}`, progress: 100, color: 'blue', icon: 'up' },
    {
      label: 'В процессе',
      stats: `${activeTasks}`,
      progress: Number(`${activeTasksPercentage}`),
      color: 'orange',
      icon: 'up',
    },
    {
      label: 'Выполнено',
      stats: `${finishedTasks}`,
      progress: Number(`${activeFinishedTasksPercentage}`),
      color: 'teal.4',
      icon: 'down',
    },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper radius="md" key={stat.label}>
        <Flex direction="column" justify="center" align="center">
          <RingProgress
            size={60}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size={20} stroke={1.5} />
              </Center>
            }
          />

          <Flex direction="column" justify="center" align="center">
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xs">
              {stat.stats}
            </Text>
          </Flex>
        </Flex>
      </Paper>
    );
  });

  return (
    <Flex justify="center" mt={20}>
      <SimpleGrid cols={{ base: 3, sm: 1 }}>{stats}</SimpleGrid>
    </Flex>
  );
};
