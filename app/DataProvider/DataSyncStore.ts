import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './DataSyncConstants';
import { Evento } from './DataSyncTypes';

// Define additional storage key since it's missing from constants
const SELECTED_EVENTS_KEY = 'selectedEventos';

/**
 * Get stored events from AsyncStorage (eventos collection)
 */
export const getStoredEvents = async (): Promise<Evento[]> => {
  try {
    const eventsJson = await AsyncStorage.getItem(STORAGE_KEYS.EVENTS_DATA);
    if (eventsJson) {
      return JSON.parse(eventsJson);
    }
    return [];
  } catch (error) {
    console.error('Error getting stored events:', error);
    return [];
  }
};

/**
 * Get stored all events from AsyncStorage (all_eventos collection)
 */
/**
 * Get stored all events from AsyncStorage (all_eventos collection)
 */
export const getStoredAllEvents = async (): Promise<Evento[]> => {
  try {
    const allEventsJson = await AsyncStorage.getItem(STORAGE_KEYS.ALL_EVENTS_DATA);
    if (allEventsJson) {
      return JSON.parse(allEventsJson);
    }
    return [];
  } catch (error) {
    console.error('Error getting stored all events:', error);
    return [];
  }
};

/**
 * Get specific event by ID from stored events
 */
export const getEventById = async (eventId: string): Promise<Evento | null> => {
  try {
    const events = await getStoredEvents();
    const event = events.find(e => e._id === eventId);
    return event || null;
  } catch (error) {
    console.error('Error getting event by ID:', error);
    return null;
  }
};

/**
 * Save selected events to AsyncStorage
 */
export const saveSelectedEvents = async (events: Evento[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(SELECTED_EVENTS_KEY, JSON.stringify(events));
    return true;
  } catch (error) {
    console.error('Error saving selected events:', error);
    return false;
  }
};

/**
 * Get selected events from AsyncStorage
 */
export const getSelectedEvents = async (): Promise<Evento[]> => {
  try {
    const selectedEventsJson = await AsyncStorage.getItem(SELECTED_EVENTS_KEY);
    if (selectedEventsJson) {
      return JSON.parse(selectedEventsJson);
    }
    return [];
  } catch (error) {
    console.error('Error getting selected events:', error);
    return [];
  }
};

/**
 * Add an event to selected events
 */
export const addSelectedEvent = async (event: Evento): Promise<boolean> => {
  try {
    const selectedEvents = await getSelectedEvents();
    
    // Check if the event is already selected
    if (selectedEvents.some(e => e._id === event._id)) {
      return true; // Event already exists, consider it a success
    }
    
    // Add the event and save
    const updatedEvents = [...selectedEvents, event];
    return await saveSelectedEvents(updatedEvents);
  } catch (error) {
    console.error('Error adding selected event:', error);
    return false;
  }
};

/**
 * Remove an event from selected events
 */
export const removeSelectedEvent = async (eventId: string): Promise<boolean> => {
  try {
    const selectedEvents = await getSelectedEvents();
    const updatedEvents = selectedEvents.filter(e => e._id !== eventId);
    return await saveSelectedEvents(updatedEvents);
  } catch (error) {
    console.error('Error removing selected event:', error);
    return false;
  }
};

/**
 * Clear all sync data (for reset or debug purposes)
 */
export const clearSyncData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.EVENTS_DATA);
    await AsyncStorage.removeItem(STORAGE_KEYS.ALL_EVENTS_DATA);
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_SYNC_DATE);
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE);
    await AsyncStorage.removeItem(STORAGE_KEYS.SYNC_ATTEMPT_DATE);
    return true;
  } catch (error) {
    console.error('Error clearing sync data:', error);
    return false;
  }
};