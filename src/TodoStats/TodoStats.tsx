import { IconArrowDownRight, IconArrowUpRight, IconHourglassEmpty } from '@tabler/icons-react';
import { Center, Flex, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import { TodoListLCDataType } from '@/pages/Todo-page/Todo.page';

type NumberOfTasksType = {
  todoListLCData: TodoListLCDataType[];
};

export const TodoStats: React.FC<NumberOfTasksType> = ({ todoListLCData }) => {
  const allTasks = todoListLCData.length;
  const activeTasks = todoListLCData.filter((item) => item.status === 'active' && item).length;
  const finishedTasks = todoListLCData.filter((item) => item.status === 'done' && item).length;

  const activeTasksPercentage = (activeTasks / allTasks) * 100;
  const activeFinishedTasksPercentage = (finishedTasks / allTasks) * 100;

  const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
    timer: IconHourglassEmpty,
  };

  const data = [
    { label: 'Все', stats: `${allTasks}`, progress: 100, color: 'blue', icon: 'up' },
    {
      label: 'В работе',
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
            <Text
              c="dimmed"
              size="xs"
              tt="uppercase"
              fw={700}
              style={{
                userSelect: 'none',
              }}
            >
              {stat.label}
            </Text>
            <Text
              fw={700}
              size="xs"
              style={{
                userSelect: 'none',
              }}
            >
              {stat.stats}
            </Text>
          </Flex>
        </Flex>
      </Paper>
    );
  });

  return (
    <Flex justify="center">
      <Group
        style={{ border: '1px solid grey', borderRadius: '30px', maxWidth: '500px' }}
        p={30}
        m={10}
      >
        <SimpleGrid cols={{ base: 3, sm: 1 }} spacing={{ base: 50 }}>
          {stats}
        </SimpleGrid>
      </Group>
    </Flex>
  );
};
