import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from './styles/Search.styles';
import { FilterChip } from "./FilterChip";

interface SearchFiltersProps {
  isDarkMode: boolean;
  campusOptions: string[];
  typeOptions: string[];
  selectedCampus: string | null;
  setSelectedCampus: (campus: string | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  sortMethod: 'none' | 'alphabetical' | 'chronological';
  setSortMethod: (method: 'none' | 'alphabetical' | 'chronological') => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  isDarkMode,
  campusOptions,
  typeOptions,
  selectedCampus,
  setSelectedCampus,
  selectedType,
  setSelectedType,
  sortMethod,
  setSortMethod
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.filtersScrollView}
      contentContainerStyle={styles.filtersContainer}
    >
      {/* Sort options */}
      <View style={styles.filterDropdownContainer}>
        <Text style={[styles.filterLabel, isDarkMode && styles.darkText]}>Ordenar por:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScrollView}>
          <FilterChip 
            label="A-Z" 
            isSelected={sortMethod === 'alphabetical'} 
            onPress={() => setSortMethod(sortMethod === 'alphabetical' ? 'none' : 'alphabetical')}
            isDarkMode={isDarkMode}
          />
          <FilterChip 
            label="Cronológico" 
            isSelected={sortMethod === 'chronological'} 
            onPress={() => setSortMethod(sortMethod === 'chronological' ? 'none' : 'chronological')}
            isDarkMode={isDarkMode}
          />
        </ScrollView>
      </View>
      
      {/* Dropdown or selector for event types */}
      <View style={styles.filterDropdownContainer}>
        <Text style={[styles.filterLabel, isDarkMode && styles.darkText]}>Tipo:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScrollView}>
          <FilterChip 
            label="Todos" 
            isSelected={selectedType === null} 
            onPress={() => setSelectedType(null)}
            isDarkMode={isDarkMode}
          />
          {typeOptions.map(type => (
            <FilterChip 
              key={type}
              label={type} 
              isSelected={selectedType === type} 
              onPress={() => setSelectedType(selectedType === type ? null : type)}
              isDarkMode={isDarkMode}
            />
          ))}
        </ScrollView>
      </View>        
      
      {/* Dropdown or selector for campus */}
      <View style={styles.filterDropdownContainer}>
        <Text style={[styles.filterLabel, isDarkMode && styles.darkText]}>Campus:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScrollView}>
          <FilterChip 
            label="Todos" 
            isSelected={selectedCampus === null} 
            onPress={() => setSelectedCampus(null)}
            isDarkMode={isDarkMode}
          />
          {campusOptions.map(campus => (
            <FilterChip 
              key={campus}
              label={campus} 
              isSelected={selectedCampus === campus} 
              onPress={() => setSelectedCampus(selectedCampus === campus ? null : campus)}
              isDarkMode={isDarkMode}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};