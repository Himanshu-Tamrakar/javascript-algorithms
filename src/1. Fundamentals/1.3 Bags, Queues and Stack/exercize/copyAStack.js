import Stack_Link_List from "../Stack_Linked_List.js";

export default function copyAStack(s) {


    const ns = new Stack_Link_List(s);


    let x = s.first;
    while (x) {
        console.log(x.item);;
        x = x.next;
    }

    console.log('----cloned one----');

    x = ns.first;
    while (x) {
        console.log(x.item);;
        x = x.next;
    }

    console.log('-----Testing Clone------');
    console.log('Pop from new stack', ns.pop());
    console.log('----Existing Stack----');

    x = s.first;
    while (x) {
        console.log(x.item);;
        x = x.next;
    }

    console.log('----New Existing Stack----');
    x = ns.first;
    while (x) {
        console.log(x.item);;
        x = x.next;
    }

}