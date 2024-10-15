//
// AceEditorView.swift
// SwiftyACE  
//
//

import SwiftUI
import WebKit

#if os(OSX)
    import AppKit
    public typealias ViewRepresentable = NSViewRepresentable
#elseif os(iOS)
    import UIKit
    public typealias ViewRepresentable = UIViewRepresentable
#endif

public struct AceEditorView: ViewRepresentable {
    @Environment(\.colorScheme) var colorScheme

    @Binding var content: String
    var textDidChanged: ((String) -> Void)?

    private let options: Options
    
    public init(
        content: Binding<String>,
        options: Options,
        textDidChanged: ((String) -> Void)? = nil
        
    ) {
        self._content = content
        self.textDidChanged = textDidChanged
        self.options = options
    }
    
    public func makeCoordinator() -> Coordinator {
        Coordinator(colorScheme: colorScheme,
                    options: options)
    }
    
    private func makeWebView(context: Context) -> AceEditorWebView {
        let codeView = AceEditorWebView()

        codeView.setMode(options.mode)
        codeView.setReadOnly(options.isReadOnly)
        codeView.setFontSize(options.fontSize)
        codeView.clearSelection()
        codeView.setShowGutter(options.showGutter)
        codeView.setTheme( colorScheme == .dark ? options.darkTheme : options.lightTheme )

        codeView.textDidChanged = { text in
            guard self.content != text else {
                return
            }
            print("textDidChanged: \(text)")
            self.content = text
            self.textDidChanged?(text)
        }
        codeView.setContent(content)
        
        return codeView
    }
    
    private func updateView(_ webview: AceEditorWebView, context: Context) {
        webview.setContent(content)

        if context.coordinator.options.fontSize != options.fontSize {
            context.coordinator.options.fontSize =  options.fontSize
            webview.setFontSize(options.fontSize)
        }
        
        if context.coordinator.options.showGutter != options.showGutter {
            context.coordinator.options.showGutter =  options.showGutter
            webview.setShowGutter(options.showGutter)
        }

        /// Theme update
        let isLightThemeChanged     = context.coordinator.options.lightTheme != options.lightTheme
        let isDarkThemeChanged      = context.coordinator.options.darkTheme != options.darkTheme
        let isColorSchemeChanged    = context.coordinator.colorScheme != colorScheme
        
        if isColorSchemeChanged || isLightThemeChanged || isDarkThemeChanged {
            
            if isColorSchemeChanged {
                context.coordinator.colorScheme = colorScheme
            }
            if isLightThemeChanged {
                context.coordinator.options.lightTheme = options.lightTheme
            }
            if isDarkThemeChanged {
                context.coordinator.options.darkTheme = options.darkTheme
            }
            
            if isColorSchemeChanged || (colorScheme == .dark && isDarkThemeChanged) || (colorScheme == .light && isLightThemeChanged) {
                colorScheme == .dark ?
                    webview.setTheme(options.darkTheme) :
                    webview.setTheme(options.lightTheme)
                webview.clearSelection() // force ace.js editor to re-render itself
            }
        }
        
    }
    
    // MARK: macOS
    public func makeNSView(context: Context) -> AceEditorWebView {
        makeWebView(context: context)
    }
    
    public func updateNSView(_ webview: AceEditorWebView, context: Context) {
        updateView(webview, context: context)
    }
    
    // MARK: iOS
    public func makeUIView(context: Context) -> AceEditorWebView {
        makeWebView(context: context)
    }
    
    public func updateUIView(_ webview: AceEditorWebView, context: Context) {
        updateView(webview, context: context)
    }
}

public extension AceEditorView {
    
    class Coordinator: NSObject {
        var colorScheme: ColorScheme
        var options: Options

        init(colorScheme: ColorScheme,
             options: Options ) {
            
            self.colorScheme = colorScheme
            self.options = options
        }
        
    }
}

public extension AceEditorView {
    
    struct Options {
        var mode: AceEditorWebView.Mode
        var darkTheme: AceEditorWebView.Theme
        var lightTheme: AceEditorWebView.Theme
        var isReadOnly: Bool
        var fontSize: CGFloat
        var showGutter: Bool

        public init(
            mode: AceEditorWebView.Mode,
            darkTheme: AceEditorWebView.Theme = .solarized_dark,
            lightTheme: AceEditorWebView.Theme = .solarized_light,
            isReadOnly: Bool = false,
            fontSize: CGFloat = 12,
            showGutter: Bool = true
        ) {
            self.mode = mode
            self.darkTheme = darkTheme
            self.lightTheme = lightTheme
            self.isReadOnly = isReadOnly
            self.fontSize = fontSize
            self.showGutter = showGutter
        }
    }

}

//fileprivate class UICodeWebViewController: UIViewController, WKNavigationDelegate {
//    var webView: CodeWebView!
//
//    override func viewDidLoad() {
//        super.viewDidLoad()
//
//        webView = CodeWebView(frame: view.bounds)
//        webView.navigationDelegate = self
//        view.addSubview(webView)
//
//    }
//
//    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
//        // After the webpage has loaded, use JavaScript to set focus on a specific element
//        let focusScript = "editor.focus();"
//        webView.evaluateJavaScript(focusScript, completionHandler: nil)
//    }
//}


#Preview {

    AceEditorView(
        content: .constant("Hello WORLD!"),
        options: AceEditorView.Options(mode: .plain_text, fontSize: 35)
        )
        
    

}
