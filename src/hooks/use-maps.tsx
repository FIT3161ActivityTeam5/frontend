import React from 'react';
import useAuthentication from './use-authentication';
import Map from '../lib/entities/map';

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

export type UseMapsState = 'loading' | 'error' | 'success';

type UseMapsType = [
  UseMapsState,
  Map[] | undefined,
  () => void
];

/**
 * Hook which performs a GET request to retreive a list of the users maps.
 * Returns a tuple containing the current state of the request, and the map data.
 * 
 * The state can be one of three values:
 *   - `loading`: The request is still under way, and a loading indicator should be shown.
 *   - `error`: There was some sort of error while performing the request.
 *   - `success`: The request completed successfully, and the `maps` object will
 *                contain the users map data.
 * 
 * The returned tuple also contains a function which can be called to query the
 * backend for the map list again.
 * 
 * Example Usage:
 * ```jsx
 * export default function SomeComponent() {
 *   const [state, maps, refresh] = useMaps();
 * 
 *   return (
 *    {state === 'loading' ? (
 *      <Text>Loading!</Text>
 *    ) : state === 'error' ? (
 *      <Text>Error occured!</Text>
 *    ) : (
 *      <Text>Map data is: {JSON.stringify(maps)}</Text>
 *    )}
 *   );
 * }
 * ```
 */
export default function useMaps(): UseMapsType {
  const auth = useAuthentication();

  // State, might want to consider a reducer to make this a little cleaner.
  const [maps, setMaps] = React.useState<Map[] | undefined>(undefined);
  const [state, setState] = React.useState<UseMapsState>('loading');

  const refresh = () => {
    setState('loading');

    fetch(`${API_URL}/map/list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
    .then(r => {
      if (r.status === 200) {
        r.json().then(json => {
          setMaps(json);
          setState('success');
        }).catch(err => {
          setState('error');
        });
      } else {
        setState('error');
      }
    })
    .catch(err => {
      setState('error');
    });
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return [state, maps, refresh];
}
