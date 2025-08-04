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
  const brand = getBranding();

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto p-6 pt-16">
      <h1 className="text-4xl font-bold mb-1" style={{ color: brand.primaryColor }}>
        {post.title}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.author && (
        <div className="flex items-center gap-3 mb-6">
          {post.author.avatar && (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
          )}
          <span className="text-sm text-gray-700">By {post.author.name}</span>
        </div>
      )}

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          className="w-full rounded mb-6"
          width={800}
          height={400}
        />
      )}

      <div className="prose dark:prose-invert max-w-none">
        {renderRichText(post.content)}
      </div>
    </article>
  );
}