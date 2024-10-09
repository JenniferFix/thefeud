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
    <div>
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
    </div>
  );
};

const QuestionSelector = ({
  instanceId,
  gameId,
  currentQuestion,
}: {
  instanceId: string;
  gameId: string;
  currentQuestion?: string;
}) => {
  const { data, isLoading, isError, error } = useGetGameQuestions(gameId);
  const insertEvent = useInsertEvent(instanceId);
  const [selected, setSelected] = React.useState<string>();
  const [selectedText, setSelectedText] = React.useState();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  let currentText;

  if (currentQuestion && data) {
    const temp = data?.questions?.find((val) => val.id === currentQuestion);
    // setSelectedText(temp?.question ? temp.question : 'Select Question');
  }

  const handleQuestionChange = (value: string) => {
    // setCurrentQuestion(value);
    insertEvent.mutate({
      eventid: GameActions.StartQuestion,
      instanceid: instanceId,
      questionid: value,
    });
  };
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <div className="p-4">
          <Button className="w-full">
            {data?.questions?.find((q) => q.id === currentQuestion)?.question ??
              'Select Question'}
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="left-0 top-0 right-0 fixed">
        <DrawerHeader>
          <DrawerTitle>Select Question</DrawerTitle>
          <DrawerDescription hidden>Select question</DrawerDescription>
        </DrawerHeader>
        <div className="p-2">
          <div className="w-[300px] border rounded-sm my-2 h-full">
            <ScrollArea className="h-[200px]">
              <div
                role="listbox"
                aria-label="Scrollable listbox of games"
                className="h-full"
              >
                {data?.questions?.map((g) => (
                  <div
                    key={g.id}
                    role="option"
                    aria-selected={selected === g.id}
                    onClick={() => setSelected(g.id)}
                    className={cn(
                      'cursor-pointer px-2 py-1 rounded-sm',
                      selected === g.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted',
                      currentQuestion === g.id ? 'font-bold' : '',
                    )}
                  >
                    {g.question}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <Button>Start round</Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full">Close Drawer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
  // const [currentQuestion, setCurrentQuestion] = React.useState<
  //   string | undefined
  // >();
  const { data, isLoading, isError, error } = useGetGameQuestions(gameId);
  const supabaseClient = useSupabase();
  const thisGameActions = supabaseClient.channel(instanceId);

  const { isLoading: isFeudEventsLoading, currentQuestion } = useFeudEvents({
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

  const handleQuestionChange = (value: string) => {
    // setCurrentQuestion(value);
    insertEvent.mutate({
      eventid: GameActions.StartQuestion,
      instanceid: instanceId,
      questionid: value,
    });
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

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <QuestionSelector
          currentQuestion={currentQuestion}
          instanceId={instanceId}
          gameId={gameId}
        />
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
