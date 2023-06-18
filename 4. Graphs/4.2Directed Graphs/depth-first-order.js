import Queue_Linked_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
import Stack_Link_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack_Linked_List.js";

export class DepthFirstOrder {
    _pre;
    _post;
    _reversePost;
    _marked;

    constructor(G) {
        this._pre  = new Queue_Linked_List();
        this._post = new Queue_Linked_List();
        this._reversePost = new Stack_Link_List();
        this._marked = new Array(G.V()).fill(false);

        for (let v = 0; v < G.V(); v++) {
            if (!this._marked[v]) {
                this.dfs(G, v);
            }
            
        }
    }

    dfs(G, v) {
        this._marked[v] = true;
        this._pre.enqueue(v);
        for (const w of G.adj(v)) {
            if (!this._marked[w]) {
                this.dfs(G, w);
            }
        }
        this._post.enqueue(v);
        this._reversePost.push(v);
    }

    pre() {
        return this._pre;
    }

    post() {
        return this._post;
    }

    reversePost() {
        return this._reversePost;
    }

    
}