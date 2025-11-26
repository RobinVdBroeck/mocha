"use strict";

import markdownToc from "markdown-toc";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const IGNORED_HEADINGS_REGEXP = /Features|Table of Contents|Backers|Sponsors/i;
const DOCUMENT_PATH = resolve(__dirname, "..", "index.md");

export default () => {
  const doc = readFileSync(DOCUMENT_PATH, "utf-8");
  return markdownToc(doc, {
    slugify: require("uslug"),
    firsth1: false,
    bullets: "-",
    maxdepth: 2,
    // if filter is supplied, maxdepth is apparently ignored,
    // so we have to do it ourselves.
    filter: (str, ele) => ele.lvl < 2 && !IGNORED_HEADINGS_REGEXP.test(str),
  }).content;
};
