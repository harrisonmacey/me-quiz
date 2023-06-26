import { Metadata } from "next";
import QuizNav from "../components/quiz/nav";

export const metadata: Metadata = {
  title: "Quiz",
  description: "The quiz page",
};

interface LayoutProps {
  children: React.ReactNode;
}
export default function QuizLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <QuizNav />

      <section className="flex-1">{children}</section>
    </div>
  );
}
