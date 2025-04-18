import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, API_BASE_URL } from './DataSyncConstants';
import { Evento } from './DataSyncTypes';

/**
 * Process events data to add weekday if it doesn't exist
 */
export function processEventsData(eventsData: Evento[]): Evento[] {
  return eventsData.map(event => {
    if (!event.diaSemana && event.Fecha) {
      try {
        const fecha = new Date(event.Fecha);
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        event.diaSemana = diasSemana[fecha.getDay()];
      } catch (error) {
        console.warn(`Error procesando fecha para evento ${event._id}:`, error);
      }
    }
    return event;
  });
}

/**
 * Fetch events from the API and save them locally
 */
export const fetchAndSaveEvents = async (): Promise<boolean> => {
  try {
    // Record sync attempt date regardless of success
    const attemptDate = new Date().toISOString();
    await AsyncStorage.setItem(STORAGE_KEYS.SYNC_ATTEMPT_DATE, attemptDate);
    
    console.log('Iniciando fetch de all_eventos...');
    // Fetch events from the 'all_eventos' collection
    const eventsResponse = await fetch(`${API_BASE_URL}/all_eventos`);
    if (!eventsResponse.ok) {
      throw new Error(`HTTP error! Status: ${eventsResponse.status}`);
    }
    
    const eventsData: Evento[] = await eventsResponse.json();
    console.log(`Recibidos ${eventsData.length} eventos del servidor`);
    
    // Process events if needed - añadir día de semana si no existe
    const processedEvents = processEventsData(eventsData);
    
    // Save events data to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEYS.EVENTS_DATA, JSON.stringify(processedEvents));
    
    // Update last sync date
    const currentDate = new Date().toISOString();
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC_DATE, currentDate);
    
    // Update last successful sync date
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE, currentDate);
    
    console.log('Data sync completed successfully');
    return true;
  } catch (error) {
    console.error('Error fetching and saving events:', error);
    return false;
  }
};

/**
 * Filter events based on search criteria
 */
export const filterEvents = (events: Evento[], searchTerm: string): Evento[] => {
  if (!searchTerm || searchTerm.trim() === '') {
    return events;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  return events.filter(event => {
    const eventName = event.Evento?.toLowerCase() || '';
    const eventType = event.Tipo?.toLowerCase() || '';
    const eventDate = event.Fecha?.toLowerCase() || '';
    const eventRoom = event.Sala?.toLowerCase() || '';
    const eventBuilding = event.Edificio?.toLowerCase() || '';
    const eventCampus = event.Campus?.toLowerCase() || '';
    
    return eventName.includes(normalizedSearchTerm) || 
           eventType.includes(normalizedSearchTerm) ||
           eventDate.includes(normalizedSearchTerm) ||
           eventRoom.includes(normalizedSearchTerm) ||
           eventBuilding.includes(normalizedSearchTerm) ||
           eventCampus.includes(normalizedSearchTerm);
  });
};

/**
 * Sort events by date and time
 */
export const sortEventsByDateTime = (events: Evento[]): Evento[] => {
  return [...events].sort((a, b) => {
    // First compare by date
    const dateComparison = a.Fecha.localeCompare(b.Fecha);
    if (dateComparison !== 0) return dateComparison;
    
    // If dates are equal, compare by start time
    return a.Inicio.localeCompare(b.Inicio);
  });
};