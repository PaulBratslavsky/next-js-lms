import { CourseProps, StrapiUserMeProps   } from "@/types";
import Link from "next/link";
import { ProviderAuth } from "@/components/custom/provider-auth";
import { getStrapiMedia, formatDate } from "@/lib/utils";

import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export function CourseItem({
  course,
  user,
}: {
  readonly course: CourseProps;
  readonly user: StrapiUserMeProps ;
}) {
  const { documentId, title, description, slug, createdAt, image } = course;
  const imageUrl = getStrapiMedia(image?.formats?.medium?.url);
  return (
    <CarouselItem key={documentId} className="md:basis-1/2 lg:basis-1/3">
      <div className="h-full p-1">
        <Card className="h-full shadow-lg relative">
          <CardContent className="flex h-full flex-col items-start gap-5 p-5">
            {imageUrl && (
              <div className="relative h-52 w-full">
                <img
                  src={imageUrl}
                  alt={image.alt}
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-4">
              <h4 className="text-lg font-semibold">{title}</h4>
              <div className="flex items-center gap-3">
                <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                  {"Strapi"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(createdAt)}
                </span>
              </div>
              <p className="mb-auto text-muted-foreground">
                {description.slice(0, 100)}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              {user ? (
                <Button asChild>
                  <Link href={"/dashboard/" + slug}>View Course</Link>
                </Button>
              ) : (
                <ProviderAuth />
              )}
              {user && <PlusCircleIcon className="w-6 h-6 hover:h-8 hover:w-8 hover:text-primary hover:animate-pulse transition-all duration-1000" />}
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
