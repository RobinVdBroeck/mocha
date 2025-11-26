"use strict";

// Alias exports to a their normalized format Mocha#reporter to prevent a need
// for dynamic (try/catch) requires, which Browserify doesn't handle.
exports.Base = exports.base = require("./base.cjs");
exports.Dot = exports.dot = require("./dot.cjs");
exports.Doc = exports.doc = require("./doc.cjs");
exports.TAP = exports.tap = require("./tap.cjs");
exports.JSON = exports.json = require("./json.cjs");
exports.HTML = exports.html = require("./html.cjs");
exports.List = exports.list = require("./list.cjs");
exports.Min = exports.min = require("./min.cjs");
exports.Spec = exports.spec = require("./spec.cjs");
exports.Nyan = exports.nyan = require("./nyan.cjs");
exports.XUnit = exports.xunit = require("./xunit.cjs");
exports.Markdown = exports.markdown = require("./markdown.cjs");
exports.Progress = exports.progress = require("./progress.cjs");
exports.Landing = exports.landing = require("./landing.cjs");
exports.JSONStream = exports["json-stream"] = require("./json-stream.cjs");
