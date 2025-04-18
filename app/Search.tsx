import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { styles } from './styles/Search.styles';
import { useDataSync } from "./DataProvider/DataSyncContext";
import { SearchResults } from "./SearchResults";
import { SearchFilters } from "./SearchFilters";

// Definir el tipo de datos que vien
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
}

const Search = () => {
  const [filteredEventos, setFilteredEventos] = useState<Evento[]>([]);
  const [originalFilteredEvents, setOriginalFilteredEvents] = useState<Evento[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use the DataSyncContext to access stored events
  const { events, isLoading: isSyncLoading } = useDataSync();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  
  // Filter state
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<'none' | 'alphabetical' | 'chronological'>('none');
  
  // Filter options
  const [campusOptions, setCampusOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  
  // Combined loading state
  const isLoading = isSyncLoading || isLocalLoading;

  // Cargar preferencia de tema
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Extract unique filter options
  useEffect(() => {
    if (events.length > 0) {
      // Extract unique campus and types
      const campuses = [...new Set(events.map(event => event.Campus))];
      const types = [...new Set(events.map(event => event.Tipo))];
      
      setCampusOptions(campuses);
      setTypeOptions(types);
    }
  }, [events]);

  // Función para normalizar texto (eliminar tildes y convertir a minúsculas)
  const normalizeText = (text: string): string => {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos/tildes
      .replace(/[^\w\s]/gi, ''); // Eliminar caracteres especiales
  };

  // Filter by text search
  useEffect(() => {
    if (events.length > 0) {
      if (searchText === "") {
        setOriginalFilteredEvents(events);
      } else {
        const searchTerms = normalizeText(searchText).split(' ').filter(term => term.length > 0);
        
        const results = events.filter(evento => {
          // Normaliza todos los campos de búsqueda
          const normalizedEvento = normalizeText(evento.Evento);
          const normalizedTipo = normalizeText(evento.Tipo);
          const normalizedFecha = normalizeText(evento.Fecha);
          const normalizedInicio = normalizeText(evento.Inicio);
          const normalizedFin = normalizeText(evento.Fin);
          const normalizedSala = normalizeText(evento.Sala);
          const normalizedEdificio = normalizeText(evento.Edificio);
          const normalizedCampus = normalizeText(evento.Campus);
          
          // Verifica que TODOS los términos de búsqueda estén presentes en al menos uno de los campos
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
        
        setOriginalFilteredEvents(results);
      }
      setIsLocalLoading(false);
    }
  }, [searchText, events]);
  
  // Apply filters and sorting
  useEffect(() => {
    let results = [...originalFilteredEvents];
    
    // Apply campus filter
    if (selectedCampus) {
      results = results.filter(event => event.Campus === selectedCampus);
    }
    
    // Apply type filter
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
  }, [originalFilteredEvents, selectedCampus, selectedType, sortMethod]);
  
  // Cargar preferencia de tema desde AsyncStorage
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

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      
      <View style={[styles.searchContainer, isDarkMode && styles.darkSearchContainer]}>
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
          placeholder="Buscar"
          placeholderTextColor={isDarkMode ? "#FFFFFF" : "#7f8c8d"}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <SearchFilters 
        isDarkMode={isDarkMode}
        campusOptions={campusOptions}
        typeOptions={typeOptions}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
      />
      
      <SearchResults 
        isLoading={isLoading}
        searchText={searchText}
        filteredEventos={filteredEventos}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

export default Search;