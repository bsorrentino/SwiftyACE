ace.define('ace/mode/mermaid_highlight_rules', [
    "require","exports","module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
    ], function (require, exports, module) {
  
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var MermaidHighlightRules = function() {
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
    
        this.$rules = {
            start: [{
                include: "#mermaid"
            }],
            "#mermaid": [{
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(classDiagram)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "entity.name.type.class.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.type.class.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /([\w-]+)(\s)((?:"(?:\d+|\*|0..\d+|1..\d+|1..\*)")?)(\s?)(--o|--\*|\<--|--\>|<\.\.|\.\.\>|\<\|\.\.|\.\.\|\>|\<\|--|--\|>|--\*|--|\.\.|\*--|o--)(\s)((?:"(?:\d+|\*|0..\d+|1..\d+|1..\*)")?)(\s?)([\w-]+)(\s?)((?::)?)(\s)(.*)$/,
                    caseInsensitive: true,
                    comment: "(class name) (\"multiplicity relationship\")? (relationship) (\"multiplicity relationship\")? (class name) :? (labelText)?"
                }, {
                    token: [
                        "entity.name.type.class.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "entity.name.function.mermaid",
                        "punctuation.parenthesis.open.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.begin.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.end.mermaid",
                        "text",
                        "entity.name.variable.parameter.mermaid",
                        "punctuation.parenthesis.closed.mermaid",
                        "keyword.control.mermaid",
                        "text",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.begin.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.end.mermaid"
                    ],
                    regex: /([\w-]+)(\s?)(:)(\s)((?:[\+~#-])?)([\w-]+)(\()((?:[\w-]+)?)((?:~)?)((?:[\w-]+)?)((?:~)?)(\s?)((?:[\w-]+)?)(\))([*\$]{0,2})(\s?)((?:[\w-]+)?)((?:~)?)((?:[\w-]+)?)((?:~)?)$/,
                    caseInsensitive: true,
                    comment: "(class name) : (visibility)?(function)( (function param/generic param)? )(classifier)? (return/generic return)?$"
                }, {
                    token: [
                        "entity.name.type.class.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.begin.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.end.mermaid",
                        "text",
                        "entity.name.variable.field.mermaid"
                    ],
                    regex: /([\w-]+)(\s?)(:)(\s)((?:[\+~#-])?)([\w-]+)((?:~)?)((?:[\w-]+)?)((?:~)?)(\s)((?:[\w-]+)?)$/,
                    caseInsensitive: true,
                    comment: "(class name) : (visibility)?(datatype/generic data type) (attribute name)$"
                }, {
                    token: [
                        "punctuation.definition.typeparameters.begin.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.end.mermaid",
                        "text",
                        "entity.name.type.class.mermaid"
                    ],
                    regex: /(<<)([\w-]+)(>>)(\s?)((?:[\w-]+)?)/,
                    caseInsensitive: true,
                    comment: "<<(Annotation)>> (class name)"
                }, {
                    token: [
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.type.class.mermaid",
                        "punctuation.definition.typeparameters.begin.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.end.mermaid",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /(class)(\s+)([\w-]+)((?:~)?)((?:[\w-]+)?)((?:~)?)(\s?)({)/,
                    caseInsensitive: true,
                    push: [{
                        token: "keyword.control.mermaid",
                        regex: /}/,
                        next: "pop"
                    }, {
                        token: "comment",
                        regex: /\%%.*/
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "entity.name.function.mermaid",
                            "punctuation.parenthesis.open.mermaid"
                        ],
                        regex: /(\s)((?:[\+~#-])?)([\w-]+)(\()/,
                        caseInsensitive: true,
                        push: [{
                            token: [
                                "punctuation.parenthesis.closed.mermaid",
                                "keyword.control.mermaid",
                                "text",
                                "storage.type.mermaid",
                                "punctuation.definition.typeparameters.begin.mermaid",
                                "storage.type.mermaid",
                                "punctuation.definition.typeparameters.end.mermaid"
                            ],
                            regex: /(\))([*\$]{0,2})(\s?)((?:[\w-]+)?)((?:~)?)((?:[\w-]+)?)((?:~)?)$/,
                            caseInsensitive: true,
                            next: "pop"
                        }, {
                            token: [
                                "text",
                                "storage.type.mermaid",
                                "punctuation.definition.typeparameters.begin.mermaid",
                                "storage.type.mermaid",
                                "punctuation.definition.typeparameters.end.mermaid",
                                "text",
                                "entity.name.variable.parameter.mermaid"
                            ],
                            regex: /(\s*,?\s*)((?:[\w-]+)?)((?:~)?)((?:[\w-]+)?)((?:~)?)(\s?)((?:[\w-]+)?)/,
                            caseInsensitive: true,
                            comment: "(TBD)"
                        }],
                        comment: "(visibility)?(function)( (function param/generic param)? )(classifier)? (return/generic return)?$"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "storage.type.mermaid",
                            "punctuation.definition.typeparameters.begin.mermaid",
                            "storage.type.mermaid",
                            "punctuation.definition.typeparameters.end.mermaid",
                            "text",
                            "entity.name.variable.field.mermaid"
                        ],
                        regex: /(\s)((?:[\+~#-])?)([\w-]+)((?:~)?)((?:[\w-]+)?)((?:~)?)(\s)((?:[\w-]+)?)$/,
                        caseInsensitive: true,
                        comment: "(visibility)?(datatype/generic data type) (attribute name)$"
                    }, {
                        token: [
                            "punctuation.definition.typeparameters.begin.mermaid",
                            "storage.type.mermaid",
                            "punctuation.definition.typeparameters.end.mermaid",
                            "text",
                            "entity.name.type.class.mermaid"
                        ],
                        regex: /(<<)([\w-]+)(>>)(\s?)((?:[\w-]+)?)/,
                        caseInsensitive: true,
                        comment: "<<(Annotation)>> (class name)"
                    }],
                    comment: "class (class name) ~?(generic type)?~? ({)"
                }, {
                    token: [
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.type.class.mermaid",
                        "punctuation.definition.typeparameters.begin.mermaid",
                        "storage.type.mermaid",
                        "punctuation.definition.typeparameters.end.mermaid"
                    ],
                    regex: /(class)(\s+)([\w-]+)((?:~)?)((?:[\w-]+)?)((?:~)?)/,
                    caseInsensitive: true,
                    comment: "class (class name) ~?(generic type)?~?"
                }],
                comment: "Class Diagram"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(erDiagram)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: "variable",
                    regex: /^\s*[\w-]+$/,
                    comment: "(entity)"
                }, {
                    token: [
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /(\s+)([\w-]+)(\s*)({)/,
                    caseInsensitive: true,
                    push: [{
                        token: "keyword.control.mermaid",
                        regex: /}/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "storage.type.mermaid",
                            "text",
                            "variable",
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "string",
                            "text"
                        ],
                        regex: /(\s*)([\w-]+)(\s+)([\w-]+)(\s+)((?:PK|FK)?)(\s*)((?:"["\($&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*")?)(\s*)/,
                        caseInsensitive: true,
                        comment: "(type) (name) (PK|FK)? (\"comment\")?"
                    }, {
                        token: "comment",
                        regex: /\%%.*/
                    }],
                    comment: "(entity) {"
                }, {
                    token: [
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)([\w-]+)(\s*)((?:\|o|\|\||}o|}\||one or (?:zero|more|many)|zero or (?:one|more|many)|many\((?:0|1)\)|only one|0\+|1\+?)(?:..|--)(?:o\||\|\||o{|\|{|one or (?:zero|more|many)|zero or (?:one|more|many)|many\((?:0|1)\)|only one|0\+|1\+?))(\s*)([\w-]+)(\s*)(:)(\s*)("[\w\s]*"|[\w-]+)/,
                    caseInsensitive: true,
                    comment: "(entity) (relationship) (entity) : (label)"
                }],
                comment: "Entity Relationship Diagram"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(gantt)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.function.mermaid"
                    ],
                    regex: /^(\s*)(dateFormat)(\s+)([\w\-\.]+)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.function.mermaid"
                    ],
                    regex: /^(\s*)(axisFormat)(\s+)([\w\%\/\\\-\.]+)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(tickInterval)(\s+)([1-9][0-9]*(?:millisecond|second|minute|hour|day|week|month))/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(title)(\s+)(\s*["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(excludes)(\s+)((?:[\d\-,\s]+|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekends)+)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s+)(todayMarker)(\s+)(.*)$/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(section)(\s+)(\s*["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "string",
                        "keyword.control.mermaid"
                    ],
                    regex: /^(\s)(.*)(:)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: "entity.name.function.mermaid",
                        regex: /crit|done|active|after/
                    }, {
                        token: "comment",
                        regex: /\%%.*/
                    }]
                }],
                comment: "Gantt Diagram"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(gitGraph)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: ["text", "keyword.control.mermaid"],
                    regex: /^(\s*)(commit)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "keyword.control.mermaid",
                            "text",
                            "string"
                        ],
                        regex: /(\s*)(id)(:)(\s?)("[^"$]*")/,
                        caseInsensitive: true,
                        comment: "(id)(:) (\"id\")"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "keyword.control.mermaid",
                            "text",
                            "entity.name.function.mermaid"
                        ],
                        regex: /(\s*)(type)(:)(\s?)(NORMAL|REVERSE|HIGHLIGHT)/,
                        caseInsensitive: true,
                        comment: "(type)(:) (COMMIT_TYPE)"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "keyword.control.mermaid",
                            "text",
                            "string"
                        ],
                        regex: /(\s*)(tag)(:)(\s?)("[\($&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*")/,
                        caseInsensitive: true,
                        comment: "(tag)(:) (\"tag\")"
                    }],
                    comment: "commit"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable"
                    ],
                    regex: /^(\s*)(checkout)(\s*)([^\s"]*)/,
                    caseInsensitive: true,
                    comment: "(checkout) (branch-name)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "keyword.control.mermaid",
                        "text",
                        "constant.numeric.decimal.mermaid"
                    ],
                    regex: /^(\s*)(branch)(\s*)([^\s"]*)(\s*)(?:(order)(:)(\s?)(\d+))?/,
                    caseInsensitive: true,
                    comment: "(branch) (branch-name) (order)?(:) (number)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(merge)(\s*)([^\s"]*)(\s*)(?:(tag)(:)(\s?)("[^"$]*"))?/,
                    caseInsensitive: true,
                    comment: "(merge) (branch-name) (tag: \"tag-name\")?"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(cherry-pick)(\s+)(id)(:)(\s*)("[^"$]*")/,
                    caseInsensitive: true,
                    comment: "(cherry-pick) (id)(:)(\"commit-id\")"
                }],
                comment: "Git Graph"
            }, {
                token: [
                    "text",
                    "keyword.control.mermaid",
                    "text",
                    "keyword.control.mermaid"
                ],
                regex: /^(\s*)(graph|flowchart)(\s*)(?:(TD|LR)?)$/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "keyword.control.mermaid",
                        "string",
                        "keyword.control.mermaid"
                    ],
                    regex: /^(\s*)(subgraph)(\s+)(\w+)(\[)("?[\w\s*+%=\\\/:\.\-'`,&^#$!?<>]*"?)(\])/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.function.mermaid"
                    ],
                    regex: /^(\s*)(subgraph)(\s+)([\p{Letter}\ 0-9<>]+)/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.function.mermaid"
                    ],
                    regex: /^(\s*)(direction)(\s+)(RB|BT|RL|TD|LR)/,
                    caseInsensitive: true
                }, {
                    token: "keyword.control.mermaid",
                    regex: /\bend\b/
                }, {
                    token: ["variable", "keyword.control.mermaid"],
                    regex: /(\b(?:(?!--|==)[-\w])+\b\s*)(\(\[|\[\[|\[\(|\[|\(+|\>|\{|\(\()/,
                    caseInsensitive: true,
                    push: [{
                        token: "keyword.control.mermaid",
                        regex: /\]\)|\]\]|\)\]|\]|\)+|\}|\)\)/,
                        caseInsensitive: true,
                        next: "pop"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s*)(")/,
                        push: [{
                            token: "string",
                            regex: /"/,
                            next: "pop"
                        }, {
                            token: "string",
                            regex: /[^"]*/,
                            caseInsensitive: true,
                            push: [{
                                token: "text",
                                regex: /(?=")/,
                                next: "pop"
                            }, {
                                token: "comment",
                                regex: /[^"]*/
                            }],
                            comment: "capture inner text between quotes"
                        }],
                        comment: "(\"multi-line text\")"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s*)([$&%\^\/#.,?!;:*+<>_\'\\\w\s]+)/,
                        caseInsensitive: true,
                        comment: "(single line text)"
                    }],
                    comment: "(Entity)(Edge/Shape)(Text)(Edge/Shape)"
                }, {
                    token: ["text", "keyword.control.mermaid"],
                    regex: /(\s*)((?:-{2,5}|={2,5})[xo>]?\|)/,
                    caseInsensitive: true,
                    push: [{
                        token: "keyword.control.mermaid",
                        regex: /\|/,
                        caseInsensitive: true,
                        next: "pop"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s*)(")/,
                        push: [{
                            token: "string",
                            regex: /"/,
                            next: "pop"
                        }, {
                            token: "string",
                            regex: /[^"]*/,
                            caseInsensitive: true,
                            push: [{
                                token: "text",
                                regex: /(?=")/,
                                next: "pop"
                            }, {
                                token: "comment",
                                regex: /[^"]*/
                            }],
                            comment: "capture inner text between quotes"
                        }],
                        comment: "(\"multi-line text\")"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s*)([$&%\^\/#.,?!;:*+<>_\'\\\w\s]+)/,
                        caseInsensitive: true,
                        comment: "(single line text)"
                    }],
                    comment: "(Graph Link)(\"Multiline text\")(Graph Link)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "string",
                        "keyword.control.mermaid"
                    ],
                    regex: /(\s*)([xo<]?(?:-{2,5}|={2,5}|-\.{1,3}|-\.))((?:(?!--|==)[\w\s*+%=\\\/:\.\-'`,"&^#$!?<>\[\]])*)((?:-{2,5}|={2,5}|\.{1,3}-|\.-)[xo>]?)/,
                    caseInsensitive: true,
                    comment: "(Graph Link Start Arrow)(Text)(Graph Link End Arrow)"
                }, {
                    token: ["text", "keyword.control.mermaid"],
                    regex: /(\s*)([ox<]?(?:-.{1,3}-|-{1,3}|={1,3})[ox>]?)/,
                    caseInsensitive: true,
                    comment: "(Graph Link)"
                }, {
                    token: "variable",
                    regex: /\b(?:(?!--|==)[-\w])+\b\s*/,
                    comment: "Entity"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(class)(\s+)(\b[-,\w]+)(\s+)(\b\w+\b)/,
                    caseInsensitive: true,
                    comment: "(Class)(Node(s))(ClassName)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(classDef)(\s+)(\b\w+\b)(\s+)(\b[-,:;#\w]+)/,
                    caseInsensitive: true,
                    comment: "(ClassDef)(ClassName)(Styles)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "variable",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(click)(\s+)(\b[-\w]+\b\s*)((?:\b\w+\b)?)(\s)("*.*")/,
                    caseInsensitive: true,
                    comment: "(Click)(Entity)(Link)?(Tooltip)"
                }],
                comment: "Graph"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(pie)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(title)(\s+)(\s*["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "string",
                        "keyword.control.mermaid"
                    ],
                    regex: /(\s)(.*)(:)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: "comment",
                        regex: /\%%.*/
                    }]
                }],
                comment: "Pie Chart"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(quadrantChart)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(title)(\s*)(["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)([xy]-axis)(\s+)((?:(?!-->)[$&%\/#.,?!*+=\'\\\-\w\s])*)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "string"
                        ],
                        regex: /(\s*)(-->)(\s*)([$&%\/#.,?!*+=\'\\\-\w\s]*)/,
                        caseInsensitive: true,
                        comment: "(-->) (text)"
                    }],
                    comment: "(x|y-axis) (text) (-->)? (text)?"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(quadrant-[1234])(\s*)(["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "string",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "constant.numeric.decimal.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "constant.numeric.decimal.mermaid",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /(\s*)([$&%\/#.,?!*+=\'\\\-\w\s]*)(\s*)(:)(\s*)(\[)(\s*)(\d\.\d+)(\s*)(,)(\s*)(\d\.\d+)(\s*)(\])/,
                    caseInsensitive: true,
                    comment: "(text)(:) ([)(decimal)(,) (decimal)(])"
                }],
                comment: "Quadrant Chart"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(requirementDiagram)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /^(\s*)((?:functional|interface|performance|physical)?requirement|designConstraint)(\s*)(["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)(\s*)({)/,
                    caseInsensitive: true,
                    push: [{
                        token: ["text", "keyword.control.mermaid"],
                        regex: /(\s*)(})/,
                        caseInsensitive: true,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "variable"
                        ],
                        regex: /(\s*)(id:)(\s*)([$&%\^\/#.,?!;:*+<>_\'\\\w\s]+)/,
                        caseInsensitive: true,
                        comment: "(id:) (variable id)"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "string"
                        ],
                        regex: /(\s*)(text:)(\s*)([$&%\^\/#.,?!;:*+<>_\'\\\w\s]+)/,
                        caseInsensitive: true,
                        comment: "(text:) (text string)"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "entity.name.function.mermaid",
                            "text"
                        ],
                        regex: /(\s*)(risk:)(\s*)(low|medium|high)(\s*$)/,
                        caseInsensitive: true,
                        comment: "(risk:) (risk option)"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "entity.name.function.mermaid",
                            "text"
                        ],
                        regex: /(\s*)(verifymethod:)(\s*)(analysis|inspection|test|demonstration)(\s*$)/,
                        caseInsensitive: true,
                        comment: "(verifyMethod)(:) (method)"
                    }],
                    comment: "(requirement) (name) ({)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /^(\s*)(element)(\s*)(["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)(\s*)({)/,
                    caseInsensitive: true,
                    push: [{
                        token: ["text", "keyword.control.mermaid"],
                        regex: /(\s*)(})/,
                        caseInsensitive: true,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "variable"
                        ],
                        regex: /(\s*)(type:)(\s*)(["$&%\^\/#.,?!;:*+<>_\'\\\w\s]+)/,
                        caseInsensitive: true,
                        comment: "(type:) (user type)"
                    }, {
                        token: [
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "variable"
                        ],
                        regex: /(\s*)(docref:)(\s*)([$&%\^\/#.,?!;:*+<>_\'\\\w\s]+)/,
                        caseInsensitive: true,
                        comment: "(docref:) (user ref)"
                    }],
                    comment: "(element) (name) ({)"
                }, {
                    token: [
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text"
                    ],
                    regex: /^(\s*)([\w]+)(\s*)(-)(\s*)(contains|copies|derives|satisfies|verifies|refines|traces)(\s*)(->)(\s*)([\w]+)(\s*$)/,
                    caseInsensitive: true,
                    comment: "(source) (-) (type) (->) (destination)"
                }, {
                    token: [
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text"
                    ],
                    regex: /^(\s*)([\w]+)(\s*)(<-)(\s*)(contains|copies|derives|satisfies|verifies|refines|traces)(\s*)(-)(\s*)([\w]+)(\s*$)/,
                    caseInsensitive: true,
                    comment: "(destination) (<-) (type) (-) (source)"
                }],
                comment: "Requirement Diagram"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(sequenceDiagram)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /(?:\%%|#).*/
                }, {
                    token: [
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(title)(\s*)((?::)?)(\s+)(\s*["\(\)$&%\^\/#.,?!:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true,
                    comment: "(title)(title text)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(participant|actor)(\s+)((?:(?! as )["\(\)$&%\^\/#.?!*=<>\'\\\w\s])+)(\s*)((?:as)?)(\s)((?:["\(\)$&%\^\/#.,?!*=<>\'\\\w\s]+)?)/,
                    caseInsensitive: true,
                    comment: "(participant)(Actor)(as)?(Label)?"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable"
                    ],
                    regex: /(\s*)((?:de)?activate)(\s+)(\b["()$&%^\/#.?!*=<>'\\\w\s]+\b\)?\s*)/,
                    caseInsensitive: true,
                    comment: "(activate/deactivate)(Actor)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.function.mermaid",
                        "text",
                        "variable",
                        "keyword.control.mermaid",
                        "variable",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(Note)(\s+)((?:left|right)\sof|over)(\s+)(\b["()$&%^\/#.?!*=<>'\\\w\s]+\b\)?\s*)((?:,)?)((?:\b["()$&%^\/#.?!*=<>'\\\w\s]+\b\)?\s*)?)(:)(?:(\s+)([^;#]*))?/,
                    caseInsensitive: true,
                    comment: "(Note)(direction)(Actor)(,)?(Actor)?(:)(Message)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(loop)(?:(\s+)([^;#]*))?/,
                    caseInsensitive: true,
                    comment: "(loop)(loop text)"
                }, {
                    token: ["text", "keyword.control.mermaid"],
                    regex: /(\s*)(end)/,
                    comment: "(end)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(alt|else|option|par|and|rect|autonumber|critical|opt)(?:(\s+)([^#;]*))?$/,
                    caseInsensitive: true,
                    comment: "(alt/else/option/par/and/autonumber/critical/opt)(text)"
                }, {
                    token: [
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(\b["()$&%^\/#.?!*=<>'\\\w\s]+\b\)?)(\s*)(-?-(?:\>|x|\))\>?[+-]?)(\s*)(["()$&%^\/#.?!*=<>'\\\w\s]+\b\)?)(\s*)(:)(\s*)([^;#]*)/,
                    caseInsensitive: true,
                    comment: "(Actor)(Arrow)(Actor)(:)(Message)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "entity.name.function.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(box)(\s+)(transparent)(?:(\s+)([^;#]*))?/,
                    caseInsensitive: true,
                    comment: "(box transparent text)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\s*)(box)(?:(\s+)([^;#]*))?/,
                    caseInsensitive: true,
                    comment: "(box text)"
                }],
                comment: "Sequence Diagram"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(stateDiagram(?:-v2)?)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: ["text", "keyword.control.mermaid", "text"],
                    regex: /(\s+)(})(\s+)/,
                    comment: "}"
                }, {
                    token: ["text", "keyword.control.mermaid", "text"],
                    regex: /(\s+)(--)(\s+)/,
                    comment: "--"
                }, {
                    token: "variable",
                    regex: /^\s*[\w-]+$/,
                    comment: "(state)"
                }, {
                    token: [
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /([\w-]+)(\s+)(:)(\s+)(\s*[-\w\s]+\b)/,
                    caseInsensitive: true,
                    comment: "(state) : (description)"
                }, {
                    token: ["text", "keyword.control.mermaid", "text"],
                    regex: /^(\s*)(state)(\s+)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "string",
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "variable"
                        ],
                        regex: /(\s*)("[-\w\s]+\b")(\s+)(as)(\s+)([\w-]+)/,
                        caseInsensitive: true,
                        comment: "\"(description)\" as (state)"
                    }, {
                        token: [
                            "text",
                            "variable",
                            "text",
                            "keyword.control.mermaid"
                        ],
                        regex: /(\s*)([\w-]+)(\s+)({)/,
                        caseInsensitive: true,
                        comment: "(state name) {"
                    }, {
                        token: [
                            "text",
                            "variable",
                            "text",
                            "keyword.control.mermaid"
                        ],
                        regex: /(\s*)([\w-]+)(\s+)(<<(?:fork|join)>>)/,
                        caseInsensitive: true,
                        comment: "(state name) <<fork|join>>"
                    }],
                    comment: "state"
                }, {
                    token: [
                        "variable",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /([\w-]+)(\s+)(-->)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "variable",
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "string"
                        ],
                        regex: /(\s+)([\w-]+)(\s*)((?::)?)(\s*)((?:[^$:]+)?)/,
                        caseInsensitive: true,
                        comment: "(state) (:)? (transition text)?"
                    }, {
                        token: [
                            "keyword.control.mermaid",
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "string"
                        ],
                        regex: /(\[\*\])(\s*)((?::)?)(\s*)((?:[^$:]+)?)/,
                        caseInsensitive: true,
                        comment: "[*] (:)? (transition text)?"
                    }],
                    comment: "(state) -->"
                }, {
                    token: [
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /(\[\*\])(\s+)(-->)(\s+)([\w-]+)(\s*)((?::)?)(\s*)((?:[^$:]+)?)/,
                    caseInsensitive: true,
                    comment: "[*] --> (state) (:)? (transition text)?"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(note (?:left|right) of)(\s+)([\w-]+)(\s+)(:)(\s*)([^$:]+)/,
                    caseInsensitive: true,
                    comment: "note left|right of (state name)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "variable",
                        "text"
                    ],
                    regex: /^(\s*)(note (?:left|right) of)(\s+)([\w-]+)(.|$)/,
                    caseInsensitive: true,
                    push: [{
                        token: "keyword.control.mermaid",
                        regex: /end note/,
                        caseInsensitive: true,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }],
                    comment: "note left|right of (state name) (note text) end note"
                }],
                comment: "State Diagram"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(journey)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(title|section)(\s+)(\s*["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: [
                        "text",
                        "string",
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "constant.numeric.decimal.mermaid",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /(\s*)(["\(\)$&%\^\/.,?!*+=<>\'\\\-\w\s]*)(\s*)(:)(\s*)(\d+)(\s*)(:)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: ["text", "variable"],
                        regex: /(\s*,?\s*)([^,#$]+)/,
                        caseInsensitive: true,
                        comment: "(taskName)"
                    }]
                }],
                comment: "User Journey"
            }, {
                token: ["text", "keyword.control.mermaid"],
                regex: /^(\s*)(xychart(?:-beta)?(?:\s+horizontal)?)/,
                push: [{
                    token: "text",
                    regex: /(?:^|\G)(?=\s*[`:~]{3,}\s*$)/,
                    next: "pop"
                }, {
                    token: "comment",
                    regex: /\%%.*/
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "string"
                    ],
                    regex: /^(\s*)(title)(\s+)(\s*["\(\)$&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*)/,
                    caseInsensitive: true
                }, {
                    token: ["text", "keyword.control.mermaid"],
                    regex: /^(\s*)(x-axis)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "constant.numeric.decimal.mermaid",
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "constant.numeric.decimal.mermaid"
                        ],
                        regex: /(\s*)([-+]?\d+\.?\d*)(\s*)(-->)(\s*)([-+]?\d+\.?\d*)/,
                        caseInsensitive: true,
                        comment: "(decimal) (-->) (decimal)"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s+)("[\($&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*")/,
                        caseInsensitive: true,
                        comment: "(\"text\")"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s+)([\($&%\^\/#.,?!;:*+=<>\'\\\-\w]*)/,
                        caseInsensitive: true,
                        comment: "(text)"
                    }, {
                        token: ["text", "keyword.control.mermaid"],
                        regex: /(\s*)(\[)/,
                        push: [{
                            token: ["text", "keyword.control.mermaid"],
                            regex: /(\s*)(\])/,
                            next: "pop"
                        }, {
                            token: [
                                "text",
                                "constant.numeric.decimal.mermaid"
                            ],
                            regex: /(\s*)([-+]?\d+\.?\d*)/,
                            caseInsensitive: true,
                            comment: "(decimal)"
                        }, {
                            token: ["text", "string"],
                            regex: /(\s*)("[\($&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*")/,
                            caseInsensitive: true,
                            comment: "(\"text\")"
                        }, {
                            token: ["text", "string"],
                            regex: /(\s*)([\($&%\^\/#.?!;:*+=<>\'\\\-\w\s]+)/,
                            caseInsensitive: true,
                            comment: "(text)"
                        }, {
                            token: ["text", "keyword.control.mermaid"],
                            regex: /(\s*)(,)/,
                            caseInsensitive: true,
                            comment: "(,)"
                        }],
                        comment: "([)(text)(,)(text)*(])"
                    }],
                    comment: "(x-axis)"
                }, {
                    token: ["text", "keyword.control.mermaid"],
                    regex: /^(\s*)(y-axis)/,
                    caseInsensitive: true,
                    push: [{
                        token: "text",
                        regex: /$/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "constant.numeric.decimal.mermaid",
                            "text",
                            "keyword.control.mermaid",
                            "text",
                            "constant.numeric.decimal.mermaid"
                        ],
                        regex: /(\s*)([-+]?\d+\.?\d*)(\s*)(-->)(\s*)([-+]?\d+\.?\d*)/,
                        caseInsensitive: true,
                        comment: "(decimal) (-->) (decimal)"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s+)("[\($&%\^\/#.,?!;:*+=<>\'\\\-\w\s]*")/,
                        caseInsensitive: true,
                        comment: "(\"text\")"
                    }, {
                        token: ["text", "string"],
                        regex: /(\s+)([\($&%\^\/#.,?!;:*+=<>\'\\\-\w]*)/,
                        caseInsensitive: true,
                        comment: "(text)"
                    }],
                    comment: "(y-axis)"
                }, {
                    token: [
                        "text",
                        "keyword.control.mermaid",
                        "text",
                        "keyword.control.mermaid"
                    ],
                    regex: /^(\s*)(line|bar)(\s*)(\[)/,
                    caseInsensitive: true,
                    push: [{
                        token: ["text", "keyword.control.mermaid"],
                        regex: /(\s*)(\])/,
                        next: "pop"
                    }, {
                        token: [
                            "text",
                            "constant.numeric.decimal.mermaid"
                        ],
                        regex: /(\s*)([-+]?\d+\.?\d*)/,
                        caseInsensitive: true,
                        comment: "(decimal)"
                    }, {
                        token: ["text", "keyword.control.mermaid"],
                        regex: /(\s*)(,)/,
                        caseInsensitive: true,
                        comment: "(,)"
                    }],
                    comment: "(line|bar) ([)(decimal)+(])"
                }],
                comment: "XY Chart"
            }]
        };
        
        this.normalizeRules();
    };
    
    MermaidHighlightRules.metaData = {
        name: "Mermaid",
        fileTypes: ["mermaid"],
        scopeName: "source.mermaid"
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
  