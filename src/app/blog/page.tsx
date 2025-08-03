import { getAllBlogPosts } from '@/lib/contentful';
import Link from 'next/link';
import { getBranding } from '@/lib/branding';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const brand = await getBranding();

  return (
    <main className="max-w-5xl mx-auto p-6 pt-14">
      <h1 className="text-4xl font-bold mb-8" style={{ color: brand.primaryColor }}>
        Blog
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="border rounded-lg overflow-hidden hover:shadow transition bg-white dark:bg-black">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-4">
                <h2
                  className="text-xl font-semibold mb-1"
                  style={{ color: brand.primaryColor }}
                >
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2">{post.subtitle}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
