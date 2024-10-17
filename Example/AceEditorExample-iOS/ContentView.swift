//
//  ContentView.swift
//  AceEditorExample-iOS
//
//  Created by bsorrentino on 12/08/24.
//  Copyright © 2024 Dwarves Foundattion. All rights reserved.
//

import SwiftUI
import AceEditor

let mermaid_flowchart =
"""
---
title: Java to TypeScript Conversion Process
---
flowchart LR

    subgraph "Java Compiler"
        B(Java2TypeScript Processor) 
    end
   
    subgraph "Java Project"
        direction LR
        A[Package_Info.java]:::javaSrc ---|Lookup annotations| B 
        C[Dependencies Classpath]:::javaSrc ---|Lookup classes| B
    end

    subgraph "Typescript"
        D[&lt;Output>.d.ts]:::tsFile
        E[&lt;Output>_types.ts]:::tsFile
    end
    
    B o-->|Generate| D 
    B o-->|Generate| E
    

    %% class B Processor;
    
    %% Legend
    %% note right of B
    %% The process begins with the execution of the 'javac' command.
    %% The 'Java2TypeScript Processor' reads the 'Package_Info.java' file.
    %% The 'Dependencies Classpath' is used to lookup necessary classes.
    %% The 'Java2TypeScript Processor' generates the TypeScript definition and declaration files.
    %% end note

"""

let mermaid_sequence =
"""
sequenceDiagram
    actor User as U
    participant  Client as CL
    participant AuthorizationServer 
    User -> C: Requests authorization
    Client -> AuthorizationServer: Redirects user for authorization
    AuthorizationServer -> User: Prompts user to login and authorize
    User -> AuthorizationServer: Enters credentials and authorizes
    AuthorizationServer -> Client: Sends authorization code
    Client -> AuthorizationServer: Exchanges code for access token
    AuthorizationServer -> Client: Sends access token
    Client -> User: Accesses user data using access token
"""

let plauntuml_sample =
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



struct ContentView: View {
    
    @State private var mermaid_text = mermaid_flowchart
    @State private var plantuml_text = plauntuml_sample

    var body: some View {
        
        TabView {
            NavigationStack {
                VStack {
                    AceEditorView(
                        content: $mermaid_text,
                        options: AceEditorView.Options(
                            mode: .mermaid,
                            darkTheme: .monokai,
                            lightTheme: .eclipse,
                            isReadOnly: false,
                            fontSize: 20
                        ))
                    Divider()
                    ScrollView {
                        Text( "```\(mermaid_text)```" )
                    }
                    
                }
                .toolbar {
                    ToolbarItem(placement: .navigationBarTrailing) {
                        Button(action: {
                            //                            print("Pushed reload!")
                            //                            NotificationCenter.default.post(name: NSNotification.Name("reload"), object: nil)
                            mermaid_text = "RELOAD \(Date())"
                            
                        }) {
                            Image(systemName: "arrow.clockwise")
                            Text("Reload")
                        }
                    }
                }
            }
            .tabItem {
                Text("Memaid")
            }
            // Second Tab
            AceEditorView(
                content: $plantuml_text,
                options: AceEditorView.Options(
                    mode: .plantuml,
                    darkTheme: .monokai,
                    lightTheme: .chrome,
                    isReadOnly: false,
                    fontSize: 20 )
                
            )
            .tabItem {
                Text("PlantUML")
            }
        }
    }
}


#Preview {
    ContentView()
}
