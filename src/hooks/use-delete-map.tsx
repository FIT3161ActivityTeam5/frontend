import React from 'react';
import useAuthentication from './use-authentication';

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

type UseSaveMapType =  [
  (data: any, cb: (err: boolean) => void) => void,
  boolean
];

/**
 * Hook which provides a function to delete an existing map.
 * 
 * Returns a tuple which contains a function to delete the given map as well as a
 * boolean flag to indicate if the request is pending or not.
 * 
 * Example Usage:
 * ```jsx
 * export default function SomeComponent() {
 *   const [deleteMap, loading] = useDeleteMap();
 *   return (
 *     <Button
 *         title={loading ? "..." : "Save"}
 *         onPress={() => deleteMap(myMapId)}
 *      />
 *   );
 * }
 * ```
 */
export default function useDeleteMap(): UseSaveMapType {
  const auth = useAuthentication();
  const [loading, setLoading] = React.useState(false);

  const deleteMap = (mapId: string, cb: (err: boolean) => void) => {
    setLoading(true);

    fetch(`${API_URL}/map/${mapId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
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

  return [deleteMap, loading];
}
