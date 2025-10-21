import { useState } from 'react';
import { IconRadio, IconRadioOff } from '@tabler/icons-react';
import { useSound } from 'react-sounds';
import { Button, Group } from '@mantine/core';

export function RadioStation() {
  const [isRadioOn, setIsRadioOn] = useState<boolean>(false);
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
        <Button variant="light" onClick={() => onSetRadioStationHandler(false)}>
          <IconRadioOff />
        </Button>
      ) : (
        <Button variant="light" onClick={() => onSetRadioStationHandler(true)}>
          <IconRadio />
        </Button>
      )}
    </Group>
  );
}
