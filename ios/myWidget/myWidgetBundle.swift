//
//  myWidgetBundle.swift
//  myWidget
//
//  Created by Guillermo Guevara on 18-04-25.
//

import WidgetKit
import SwiftUI

@main
struct myWidgetBundle: WidgetBundle {
    var body: some Widget {
        myWidget()
        myWidgetControl()
        myWidgetLiveActivity()
    }
}
