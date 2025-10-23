import { useEffect, useState } from 'react';
import { IconRadio, IconRadioOff } from '@tabler/icons-react';
import { useSound } from 'react-sounds';
import { Button, Group } from '@mantine/core';

type RadioStationType = {
  isMuted: boolean;
};
export const RadioStation: React.FC<RadioStationType> = ({ isMuted }) => {
  const [isRadioOff, setIsRadioOff] = useState<boolean>(true);
  const { play: campfireSoundPlay, stop: campfireSoundStop } = useSound('ambient/campfire', {
    volume: 0.5,
    rate: 1.2,
    loop: true,
  });
  console.log('isRadioOff:', isRadioOff);
  console.log('isMuted:', isMuted);

  const onSetRadioStationHandler = (turn: boolean) => {
    setIsRadioOff(turn);

    if (isRadioOff) {
      console.log('play');
      campfireSoundPlay();
    }
    if (!isRadioOff) {
      console.log('stop');
      campfireSoundStop();
    }
  };

  useEffect(() => {
    if (!isRadioOff && isMuted) {
      console.log('3');
      onSetRadioStationHandler(true);
    }
    // if(isRadioOff && !isMuted) {
    //   onSetRadioStationHandler(false)
    // }
  }, [isMuted]);

  return (
    <Group justify="center">
      {isRadioOff ? (
        <Button
          disabled={isMuted}
          size="sm"
          variant="light"
          onClick={() => onSetRadioStationHandler(false)}
        >
          <IconRadioOff />
        </Button>
      ) : (
        <Button size="sm" variant="light" onClick={() => onSetRadioStationHandler(true)}>
          <IconRadio />
        </Button>
      )}
    </Group>
  );
};
