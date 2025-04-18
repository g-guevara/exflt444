// app/UserHooks.ts
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Evento, normalizeText } from './UserTypes';
import { useDataSync } from "../DataProvider/DataSyncContext";

export const useUserEvents = () => {
  const [filteredEventos, setFilteredEventos] = useState<Evento[]>([]);
  const [selectedEventos, setSelectedEventos] = useState<Evento[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<'none' | 'alphabetical' | 'chronological'>('none');
  const [campusOptions, setCampusOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  
  // Use DataSync context to access stored events
  const { allEvents, isLoading: isSyncLoading } = useDataSync();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  
  // Combined loading state
  const isLoading = isSyncLoading || isLocalLoading;

  // Load selected events and theme preference
  useEffect(() => {
    loadSelectedEventos();
    loadThemePreference();
  }, []);

  // Extract unique filter options
  useEffect(() => {
    if (allEvents.length > 0) {
      // Extract unique campus and types
      const campuses = [...new Set(allEvents.map(event => event.Campus))];
      const types = [...new Set(allEvents.map(event => event.Tipo))];
      
      setCampusOptions(campuses);
      setTypeOptions(types);
      setTotalCount(allEvents.length);
    }
  }, [allEvents]);

  // Apply filtering based on search text and filter selections
  useEffect(() => {
    if (allEvents.length > 0) {
      setIsLocalLoading(true);
      try {
        // First apply text search filtering
        let results = [...allEvents];
        
        if (searchText.trim() !== "") {
          const searchTerms = normalizeText(searchText).split(' ').filter(term => term.length > 0);
          
          results = allEvents.filter(evento => {
            const normalizedEvento = normalizeText(evento.Evento);
            const normalizedTipo = normalizeText(evento.Tipo);
            const normalizedFecha = normalizeText(evento.Fecha);
            const normalizedInicio = normalizeText(evento.Inicio);
            const normalizedFin = normalizeText(evento.Fin);
            const normalizedSala = normalizeText(evento.Sala);
            const normalizedEdificio = normalizeText(evento.Edificio);
            const normalizedCampus = normalizeText(evento.Campus);
            
            return searchTerms.every(term => 
              normalizedEvento.includes(term) ||
              normalizedTipo.includes(term) ||
              normalizedFecha.includes(term) ||
              normalizedInicio.includes(term) ||
              normalizedFin.includes(term) ||
              normalizedSala.includes(term) ||
              normalizedEdificio.includes(term) ||
              normalizedCampus.includes(term)
            );
          });
        }
        
        // Apply filters
        if (selectedCampus) {
          results = results.filter(event => event.Campus === selectedCampus);
        }
        
        if (selectedType) {
          results = results.filter(event => event.Tipo === selectedType);
        }
        
        // Apply sorting
        if (sortMethod === 'alphabetical') {
          results = results.sort((a, b) => a.Evento.localeCompare(b.Evento));
        } else if (sortMethod === 'chronological') {
          results = results.sort((a, b) => {
            const dateTimeA = `${a.Fecha}T${a.Inicio}`;
            const dateTimeB = `${b.Fecha}T${b.Inicio}`;
            return dateTimeA.localeCompare(dateTimeB);
          });
        }
        
        setFilteredEventos(results);
      } catch (error) {
        console.error("Error al filtrar eventos:", error);
        setFilteredEventos(allEvents);
      } finally {
        setIsLocalLoading(false);
      }
    }
  }, [searchText, allEvents, selectedCampus, selectedType, sortMethod]);

  // Load selected events from AsyncStorage
  const loadSelectedEventos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("selectedEventos");
      if (jsonValue !== null) {
        setSelectedEventos(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error("Error al cargar eventos seleccionados:", error);
      Alert.alert("Error", "No se pudieron cargar tus eventos seleccionados.");
    }
  };
  
  // Load theme preference from AsyncStorage
  const loadThemePreference = async () => {
    try {
      const value = await AsyncStorage.getItem("isDarkMode");
      if (value !== null) {
        setIsDarkMode(value === "true");
      }
    } catch (error) {
      console.error("Error al cargar preferencia de tema:", error);
    }
  };

  // Save selected events to AsyncStorage
  const saveSelectedEventos = async (updatedSelectedEventos: Evento[]) => {
    try {
      const jsonValue = JSON.stringify(updatedSelectedEventos);
      await AsyncStorage.setItem("selectedEventos", jsonValue);
    } catch (error) {
      console.error("Error al guardar eventos seleccionados:", error);
      Alert.alert("Error", "No se pudieron guardar tus selecciones.");
    }
  };

  // Toggle event selection
  const toggleEventoSelection = (evento: Evento) => {
    // Check if the event is already selected
    const isSelected = selectedEventos.some(e => e._id === evento._id);
    
    let updatedSelectedEventos: Evento[];
    
    if (isSelected) {
      // Remove from selection
      updatedSelectedEventos = selectedEventos.filter(e => e._id !== evento._id);
    } else {
      // Add to selection
      updatedSelectedEventos = [...selectedEventos, evento];
    }
    
    setSelectedEventos(updatedSelectedEventos);
    saveSelectedEventos(updatedSelectedEventos);
  };

  return {
    filteredEventos,
    selectedEventos,
    isDarkMode,
    isLoading,
    searchText,
    setSearchText,
    selectedCampus,
    setSelectedCampus,
    selectedType,
    setSelectedType,
    sortMethod,
    setSortMethod,
    campusOptions,
    typeOptions,
    totalCount,
    toggleEventoSelection
  };
};