import { getAllBlogPosts } from '@/lib/contentful';
import Link from 'next/link';
import Image from 'next/image';
import { getBranding } from '@/lib/branding';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const brand = await getBranding();

  return (
    <main className="max-w-6xl mx-auto px-6 pt-24">
      <h1
        className="text-4xl font-bold mb-12 tracking-tight"
        style={{ color: brand.primaryColor }}
      >
        Blog
      </h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article
              className="flex flex-col h-full bg-white dark:bg-zinc-900 border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{
                borderColor: brand.primaryColor,
              }}
            >
              {post.image && (
                <div className="relative w-full h-48 md:h-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              )}

              <div className="flex flex-col flex-1 p-5">
                <h2
                  className="text-lg font-semibold mb-1 group-hover:underline"
                  style={{ color: brand.primaryColor }}
                >
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {post.subtitle}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
