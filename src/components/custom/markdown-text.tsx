import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownTextProps {
  readonly content: string;
  readonly className?: string;
}

export function MarkdownText({
  content,
  className,
}: Readonly<MarkdownTextProps>) {
  return (
    <article className={cn("py-6", className)}>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </article>
  );
}
