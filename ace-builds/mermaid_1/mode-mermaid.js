ace.define('ace/mode/mermaid_highlight_rules', [
  "require","exports","module",
  "ace/lib/oop",
  "ace/mode/text_highlight_rules"
  ], function (require, exports, module) {

  "use strict";
      
  var oop = require("ace/lib/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  var MermaidHighlightRules = function () {
    this.$rules = {
      start: [{
        token: "keyword.diagram",
        regex: /^(?:graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|gantt|pie|journey)\b/
      },
      {
        token: "entity.name.mermaid", // sequence declarations
        regex: /^\s*(?:participant|actor|autonumber|box|end|(de)?activate)|Note (right of|left of|over)\b/
      },
      {
        token: "keyword.direction",
        regex: /(?:direction|TD|TB|LR|RL|TOP)\b/
      }, 
      {
        token: "keyword.mermaid_arrow", // sequence arrow
        regex: /(?:-{1,2}>{1,2}|<<-{1,2}>>|-{1,2}x|-{1,2}[)])/
      }, 
      {
        token: "keyword.mermaid_arrow",
        regex: /(?:->|-->|==>|-.->|===>|<-->|<==>)/
      }, 
      {
        token: "keyword.subgraph",
        regex: /^\s*(?:subgraph|end)\b/
      }, 
      {
        token: "string",
        regex: '"(?=.)(\\\\\\\\|\\\\"|[^"\\\\])*?"'
      }, 
      {
        token: "comment",
        regex: ":\s*.+"
      }, 
      {
        token: "comment",
        regex: "%%.+"
      }, 
      {
        token: "variable",
        regex: "\\[\\[.+?\\]\\]"
      }, 
      {
        token: "constant.numeric",
        regex: "\\b[0-9]+\\b"
      }, 
      {
        token: "keyword.control",
        regex: "\\b(if|else|loop|alt|opt|par|and|or|not)\\b"
      }, 
      {
        token: "entity.name.function",
        regex: "\\b[A-Za-z_][A-Za-z0-9_]*\\b"
      }]
    };

    this.normalizeRules();
  };

  oop.inherits(MermaidHighlightRules, TextHighlightRules);

  exports.MermaidHighlightRules = MermaidHighlightRules;
});


ace.define("ace/mode/mermaid",[
  "require", "exports", "module",
  "ace/mode/mermaid_highlight_rules",
  "ace/mode/text",
  "ace/lib/oop",
  // "ace/mode/folding/cstyle" 
  ], function(require, exports, module) {

    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var MermaidHighlightRules = require("./mermaid_highlight_rules").MermaidHighlightRules;
    //var FoldMode = require("./folding/cstyle").FoldMode;

    var Mode = function () {
      this.HighlightRules = MermaidHighlightRules;
      //this.foldingRules = new FoldMode();
    };
    oop.inherits(Mode, TextMode);
  
    (function () {
      this.$id = "ace/mode/mermaid";
    }).call(Mode.prototype);
  
    exports.Mode = Mode;
  });
  
(function() {
  ace.require(["ace/mode/mermaid"], function(m) {
      if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = m;
      }
  });
})();
