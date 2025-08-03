import {
  Asset,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  createClient,
} from 'contentful';


type SeoSkeleton = EntrySkeletonType<{
  pageTitle: EntryFieldTypes.Symbol;
  pageDescription: EntryFieldTypes.Text;
  canonicalUrl: EntryFieldTypes.Symbol;
  noindex: EntryFieldTypes.Boolean;
  nofollow: EntryFieldTypes.Boolean;
  shareImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}>;

type AuthorSkeleton = EntrySkeletonType<{
  name: EntryFieldTypes.Symbol;
  avatar: EntryFieldTypes.AssetLink;
}>;

type BlogPostSkeleton = EntrySkeletonType<{
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  shortDescription: EntryFieldTypes.Text;
  publishedDate: EntryFieldTypes.Date;
  featuredImage: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
  seoFields: EntryFieldTypes.EntryLink<SeoSkeleton>;
  author: EntryFieldTypes.EntryLink<AuthorSkeleton>;
}>;

function isResolvedEntry<T extends EntrySkeletonType>(
  entry: unknown
): entry is Entry<T> {
  return typeof entry === 'object' && entry !== null && 'fields' in entry;
}

export function isResolvedAsset(asset: unknown): asset is Asset {
  return typeof asset === 'object' && asset !== null && 'fields' in asset;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

function getAssetUrl(asset: unknown): string | undefined {
  if (isResolvedAsset(asset) && asset.fields.file?.url) {
    return asset.fields.file.url as string;
  }
  return undefined;
}

export async function getAllBlogPosts() {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: 'pageBlogPost',
    order: ['-fields.publishedDate'],
  });

  return response.items.map((item) => {
    const { slug, title, shortDescription, publishedDate, featuredImage } = item.fields;

    return {
      slug,
      title,
      subtitle: shortDescription,
      date: publishedDate,
      image: getAssetUrl(featuredImage),
    };
  });
}

export async function getBlogPostBySlug(slug: string) {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: 'pageBlogPost',
    'fields.slug': slug,
    include: 2,
    limit: 1,
  });

  const item = response.items[0];
  const fields = item.fields;

  const seo = isResolvedEntry<SeoSkeleton>(fields.seoFields)
    ? fields.seoFields.fields
    : null;

  const author = isResolvedEntry<AuthorSkeleton>(fields.author)
    ? fields.author.fields
    : null;

  const image = getAssetUrl(fields.featuredImage);
  const avatar = getAssetUrl(author?.avatar);

  const images =
    seo?.shareImages?.map(getAssetUrl).filter((url): url is string => Boolean(url)) || [];

  return {
    title: fields.title,
    date: fields.publishedDate,
    subtitle: fields.shortDescription,
    content: fields.content,
    image,
    seo: seo && {
      title: seo.pageTitle,
      description: seo.pageDescription,
      canonicalUrl: seo.canonicalUrl,
      noindex: seo.noindex,
      nofollow: seo.nofollow,
      images,
    },
    author: author && {
      name: author.name,
      avatar,
    },
  };
}
