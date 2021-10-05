import React from 'react';
import Graph from '../lib/entities/graph';
import useAuthentication from './use-authentication';

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

type UseCreateMapType =  [
  (map: Graph, cb?: (id?: string) => void) => void,
  boolean
];

/**
 * Hook which provides a function to create a new map.
 * 
 * Returns a tuple which contains a function to create a new map as well as a
 * boolean flag to indicate if the request is pending or not.
 * 
 * Example Usage:
 * ```jsx
 * export default function SomeComponent() {
 *   const [createMap, loading] = useCreateMap();
 *   return (
 *     <Button
 *         title={loading ? "..." : "Create"}
 *         onPress={() => createMap()}
 *      />
 *   );
 * }
 * ```
 */
export default function useCreateMap(): UseCreateMapType {
  const auth = useAuthentication();
  const [loading, setLoading] = React.useState(false);

  const createMap = (map: Graph, cb?: (id?: string) => void) => {
    setLoading(true);

    fetch(`${API_URL}/map`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'mapData': JSON.stringify(map),
      }
    })
    .then(r => r.json())
    .then(json => {
      if(cb) { cb(json.mapID); }
    })
    .catch(err => {
      if(cb) { cb(undefined); }
    }).finally(() => {
      setLoading(false);
    });
  };

  return [createMap, loading];
}
