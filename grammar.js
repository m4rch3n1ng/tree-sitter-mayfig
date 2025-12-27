/**
 * @file a tree-sitter grammar for mayfig
 * @author may
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "mayfig",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
