// Interface for the event data from AsyncStorage
export interface Evento {
  _id: string;
  Tipo: string;
  Evento: string;
  Fecha: string;
  Inicio: string;
  Fin: string;
  Sala: string;
  Edificio: string;
  Campus: string;
  fechaActualizacion: string;
  diaSemana?: string;
}

// Interface for the card display format
export interface EventCardData {
  id: string;
  titleFirstLine: string;
  titleSecondLine: string;
  startTime: string;
  endTime: string;
  startMinutes: string;
  endMinutes: string;
  room: string;
  color: string;
  isGrouped?: boolean;
  rawStartTime: number; // Added for easier time gap calculation
  rawEndTime: number;   // Added for easier time gap calculation
}

// Interface for time gap display
export interface TimeGap {
  id: string;
  hoursDiff: number;
  minutesDiff: number;
}

// Color palette for the cards based on building letter
export const CARD_COLORS: Record<string, string> = {
  "A": "#2bb5ec", // Light Blue for building A 2bb5ec
  "B": "#2becc6", // Teal for building B 2becc6
  "C": "#bbef4c", // Green for building C bbef4c
  "D": "#9d6bce", // Lavender for building D 9d6bce
  "E": "#b32580", // Pink for building E b32580
  "F": "#FFE135", // Yellow for building F FFE135
  "default": "#2bb5ec" // Default color (Light Blue)
};

// Helper function to parse time
export const parseTime = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes; // Convert to minutes for easier comparison
};

// Function to check if an event is for today
export const isEventToday = (event: Evento): boolean => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Convert event date to YYYY-MM-DD format
  const eventDate = new Date(event.Fecha);
  const eventDateStr = eventDate.toISOString().split('T')[0];
  
  return eventDateStr === todayStr;
};

// Function to group similar events
export const groupSimilarEvents = (events: Evento[]): Evento[] => {
  if (events.length <= 1) return events;
  
  // First, sort events by start time
  const sortedEvents = [...events].sort((a, b) => {
    return parseTime(a.Inicio) - parseTime(b.Inicio);
  });
  
  const result: Evento[] = [];
  let currentGroup: Evento[] = [sortedEvents[0]];
  
  // Process events to group them if they have the same name and occur close in time
  for (let i = 1; i < sortedEvents.length; i++) {
    const currentEvent = sortedEvents[i];
    const lastEvent = currentGroup[currentGroup.length - 1];
    
    // Check if events have the same name
    if (currentEvent.Evento === lastEvent.Evento) {
      // Calculate time difference in minutes
      const lastEventEndTime = parseTime(lastEvent.Fin);
      const currentEventStartTime = parseTime(currentEvent.Inicio);
      const timeDifference = currentEventStartTime - lastEventEndTime;
      
      // If the time difference is less than 2 hours (120 minutes), group them
      if (timeDifference < 120) {
        currentGroup.push(currentEvent);
        continue;
      }
    }
    
    // If we reach here, we need to finalize the current group and start a new one
    if (currentGroup.length === 1) {
      // Just a single event, add it as is
      result.push(currentGroup[0]);
    } else {
      // Create a combined event
      const firstEvent = currentGroup[0];
      const lastEvent = currentGroup[currentGroup.length - 1];
      
      result.push({
        ...firstEvent,
        Inicio: firstEvent.Inicio,
        Fin: lastEvent.Fin,
        // We could add a note that this is a combined event if needed
      });
    }
    
    // Start a new group with the current event
    currentGroup = [currentEvent];
  }
  
  // Don't forget to add the last group
  if (currentGroup.length === 1) {
    result.push(currentGroup[0]);
  } else if (currentGroup.length > 1) {
    const firstEvent = currentGroup[0];
    const lastEvent = currentGroup[currentGroup.length - 1];
    
    result.push({
      ...firstEvent,
      Inicio: firstEvent.Inicio,
      Fin: lastEvent.Fin,
    });
  }
  
  return result;
};

// Transform the event data to the format needed for the cards
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