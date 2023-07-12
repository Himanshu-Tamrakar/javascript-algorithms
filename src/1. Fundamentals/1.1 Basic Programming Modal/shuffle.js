
export function Suffle() {}

Suffle.prototype.suffle = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        const rand = 1 + Math.round(Math.random() * 100) % arr.length-1;

        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
}

Suffle.main = function(args = []) {
    for (let index = 0; index < 10; index++) {
        args.push(Math.floor(Math.random() * 100));
    }

    console.log('Initial arr: ', args);

    Suffle.suffle(args);

    console.log('Suffled arr: ', args);

} 