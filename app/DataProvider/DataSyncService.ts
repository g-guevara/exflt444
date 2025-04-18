import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './DataSyncConstants';
import { 
  getScheduledUpdateTime, 
  setupRandomTimeValues, 
  checkFirstLaunch, 
  setFirstLaunchComplete
} from './DataSyncTime';
import { fetchAndSaveEvents, fetchAndSaveAllEvents, fetchAllData } from './DataSyncFetch';
import { getStoredEvents, getStoredAllEvents } from './DataSyncStore';

/**
 * Initialize data synchronization
 */
export const initializeDataSync = async (): Promise<void> => {
  try {
    // Check if it's the first launch
    const isFirstLaunch = await checkFirstLaunch();
    
    if (isFirstLaunch) {
      console.log('First launch detected, initializing data sync...');
      // Set up random time for updates
      await setupRandomTimeValues();
      // Perform initial data fetch (both collections)
      await fetchAllData();
      // Mark first launch as complete
      await setFirstLaunchComplete();
    } else {
      console.log('Not first launch, checking for missed syncs...');
      // Check if any scheduled syncs were missed
      await checkForMissedSyncs();
    }
  } catch (error) {
    console.error('Error initializing data sync:', error);
  }
};

/**
 * Check if any sync attempts were missed and handle them
 */
export const checkForMissedSyncs = async (): Promise<void> => {
  try {
    const lastSuccessfulSyncStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE);
    
    // If no successful sync record exists, this might be the first launch after installation
    // or there might have been a problem with previous syncs
    if (!lastSuccessfulSyncStr) {
      console.log('No successful sync record found, performing sync');
      await fetchAllData();
      return;
    }
    
    const lastSuccessfulSync = new Date(lastSuccessfulSyncStr);
    const now = new Date();
    
    // Calculate days difference
    const daysDifference = Math.floor((now.getTime() - lastSuccessfulSync.getTime()) / (1000 * 60 * 60 * 24));
    
    // If more than 1 day has passed since the last successful sync
    if (daysDifference > 1) {
      console.log(`${daysDifference} days since last successful sync, performing catch-up sync`);
      await fetchAllData();
    }
    
    // Perform regular check for today's sync
    await checkAndSyncData();
  } catch (error) {
    console.error('Error checking for missed syncs:', error);
    // Try to sync anyway in case of error
    await fetchAllData();
  }
};

/**
 * Check if we need to sync data based on the scheduled time
 */
export const checkAndSyncData = async (): Promise<void> => {
  try {
    const lastSyncDateStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC_DATE);
    const lastSuccessfulSyncDateStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE);
    const { hour, minutes } = await getScheduledUpdateTime();
    
    // Handle sync timing logic
    await handleSyncTiming(lastSyncDateStr, lastSuccessfulSyncDateStr, hour, minutes);
  } catch (error) {
    console.error('Error checking and syncing data:', error);
  }
};

/**
 * Handle sync timing logic
 */
export const handleSyncTiming = async (
  lastSyncDateStr: string | null, 
  lastSuccessfulSyncDateStr: string | null, 
  hour: number, 
  minutes: number
): Promise<void> => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Get the date part only (year, month, day) for comparison
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // If it's the first time or we're at the scheduled time, sync the data
  if (!lastSyncDateStr || (currentHour === hour && currentMinutes === minutes)) {
    console.log('Time to sync data!');
    await fetchAllData();
    return;
  }
  
  await checkPreviousSyncStatus(lastSuccessfulSyncDateStr, lastSyncDateStr, hour, minutes, nowDate);
};

/**
 * Helper function to check previous sync status
 */
async function checkPreviousSyncStatus(
  lastSuccessfulSyncDateStr: string | null,
  lastSyncDateStr: string | null,
  hour: number,
  minutes: number,
  nowDate: Date
): Promise<void> {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Parse the dates for comparison
  const lastSuccessfulSyncDate = lastSuccessfulSyncDateStr ? new Date(lastSuccessfulSyncDateStr) : null;
  
  // Check for failed previous attempts
  if (lastSyncDateStr && !lastSuccessfulSyncDateStr) {
    console.log('Previous sync attempt detected but no successful sync record, trying again');
    await fetchAllData();
    return;
  }
  
  if (lastSuccessfulSyncDate) {
    await checkExpectedNextSync(lastSuccessfulSyncDate, hour, minutes, nowDate, currentHour, currentMinutes);
  }
  
  // Standard check if we missed the sync time today
  if (lastSyncDateStr) {
    await checkMissedSyncToday(lastSyncDateStr, hour, minutes, nowDate, currentHour, currentMinutes);
  }
}

/**
 * Check if we missed a scheduled sync
 */
async function checkExpectedNextSync(
  lastSuccessfulSyncDate: Date,
  hour: number,
  minutes: number,
  nowDate: Date,
  currentHour: number,
  currentMinutes: number
): Promise<void> {
  // Get just the date part (year, month, day)
  const lastSuccessfulSyncDay = new Date(
    lastSuccessfulSyncDate.getFullYear(), 
    lastSuccessfulSyncDate.getMonth(), 
    lastSuccessfulSyncDate.getDate()
  );
  
  // Calculate the expected next sync day (adding 1 day to last successful sync)
  const expectedNextSyncDay = new Date(lastSuccessfulSyncDay);
  expectedNextSyncDay.setDate(expectedNextSyncDay.getDate() + 1);
  
  // If current date is after the expected next sync day, we missed at least one sync
  if (nowDate > expectedNextSyncDay) {
    console.log('Missed scheduled sync due to device being off, syncing now');
    await fetchAllData();
    return;
  }
  
  // If it's the same day as expected next sync but after scheduled time
  if (nowDate.getTime() === expectedNextSyncDay.getTime() && 
      (currentHour > hour || (currentHour === hour && currentMinutes > minutes))) {
    console.log('On sync day and scheduled time has passed, syncing now');
    await fetchAllData();
  }
}

/**
 * Check if we missed today's sync
 */
async function checkMissedSyncToday(
  lastSyncDateStr: string,
  hour: number,
  minutes: number,
  nowDate: Date,
  currentHour: number,
  currentMinutes: number
): Promise<void> {
  const lastSyncDate = new Date(lastSyncDateStr);
  const lastSyncDay = new Date(
    lastSyncDate.getFullYear(), 
    lastSyncDate.getMonth(), 
    lastSyncDate.getDate()
  );
  
  // If the last sync was before today and the scheduled time has already passed today, sync now
  if (lastSyncDay < nowDate && 
      (currentHour > hour || (currentHour === hour && currentMinutes > minutes))) {
    console.log('Missed scheduled sync for today, doing it now');
    await fetchAllData();
  }
}

// Export important functions
export { 
  getScheduledUpdateTime,
  getStoredEvents,
  getStoredAllEvents,
  fetchAndSaveEvents,
  fetchAndSaveAllEvents,
  fetchAllData
};