import { Linking, Platform, ActionSheetIOS, Alert } from 'react-native';

/**
 * Opens the device's navigation app using the system default.
 */
export async function openInMaps(
  destLat: number,
  destLng: number,
  destLabel: string,
): Promise<void> {
  const latLng = `${destLat},${destLng}`;
  const label = encodeURIComponent(destLabel);
  
  const url = Platform.select({
    ios: `maps:0,0?q=${label}@${latLng}`,
    android: `geo:0,0?q=${latLng}(${label})`,
  });

  if (url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      // Fallback to browser maps if app scheme fails
      const browserUrl = `https://www.google.com/maps/search/?api=1&query=${latLng}`;
      await Linking.openURL(browserUrl);
    }
  }
}

/**
 * Calculates the distance between two geographic coordinates
 * using the Haversine formula.
 *
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c * 10) / 10; // round to 1 decimal
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Formats distance for display.
 * Under 1 km shows meters, above shows km.
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}
