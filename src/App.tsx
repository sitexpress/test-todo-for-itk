import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import 'animate.css';
export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Router />
    </MantineProvider>
  );
}
