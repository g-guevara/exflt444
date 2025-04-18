// app/UserSearch.tsx
import React from "react";
import { View, TextInput } from "react-native";
import { styles } from '../styles/User.styles';

interface UserSearchProps {
  searchText: string;
  setSearchText: (text: string) => void;
  isDarkMode: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({ 
  searchText, 
  setSearchText, 
  isDarkMode 
}) => {
  return (
    <View style={[styles.searchContainer, isDarkMode && styles.darkSearchContainer]}>
      <TextInput
        style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
        placeholder="Buscar ramos 2025 - I"
        placeholderTextColor={isDarkMode ? "#FFFFFF" : "#7f8c8d"}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

export default UserSearch;