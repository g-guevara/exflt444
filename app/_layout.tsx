import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { DataSyncProvider } from "./DataProvider/DataSyncContext";

// Componente interno que usa el contexto de tema
function StackNavigator() {
  const { isDarkMode, isThemeLoaded } = useTheme();

  // Esperamos a que el tema esté cargado antes de renderizar
  if (!isThemeLoaded) {
    return null; // O un componente de carga
  }

  return (
    <>
      <StatusBar 
        backgroundColor={isDarkMode ? "#121212" : "#FFFFFF"} 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
          },
          headerTintColor: isDarkMode ? "#ffffff" : "#000000",
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
          },
          // Solo configurar para iOS
          ...(Platform.OS === 'ios' ? {
            // @ts-ignore - Estas propiedades pueden no estar en las tipificaciones pero funcionan en iOS
            headerBackTitle: "Atrás",
            headerBackTitleVisible: true
          } : {})
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="Search" 
          options={{ 
            title: "Salas de Hoy",
          }} 
        />
        <Stack.Screen 
          name="Config" 
          options={{ 
            title: "Configuración",
          }} 
        />
        <Stack.Screen 
          name="User" 
          options={{ 
            title: "Agrega tus ramos",
          }} 
        />
      </Stack>
    </>
  );
}

// Componente principal que proporciona el contexto de tema
export default function RootLayout() {
  return (
    <ThemeProvider>
      <DataSyncProvider>
        <StackNavigator />
      </DataSyncProvider>
    </ThemeProvider>
  );
}