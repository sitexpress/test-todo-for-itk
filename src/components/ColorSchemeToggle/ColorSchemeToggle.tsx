import { IconMoonStars, IconSunFilled } from '@tabler/icons-react';
import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group justify="center">
      {colorScheme === 'light' ? (
        <Button variant='light' onClick={() => setColorScheme('dark')}>
          <IconSunFilled  />
        </Button>
      ) : (
        <Button variant='light' onClick={() => setColorScheme('light')}>
          <IconMoonStars  />
        </Button>
      )}
    </Group>
  );
}
