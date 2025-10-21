import { IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { setSoundEnabled } from 'react-sounds';
import { Button, Group } from '@mantine/core';

type MutedType = {
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
};
export const Mute: React.FC<MutedType> = ({ isMuted, setIsMuted }) => {
  const Mute = (turnOnOff: boolean) => {
    setIsMuted(turnOnOff);
    if (isMuted) {
      setSoundEnabled(true);
    }

    if (!isMuted) {
      setSoundEnabled(false);
    }
  };

  return (
    <Group justify="center">
      {isMuted ? (
        <Button size="xs" variant="light" onClick={() => Mute(false)}>
          <IconVolumeOff />
        </Button>
      ) : (
        <Button size="xs" variant="light" onClick={() => Mute(true)}>
          <IconVolume />
        </Button>
      )}
    </Group>
  );
};
