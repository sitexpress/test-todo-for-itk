import { useEffect, useRef, useState } from 'react';
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoffee,
  IconHourglassEmpty,
  IconNumber15Small,
  IconNumber30Small,
  IconNumber60Small,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
} from '@tabler/icons-react';
import { playSound } from 'react-sounds';
import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  useModalsStack,
} from '@mantine/core';

// Типы для данных в localStorage
interface PomodoroPersistentData {
  totalWorkTime: number;
  totalBreakTime: number;
  workSessions: number;
  breakSessions: number;
  activeSession: 'work' | 'break' | null;
  selectedMode: 'work' | 'break';
  workTime: 15 | 30 | 60;
  breakTime: 15 | 30 | 60;
  workTimeLeft: number;
  breakTimeLeft: number;
  isWorkRunning: boolean;
  isBreakRunning: boolean;
  isWorkPaused: boolean;
  isBreakPaused: boolean;
  timestamp: number;
  lastResetDate: string; // Добавляем поле для отслеживания даты последнего сброса
}

export const Pomodoro = () => {
  const [workTime, setWorkTime] = useState<15 | 30 | 60>(15);
  const [breakTime, setBreakTime] = useState<15 | 30 | 60>(15);
  const [workTimeLeft, setWorkTimeLeft] = useState(15 * 60);
  const [breakTimeLeft, setBreakTimeLeft] = useState(15 * 60);
  const [isWorkRunning, setIsWorkRunning] = useState(false);
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [isWorkPaused, setIsWorkPaused] = useState(false);
  const [isBreakPaused, setIsBreakPaused] = useState(false);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [workSessions, setWorkSessions] = useState(0);
  const [breakSessions, setBreakSessions] = useState(0);
  const [activeSession, setActiveSession] = useState<'work' | 'break' | null>(null);
  const [selectedMode, setSelectedMode] = useState<'work' | 'break'>('work');
  const [clickCount, setClickCount] = useState<{ work: number; break: number }>({
    work: 0,
    break: 0,
  });
  const tabsSound = () => playSound('ui/input_focus');
  const startStopPomodoro = () => playSound('system/boot_up');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // const stack = useModalsStack(['reset-timer', 'confirm-action', 'really-confirm-action']);
  const stack = useModalsStack(['reset-timer']);
  const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
    timer: IconHourglassEmpty,
    15: IconNumber15Small,
    30: IconNumber30Small,
    60: IconNumber60Small,
    play: IconPlayerPlay,
    pause: IconPlayerPause,
    stop: IconPlayerStop,
  };

  // Функция для получения текущей даты в формате YYYY-MM-DD
  const getCurrentDate = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  // Функция для проверки и сброса данных если наступил новый день
  const checkAndResetDailyData = (savedData: PomodoroPersistentData): boolean => {
    const currentDate = getCurrentDate();
    const lastResetDate = savedData.lastResetDate || currentDate;

    // Если дата изменилась, сбрасываем статистику
    if (lastResetDate !== currentDate) {
      console.log('New day detected, resetting pomodoro statistics');
      return true;
    }

    return false;
  };

  // Функция для сброса всех данных статистики
  const resetStatistics = () => {
    setTotalWorkTime(0);
    setTotalBreakTime(0);
    setWorkSessions(0);
    setBreakSessions(0);
    // Не сбрасываем настройки таймера и текущее состояние
  };

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem('pomodoroData');
    if (savedData) {
      try {
        const data: PomodoroPersistentData = JSON.parse(savedData);
        const now = Date.now();
        const timeDiff = Math.floor((now - data.timestamp) / 1000); // разница в секундах

        // Проверяем, нужно ли сбросить статистику за новый день
        if (checkAndResetDailyData(data)) {
          resetStatistics();
        } else {
          // Восстанавливаем состояние только если не было сброса
          setTotalWorkTime(data.totalWorkTime);
          setTotalBreakTime(data.totalBreakTime);
          setWorkSessions(data.workSessions);
          setBreakSessions(data.breakSessions);
        }

        setSelectedMode(data.selectedMode);
        setWorkTime(data.workTime);
        setBreakTime(data.breakTime);

        // Корректируем оставшееся время если таймер был активен
        if (data.isWorkRunning && !data.isWorkPaused) {
          const adjustedTime = Math.max(0, data.workTimeLeft - timeDiff);
          setWorkTimeLeft(adjustedTime);
          setIsWorkRunning(adjustedTime > 0);
          setActiveSession(adjustedTime > 0 ? 'work' : null);
          setIsWorkPaused(false);
        } else if (data.isBreakRunning && !data.isBreakPaused) {
          const adjustedTime = Math.max(0, data.breakTimeLeft - timeDiff);
          setBreakTimeLeft(adjustedTime);
          setIsBreakRunning(adjustedTime > 0);
          setActiveSession(adjustedTime > 0 ? 'break' : null);
          setIsBreakPaused(false);
        } else {
          setWorkTimeLeft(data.workTimeLeft);
          setBreakTimeLeft(data.breakTimeLeft);
          setIsWorkRunning(false);
          setIsBreakRunning(false);
          setIsWorkPaused(data.isWorkPaused);
          setIsBreakPaused(data.isBreakPaused);
          setActiveSession(data.activeSession);
        }
      } catch (error) {
        console.error('Error loading pomodoro data:', error);
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    const data: PomodoroPersistentData = {
      totalWorkTime,
      totalBreakTime,
      workSessions,
      breakSessions,
      activeSession,
      selectedMode,
      workTime,
      breakTime,
      workTimeLeft,
      breakTimeLeft,
      isWorkRunning,
      isBreakRunning,
      isWorkPaused,
      isBreakPaused,
      timestamp: Date.now(),
      lastResetDate: getCurrentDate(), // Сохраняем текущую дату для проверки сброса
    };

    localStorage.setItem('pomodoroData', JSON.stringify(data));
  }, [
    totalWorkTime,
    totalBreakTime,
    workSessions,
    breakSessions,
    activeSession,
    selectedMode,
    workTime,
    breakTime,
    workTimeLeft,
    breakTimeLeft,
    isWorkRunning,
    isBreakRunning,
    isWorkPaused,
    isBreakPaused,
  ]);

  // Дополнительная проверка сброса при изменении даты (на случай, если приложение работает долго)
  useEffect(() => {
    const checkDateChange = () => {
      const savedData = localStorage.getItem('pomodoroData');
      if (savedData) {
        try {
          const data: PomodoroPersistentData = JSON.parse(savedData);
          if (checkAndResetDailyData(data)) {
            resetStatistics();
          }
        } catch (error) {
          console.error('Error checking date change:', error);
        }
      }
    };

    // Проверяем изменение даты каждую минуту
    const dateCheckInterval = setInterval(checkDateChange, 60000);

    return () => {
      clearInterval(dateCheckInterval);
    };
  }, []);

  // Форматирование времени в MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Расчет прогресса для RingProgress
  const calculateWorkProgress = () => {
    const totalTime = workTime * 60;
    return ((totalTime - workTimeLeft) / totalTime) * 100;
  };

  const calculateBreakProgress = () => {
    const totalTime = breakTime * 60;
    return ((totalTime - breakTimeLeft) / totalTime) * 100;
  };

  // Обработчик выбора времени для работы
  const handleWorkTimeSelect = (time: 15 | 30 | 60) => {
    if (!isWorkRunning) {
      setWorkTime(time);
      setWorkTimeLeft(time * 60);
    }
  };

  // Обработчик выбора времени для отдыха
  const handleBreakTimeSelect = (time: 15 | 30 | 60) => {
    if (!isBreakRunning) {
      setBreakTime(time);
      setBreakTimeLeft(time * 60);
    }
  };

  // Запуск таймера
  const handleStart = () => {
    if (selectedMode === 'work' && !isWorkRunning) {
      setIsWorkRunning(true);
      setIsWorkPaused(false);
      setActiveSession('work');
    } else if (selectedMode === 'break' && !isBreakRunning) {
      setIsBreakRunning(true);
      setIsBreakPaused(false);
      setActiveSession('break');
    }
  };

  // Пауза таймера
  const handlePause = () => {
    if (activeSession === 'work' && isWorkRunning) {
      setIsWorkRunning(false);
      setIsWorkPaused(true);
    } else if (activeSession === 'break' && isBreakRunning) {
      setIsBreakRunning(false);
      setIsBreakPaused(true);
    }
  };

  // Остановка таймера
  const handleStop = () => {
    if (activeSession === 'work') {
      setIsWorkRunning(false);
      setIsWorkPaused(false);
      setWorkTimeLeft(workTime * 60);
    } else if (activeSession === 'break') {
      setIsBreakRunning(false);
      setIsBreakPaused(false);
      setBreakTimeLeft(breakTime * 60);
    }
    setActiveSession(null);
  };

  // Обработчик завершения таймера
  const handleTimerComplete = (sessionType: 'work' | 'break') => {
    if (sessionType === 'work') {
      const actualWorkTime = workTime * 60 - workTimeLeft;
      setTotalWorkTime((prev) => prev + actualWorkTime);
      setWorkSessions((prev) => prev + 1);
      setIsWorkRunning(false);
      setIsWorkPaused(false);
      setWorkTimeLeft(workTime * 60);
      setActiveSession(null);
      // Автоматически переключаемся на режим отдыха
      setSelectedMode('break');
      startStopPomodoro();
    } else {
      const actualBreakTime = breakTime * 60 - breakTimeLeft;
      setTotalBreakTime((prev) => prev + actualBreakTime);
      setBreakSessions((prev) => prev + 1);
      setIsBreakRunning(false);
      setIsBreakPaused(false);
      setBreakTimeLeft(breakTime * 60);
      setActiveSession(null);
      // Автоматически переключаемся на режим работы
      setSelectedMode('work');
      startStopPomodoro();
    }
  };

  // Обработчик клика на RingProgress
  const handleRingClick = (mode: 'work' | 'break') => {
    const isWorkActive = isWorkRunning || isWorkPaused;
    const isBreakActive = isBreakRunning || isBreakPaused;

    // Блокируем переключение при активном таймере
    if ((mode === 'work' && isBreakActive) || (mode === 'break' && isWorkActive)) {
      return;
    }

    const isRunning = mode === 'work' ? isWorkRunning : isBreakRunning;

    if (!isRunning) {
      // Первый клик - только выбор режима
      if (selectedMode !== mode) {
        setSelectedMode(mode);
        setClickCount({ work: 0, break: 0 });
        return;
      }

      // Второй и последующие клики - изменение времени
      const times: (15 | 30 | 60)[] = [15, 30, 60];

      if (mode === 'work') {
        const newClickCount = clickCount.work + 1;
        setClickCount((prev) => ({ ...prev, work: newClickCount }));

        if (newClickCount >= 1) {
          const currentIndex = times.indexOf(workTime);
          const nextIndex = (currentIndex + 1) % times.length;
          handleWorkTimeSelect(times[nextIndex]);
        }
      } else {
        const newClickCount = clickCount.break + 1;
        setClickCount((prev) => ({ ...prev, break: newClickCount }));

        if (newClickCount >= 1) {
          const currentIndex = times.indexOf(breakTime);
          const nextIndex = (currentIndex + 1) % times.length;
          handleBreakTimeSelect(times[nextIndex]);
        }
      }
    }
  };

  // Эффект для управления рабочим таймером
  useEffect(() => {
    if (isWorkRunning && workTimeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setWorkTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete('work');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWorkRunning, workTimeLeft]);

  // Эффект для управления таймером отдыха
  useEffect(() => {
    if (isBreakRunning && breakTimeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setBreakTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete('break');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isBreakRunning, breakTimeLeft]);

  const dataPomodoro = [
    {
      label: 'Всего',
      stats: workSessions + breakSessions,
      progress: 100,
      color: 'blue.6',
      sessions: Math.ceil((totalWorkTime + totalBreakTime) / 60),
    },
    {
      label: 'Внимание',
      stats: workSessions,
      progress: calculateWorkProgress(),
      color: 'orange',
      timeLeft: workTimeLeft,
      mode: 'work' as const,
      sessions: workSessions,
      isRunning: isWorkRunning,
      isPaused: isWorkPaused,
    },
    {
      label: 'Отдых',
      stats: breakSessions,
      progress: calculateBreakProgress(),
      color: 'teal.3',
      timeLeft: breakTimeLeft,
      mode: 'break' as const,
      sessions: breakSessions,
      isRunning: isBreakRunning,
      isPaused: isBreakPaused,
    },
  ] as const;

  const stats = dataPomodoro.map((stat) => {
    const isSelected = 'mode' in stat && selectedMode === stat.mode;

    // Определяем, можно ли кликать на этот RingProgress
    const isWorkActive = isWorkRunning || isWorkPaused;
    const isBreakActive = isBreakRunning || isBreakPaused;
    let isClickable = false;
    const shadowColor = isBreakActive ? '#38d9a9' : '#d9480f'

    if ('mode' in stat) {
      if (stat.mode === 'work') {
        isClickable = !isWorkActive && !isBreakActive;
      } else if (stat.mode === 'break') {
        isClickable = !isWorkActive && !isBreakActive;
      }
    }

    return (
      <Paper radius="md" p="sm" key={stat.label}>
        <Flex direction="column" justify="center" align="center" gap="xs">
          <div
            style={{
              boxShadow: isSelected
                ? `0 0 0 3px ${shadowColor}, 0 0 20px ${shadowColor}40`
                : 'none',
              animation: isSelected ? 'pulseGlow 1s ease-in-out infinite' : 'none',
              transition: 'all 0.3s ease',
              cursor: isClickable ? 'pointer' : 'default',
              borderRadius: '50%',
              padding: '4px',
              opacity: isClickable ? 1 : 0.7,
              transform: isSelected ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <RingProgress
              onClick={
                'mode' in stat && isClickable
                  ? () => {
                      handleRingClick(stat.mode);
                      tabsSound();
                    }
                  : undefined
              }
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  {'timeLeft' in stat ? (
                    <Text
                      fw={700}
                      size="sm"
                      style={{
                        userSelect: 'none',
                      }}
                    >
                      {formatTime(stat.timeLeft)}
                    </Text>
                  ) : (
                    <Text fw={700} size="sm">
                      {stat.sessions}
                    </Text>
                  )}
                </Center>
              }
            />
          </div>

          <Flex direction="column" justify="center" align="center">
            <Text
              c="dimmed"
              size="xs"
              tt="uppercase"
              fw={700}
              style={{
                userSelect: 'none',
              }}
            >
              {stat.label}
            </Text>
            <Text
              fw={700}
              size="xs"
              style={{
                userSelect: 'none',
              }}
            >
              {stat.stats}
            </Text>
          </Flex>
        </Flex>
      </Paper>
    );
  });

  const isAnyRunning = isWorkRunning || isBreakRunning;
  const isAnyPaused = isWorkPaused || isBreakPaused;

  return (
    <Flex direction="row" justify="center" align="center" gap="md" mt="xs">
      <Modal {...stack.register('reset-timer')} title="Confirm action">
        Вы точно хотите обнулить дневную статистику?
        <Group mt="lg" justify="flex-end">
          <Button onClick={stack.closeAll} variant="default">
            Отменить
          </Button>
          <Button
            onClick={() => {
              stack.close('reset-timer');
              resetStatistics();
              tabsSound();
            }}
            color="red.6"
          >
            Обнулить
          </Button>
        </Group>
      </Modal>

      <Group
        style={{ border: '1px solid grey', borderRadius: '30px', maxWidth: '500px' }}
        pl={10}
        pr={10}
        pt={10}
        pb={20}
        
        m={10}
      >
        <Flex direction="column" align="center" gap="md">
          <Flex direction="row" justify="center" align="center" gap="xs">
            <IconCoffee />{' '}
            <Text
              fw={700}
              size="lg"
              ta="center"
              style={{
                userSelect: 'none',
              }}
            >
              Pomodoro
            </Text>
          </Flex>

          <SimpleGrid cols={{ base: 3, sm: 3 }} spacing={{ base: 20 }}>
            {stats}
          </SimpleGrid>

          <Group>
            <ActionIcon
              variant="filled"
              color="teal.4"
              size="lg"
              radius="xl"
              onClick={() => {
                handleStart();
                tabsSound();
              }}
              disabled={isAnyRunning}
            >
              <icons.play size={20} />
            </ActionIcon>

            <ActionIcon
              variant="filled"
              color="yellow.6"
              size="lg"
              radius="xl"
              onClick={() => {
                handlePause();
                tabsSound();
              }}
              disabled={!isAnyRunning}
            >
              <icons.pause size={20} />
            </ActionIcon>

            <ActionIcon
              variant="filled"
              color="red.6"
              size="lg"
              radius="xl"
              onClick={() => {
                handleStop();
                tabsSound();
              }}
              disabled={!isAnyRunning && !isAnyPaused}
            >
              <icons.stop size={20} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red.6"
              size="lg"
              radius="xl"
              onClick={() => {
                stack.open('reset-timer');
                tabsSound();
              }}

            >
              <Text component="span" size="xs" ta="center">
                reset
              </Text>
            </ActionIcon>
          </Group>
        </Flex>
      </Group>
    </Flex>
  );
};
