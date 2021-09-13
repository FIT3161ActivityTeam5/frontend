import Graph from './graph';

/**
 * Represents a map, as returned by the backend.
 */
export default interface Map {
    /** The user id of the owner of this map. */
    associatedUserID: string;

    /** The unique id of this map. */
    mapID: string;

    /** The arbitrary map data which represents this maps nodes and edges. */
    mapData: Graph;
}
