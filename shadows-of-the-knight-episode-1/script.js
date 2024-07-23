/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);

let batPos = {
    'x' : X0,
    'y' : Y0
}

let searchSpace = {
    'x' : {
        'min' : 0,
        'max' : W
    },
    'y' : {
        'min' : 0,
        'max' : H
    }
}

// game loop
while (true) {
    const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    let moveDir = '';
    let mid;
    

    try {
        console.error('Bomb Direction: ', bombDir);

        if (bombDir.includes('R')){

            searchSpace.x.min = batPos.x + 1;
            mid = Math.ceil((searchSpace.x.max - searchSpace.x.min) / 2);
            batPos.x += mid;
            if (batPos.x > W) {
                batPos.x = W;
            }
            moveDir += batPos.x + ' ';

        } else if (bombDir.includes('L')){

            searchSpace.x.max = batPos.x - 1;
            mid = Math.ceil((searchSpace.x.max - searchSpace.x.min) / 2);
            console.error('move L mid point: ', mid);
            (mid === 0) ? batPos.x -= 1 : batPos.x -= mid;
            if (batPos.x < 0) {
                batPos.x = 0;
            }
            moveDir += batPos.x + ' ';

        } else {
            moveDir += batPos.x + ' ';
        }

        if (bombDir.includes('U')){

            searchSpace.y.max = batPos.y - 1;
            mid = Math.ceil((searchSpace.y.max - searchSpace.y.min) / 2);
            (mid === 0)? batPos.y -= 1 : batPos.y -= mid;
            if (batPos.y < 0) {
                batPos.y = 0;
            }
            moveDir += (batPos.y).toString();

        } else if (bombDir.includes('D')){

            searchSpace.y.min = batPos.y + 1;
            mid = Math.ceil((searchSpace.y.max - searchSpace.y.min) / 2);
            batPos.y += mid;
            if (batPos.y > H) {
                batPos.y = H;
            }
            moveDir += (batPos.y).toString();

        } else {
            moveDir += (batPos.y).toString();;
        }
    } catch(e) {
        console.error('Something went wrong', e)
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');


    // the location of the next window Batman should jump to.
    console.log(moveDir);
}