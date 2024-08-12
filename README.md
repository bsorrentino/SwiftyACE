# SwiftyACE

This is [Ace editor] for SwiftUI a project inspired by [CodeViewer]. SwiftyACE is currently used by [PlantUML4iPad] and its main goal is to select a language to provides a tailored editor experience.

## Features

- [x] Darkmode, lightmode adopt automatically
- [x] Select the Syntax highlighting by over 110 languages (TextMate/Sublime Text.tmlanguage files can be imported)
- [x] Over 20 themes (TextMate/Sublime Text .tmtheme files can be imported)
- [x] Support SwiftUI

## Usage

```Swift
import SwiftUI
import AceEditor

struct ContentView: View {
    @State private var text = "HELLO ACE!"
    
        AceEditorView(
            content: $text,
            mode: .plain_text,
            darkTheme: .monokai,
            lightTheme: .chrome,
            isReadOnly: false,
            fontSize: 12
        )
    }
}

```

## Requirements
- iOS >= v14
- macOS >= v11


[Ace Editor]: https://ace.c9.io
[PlantUML4iPad]: https://github.com/bsorrentino/PlantUML4iPad
[CodeViewer]: https://github.com/dwarvesf/CodeViewer
