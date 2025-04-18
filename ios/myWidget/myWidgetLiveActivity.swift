//
//  myWidgetLiveActivity.swift
//  myWidget
//
//  Created by Guillermo Guevara on 18-04-25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct myWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct myWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: myWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension myWidgetAttributes {
    fileprivate static var preview: myWidgetAttributes {
        myWidgetAttributes(name: "World")
    }
}

extension myWidgetAttributes.ContentState {
    fileprivate static var smiley: myWidgetAttributes.ContentState {
        myWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: myWidgetAttributes.ContentState {
         myWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: myWidgetAttributes.preview) {
   myWidgetLiveActivity()
} contentStates: {
    myWidgetAttributes.ContentState.smiley
    myWidgetAttributes.ContentState.starEyes
}
