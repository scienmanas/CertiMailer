import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function markdownParser(folderPath: string, slug: string) {
  const directory = path.join(process.cwd(), "public", folderPath);
  const contentPath = path.join(directory, slug, "content.md");

  // Read the markdown file and extract front matter
  const fileContents = fs.readFileSync(contentPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    heading: matterResult.data.heading,
    metaData: matterResult.data.metaData,
    keywords: matterResult.data.keywords,
    date: matterResult.data.date,
    content: matterResult.content,
  };
}
