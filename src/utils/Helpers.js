export const  heightMask = (height) => {
    let symbol = 'cm';
    if(height < 10) {
        height = String(height).padEnd(2, '00')
    } else {
        height = height / 10;
        symbol = 'M'
    }
    return String(height).concat(symbol);
}

export const  weightMask = (weight) => {
    weight = weight / 10;
    return String(weight).concat('Kg');
}

export const replaceScape = (text) => {
    let ajusted = "";
    ['\n', '\f'].forEach(space =>  ajusted = text.replace(space, ''));
    return ajusted;
}