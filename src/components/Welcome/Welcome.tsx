import { useEffect, useState } from 'react';
import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

type WelcomeType = {
  isLoading: boolean;
};
export const Welcome: React.FC<WelcomeType> = ({ isLoading }) => {
  const [animation, setAnimation] = useState<
    'animate__animated animate__bounce animate__delay-2s' | ''
  >('');

  useEffect(() => {
    setAnimation('');
    if (!isLoading) {
      setAnimation('animate__animated animate__bounce animate__delay-2s');
    }
  }, [isLoading]);

  return (
    <>
      <Title className={`${animation}, ${classes.title}`} ta="center">
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
};
