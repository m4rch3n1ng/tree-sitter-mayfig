/**
 * @file a tree-sitter grammar for mayfig
 * @author may
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "mayfig",

  extras: $ => [/[ \r\t]/, $.comment],

  rules: {
    config: $ => repeat($._statement),

    _newline: _ => /\n/,
    comment: _ => token(prec(-1, seq("#", repeat(/./)))),

    _statement: $ => choice(
      $._newline,
      "hello",
      $.kv,
    ),

    escaped: _ => token.immediate(seq("\\", /./)),
    _string_content: _ => token.immediate(repeat1(/[^\x00-\x1F\x22\x5c\x7F]/)),

    string: $ => seq(
      '"',
      repeat(choice(
        $._string_content,
        $.escaped,
      )),
      '"'
    ),
    bool: _ => choice("true", "false"),

    int: _ => /[+-]?[0-9]+/,
    float: _ => choice(
      ".inf",
      "+.inf",
      "-.inf",
      /[+-]?[0-9]+[eE][+-]?[0-9]+/,
      /[+-]?([0-9]+\.[0-9]*|\.[0-9]+)([eE][+-]?[0-9]+)?/
    ),

    _seq_value: $ => choice(
      $._value,
      $._newline,
      ",",
    ),

    seq: $ => seq("[", repeat($._seq_value), "]"),

    tagged: $ => prec(1, seq($.string, $.seq)),

    _value: $ => choice(
      $.tagged,
      $.seq,
      $.string,
      $.bool,
      $.int,
      $.float,
    ),

    bare_key: _ => /[a-zA-Z_][a-zA-Z0-9_+-]*/,

    tagged_key: $ => seq(choice($.bare_key, alias($.string, $.quoted_key)), $.seq),

    _key: $ => choice(
      alias($.string, $.quoted_key),
      alias($.tagged_key, $.tagged),
      $.bare_key,
      $.int,
      $.float,
      $.seq,
    ),

    kv: $ => choice(
      seq($._key, "=", $._value),
      seq($._key, optional('='), $.map),
    ),

    map: $ => seq("{", repeat($._statement), "}"),
  }
});
