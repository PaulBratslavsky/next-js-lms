"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LessonListProps {
  slug: string;
  title: string;
  documentId: string;
}

export function LessonLink({lesson, index}: {lesson: LessonListProps, index: number}) {
    const params = useParams();
    console.log(params, "fuka oyuuy")
  const isActive = lesson.slug.includes(params.lessonSlug as string);
    const { title, documentId } = lesson;
    return (
      <Link
        key={documentId}
        href={"/dashboard/" + params.courseSlug + "/" + lesson.slug}
        prefetch
        className={cn(
          "flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors",
          isActive ? "bg-muted" : ""
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
            {index + 1}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          {/* <LessonStatusIcon
            documentId={documentId}
            isSelected={isSelected}
          /> */}
        </div>
      </Link>
    );
}
