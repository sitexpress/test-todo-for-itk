import { Container, Text } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
          fw={700}
        >
          Todo-list
        </Text>
        <ColorSchemeToggle />
      </Container>
    </header>
  );
};
