const debounce = (callback, delay) => {
    let timeout = null;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(
            () => callback.apply(this, args),
            delay
        );
    }
};