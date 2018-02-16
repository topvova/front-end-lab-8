function getTransformedArray(arr, callback) {
    const result = [];

    forEach(arr, function (el) {
        result.push(callback(el));
    });

    return result;
}