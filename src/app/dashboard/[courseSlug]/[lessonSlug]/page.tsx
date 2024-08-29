import dynamic from "next/dynamic";
import { MarkdownText } from "@/components/custom/markdown-text";
import { ScrollArea } from "@/components/ui/scroll-area";

const MediaPlayer = dynamic<
  React.ComponentProps<
    typeof import("@/components/custom/media-player").MediaPlayer
  >
>(
  () =>
    import("@/components/custom/media-player").then((mod) => mod.MediaPlayer),
  { ssr: false }
);

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

async function loader(slug: string) {
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const { getLessonBySlug } = await import("@/data/loaders");
  const data = await getLessonBySlug(slug, PUBLIC_TOKEN);
  const courseData = data?.data[0];
  return courseData;
}

export default async function LessonRoute({
  params,
}: {
  readonly params: {
    courseSlug: string;
    lessonSlug: string;
  };
}) {
  const data = await loader(params.lessonSlug);

  const { title, description, content, resources, player, documentId } = data;
  const video = player[0];

  return (
    <div className="p-2 h-[calc(100vh-72px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-8">
            <div className="rounded flex flex-col gap-4">
              <div className="aspect-video rounded overflow-hidden">
                <MediaPlayer
                  videoId={video.videoId}
                  timestamp={video.timecode}
                  controls
                />
              </div>
              {/* <LessonStatusButton documentId={documentId} /> */}

              <div>
                <h1 className="text-3xl mt-2 mb-4 font-bold">{title}</h1>
                <p className="text-lg mb-4 text-muted-foreground">
                  {description}
                </p>
                {resources && (
                  <div>
                    <MarkdownText
                      content={resources}
                      className="resources-text"
                    />
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-8">
            {content && (
              <MarkdownText content={content} className="rich-text w-full" />
            )}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
