define('ace/mode/mermaid', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var MermaidHighlightRules = require("ace/mode/mermaid_highlight_rules").MermaidHighlightRules;
  
    var Mode = function() {
      this.HighlightRules = MermaidHighlightRules;
    };
    oop.inherits(Mode, TextMode);
  
    (function() {
      this.$id = "ace/mode/mermaid";
    }).call(Mode.prototype);
  
    exports.Mode = Mode;
  });
  
  define('ace/mode/mermaid_highlight_rules', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  
    var MermaidHighlightRules = function() {
      this.$rules = {
        start: [{
          token: "keyword",
          regex: "^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|gantt|pie|journey)\\b"
        }, {
          token: "keyword.operator",
          regex: "(-->|==>|-.->|===>|<-->|<==>"
        }, {
          token: "string",
          regex: '"(?=.)(\\\\\\\\|\\\\"|[^"\\\\])*?"'
        }, {
          token: "comment",
          regex: "%%.+"
        }, {
          token: "variable",
          regex: "\\[\\[.+?\\]\\]"
        }, {
          token: "constant.numeric",
          regex: "\\b[0-9]+\\b"
        }, {
          token: "keyword.control",
          regex: "\\b(if|else|loop|alt|opt|par|and|or|not)\\b"
        }, {
          token: "entity.name.function",
          regex: "\\b[A-Za-z_][A-Za-z0-9_]*\\b"
        }]
      };
  
      this.normalizeRules();
    };
  
    oop.inherits(MermaidHighlightRules, TextHighlightRules);
  
    exports.MermaidHighlightRules = MermaidHighlightRules;
  });