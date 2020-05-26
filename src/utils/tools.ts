function doNothing () {

}

function toNumArray(target) {
    return Array.isArray(target) ? [...target.map(item => +item)] : [+target]
}

function genUniqueId(prefix = 'sidus') {
    let timestamp = Date.now();
    return `${prefix}${(timestamp++).toString(36)}`
}

function preventDefault(e) {
    e.preventDefault();
}

export {
    doNothing,
    toNumArray,
    genUniqueId,
    preventDefault
};