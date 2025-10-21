import { useEffect, useState } from 'react';
import { IconRadio, IconRadioOff } from '@tabler/icons-react';
import { useSound } from 'react-sounds';
import { Button, Group } from '@mantine/core';

type RadioStationType = {
  isMuted: boolean;
};
export const RadioStation: React.FC<RadioStationType> = ({ isMuted }) => {
  const [isRadioOn, setIsRadioOn] = useState<boolean>(true);
  const { play: campfireSoundPlay, stop: campfireSoundStop } = useSound('ambient/campfire', {
    volume: 0.5,
    rate: 1.2,
    loop: true,
  });

  const onSetRadioStationHandler = (turn: boolean) => {
    setIsRadioOn(turn);

    if (isRadioOn) {
      campfireSoundPlay();
    }
    if (!isRadioOn) {
      campfireSoundStop();
    }
  };

  return (
    <Group justify="center">
      {isRadioOn ? (
        <Button size="xs" variant="light" onClick={() => onSetRadioStationHandler(false)}>
          <IconRadioOff />
        </Button>
      ) : (
        <Button size="xs" variant="light" onClick={() => onSetRadioStationHandler(true)}>
          <IconRadio />
        </Button>
      )}
    </Group>
  );
};
