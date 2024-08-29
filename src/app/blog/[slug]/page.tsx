import React from "react";
import { Metadata } from "next";
import { formatDate, } from "@/lib/utils";
import { MarkdownText } from "@/components/custom/markdown-text";
import { StrapiImage } from "@/components/custom/strapi-image";

interface Props {
  params: {
    slug: string;
  };
}


async function loader(slug: string) {
  const { getPostBySlug } = await import("@/data/loaders");
  const data = await getPostBySlug(slug);
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await loader(params.slug);
  const { title, description } = data.data[0];
  return {
    title: title,
    description: description,
  };
}
export default async function SinglePost({ params }: Readonly<Props>) {
  const data = await loader(params.slug);
  const post = data?.data[0];
  if (!post) return null;

  return (
    <article>
      <div>
        <header className="container mx-auto my-10">
          <h1 className="text-6xl font-bold sm:text-5xl mb-4">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on {formatDate(post.publishedAt)}
             {/* - {post.category.text} */}
          </p>
          <StrapiImage
            src={post.image.url}
            alt={post.image.alternativeText}
            width={800}
            height={400}
            priority
            className="w-full rounded-lg mt-8 object-cover h-[400px]"
          />
        </header>
      </div>

      <div className="container mx-auto max-w-4xl text-base leading-7">
        <MarkdownText content={post.content} className="rich-text" />
      </div>
    </article>
  );
}
