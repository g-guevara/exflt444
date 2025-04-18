// Provider.swift - with fixed findClosestEvent function
import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        print("📱 Widget: placeholder called - initializing with placeholder data")
        let currentDate = Date()
        let dayOfWeek = formatDayOfWeek(currentDate)
        let dayNumber = formatDayNumber(currentDate)
        
        return SimpleEntry(
            date: currentDate,
            dayOfWeek: dayOfWeek,
            dayNumber: dayNumber,
            savedEvents: [],
            closestEvent: nil
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        print("📱 Widget: getSnapshot called - fetching latest data")
        let currentDate = Date()
        let dayOfWeek = formatDayOfWeek(currentDate)
        let dayNumber = formatDayNumber(currentDate)
        let savedEvents = fetchSavedEvents()
        let closestEvent = findClosestEvent(savedEvents, to: currentDate)
        
        let entry = SimpleEntry(
            date: currentDate,
            dayOfWeek: dayOfWeek,
            dayNumber: dayNumber,
            savedEvents: savedEvents,
            closestEvent: closestEvent
        )
        completion(entry)
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        print("📱 Widget: getTimeline called - generating new timeline")
        let currentDate = Date()
        let dayOfWeek = formatDayOfWeek(currentDate)
        let dayNumber = formatDayNumber(currentDate)
        let savedEvents = fetchSavedEvents()
        let closestEvent = findClosestEvent(savedEvents, to: currentDate)
        
        print("📱 Widget: getTimeline found \(savedEvents.count) saved events")
        
        if !savedEvents.isEmpty {
            print("📱 Widget: Found events: \(savedEvents.map { $0.text }.joined(separator: ", "))")
            if let closest = closestEvent {
                print("📱 Widget: Closest event: \(closest.text) in room \(closest.room ?? "unknown")")
            }
        } else {
            print("📱 Widget: No saved events found")
        }
        
        let entry = SimpleEntry(
            date: currentDate,
            dayOfWeek: dayOfWeek,
            dayNumber: dayNumber,
            savedEvents: savedEvents,
            closestEvent: closestEvent
        )
        
        // Update every 5 minutes to keep the closest event accurate
        let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 5, to: currentDate)!
        print("📱 Widget: Timeline scheduled to update at \(nextUpdateDate)")
        
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdateDate))
        completion(timeline)
    }
    
    // Find event closest to current time - FIXED to prioritize upcoming events
    private func findClosestEvent(_ events: [SavedEvent], to currentDate: Date) -> SavedEvent? {
        guard !events.isEmpty else { return nil }
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "HH:mm:ss"
        
        // Get current time in minutes since midnight
        let calendar = Calendar.current
        let hour = calendar.component(.hour, from: currentDate)
        let minute = calendar.component(.minute, from: currentDate)
        let currentMinutes = hour * 60 + minute
        
        print("📱 Widget: Current time in minutes: \(currentMinutes)")
        
        // First, try to find the closest UPCOMING event
        var closestUpcomingEvent: SavedEvent? = nil
        var smallestUpcomingDifference = Int.max
        
        // Next, keep track of the closest past event as a fallback
        var closestPastEvent: SavedEvent? = nil
        var smallestPastDifference = Int.max
        
        for event in events {
            guard let startTimeStr = event.startTime else { continue }
            
            // Extract just HH:mm if the format is longer
            let startTime = startTimeStr.count > 5 ? String(startTimeStr.prefix(5)) : startTimeStr
            
            let eventMinutes = minutesFromTimeString(startTime)
            print("📱 Widget: Event '\(event.text)' at \(startTime) = \(eventMinutes) minutes")
            
            // Check if event is upcoming or past
            if eventMinutes >= currentMinutes {
                // This is an upcoming event
                let difference = eventMinutes - currentMinutes
                print("📱 Widget: Upcoming event, difference: \(difference) minutes")
                
                if difference < smallestUpcomingDifference {
                    smallestUpcomingDifference = difference
                    closestUpcomingEvent = event
                    print("📱 Widget: New closest upcoming event: \(event.text)")
                }
            } else {
                // This is a past event
                let difference = currentMinutes - eventMinutes
                print("📱 Widget: Past event, difference: \(difference) minutes")
                
                if difference < smallestPastDifference {
                    smallestPastDifference = difference
                    closestPastEvent = event
                    print("📱 Widget: New closest past event: \(event.text)")
                }
            }
        }
        
        // Prioritize upcoming events; if none available, use closest past event
        if let upcomingEvent = closestUpcomingEvent {
            print("📱 Widget: Returning upcoming event: \(upcomingEvent.text)")
            return upcomingEvent
        } else if let pastEvent = closestPastEvent {
            print("📱 Widget: No upcoming events, returning past event: \(pastEvent.text)")
            return pastEvent
        }
        
        return nil
    }
    
    // Convert time string to minutes since midnight for easy comparison
    private func minutesFromTimeString(_ timeString: String) -> Int {
        let components = timeString.split(separator: ":")
        guard components.count >= 2,
              let hours = Int(components[0]),
              let minutes = Int(components[1]) else {
            return 0
        }
        
        return hours * 60 + minutes
    }
    
    // Formateador para el día de la semana
    private func formatDayOfWeek(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "es_ES")
        formatter.dateFormat = "EEE"
        let dayOfWeek = formatter.string(from: date)
        return dayOfWeek.prefix(3).uppercased()
    }
    
    // Formateador para el número del día
    private func formatDayNumber(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "d"
        return formatter.string(from: date)
    }
    
    // Función para obtener los eventos guardados del storage compartido
    private func fetchSavedEvents() -> [SavedEvent] {
        print("📱 Widget: Attempting to fetch saved events from shared UserDefaults")
        
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.EXFLT444.Salas.shared") else {
            print("📱 Widget: Failed to access shared UserDefaults")
            return []
        }
        
        guard let savedEventsString = sharedDefaults.string(forKey: "savedTexts") else {
            print("📱 Widget: No saved events found in UserDefaults for key 'savedTexts'")
            return []
        }
        
        print("📱 Widget: Found savedEvents string with length: \(savedEventsString.count)")
        
        guard let data = savedEventsString.data(using: .utf8) else {
            print("📱 Widget: Failed to convert saved events string to data")
            return []
        }
        
        do {
            // Intentar decodificar usando el nuevo modelo
            let decodedEvents = try JSONDecoder().decode([SavedEvent].self, from: data)
            print("📱 Widget: Successfully decoded \(decodedEvents.count) saved events")
            print("😁 Widget: Successfully decoded \(decodedEvents) events with new format")

            return decodedEvents
        } catch {
            print("📱 Widget: Error decoding with new model, trying fallback: \(error)")
            
            // Fallback para mantener compatibilidad con el formato anterior
            do {
                // Estructura antigua para compatibilidad
                struct SavedText: Identifiable, Codable {
                    let id: String
                    let text: String
                }
                
                // Intentar decodificar con el modelo antiguo
                let oldFormatEvents = try JSONDecoder().decode([SavedText].self, from: data)
                
                // Convertir al nuevo formato
                let convertedEvents = oldFormatEvents.map { SavedEvent(
                    id: $0.id,
                    text: $0.text,
                    type: nil,
                    room: nil,
                    color: nil,
                    startTime: nil,
                    endTime: nil,
                    building: nil
                )}
                
                print("📱😁 Widget: Successfully decoded \(convertedEvents.count) events with old format")
                print("😁 Widget: Successfully decoded \(convertedEvents) events with old format")
                return convertedEvents
            } catch {
                print("📱 Widget: Error decoding with fallback model: \(error)")
                return []
            }
        }
    }
}
