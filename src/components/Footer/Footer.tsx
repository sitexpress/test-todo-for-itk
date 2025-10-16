import { ActionIcon, Anchor, Flex, Group, Text } from '@mantine/core';
import {
    IconBrandGithub,
    IconDownload,
    IconFileCvFilled
} from '@tabler/icons-react';
import classes from './Footer.module.css';


export function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Flex direction="column">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
            fw={700}
          >
            Todo-list
          </Text>
        </Flex>

        <Group className={classes.links}>
          {' '}
          <Text component="span" size="xs" c="dimmed">
            Made by Sultan Gedgafov
          </Text>
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          {/* <ActionIcon size="lg" variant="default" radius="xl">
            <IconDownload size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconFileCvFilled size={18} stroke={1.5} />
          </ActionIcon> */}
          <Anchor href="https://github.com/sitexpress" target="_blank">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub size={18} stroke={1.5} />
            </ActionIcon>
          </Anchor>
        </Group>
      </div>
    </div>
  );
}
