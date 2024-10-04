

function getTimeString (time){
    const hours = Math.floor(time / 3600);
    const reminingSeconds = time % 3600;
    const minutes = Math.floor(reminingSeconds / 60);
    const seconds = reminingSeconds % 60;
    return `${hours} hour ${minutes} minutes ${seconds} seconds ago`;
}
console.log(getTimeString(1000000));