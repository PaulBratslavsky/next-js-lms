import qs from "qs";
import Link from "next/link";
import { StrapiImage } from "@/components/custom/strapi-image";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "@/components/custom/search";
import { PaginationComponent } from "@/components/custom/pagination";
import { formatDate } from "@/lib/utils";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
    category?: string;
  };
}

interface PostProps {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  image: {
    url: string;
    alternativeText: string;
    name: string;
  };
  category: {
    text: string;
  };
}

async function loader(page: number, queryString: string, category: string) {
  const { getAllPosts } = await import("@/data/loaders");
  const data = await getAllPosts(queryString, page);
  return data;
}

export default async function BlogRoute({
  searchParams,
}: Readonly<SearchParamsProps>) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const category = searchParams?.category ?? "";
  const data = await loader(currentPage, query, category);
  const total = data?.meta.pagination.pageCount;
  const posts = data?.data;
  return (
    <section className="container flex flex-col items-center gap-6 py-6 sm:gap-7">
      <Search />
      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts ? (
          posts.map((item: PostProps) => (
            <Link href={"/blog/" + item.slug} key={item.documentId}>
              <Card className="h-full shadow-lg border-none">
                <CardContent className="flex h-full flex-col items-start gap-5 px-0">
                  <div className="relative h-52 w-full">
                    <StrapiImage
                      alt={item.image.alternativeText}
                      src={item.image.url}
                      className="object-cover rounded-t-lg"
                      fill
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 px-5">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="mb-auto text-muted-foreground">
                      {item.description.substring(0, 100) + "..."}
                    </p>
                    <div className="flex items-center gap-3">
                      {/* <span className="rounded-full outline outline-1 outline-primary text-primary px-3 py-0.5 text-sm">
                        {item.category.text}
                      </span> */}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div>No posts found</div>
        )}
      </div>
      <PaginationComponent pageCount={total} />
    </section>
  );
}
