import Link from 'next/link'
import styles from './page.module.css'
import { getSlugs, postArticle } from '@/lib/api'

async function getLinks(): Promise<
  {
    name: string
    href: string
  }[]
> {
  const slugs = await getSlugs();
  const links = [];

  for (let i = 0; i < slugs.length; i++) {
    var words = slugs[i].split("-");
    words = words.map(word => (word[0].toUpperCase() + word.slice(1)));

    links.push({
      name: words.join(" "),
      href: "/articles/" + slugs[i]
    })
  }
  return links;
}

export default async function Home() {
  'use client';
  const links = await getLinks()

  const submit = async (formData: FormData) => {
    'use server';
    const slug = formData.get("slug");
    const content = formData.get("content");

    if (!slug || !content) {
      return;
    }

    console.log({ slug, content });
    const res = await postArticle(slug.toString(), content.toString());
    if (res) {

    }
  };

  return (
    <>
      <main>
        <h1>Articles</h1>
        <ul>
          {links.map(link => (<li key={link.href}><Link href={link.href}>{link.name}</Link></li>))}
        </ul>
      </main>
      <hr />

      {
        // TODO: use Next.js server actions to
        // ultimately `postArticle` in `api.ts`
        // there are also HTML attribute problems
      }
      <form className={styles.articleForm} action={submit} method="POST" id="post-article-form">
        <h3>Post a New Article</h3>
        <input name="slug" placeholder="Slug"/>
        <textarea className={styles.articleEditor} name="content" placeholder="Article Content"/>
        <button type="submit" id="post-article-message">Post Article</button>
      </form>
    </>
  )
}
