import WidgetKit
import SwiftUI

struct myWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) private var widgetFamily
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        switch widgetFamily {
        case .accessoryRectangular:
            // Lock screen widget below the time
            lockScreenWidget
        case .systemSmall:
            // Cuadrado para la pantalla de inicio
            homeScreenSmallWidget
        default:
            // Widget regular de tamaño medio
            homeScreenWidget
        }
    }
    
    // Widget cuadrado para la pantalla de inicio
    var homeScreenSmallWidget: some View {
        VStack(spacing: 5) {
            Spacer()
            
          if let closestEvent = entry.closestEvent {
            // Hora del evento en forma de píldora más pequeña
            if let startTime = closestEvent.startTime {
              Text(myWidgetUtils.formatTime(startTime))
                .font(.system(size: 16, weight: .bold))
                .foregroundColor(.white)
                .padding(.vertical, 3)
                .padding(.horizontal, 10)
                .background(
                  Capsule()
                    .fill(Color.black)
                )

            }
            
            if let room = closestEvent.room, !room.isEmpty {
              Text(room)
                .font(.system(size: 58, weight: .semibold))
                .foregroundColor(colorScheme == .dark ? .white : .black)
                .scaleEffect(x: 1, y: 1.2, anchor: .center)
                .minimumScaleFactor(0.6)
                .padding(.top, 2)
            }
            
            // Nombre del evento
            Text(closestEvent.text)
              .font(.system(size: 12, weight: .regular))
              .lineLimit(1)
              .minimumScaleFactor(0.8)
            
          } else {
                Text("No hay eventos para hoy")
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
            }
            
            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
    
    // Widget para la pantalla de bloqueo
    var lockScreenWidget: some View {
        VStack(alignment: .leading, spacing: 1) {
            if let closestEvent = entry.closestEvent {
                // Hora del evento
                if let startTime = closestEvent.startTime {
                    Text(myWidgetUtils.formatTime(startTime))
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(.secondary)
                }
                
                // Nombre del evento
                Text(closestEvent.text)
                    .font(.system(size: 12, weight: .regular))
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                
                // Sala
                if let room = closestEvent.room, !room.isEmpty {
                    Text(room)
                        .font(.system(size: 14, weight: .bold))
                        .lineLimit(1)
                        .padding(.horizontal, 4)
                        .background(
                            Capsule()
                                .fill(Color.black)
                        )

                }
            } else {
                Text("Sin eventos próximos")
                    .font(.system(size: 14))
                    .foregroundColor(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 4)
    }
    
    // Widget regular para la pantalla de inicio
    var homeScreenWidget: some View {
        HStack(alignment: .top, spacing: 10) {
            // Fecha en el lado izquierdo
            VStack(alignment: .center, spacing: 0) {
                Text(entry.dayOfWeek)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(colorScheme == .dark ? .white : .gray)
                
                Text(entry.dayNumber)
                    .font(.system(size: 62))
                    .foregroundColor(colorScheme == .dark ? .white : .primary)
                    .padding(.top, -5)
            }
            .padding(.top, 10)
            .frame(width: 50)
            
            // Event list con altura fija para cada evento
            VStack(spacing: 0) {
                if entry.savedEvents.isEmpty {
                    Text("No hay eventos para hoy")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                        .frame(maxWidth: .infinity, alignment: .center)
                        .padding(.top, 10)
                } else {
                    // Contenedor de eventos con altura fija
                    VStack(spacing: 8) {
                        // Mostrar solo hasta 3 eventos para asegurar que caben
                        let limitedEvents = Array(entry.savedEvents.prefix(3))
                        
                        ForEach(0..<limitedEvents.count, id: \.self) { index in
                            let event = limitedEvents[index]
                            
                            ZStack {
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(myWidgetUtils.hexColor(event.color))
                                
                                HStack {
                                    // Tiempo (sin formato de píldora)
                                    if let start = event.startTime {
                                        Text(myWidgetUtils.formatTime(start))
                                            .foregroundColor(.black)
                                            .font(.system(size: 12, weight: .semibold))
                                    }
                                    
                                    // Título del evento
                                    Text(event.text)
                                        .foregroundColor(.black)
                                        .font(.system(size: 12, weight: .semibold))
                                        .lineLimit(1)
                                    
                                    Spacer()
                                    
                                    // Sala
                                    if let room = event.room, !room.isEmpty {
                                        Text(room)
                                            .foregroundColor(.black)
                                            .font(.system(size: 11, weight: .semibold))
                                    }
                                }
                                .padding(.horizontal, 8)
                            }
                            .frame(height: 36) // Altura fija para cada evento
                        }
                    }
                    .padding(.vertical, 8)
                    
                    // Indicador de más eventos
                    if entry.savedEvents.count > 3 {
                        HStack {
                            Spacer()
                            Text("+ \(entry.savedEvents.count - 3) más...")
                                .font(.system(size: 10))
                                .foregroundColor(.gray)
                                .padding(.horizontal, 8)
                                .padding(.top, 2)
                        }
                        .frame(height: 20) // Altura fija para el indicador
                    }
                }
            }
            .padding(.vertical, 1)
        }
        .padding(.horizontal, 10)
    }
}

@main
struct myWidget: Widget {
    let kind: String = "myWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            myWidgetEntryView(entry: entry)
                .containerBackground(.background, for: .widget)
        }
        .configurationDisplayName("Mis Eventos")
        .description("Muestra tus eventos para hoy")
        .supportedFamilies([.systemSmall, .systemMedium, .accessoryRectangular])
    }
}
