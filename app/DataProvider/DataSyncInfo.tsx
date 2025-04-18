import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDataSync } from './DataSyncContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DataSyncInfoProps {
  isDarkMode: boolean;
}

const DataSyncInfo: React.FC<DataSyncInfoProps> = ({ isDarkMode }) => {
  const { scheduledSyncTime, refreshEvents, lastSuccessfulSync } = useDataSync();

  // Format time with leading zeros
  const formatTime = (hour: number, minutes: number) => {
    return `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const handleManualSync = () => {
    refreshEvents();
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Fecha desconocida';
    }
  };

  return (
    <View style={[styles.container, isDarkMode && { backgroundColor: '#2C2C2E' }]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Sincronización de datos
      </Text>
      
      {scheduledSyncTime ? (
        <Text style={[styles.syncTime, isDarkMode && styles.darkText]}>
          Los datos se actualizan automáticamente a las {formatTime(scheduledSyncTime.hour, scheduledSyncTime.minutes)} cada día.
        </Text>
      ) : (
        <Text style={[styles.syncTime, isDarkMode && styles.darkText]}>
          Cargando horario de sincronización...
        </Text>
      )}
      
      <Text style={[styles.lastSyncText, isDarkMode && styles.darkText]}>
        Última sincronización: {formatDate(lastSuccessfulSync)}
      </Text>
      
      <TouchableOpacity
        style={[styles.syncButton, isDarkMode && styles.darkSyncButton]}
        onPress={handleManualSync}
      >
        <Text style={[styles.syncButtonText, isDarkMode && styles.darkSyncButtonText]}>
          Sincronizar ahora
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  syncTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8, // Reduced to accommodate the last sync text
  },
  lastSyncText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  syncButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  syncButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSyncButton: {
    backgroundColor: '#FFFFFF',
  },
  darkSyncButtonText: {
    color: '#000000',
  },
});

export default DataSyncInfo;