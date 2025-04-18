// app/EventStatsUtils.ts
import { Evento, EventCardData, TimeGap, CARD_COLORS, parseTime } from "./EventStatsTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from 'react-native';

/**
 * Calculate time gaps between events
 */
export const calculateTimeGaps = (events: EventCardData[]): TimeGap[] => {
  if (events.length <= 1) {
    return [];
  }
  
  const gaps: TimeGap[] = []; 
  
  for (let i = 0; i < events.length - 1; i++) {
    const currentEvent = events[i];
    const nextEvent = events[i + 1];
    
    // Calculate time difference in minutes
    const timeDiffMinutes = nextEvent.rawStartTime - currentEvent.rawEndTime;
    

    if (timeDiffMinutes > 120) {
      const hoursDiff = Math.floor(timeDiffMinutes / 60);
      const minutesDiff = timeDiffMinutes % 60;
      
      gaps.push({
        id: `gap-${i}`,
        hoursDiff,
        minutesDiff
      });
    } else {
      // Add a placeholder gap with 0 difference to maintain array alignment
      gaps.push({
        id: `gap-${i}`,
        hoursDiff: 0,
        minutesDiff: 0
      });
    }
  }
  
  return gaps;
};

/**
 * Filter events for today based on day of week
 */
export const filterTodayEvents = (events: Evento[]): Evento[] => {
    const today = new Date();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayDayOfWeek = diasSemana[today.getDay()];
    
    console.log(`Día de la semana actual: ${todayDayOfWeek}`);
    console.log(`Total de eventos guardados: ${events.length}`);

    
    // Filter events that match the current day of week
    const filteredEvents = events.filter(event => {
      // Use the diaSemana field if available, otherwise try to calculate it from Fecha
      const eventDayOfWeek = event.diaSemana || (() => {
        if (event.Fecha) {
          try {
            const fecha = new Date(event.Fecha);
            return diasSemana[fecha.getDay()];
          } catch (error) {
            console.warn(`Error procesando fecha para evento ${event._id}:`, error);
            return '';
          }
        }
        return '';
      })();
      
      const matches = eventDayOfWeek === todayDayOfWeek;
      if (matches) {
        console.log(`Evento coincide con día actual: ${event.Evento} (${eventDayOfWeek})`);
      }
      return matches;
    });
    
    console.log(`Eventos filtrados para hoy (${todayDayOfWeek}): ${filteredEvents.length}`);
    
    // Save today's events for the widget
    saveEventsForWidget(filteredEvents);

    
    return filteredEvents;
};

/**
 * Función para obtener el color según la letra del edificio
 */
const getColorForBuilding = (edificio: string): string => {
  // Extract building letter if the format is correct (space followed by capital letter A-F)
  const buildingMatch = edificio.match(/ ([A-F])/);
  if (buildingMatch && buildingMatch[1]) {
    const buildingLetter = buildingMatch[1]; // Get the matched letter
    return CARD_COLORS[buildingLetter] || CARD_COLORS.default;
  }
  return CARD_COLORS.default;
};

/**
 * Save events for the widget to access
 */
export const saveEventsForWidget = async (events: Evento[]) => {
  try {
    const widgetEvents = events.map(event => {
      // Determinar el color basado en el edificio
      let cardColor = CARD_COLORS.default;
      
      // Extract building letter if the format is correct (space followed by capital letter A-F)
      const buildingMatch = event.Edificio.match(/ ([A-F])/);
      if (buildingMatch && buildingMatch[1]) {
        const buildingLetter = buildingMatch[1]; // Get the matched letter
        cardColor = CARD_COLORS[buildingLetter] || CARD_COLORS.default;
      }
      
      console.log(`Widget - Evento: ${event.Evento.substring(0, 15)}... Edificio: ${event.Edificio}, Color: ${cardColor}`);
      
      return {
        id: event._id,
        text: event.Evento,
        type: event.Tipo,
        room: event.Sala,
        color: cardColor,
        startTime: event.Inicio,
        endTime: event.Fin,
        building: event.Edificio
      };
    });
    
    // Convierte a string para almacenamiento
    const jsonValue = JSON.stringify(widgetEvents);
    
    // Guarda en AsyncStorage como backup
    await AsyncStorage.setItem('widgetEvents', jsonValue);
    
    // También guarda en UserDefaults compartido con widget
    if (NativeModules.SharedStorage) {
      NativeModules.SharedStorage.set(
        "savedTexts", // Mantén la misma clave para compatibilidad
        jsonValue
      );
      console.log(`Guardados ${widgetEvents.length} eventos para el widget`);
    } else {
      console.log("SharedStorage module not available");
    }
  } catch (error) {
    console.error('Error saving events for widget:', error);
  }
};

/**
 * Transform the event data to the format needed for the cards
 */
export const transformEventsToCardFormat = (events: Evento[]): EventCardData[] => {
  return events.map((event) => {
    // Get the event title and handle any truncation needed
    let eventTitle = event.Evento;
    
    // If the title contains "Sec", cut everything from "Sec" onwards
    const secIndex = eventTitle.indexOf("Sec");
    if (secIndex !== -1) {
      eventTitle = eventTitle.substring(0, secIndex).trim();
    }
    
    // Get first word for the first line
    const words = eventTitle.split(' ');
    let titleFirstLine = words[0] || ""; // First word only
    let titleSecondLine = words.slice(1).join(' '); // Rest of the words
    
    // If there's only one word, use the event type as the second line
    if (words.length <= 1) {
      titleSecondLine = event.Tipo;
    }
    
    // Extract hours and minutes from start and end times
    const startTimeParts = event.Inicio.split(':');
    const endTimeParts = event.Fin.split(':');
    
    // Get raw time values for calculations
    const rawStartTime = parseTime(event.Inicio);
    const rawEndTime = parseTime(event.Fin);
    
    // Check if this is likely a grouped event (longer duration)
    const duration = rawEndTime - rawStartTime;
    const isGroupedEvent = duration > 120; // If more than 2 hours, probably grouped
    
    // Determine card color based on building letter
    let cardColor = CARD_COLORS.default;
    
    // Extract building letter if the format is correct (space followed by capital letter A-F)
    const buildingMatch = event.Edificio.match(/ ([A-F])/);
    if (buildingMatch && buildingMatch[1]) {
      const buildingLetter = buildingMatch[1]; // Get the matched letter
      cardColor = CARD_COLORS[buildingLetter] || CARD_COLORS.default;
    }
    
    return {
      id: event._id,
      titleFirstLine: titleFirstLine.toUpperCase(), 
      titleSecondLine: titleSecondLine.toUpperCase(), 
      startTime: startTimeParts[0] || "00",
      endTime: endTimeParts[0] || "00",
      startMinutes: startTimeParts[1] || "00",
      endMinutes: endTimeParts[1] || "00",
      room: event.Sala,
      color: cardColor,
      isGrouped: isGroupedEvent,
      rawStartTime,
      rawEndTime
    };
  });    
};