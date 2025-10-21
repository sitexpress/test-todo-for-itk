import { IconMoonStars, IconSunFilled } from '@tabler/icons-react';
import { Button, Group, MantineColorScheme, useMantineColorScheme } from '@mantine/core';
import { useSound } from 'react-sounds';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const { play: colorSchemeToggleSound } = useSound('ui/send', { 
    volume: 0.5, 
    rate: 1.2,
    loop: false
  });

    const onSetColorSchemeHandler = (scheme:MantineColorScheme) => {
      colorSchemeToggleSound()
      setColorScheme(scheme)
    }


  return (
    <Group justify="center">
      {colorScheme === 'light' ? (
        <Button variant='light' onClick={() => onSetColorSchemeHandler('dark')}>
          <IconSunFilled  />
        </Button>
      ) : (
        <Button variant='light' onClick={() => onSetColorSchemeHandler('light')}>
          <IconMoonStars  />
        </Button>
      )}
    </Group>
  );
}
