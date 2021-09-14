import React from 'react';
import useAuthentication from './use-authentication';

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

type UseSaveMapType =  [
  (data: any, cb: (err: boolean) => void) => void,
  boolean
];

/**
 * Hook which provides a function to update an existing map.
 * 
 * Returns a tuple which contains a function to save the given map as well as a
 * boolean flag to indicate if the request is pending or not.
 * 
 * Example Usage:
 * ```jsx
 * export default function SomeComponent() {
 *   const [saveMap, loading] = useSaveMap(myMapId);
 *   return (
 *     <Button
 *         title={loading ? "..." : "Save"}
 *         onPress={() => saveMap("mapdata")}
 *      />
 *   );
 * }
 * ```
 */
export default function useSaveMap(mapId: string): UseSaveMapType {
  const auth = useAuthentication();
  const [loading, setLoading] = React.useState(false);

  const saveMap = (data: any, cb: (err: boolean) => void) => {
    setLoading(true);

    fetch(`${API_URL}/map/${mapId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'mapData': JSON.stringify(data),
      }
    })
    .then(r => r.json())
    .then(json => {
      cb(false);
    })
    .catch(err => {
      cb(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return [saveMap, loading];
}
