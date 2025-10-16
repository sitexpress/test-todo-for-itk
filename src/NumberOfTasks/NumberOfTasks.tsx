import { Badge, Container, Group, Text, Flex } from '@mantine/core';
import { TodoListLCDataType } from '@/App.page';
import classes from './NumberOfTasks.module.css';

type NumberOfTasksType = {
  todoListLCData: TodoListLCDataType[];
};

export const NumberOfTasks: React.FC<NumberOfTasksType> = ({ todoListLCData }) => {
  const allSum = todoListLCData.length;
  const activeSum = todoListLCData.filter((item, i) => item.status === 'active' && item).length;
  const doneSum = todoListLCData.filter((item, i) => item.status === 'done' && item).length;

  return (
    <Container>
      <div className={classes.stats}>
        <Flex gap={5} justify="center" align="center">
          <Text >Все -</Text>
          <Badge size="sm" circle variant="gradient">
            {allSum}
          </Badge>
        </Flex>
          <Flex gap={5} justify="center" align="center">
          <Text> Осталось выполнить -</Text>
          <Badge size="sm" circle variant="gradient">
            {activeSum}
          </Badge>
        </Flex>
          <Flex gap={5} justify="center" align="center">
          <Text> Выполнено -</Text>
          <Badge size="sm" circle variant="gradient">
            {doneSum}
          </Badge>
         </Flex>
      </div>
    </Container>
  );
};
