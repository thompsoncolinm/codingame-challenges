const arr = [2,1,0,1,2,6];

for (let i = 0; i < arr.length; i++) {
    let bar = '';
    for (let j = 0; j < arr[i]; j++) {
        bar += '█';
    }
    console.log(bar);
}