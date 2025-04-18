import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  isDarkMode: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({ 
  label, 
  isSelected, 
  onPress, 
  isDarkMode 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.chip,
        isDarkMode && styles.darkChip,
        isSelected && styles.selectedChip,
        isSelected && isDarkMode && styles.darkSelectedChip
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.chipText,
        isDarkMode && styles.darkChipText,
        isSelected && styles.selectedChipText,
        isSelected && isDarkMode && styles.darkSelectedChipText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  darkChip: {
    backgroundColor: '#2c2c2e',
    borderColor: '#444',
  },
  selectedChip: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  darkSelectedChip: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  darkChipText: {
    color: '#fff',
  },
  selectedChipText: {
    color: '#fff',
    fontWeight: '500',
  },
  darkSelectedChipText: {
    color: '#000',
    fontWeight: '500',
  },
});