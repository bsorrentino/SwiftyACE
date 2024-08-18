//
//  ContentView.swift
//  AceEditorExample-iOS
//
//  Created by bsorrentino on 12/08/24.
//  Copyright © 2024 Dwarves Foundattion. All rights reserved.
//

import SwiftUI
import AceEditor

struct ContentView: View {
    
    @State private var text =
"""
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
"""
    
    var body: some View {
        NavigationView {
            
            AceEditorView(
                content: $text,
                mode: .mermaid,
                darkTheme: .monokai,
                lightTheme: .chrome,
                isReadOnly: false,
                fontSize: 20
            )
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        print("Pushed reload!")
                        NotificationCenter.default.post(name: NSNotification.Name("reload"), object: nil)
                    }) {
                        Image(systemName: "arrow.clockwise")
                        Text("Reload")
                    }
                }
            }
            
        }
        .navigationViewStyle(.stack)
    }
}


#Preview {
    ContentView()
}
