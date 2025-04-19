package com.EXFLT444.Salas

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.Intent
import android.content.ComponentName
import android.appwidget.AppWidgetManager

class SharedStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val TAG = "SharedStorageModule"

    override fun getName(): String {
        return "SharedStorage"
    }

    @ReactMethod
    fun set(key: String, value: String) {
        Log.d(TAG, "Guardando en SharedPreferences: key=$key, value=$value")
        val sharedPreferences = reactApplicationContext.getSharedPreferences(
                "com.EXFLT444.Salas.shared", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString(key, value)
        editor.apply()
        
        // Forzar actualización del widget después de guardar
        try {
            val appWidgetManager = AppWidgetManager.getInstance(reactApplicationContext)
            val componentName = ComponentName(reactApplicationContext, MyAppWidget::class.java)
            val widgetIds = appWidgetManager.getAppWidgetIds(componentName)
            
            if (widgetIds.isNotEmpty()) {
                val updateIntent = Intent(reactApplicationContext, MyAppWidget::class.java)
                updateIntent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
                updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetIds)
                reactApplicationContext.sendBroadcast(updateIntent)
                Log.d(TAG, "Broadcast enviado para actualizar widgets con IDs: ${widgetIds.joinToString()}")
            } else {
                Log.d(TAG, "No hay widgets instalados para actualizar")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error al intentar actualizar los widgets: ${e.message}", e)
        }
    }
}