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
        @startuml diagram

        title mydiagram

        participant Alice as a
        participant Bob   as b
        participant Participant as Foo
        actor       Actor       as Foo1
        boundary    Boundary    as Foo2
        control     Control     as Foo3
        entity      Entity      as Foo4
        database    Database    as Foo5
        collections Collections as Foo6
        queue       Queue       as Foo7

        Foo -> Foo1 : To actor
        Foo -> Foo2 : To boundary
        Foo -> Foo3 : To control
        Foo -> Foo4 : To entity
        Foo -> Foo5 : To database
        Foo -> Foo6 : To collections
        Foo -> Foo7: To queue

        a ->     b : ""->   ""
        note left: this is a first note
        a ->>    b : ""->>  ""
        note right: this is another note
        a -\\     b : ""-\\   ""
        a -\\\\    b : ""-\\\\""
        a -/     b : ""-/   ""
        a -//    b : ""-//  ""
        a ->x    b : ""->x  ""
        a x->    b : ""x->  ""
        a o->    b : ""o->  ""
        a ->o    b : ""->o  ""
        a o->o   b : ""o->o ""
        a <->    b : ""<->  ""
        a o<->o  b : ""o<->o""
        a x<->x  b : ""x<->x""
        a ->>o   b : ""->>o ""
        a -\\o    b : ""-\\o  ""
        a -\\o   b : ""-\\\\o""
        a -/o    b : ""-/o  ""
        a -//o   b : ""-//o ""
        a x->o   b : ""x->o ""
        note left
        a note
        can also be defined
        on several lines
        end note


        @enduml
        """
    
    var body: some View {
        NavigationView {
            
            AceEditorView(
                content: $text,
                mode: .plantuml,
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
