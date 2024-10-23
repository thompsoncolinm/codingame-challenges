function averageColours(a, b) {
    const [aRed, aGreen, aBlue] = a
      .match(/\w\w/g)
      .map((colour) => parseInt(colour, 16));
    const [bRed, bGreen, bBlue] = b
      .match(/\w\w/g)
      .map((colour) => parseInt(colour, 16));
    const red = Math.round((aRed + bRed) / 2).toString(16).padStart(2, '0');
    const green = Math.round((aGreen + bGreen) / 2).toString(16).padStart(2, '0');
    const blue = Math.round((aBlue + bBlue) / 2).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }

  console.log(averageColours("#B2D9FF", "#C20A0A")); // #ba7285