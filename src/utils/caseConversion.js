export const isArray = function (data) {
    return Array.isArray(data);
};

export const isObject = function (data) {
    return (
        data === Object(data) && !isArray(data) && typeof data !== 'function'
    );
};

export const toCamel = string => {
    return string.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

export const toSnake = string => {
    return (
        string &&
        string
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
            )
            .map(x => x.toLowerCase())
            .join('_')
    );
};

export const convertKeysCase = function (data, toCase) {
    if (isObject(data)) {
        const obj = {};

        Object.keys(data).forEach(key => {
            if (toCase === 'camel') {
                obj[toCamel(key)] = convertKeysCase(data[key], toCase);
            }
            if (toCase === 'snake') {
                obj[toSnake(key)] = convertKeysCase(data[key], toCase);
            }
        });

        return obj;
    } else if (isArray(data)) {
        return data.map(item => {
            return convertKeysCase(item, toCase);
        });
    }

    return data;
};
