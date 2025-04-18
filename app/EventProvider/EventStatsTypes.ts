// app/EventStatsTypes.ts
// Type definitions and constants for EventStats components

// Event interface from the API
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
  
  // Processed event card data format
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
    rawStartTime: number; // For time gap calculation
    rawEndTime: number;   // For time gap calculation
  }
  
  // Time gap between events
  export interface TimeGap {
    id: string;
    hoursDiff: number;
    minutesDiff: number;
  }
  
  // Color palette for cards based on building letter
  export const CARD_COLORS: Record<string, string> = {
    "A": "#2bb5ec", // Light Blue for building A
    "B": "#2becc6", // Teal for building B
    "C": "#bbef4c", // Green for building C
    "D": "#9d6bce", // Lavender for building D
    "E": "#b32580", // Pink for building E
    "F": "#FFE135", // Yellow for building F
    "default": "#2bb5ec" // Default color (Light Blue)
  };
  
  // Function to parse time string into minutes for calculations
  export const parseTime = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes; // Convert to minutes for easier comparison
  };