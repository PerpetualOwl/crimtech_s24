// uou won't need other imports
import fs from 'fs'
import path from 'path'

// gets path to `articles` dir in current working dir
const root = path.join(process.cwd(), 'articles')

export async function getSlugs(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(root, 
      (e, files) => {
        if (e) {
          reject(e);
        }
        const slugs = files.map(file => path.parse(file).name);
        resolve(slugs);
      }
    );
  });
}

export async function getArticle(slug: string): Promise<string> {
  // TODO: get the text from a markdown file with the given `slug`
  // `slug` can be, e.g., `hello-world`, `the-success`, etc.
  return new Promise((resolve, reject) => {
    fs.readFile(root + "/" + slug + ".md",
      (e, buffer) => {
        if (e) {
          reject(e);
        }
        resolve(buffer.toString());
      }
    );
  });
}

export async function postArticle(slug: string, content: string): Promise<boolean> {
  // TODO: create markdown file in filesystem with slug and content
  // return `true` on success
  // must handle any errors and exceptions -> should then return `false`
  return new Promise((resolve) => {
    fs.writeFile(root + "/" + slug + ".md", content,
      e => {
        if (e) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}
