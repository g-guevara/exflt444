// app/useEventStats.ts
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { Evento, EventCardData, TimeGap } from "./EventStatsTypes";
import { transformEventsToCardFormat, calculateTimeGaps, filterTodayEvents } from "./EventStatsUtils";
import { useDataSync } from "../DataProvider/DataSyncContext";

/**
 * Custom hook to handle EventStats component logic
 */
export const useEventStats = (navigation: NavigationProp<any>) => {
  const [selectedEvents, setSelectedEvents] = useState<Evento[]>([]);
  const [cardEvents, setCardEvents] = useState<EventCardData[]>([]);
  const [timeGaps, setTimeGaps] = useState<TimeGap[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load events when component mounts
  useEffect(() => {
    loadSelectedEvents();
  }, []);
  
  // Reload events when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSelectedEvents();
      return () => {};
    }, [])
  );
  
  // Function to load selected events from AsyncStorage
  const loadSelectedEvents = async () => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem("selectedEventos");
      if (jsonValue !== null) {
        const events: Evento[] = JSON.parse(jsonValue);
        
        // Filter events for today
        const todaysEvents = filterTodayEvents(events);
        
        setSelectedEvents(events); // Keep all selected events
        
        // Transform the events to the card format
        const transformedEvents = transformEventsToCardFormat(todaysEvents);
        
        // Sort events by start time
        transformedEvents.sort((a, b) => a.rawStartTime - b.rawStartTime);
        setCardEvents(transformedEvents);
        
        // Calculate time gaps between events
        const gaps = calculateTimeGaps(transformedEvents);
        setTimeGaps(gaps);
      }
    } catch (error) {
      console.error("Error loading selected events:", error);
      Alert.alert("Error", "No se pudieron cargar tus eventos seleccionados.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedEvents,
    cardEvents,
    timeGaps,
    isLoading,
    navigation
  };
};