// calculatePartialStats(base, iv = 0, ev = 0, level = 100) {
//     return (base * 2 + iv + (ev / 4)) * (level / 100);
// },
// calculateMinimum(name, base) {
//     let partial = this.calculatePartialStats(base);
//     console.log(partial)
//     if(name == "hp") {
//         partial = partial + 100 + 10;
//     } else {
//         partial = (partial + 5) * 0.9;
//     }

//     return Math.floor(partial);
// },