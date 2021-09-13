import React from 'react';
import useAuthentication from './use-authentication';

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

/**
 * Hook which provides a function to create a new map.
 * 
 * The function takes in the new map id as an argument, or undefined if an error
 * occured.
 * 
 * Example Usage:
 * ```jsx
 * export default function SomeComponent() {
 *   const createMap = useCreateMap();
 *   return (
 *     <Button
 *         title="Create"
 *         onPress={() => createMap()} />
 *   );
 * }
 * ```
 */
export default function useCreateMap() {
  const auth = useAuthentication();

  return (cb: (id?: string) => void) => {
    fetch(`${API_URL}/map`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'mapData': JSON.stringify([]),
      }
    })
    .then(r => r.json())
    .then(json => {
      cb(json.mapID);
    })
    .catch(err => {
      cb(undefined);
    });
  };
}
