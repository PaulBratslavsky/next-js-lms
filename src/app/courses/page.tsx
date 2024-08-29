import type { CourseProps } from "@/types";

import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { SectionLayout } from "@/components/custom/section-layout";
import { CourseItem } from "@/components/custom/course-item";

async function loader() {
  const { getAllCourses } = await import("@/data/loaders");
  const { getUserMeLoader } = await import("@/data/services/get-user-me-loader");
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const data = await getAllCourses(PUBLIC_TOKEN);
  const user = await getUserMeLoader();
 
  return {
    headerData: { ...mockData },
    courseData: data,
    user: user?.data,
  };
}

export default async function CoursesRoute() {
  const { headerData, courseData, user } = await loader();
  const { data } = courseData;

  return (
    <SectionLayout {...headerData}>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          {data.map((course: CourseProps) => <CourseItem course={course} key={course.id} user={user} />)}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </SectionLayout>
  );
}

const mockData = {
  subHeading: "Expand Your Knowledge",
  heading: "Our Featured Courses",
  text: "Whether you're a beginner or an expert, our curated courses are designed to help you level up your skills.",
};
