//
//  SavedEvent.swift
//  Salas
//
//  Created by Guillermo Guevara on 18-04-25.
//


import WidgetKit
import SwiftUI

// Modelo para los eventos guardados con campos adicionales
struct SavedEvent: Identifiable, Codable {
    let id: String
    let text: String
    let type: String?
    let room: String?
    let color: String?
    let startTime: String?
    let endTime: String?
    let building: String?
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let dayOfWeek: String
    let dayNumber: String
    let savedEvents: [SavedEvent]
    let closestEvent: SavedEvent?
}
