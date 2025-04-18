// app/User.tsx
import React from "react";
import { View, Text } from "react-native";
import { styles } from './styles/User.styles';
import UserSearch from "./UserProvider/UserSearch";
import UserFilters from "./UserProvider/UserFilters";
import UserEventList from "./UserProvider/UserEventList";
import { useUserEvents } from "./UserProvider/UserHooks";

const User = () => {
  const {
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
  } = useUserEvents();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Search bar */}
      <UserSearch 
        searchText={searchText}
        setSearchText={setSearchText}
        isDarkMode={isDarkMode}
      />
      
      {/* Filter section */}
      {!isLoading && (
        <UserFilters 
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
      )}
      
      {/* Event list */}
      <UserEventList
        isLoading={isLoading}
        searchText={searchText}
        filteredEventos={filteredEventos}
        selectedEventos={selectedEventos}
        isDarkMode={isDarkMode}
        totalCount={totalCount}
        toggleEventoSelection={toggleEventoSelection}
      />
      
      {/* Footer with selected count */}
      <View style={[styles.footer, isDarkMode && styles.darkFooter]}>
        <Text style={[styles.selectedCount, isDarkMode && styles.darkSelectedCount]}>
          {selectedEventos.length} eventos seleccionados
        </Text>
      </View>
    </View>
  );
};

export default User;