'use client';
import React from 'react';
import { useGetGameQuestions } from '@/hooks/usegamequeries';
import { TGameQuestions } from '@/queries/gamequeries';
import { useGetAnswersByQuestionId } from '@/hooks/useanswerqueries';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/utils/utils';
import { GameActions } from '@/types';
import useSupabase from '@/hooks/useSupabase';
import useFeudEvents from '@/hooks/useFeudEvents';
import { Outlet } from '@tanstack/react-router';

const AnswerButtons = ({
  instanceId,
  activeTeam,
  questionId,
}: {
  instanceId: string;
  activeTeam: number | null | undefined;
  questionId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const { data, isLoading, isError, error } =
    useGetAnswersByQuestionId(questionId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col h-full">
      {data?.map((item) => (
        <Button
          key={'actionbutton' + item.id}
          onClick={() =>
            insertEvent.mutate({
              instanceid: instanceId,
              team: activeTeam,
              answerid: item.id,
              eventid: GameActions.CorrectAnswer,
              points: item.score,
            })
          }
        >
          {item.answer}
        </Button>
      ))}

      {data &&
        Array.from({ length: 8 - data?.length }, (_e, i) => (
          <Button key={'extrabtn' + i} disabled={true}></Button>
        ))}
    </div>
  );
};

const GameControl = ({
  instanceId,
  gameId,
}: {
  instanceId: string;
  gameId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const [activeTeam, setActiveTeam] = React.useState<number | null | undefined>(
    null,
  );
  const { data, isLoading, isError, error } = useGetGameQuestions(gameId);
  const supabaseClient = useSupabase();
  const thisGameActions = supabaseClient.channel(instanceId);

  const {
    isLoading: isFeudEventsLoading,
    currentQuestion,
    strikes,
    leftTeamScore,
    rightTeamScore,
    roundScore,
  } = useFeudEvents({
    instanceId,
    sound: false,
  });

  if (isLoading && isFeudEventsLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>no data yet</div>;

  const typedData: TGameQuestions = data;

  const handleTeamToggle = (value: string) => {
    setActiveTeam(parseInt(value));
  };

  const handleTeamWin = () => {
    if (!activeTeam) return;
    insertEvent.mutate({
      eventid: GameActions.TeamWin,
      instanceid: instanceId,
      team: activeTeam,
    });
  };

  const handleSendSound = (sound: string) => {
    thisGameActions.send({
      type: 'broadcast',
      event: 'sound',
      payload: { sound },
    });
  };

  const Score = ({
    score,
    className,
  }: {
    score: number;
    className?: string;
  }) => {
    return <div className={cn('px-6 py-1 text-3xl', className)}>{score}</div>;
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Score className="flex justify-center" score={roundScore} />
      <div className="flex justify-between">
        <Score score={leftTeamScore} />
        <Score score={rightTeamScore} />
      </div>
      <div className="grow">
        {/* <div> */}
        {/*   <Select value={currentQuestion} onValueChange={handleQuestionChange}> */}
        {/*     <SelectTrigger> */}
        {/*       <SelectValue placeholder="Select Question" /> */}
        {/*     </SelectTrigger> */}
        {/*     <SelectContent> */}
        {/*       {typedData?.questions!.map((question) => ( */}
        {/*         <SelectItem value={question.id} key={question.id}> */}
        {/*           {question.question} */}
        {/*         </SelectItem> */}
        {/*       ))} */}
        {/*     </SelectContent> */}
        {/*   </Select> */}
        {/* </div> */}
        <Outlet />

        {currentQuestion ? (
          <AnswerButtons
            questionId={currentQuestion}
            activeTeam={activeTeam}
            instanceId={instanceId}
          />
        ) : (
          <div>Select Question</div>
        )}
        <div>
          <Button
            onClick={() =>
              insertEvent.mutate({
                team: activeTeam,
                instanceid: instanceId,
                eventid: GameActions.Strike,
              })
            }
          >
            Strike
          </Button>
        </div>

        <div>
          <div className="flex">
            <ToggleGroup type="single" onValueChange={handleTeamToggle}>
              <ToggleGroupItem value="1">A</ToggleGroupItem>
              <ToggleGroupItem value="2">B</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <Button onClick={handleTeamWin} disabled={!Boolean(activeTeam)}>
              {activeTeam
                ? 'Team ' + activeTeam + ' wins'
                : 'Select winning team'}
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Drawer>
          <DrawerTrigger asChild>
            <div className="m-4">
              <Button className="w-full">Sound Effects</Button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Play Sound Effects</DrawerTitle>
              <DrawerDescription hidden>
                Play sound effects using buttons from here
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col mx-4 gap-2">
              <Button onClick={() => handleSendSound('ding')}>Ding</Button>
              <Button onClick={() => handleSendSound('strike')}>Strike</Button>
              <Button onClick={() => handleSendSound('faceOffMusic')}>
                Face-off Music
              </Button>
              <Button onClick={() => handleSendSound('faceOffBuzzer')}>
                Face-off Buzzer
              </Button>
              <Button onClick={() => handleSendSound('themeMusic')}>
                Theme Music
              </Button>
              <Button onClick={() => handleSendSound('clap')}>Clap</Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default GameControl;
