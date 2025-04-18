import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, API_BASE_URL } from './DataSyncConstants';
import { Evento } from './DataSyncTypes';

/**
 * Process events data to add weekday if it doesn't exist
 */
function processEventsData(eventsData: Evento[]): Evento[] {
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
 * Fetch regular events from the API (eventos collection) and save them locally
 */
export const fetchAndSaveEvents = async (): Promise<boolean> => {
  try {
    // Record sync attempt date regardless of success
    const attemptDate = new Date().toISOString();
    await AsyncStorage.setItem(STORAGE_KEYS.SYNC_ATTEMPT_DATE, attemptDate);
    
    console.log('Iniciando fetch de eventos...');
    // Fetch events from the 'eventos' collection
    const eventsResponse = await fetch(`${API_BASE_URL}/eventos`);
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
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE, currentDate);
    
    console.log('Eventos data sync completed successfully');
    return true;
  } catch (error) {
    console.error('Error fetching and saving eventos:', error);
    return false;
  }
};

/**
 * Fetch all events from the API (all_eventos collection) and save them locally
 */
/**
 * Fetch all events from the API (all_eventos collection) and save them locally
 */
export const fetchAndSaveAllEvents = async (): Promise<boolean> => {
  try {
    console.log('Iniciando fetch de all_eventos...');
    // Fetch events from the 'all_eventos' collection
    const allEventsResponse = await fetch(`${API_BASE_URL}/all_eventos`);
    if (!allEventsResponse.ok) {
      throw new Error(`HTTP error! Status: ${allEventsResponse.status}`);
    }
    
    const allEventsData: Evento[] = await allEventsResponse.json();
    console.log(`Recibidos ${allEventsData.length} all_eventos del servidor`);
    
    // Process events if needed
    const processedAllEvents = processEventsData(allEventsData);
    
    // Save all_eventos data to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEYS.ALL_EVENTS_DATA, JSON.stringify(processedAllEvents));
    
    console.log('All_eventos data sync completed successfully');
    return true;
  } catch (error) {
    console.error('Error fetching and saving all_eventos:', error);
    return false;
  }
};

/**
 * Fetch both regular events and all events
 */
export const fetchAllData = async (): Promise<boolean> => {
  try {
    const eventsSuccess = await fetchAndSaveEvents();
    const allEventsSuccess = await fetchAndSaveAllEvents();
    
    return eventsSuccess && allEventsSuccess;
  } catch (error) {
    console.error('Error fetching all data:', error);
    return false;
  }
};

