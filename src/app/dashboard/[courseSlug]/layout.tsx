import { cn } from "@/lib/utils";

import Link from "next/link";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LessonLink } from "@/components/custom/lesson-link";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

async function loader(slug: string) {
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const { getCourseBySlug } = await import("@/data/loaders");
  const data = await getCourseBySlug(slug, PUBLIC_TOKEN);
  const courseData = data?.data[0];
  return courseData;
}

interface LessonListProps {
  documentId: string;
  slug: string;
  title: string;
  description: string;
}

interface ParamsProps {  
  courseSlug: string
  lessonSlug: string
}

export default async function DashboardRoute({
  params,
  children,
}: {
  readonly params: ParamsProps;
  readonly children: React.ReactNode;
}) {


  const courseSlug = params?.courseSlug;
  console.log(params);

  const data = await loader(courseSlug);
  const courseList = data.lessons;

  return (
    <TooltipProvider delayDuration={0}>
      <Separator />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-4">
            <h2 className="text-xl font-bold mb-4">Lessons</h2>
            <div className="space-y-2">
              {courseList.map((lesson: LessonListProps, index: number) => <LessonLink lesson={lesson} index={index} key={index} />  )}
            </div>
          </ScrollArea>
          <Separator />
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
    </TooltipProvider>
  );
}
