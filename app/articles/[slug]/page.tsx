import { getArticle } from '@/lib/api'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  const blockList = article.split('\n');
  return <>{
      blockList.map((block, i) => <p key={params.slug + "-block-" + i}>{block}</p>)
    }</>
}
