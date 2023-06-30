import Question from '../components/quiz/Question'
import Timer from "../components/quiz/Timer";

export default function QuizPage() {
  return (
    <main className="flex flex-col flex-1 h-full gap-4">
      <h1 className="p-6 text-4xl font-bold text-center">The Quiz</h1>
      <div className="flex flex-col items-center justify-start flex-1 p-4">
        {/* <p className="text-lg">
          Welcome to the quiz! This is where the quiz questions will go.
        </p> */}
        <span className="text-base font-semibold whitespace-nowrap dark:text-white" style={{ display: 'flex', justifyContent: 'center', marginRight: '600px' }}>
            <Timer/>
          </span>
          <Question/>
      </div>
    </main>
  );
}
