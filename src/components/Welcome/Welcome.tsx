import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" >
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Todo-list 
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="xs" maw={580} mx="auto" mt="md">
        Made by Sultan Gedgafov
      </Text>
    </>
  );
}
