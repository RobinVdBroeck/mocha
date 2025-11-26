import inclusiveLanguagePlugin from "@11ty/eleventy-plugin-inclusive-language";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import MarkdownItEmoji from "markdown-it-emoji";
import markdownItPrism from "markdown-it-prism";
import uslug from "uslug";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLanguagePlugin, {
    words:
      "simply,obviously,basically,of course,clearly,everyone knows,however,easy",
  });

  eleventyConfig.addPassthroughCopy("docs/css");
  eleventyConfig.addPassthroughCopy("docs/js");
  eleventyConfig.addPassthroughCopy("docs/images");
  eleventyConfig.addPassthroughCopy("docs/CNAME");
  eleventyConfig.addPassthroughCopy("docs/_headers");
  eleventyConfig.addPassthroughCopy("docs/favicon.ico");
  eleventyConfig.addPassthroughCopy("docs/example");
  eleventyConfig.addPassthroughCopy("docs/api/images");
  eleventyConfig.addPassthroughCopy("docs/api/scripts");
  eleventyConfig.addPassthroughCopy("docs/api/styles");

  /* Markdown Plugins */
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  markdown.use(markdownItAnchor, {
    slugify: "uslug",
    permalink: true,
    permalinkBefore: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  });

  markdown.use(markdownItAttrs, {
    leftDelimiter: "{:",
    rightDelimiter: "}",
  });

  markdown.use(markdownItPrism);

  markdown.use(MarkdownItEmoji);

  eleventyConfig.setLibrary("md", markdown);

  eleventyConfig.setUseGitIgnore(false);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "docs",
      output: "docs/_site",
    },
  };
}
