export function arrToObj(arr, objKey) {
    const result = arr.reduce((result, item) => {
        // use JSON parse stringify to avoid strict Type of clone
        const clone = JSON.parse(JSON.stringify(item));
        const newObj = { [`${item[objKey]}`]: clone };
        Object.assign(result, newObj);
        return result;
    }, {});
    return result;
}
