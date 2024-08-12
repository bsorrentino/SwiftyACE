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
    
    @Binding var content: String
    @Environment(\.colorScheme) var colorScheme
    var textDidChanged: ((String) -> Void)?

    private let mode: AceEditorWebView.Mode
    private let darkTheme: AceEditorWebView.Theme
    private let lightTheme: AceEditorWebView.Theme
    private let isReadOnly: Bool
    private let fontSize: CGFloat
    private let showGutter: Bool
    
    public init(
        content: Binding<String>,
        mode: AceEditorWebView.Mode,
        darkTheme: AceEditorWebView.Theme = .solarized_dark,
        lightTheme: AceEditorWebView.Theme = .solarized_light,
        isReadOnly: Bool = false,
        fontSize: CGFloat = 12,
        showGutter: Bool = true,
        textDidChanged: ((String) -> Void)? = nil
    ) {
        self._content = content
        self.mode = mode
        self.darkTheme = darkTheme
        self.lightTheme = lightTheme
        self.isReadOnly = isReadOnly
        self.fontSize = fontSize
        self.textDidChanged = textDidChanged
        self.showGutter = showGutter
    }
    
    public func makeCoordinator() -> Coordinator {
        Coordinator(content: content,
                    colorScheme: colorScheme,
                    lightTheme: lightTheme,
                    darkTheme: darkTheme,
                    fontSize: fontSize,
                    showGutter: showGutter )
    }
    
    private func makeWebView(context: Context) -> AceEditorWebView {
        let codeView = AceEditorWebView()

        codeView.setMode(mode)
        codeView.setReadOnly(isReadOnly)
        codeView.setFontSize(fontSize)
        codeView.setContent(content)
        codeView.clearSelection()
        codeView.setShowGutter(showGutter)
        codeView.textDidChanged = { text in
            self.content = text
            context.coordinator.content = text
            self.textDidChanged?(text)
        }
        codeView.setTheme( colorScheme == .dark ? darkTheme : lightTheme )
        
        return codeView
    }
    
    private func updateView(_ webview: AceEditorWebView, context: Context) {
        if context.coordinator.content != content {
            context.coordinator.content =  content
            webview.setContent(content)
            print(content)
        }
        
        if context.coordinator.fontSize != fontSize {
            context.coordinator.fontSize =  fontSize
            webview.setFontSize(fontSize)
        }
        
        if context.coordinator.showGutter != showGutter {
            context.coordinator.showGutter =  showGutter
            webview.setShowGutter(showGutter)
        }

        /// Theme update
        let isLightThemeChanged     = context.coordinator.lightTheme != lightTheme
        let isDarkThemeChanged      = context.coordinator.darkTheme != darkTheme
        let isColorSchemeChanged    = context.coordinator.colorScheme != colorScheme
        
        if isColorSchemeChanged || isLightThemeChanged || isDarkThemeChanged {
            
            if isColorSchemeChanged {
                context.coordinator.colorScheme = colorScheme
            }
            if isLightThemeChanged {
                context.coordinator.lightTheme = lightTheme
            }
            if isDarkThemeChanged {
                context.coordinator.darkTheme = darkTheme
            }
            
            if isColorSchemeChanged || (colorScheme == .dark && isDarkThemeChanged) || (colorScheme == .light && isLightThemeChanged) {
                colorScheme == .dark ? webview.setTheme(darkTheme) : webview.setTheme(lightTheme)
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
        var content: String
        var colorScheme: ColorScheme
        var fontSize: CGFloat
        var showGutter: Bool
        var darkTheme:AceEditorWebView.Theme
        var lightTheme:AceEditorWebView.Theme

        init(content: String,
             colorScheme: ColorScheme,
             lightTheme:AceEditorWebView.Theme,
             darkTheme:AceEditorWebView.Theme,
             fontSize: CGFloat,
             showGutter: Bool ) {
            
            self.content = content
            self.colorScheme = colorScheme
            self.darkTheme = darkTheme
            self.lightTheme = lightTheme
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
        mode: .plain_text,
        fontSize: 35
        )
        
    

}
