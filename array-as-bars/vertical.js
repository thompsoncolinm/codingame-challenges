const arr = [2,1,0,1,2,6];

for (let i = Math.max(...arr); i >= 0; i--) {
    let bar = '';
    for (let j = 0; j < arr.length; j++) {
        bar += arr[j] > i ? '█' : ' ';
    }
    console.log(bar);
}