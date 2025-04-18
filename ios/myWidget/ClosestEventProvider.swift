//
//  ClosestEventProvider.swift
//  Salas
//
//  Created by Guillermo Guevara on 18-04-25.
//


import WidgetKit
import SwiftUI

// Esta extensión del Provider mejora la actualización del widget basada en el evento más cercano
extension Provider {
    
    // Función para optimizar los tiempos de actualización del widget
    func calculateNextUpdateTime(currentDate: Date, savedEvents: [SavedEvent]) -> Date {
        if savedEvents.isEmpty {
            // Si no hay eventos, actualizar cada hora
            return Calendar.current.date(byAdding: .hour, value: 1, to: currentDate)!
        }
        
        // Buscar el evento más cercano
        let closestEvent = myWidgetUtils.findClosestEvent(events: savedEvents)
        
        if let event = closestEvent, let startTimeStr = event.startTime {
            // Convertir la hora de inicio a Date para cálculos
            let components = startTimeStr.split(separator: ":")
            if components.count >= 2,
               let eventHour = Int(components[0]),
               let eventMinute = Int(components[1]) {
                
                // Crear componentes para la fecha del evento hoy
                var eventDateComponents = Calendar.current.dateComponents([.year, .month, .day], from: currentDate)
                eventDateComponents.hour = eventHour
                eventDateComponents.minute = eventMinute
                
                if let eventDate = Calendar.current.date(from: eventDateComponents) {
                    // Calcular minutos hasta el evento
                    let minutesUntilEvent = Calendar.current.dateComponents([.minute], from: currentDate, to: eventDate).minute ?? 0
                    
                    if minutesUntilEvent < 0 {
                        // El evento ya pasó, actualizar en 15 minutos
                        return Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
                    } else if minutesUntilEvent < 30 {
                        // El evento está próximo, actualizar cada 5 minutos
                        return Calendar.current.date(byAdding: .minute, value: 5, to: currentDate)!
                    } else if minutesUntilEvent < 60 {
                        // El evento está en menos de una hora, actualizar cada 15 minutos
                        return Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
                    } else {
                        // El evento está lejos, actualizar cada 30 minutos
                        return Calendar.current.date(byAdding: .minute, value: 30, to: currentDate)!
                    }
                }
            }
        }
        
        // Si no se pudo calcular con precisión, actualizar cada 30 minutos
        return Calendar.current.date(byAdding: .minute, value: 30, to: currentDate)!
    }
    
    // Esta función reemplazaría la getTimeline existente para una actualización más inteligente
    func getTimelineWithSmartUpdates(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        print("📱 Widget: getTimeline called - generating new timeline with smart updates")
        let currentDate = Date()
        let dayOfWeek = formatDayOfWeek(currentDate)
        let dayNumber = formatDayNumber(currentDate)
        let savedEvents = fetchSavedEvents()
        
        print("📱 Widget: getTimeline found \(savedEvents.count) saved events")
        
        let entry = SimpleEntry(
            date: currentDate,
            dayOfWeek: dayOfWeek,
            dayNumber: dayNumber,
            savedEvents: savedEvents
        )
        
        // Calcular la próxima actualización de forma inteligente
        let nextUpdateDate = calculateNextUpdateTime(currentDate: currentDate, savedEvents: savedEvents)
        
        print("📱 Widget: Timeline scheduled to update at \(nextUpdateDate)")
        
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdateDate))
        completion(timeline)
    }
}
