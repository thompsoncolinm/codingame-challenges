/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

let inputs = readline().split(' ');
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
const initialTx = parseInt(inputs[2]); // Thor's starting X position
const initialTy = parseInt(inputs[3]); // Thor's starting Y position

let thorPos = {
    'x' : initialTx,
    'y' : initialTy
}
// game loop
while (true) {
    const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
    let moveDirection = "";

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    console.error('position', thorPos.x, thorPos.y)
    try {

        if (lightY < thorPos.y && checkPos( 1, thorPos.y - 1 )) {
            thorPos.y--;
            moveDirection += 'N';
        }
        if (lightY > thorPos.y && checkPos( 1, thorPos.y + 1 )) {
            thorPos.y++;
            moveDirection += 'S';
        }
        if (lightX > thorPos.x && checkPos( thorPos.x + 1, 1 )) {
            thorPos.x++;
            moveDirection += 'E';
        }
        if (lightX < thorPos.x && checkPos( thorPos.x - 1, 1 )) {
            thorPos.x--;
            moveDirection += 'W';
        }

        console.log(moveDirection);
    } catch(e) {
        console.error('Something went wrong', e)
    }
}

function checkPos(x, y) {
    if (
        x >= 40 ||
        x < 0 ||
        y >= 18 ||
        y < 0
        ) {
            return false;
        }
    return true;
}