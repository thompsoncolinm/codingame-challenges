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

// game loop
while (true) {
    const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    moveDir = '';
    

    try {
        console.error('Bomb Direction: ', bombDir);

        if (bombDir.includes('R') && checkWidth(batPos.x + 1)){
                moveDir += ++batPos.x + ' ';
        } else if (bombDir.includes('L') && checkWidth(batPos.x - 1)){
            moveDir += ++batPos.x + ' ';
        } else {
            moveDir += batPos.x + ' ';
        }
        if (bombDir.includes('U') && checkHeight(batPos.y - 1)){
            moveDir += (--batPos.y).toString();
        } else if (bombDir.includes('D') && checkHeight(batPos.y + 1)){
            moveDir += (++batPos.y).toString();
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

function checkWidth(batW){
    if (batW < 0 || batW > W) {
        return false;
    }
    return true;
}
function checkHeight(batH){
    if (batH < 0 || batH > H) {
        return false;
    }
    return true;
}
