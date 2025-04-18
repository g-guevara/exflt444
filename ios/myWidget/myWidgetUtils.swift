//
//  myWidgetUtils.swift
//  test1
//
//  Created by Guillermo Guevara on 03-04-25.
//


import SwiftUI

// Funciones auxiliares para el widget
class myWidgetUtils {
    // Función para formatear la hora (recortar a formato HH:MM)
    static func formatTime(_ timeString: String?) -> String {
        guard let time = timeString else { return "" }
        // Si el formato es "HH:MM:SS", recortar a "HH:MM"
        if time.count >= 5 {
            return String(time.prefix(5))
        }
        return time
    }
    
    // Función para convertir un hex string a Color
    static func hexColor(_ hexString: String?) -> Color {
        // Valor de debug para ver lo que recibimos
        print("🎨 Procesando color: \(hexString ?? "nil")")
        
        // Si no hay color o es inválido, usar un color por defecto
        guard let hexString = hexString, hexString.count >= 4 else {
            print("⚠️ Hex inválido, usando color por defecto")
            return Color.blue
        }
        
        // Extraer el hexadecimal sin el # (si existe)
        let hex = hexString.hasPrefix("#") ? String(hexString.dropFirst()) : hexString
        print("🔍 Hex procesado: \(hex)")
        
        // Extraer los componentes RGB
        var int = UInt64()
        Scanner(string: hex).scanHexInt64(&int)
        
        let r, g, b: Double
        switch hex.count {
        case 3: // RGB (12-bit)
            r = Double((int >> 8) & 0xF) / 15.0
            g = Double((int >> 4) & 0xF) / 15.0
            b = Double(int & 0xF) / 15.0
            print("🧩 RGB (formato corto): \(r), \(g), \(b)")
        case 6: // RRGGBB (24-bit)
            r = Double((int >> 16) & 0xFF) / 255.0
            g = Double((int >> 8) & 0xFF) / 255.0
            b = Double(int & 0xFF) / 255.0
            print("🧩 RGB (formato largo): \(r), \(g), \(b)")
        default:
            print("⚠️ Formato hex desconocido, usando color por defecto")
            return Color.blue
        }
        
        return Color(red: r, green: g, blue: b)
    }
    
    // Función de colores predeterminados como respaldo
    static func defaultEventColor(index: Int) -> Color {
        let colors: [Color] = [
            Color(red: 0.4, green: 0.8, blue: 0.6), // Verde claro
            Color(red: 0.4, green: 0.7, blue: 0.9), // Azul claro
            Color(red: 0.9, green: 0.7, blue: 0.4), // Naranja claro
            Color(red: 0.8, green: 0.5, blue: 0.8)  // Morado claro
        ]
        return colors[index % colors.count]
    }
}
