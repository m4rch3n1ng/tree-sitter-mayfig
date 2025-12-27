import XCTest
import SwiftTreeSitter
import TreeSitterMayfig

final class TreeSitterMayfigTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_mayfig())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading mayfig grammar")
    }
}
