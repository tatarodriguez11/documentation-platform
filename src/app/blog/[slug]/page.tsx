import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful';
import { renderRichText } from '@/lib/richTextRenderers';
import { getBranding } from '@/lib/branding';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const brand = await getBranding();

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 pt-24 pb-12 animate-fade-in">
      <h1
        className="text-4xl font-bold mb-2 leading-tight tracking-tight"
        style={{ color: brand.primaryColor }}
      >
        {post.title}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.author && (
        <div className="flex items-center gap-3 mb-6">
          {post.author.avatar && (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
            />
          )}
          <span className="text-sm text-gray-700 dark:text-gray-300">
            By {post.author.name}
          </span>
        </div>
      )}

      {post.image && (
        <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            className="object-cover"
            fill
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div
        className="prose dark:prose-invert max-w-none
        prose-img:rounded-lg prose-img:shadow-sm prose-img:my-8 prose-img:max-w-full prose-img:h-auto
        prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-a:text-blue-600 dark:prose-a:text-blue-400"
      >
        {renderRichText(post.content)}
      </div>
    </article>
  );
}
