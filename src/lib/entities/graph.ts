/**
 * Represents a graph, as returned by the backend. (Is just `any` for now until
 * we settle on a format).
 */
type Graph = {
    name: string;
    nodes: {[key: string]: {
        pos: [number, number],
        description: string,
    }};
    edges: {
        start: string;
        end: string;
    }[];
};

export default Graph;
