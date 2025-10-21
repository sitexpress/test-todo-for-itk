import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

import 'animate.css';

import { SoundProvider } from 'react-sounds';

export default function App() {
  return (
    <SoundProvider
      preload={[
        'system/boot_up',
        'ambient/campfire',
        'ui/input_focus',
        'notification/error',
        'ui/tab_close',
        'ui/radio_select',
        'notification/error',
        'ui/toggle_on',
        'ui/window_close',
        'ui/window_open',
        'system/lock',
        'ui/send',
      ]}
      initialEnabled
    >
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Router />
      </MantineProvider>
    </SoundProvider>
  );
}


