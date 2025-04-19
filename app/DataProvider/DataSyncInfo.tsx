import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDataSync } from './DataSyncContext';

interface DataSyncInfoProps {
  isDarkMode: boolean;
}

const DataSyncInfo: React.FC<DataSyncInfoProps> = ({ isDarkMode }) => {
  const { scheduledSyncTime, refreshEvents, lastSuccessfulSync } = useDataSync();

  const formatTime = (hour: number, minutes: number) => {
    return `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const handleManualSync = () => {
    Alert.alert(
      'Confirmar sincronización',
      '¿Estás seguro de que quieres sincronizar los datos nuevamente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sincronizar', onPress: () => refreshEvents() },
      ],
      { cancelable: true }
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
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
    marginBottom: 14,
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
    marginBottom: 8,
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  darkSyncButtonText: {
    color: '#FFFFFF',
  },
});

export default DataSyncInfo;
