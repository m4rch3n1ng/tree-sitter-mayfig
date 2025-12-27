package tree_sitter_mayfig_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_mayfig "github.com/m4rch3n1ng/tree-sitter-mayfig/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_mayfig.Language())
	if language == nil {
		t.Errorf("Error loading mayfig grammar")
	}
}
