"use strict";

import { stripVTControlCharacters } from "node:util";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const executable = import.meta.resolve("../../bin/mocha.cjs");
const flag = "--help";

/**
 * Return the output of `mocha --help` for display
 */
export default () => {
  return stripVTControlCharacters(
    String(
      execSync(`"${process.execPath}" ${executable} ${flag}`, {
        cwd: resolve(__dirname, ".."),
      }),
    ).trim(),
  );
};
