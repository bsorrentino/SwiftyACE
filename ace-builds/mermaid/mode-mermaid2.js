define("ace/mode/mermaid_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, oop) {
    "use strict";

    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var MermaidHighlightRules = function() {

        this.$rules = {
            "start": [
                {
                    token: "keyword.diagram", // Diagram types
                    regex: "\\b(sequenceDiagram|classDiagram|stateDiagram|pie|gantt|flowchart|erDiagram|journey)\\b"
                },
                {
                    token: "keyword",
                    regex: "participant|as|note|over|rect|end|loop|alt|opt|else|par|and|break|critical|activate|deactivate|box|end",
                },
                {
                    token: "string", // Strings (in quotes)
                    regex: '".*?"'
                },
                {
                    token: "comment", // Single-line comments
                    regex: "%%.*$"
                },
                {
                    token: "entity.name.function", // Function names, object names, class names
                    regex: "[a-zA-Z0-9_]+(?:\\.[a-zA-Z0-9_]+)*(?=\\s*\\()"
                },
                {
                    token: "constant.numeric", // Numbers
                    regex: "\\b\\d+(?:\\.\\d+)?\\b"
                },
                {
                    token: "constant.language.boolean",
                    regex: "\\b(?:true|false)\\b"
                },
                {
                    token: "variable", // Variables and other identifiers
                    regex: "[a-zA-Z_][a-zA-Z0-9_]*"
                }
            ]
        };

        this.normalizeRules();
    };

    oop.inherits(MermaidHighlightRules, TextHighlightRules);

    exports.MermaidHighlightRules = MermaidHighlightRules;
});

define("ace/mode/mermaid", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/mermaid_highlight_rules"], function(require, exports, oop, TextMode, MermaidHighlightRules) {
    "use strict";

    var Mode = function() {
        this.HighlightRules = MermaidHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.$id = "ace/mode/mermaid";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
