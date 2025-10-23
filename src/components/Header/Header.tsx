import { useState } from 'react';
import { Container, Flex, Text } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Mute } from '../Mute/Mute';
import { RadioStation } from '../RadioStation/RadioStation';
import classes from './Header.module.css';

export const Header = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
          fw={700}
        >
          Todo-list
        </Text>
        <Flex direction="row" align="center" gap={10}>
          <ColorSchemeToggle />
          <RadioStation isMuted={isMuted} />
          <Mute isMuted={isMuted} setIsMuted={setIsMuted} />
        </Flex>
      </Container>
    </header>
  );
};
