function getFilteredArray(arr, predicate) {
    const filteredArray = [];

    forEach(arr, function (el) {
        if (predicate(el)) {
            filteredArray.push(el);
        }
    });

    return filteredArray;
}