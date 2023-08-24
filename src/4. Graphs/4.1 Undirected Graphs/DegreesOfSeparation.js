import { SymbolGraph } from "./symbol-graph.js";
import { StdOut, StdIn } from "../../libs/index.js";
import { BreadthFirstPaths } from "./breadth-first-paths.js";

export class DegreesOfSeparation {

    // this class cannot be instantiated
    constructor() { }

    /**
     *  Reads in a social network from a file, and then repeatedly reads in
     *  individuals from standard input and prints out their degrees of
     *  separation.
     *  Takes three command-line arguments: the name of a file,
     *  a delimiter, and the name of the distinguished individual.
     *  Each line in the file contains the name of a vertex, followed by a
     *  list of the names of the vertices adjacent to that vertex,
     *  separated by the delimiter.
     *
     * @param args the command-line arguments
     */
    static main() {
        StdOut.println('Degree Of Seperation:');
        const filename  = 'assets/routes.txt';
        const delimiter = ' ';
        const source    = 'JFK';

        // StdOut.println("Source: " + source);

        const sg = new SymbolGraph(filename, delimiter);
        const G = sg.graph();
        if (!sg.contains(source)) {
            StdOut.println(source + " not in database.");
            return;
        }

        const s = sg.indexOf(source);
        const bfs = new BreadthFirstPaths(G, s);
        ['LAS', 'DFW', 'EWR'].forEach(sink => {
            StdOut.println(sink);
            if (sg.contains(sink)) {
                const t = sg.indexOf(sink);
                if (bfs.hasPathTo(t)) {
                    for (const v of bfs.pathTo(t)) {
                        StdOut.println("   " + sg.nameOf(v));
                    }
                }
                else {
                    StdOut.println("Not connected");
                }
            }
            else {
                StdOut.println("   Not in database.");
            }
        })

        // StdOut.println('Enter Airport Name to find sortest route;')
        // StdIn.read()
        //   .on('line', line => {
                // const lineSplit = line.split(/\s+/) // by at least 1 whitespace
                // const sink = lineSplit[0];
                // if (sg.contains(sink)) {
                    // const t = sg.indexOf(sink);
                    // if (bfs.hasPathTo(t)) {
                        // for (const v of bfs.pathTo(t)) {
                            // StdOut.println("   " + sg.nameOf(v));
                        // }
                    // }
                    // else {
                        // StdOut.println("Not connected");
                    // }
                // }
                // else {
                    // StdOut.println("   Not in database.");
                // }
// 
            // })
    }
}
