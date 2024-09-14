///**
// * v0 by Vercel.
// * @see https://v0.dev/t/FLPhGeUwXfk
// * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
// */
//"use client";
//
//import { useState } from "react";
//import {
//  Card,
//  CardHeader,
//  CardTitle,
//  CardDescription,
//  CardContent,
//} from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";
//import {
//  Table,
//  TableHeader,
//  TableRow,
//  TableHead,
//  TableBody,
//  TableCell,
//} from "@/components/ui/table";
//import { nanoid } from "nanoid";
//
//export default function Component() {
//  const [questions, setQuestions] = useState([
//    {
//      id: nanoid(),
//      question: "",
//      answers: [
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//        { text: "", weight: 0 },
//      ],
//      isAnswersOpen: false,
//    },
//  ]);
//  const { mutate: updateQuestion } = useMutation((question) =>
//    supabase.from("questions").upsert(question),
//  );
//  const handleQuestionChange = (index, field, value) => {
//    setQuestions((prev) =>
//      prev.map((q, i) =>
//        i === index
//          ? {
//              ...q,
//              [field]: value,
//            }
//          : q,
//      ),
//    );
//  };
//  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
//    setQuestions((prev) =>
//      prev.map((q, i) =>
//        i === questionIndex
//          ? {
//              ...q,
//              answers: q.answers.map((a, j) =>
//                j === answerIndex ? { ...a, [field]: value } : a,
//              ),
//            }
//          : q,
//      ),
//    );
//  };
//  const handleAddAnswer = (questionIndex) => {
//    setQuestions((prev) =>
//      prev.map((q, i) =>
//        i === questionIndex
//          ? {
//              ...q,
//              answers: [...q.answers, { text: "", weight: 0 }],
//            }
//          : q,
//      ),
//    );
//  };
//  const handleRemoveAnswer = (questionIndex, answerIndex) => {
//    setQuestions((prev) =>
//      prev.map((q, i) =>
//        i === questionIndex
//          ? {
//              ...q,
//              answers: q.answers.filter((_, j) => j !== answerIndex),
//            }
//          : q,
//      ),
//    );
//  };
//  const handleToggleAnswers = (index) => {
//    setQuestions((prev) =>
//      prev.map((q, i) =>
//        i === index
//          ? {
//              ...q,
//              isAnswersOpen: !q.isAnswersOpen,
//            }
//          : q,
//      ),
//    );
//  };
//  const handleSubmit = (e) => {
//    e.preventDefault();
//    questions.forEach((question) => {
//      updateQuestion(question, {
//        onSuccess: () => {
//          console.log("Question updated");
//        },
//        onError: (error) => {
//          console.error("Error updating question:", error);
//        },
//      });
//    });
//  };
//  return (
//    <Card className="w-full max-w-4xl">
//      <CardHeader>
//        <CardTitle>Add Questions</CardTitle>
//        <CardDescription>
//          Create questions with up to 8 weighted answers.
//        </CardDescription>
//      </CardHeader>
//      <CardContent>
//        <form onSubmit={handleSubmit}>
//          {questions.map((question, index) => (
//            <div key={question.id} className="space-y-4">
//              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
//                <div className="flex items-center gap-4">
//                  <Button
//                    variant="ghost"
//                    onClick={() => handleToggleAnswers(index)}
//                  >
//                    <ChevronDownIcon className="w-5 h-5" />
//                  </Button>
//                  <Input
//                    placeholder="Question"
//                    value={question.question}
//                    onChange={(e) =>
//                      handleQuestionChange(index, "question", e.target.value)
//                    }
//                    onBlur={() =>
//                      updateQuestion(question, {
//                        onSuccess: () => {
//                          console.log("Question updated");
//                        },
//                        onError: (error) => {
//                          console.error("Error updating question:", error);
//                        },
//                      })
//                    }
//                  />
//                </div>
//                <Button
//                  variant="ghost"
//                  onClick={() =>
//                    setQuestions((prev) => prev.filter((_, i) => i !== index))
//                  }
//                >
//                  <TrashIcon className="w-5 h-5" />
//                </Button>
//              </div>
//              {question.isAnswersOpen && (
//                <div className="border rounded-lg">
//                  <Table>
//                    <TableHeader>
//                      <TableRow>
//                        <TableHead>Answer</TableHead>
//                        <TableHead>Weight</TableHead>
//                        <TableHead className="w-[80px]" />
//                      </TableRow>
//                    </TableHeader>
//                    <TableBody>
//                      {question.answers.map((answer, answerIndex) => (
//                        <TableRow key={answerIndex}>
//                          <TableCell>
//                            <Input
//                              placeholder={`Answer ${answerIndex + 1}`}
//                              value={answer.text}
//                              onChange={(e) =>
//                                handleAnswerChange(
//                                  index,
//                                  answerIndex,
//                                  "text",
//                                  e.target.value,
//                                )
//                              }
//                              onBlur={() =>
//                                updateQuestion(question, {
//                                  onSuccess: () => {
//                                    console.log("Answer updated");
//                                  },
//                                  onError: (error) => {
//                                    console.error(
//                                      "Error updating answer:",
//                                      error,
//                                    );
//                                  },
//                                })
//                              }
//                            />
//                          </TableCell>
//                          <TableCell>
//                            <Input
//                              type="number"
//                              placeholder="Weight"
//                              value={answer.weight}
//                              onChange={(e) =>
//                                handleAnswerChange(
//                                  index,
//                                  answerIndex,
//                                  "weight",
//                                  Number(e.target.value),
//                                )
//                              }
//                              onBlur={() =>
//                                updateQuestion(question, {
//                                  onSuccess: () => {
//                                    console.log("Weight updated");
//                                  },
//                                  onError: (error) => {
//                                    console.error(
//                                      "Error updating weight:",
//                                      error,
//                                    );
//                                  },
//                                })
//                              }
//                            />
//                          </TableCell>
//                          <TableCell>
//                            <Button
//                              variant="ghost"
//                              onClick={() =>
//                                handleRemoveAnswer(index, answerIndex)
//                              }
//                            >
//                              <TrashIcon className="w-5 h-5" />
//                            </Button>
//                          </TableCell>
//                        </TableRow>
//                      ))}
//                    </TableBody>
//                  </Table>
//                  {question.answers.length < 8 && (
//                    <div className="p-4">
//                      <Button
//                        variant="outline"
//                        onClick={() => handleAddAnswer(index)}
//                      >
//                        Add Answer
//                      </Button>
//                    </div>
//                  )}
//                </div>
//              )}
//            </div>
//          ))}
//          <Button
//            type="button"
//            variant="outline"
//            onClick={() =>
//              setQuestions((prev) => [
//                ...prev,
//                {
//                  id: nanoid(),
//                  question: "",
//                  answers: [
//                    { text: "", weight: 0 },
//                    { text: "", weight: 0 },
//                    { text: "", weight: 0 },
//                    { text: "", weight: 0 },
//                    {
//                      text: "",
//                      weight: 0,
//                    },
//                    {
//                      text: "",
//                      weight: 0,
//                    },
//                    {
//                      text: "",
//                      weight: 0,
//                    },
//                    {
//                      text: "",
//                      weight: 0,
//                    },
//                  ],
//                  isAnswersOpen: false,
//                },
//              ])
//            }
//          >
//            Add Question
//          </Button>
//          <Button type="submit" className="mt-4">
//            Save
//          </Button>
//        </form>
//      </CardContent>
//    </Card>
//  );
//}
//
//function ChevronDownIcon(props) {
//  return (
//    <svg
//      {...props}
//      xmlns="http://www.w3.org/2000/svg"
//      width="24"
//      height="24"
//      viewBox="0 0 24 24"
//      fill="none"
//      stroke="currentColor"
//      strokeWidth="2"
//      strokeLinecap="round"
//      strokeLinejoin="round"
//    >
//      <path d="m6 9 6 6 6-6" />
//    </svg>
//  );
//}
//
//function TrashIcon(props) {
//  return (
//    <svg
//      {...props}
//      xmlns="http://www.w3.org/2000/svg"
//      width="24"
//      height="24"
//      viewBox="0 0 24 24"
//      fill="none"
//      stroke="currentColor"
//      strokeWidth="2"
//      strokeLinecap="round"
//      strokeLinejoin="round"
//    >
//      <path d="M3 6h18" />
//      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//    </svg>
//  );
//}
