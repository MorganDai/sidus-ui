function doNothing () {

}

function toNumArray(target) {
    return Array.isArray(target) ? target.map(item => +item) : [+target]
}

function preventDefault(e) {
    e.preventDefault();
}

export {
    doNothing,
    toNumArray,
    preventDefault
};