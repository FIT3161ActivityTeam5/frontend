/**
 * Represents a graph, as returned by the backend. (Is just `any` for now until
 * we settle on a format).
 */
type Graph = {
    nodes: {[key: string]: {
        pos: [number, number],
    }};
    edges: {
        start: string;
        end: string;
    }[];
};

export default Graph;
