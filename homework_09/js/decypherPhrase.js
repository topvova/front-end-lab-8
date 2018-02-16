function decypherPhrase(chars, str) {
    const reversed = {};

    for (const key in chars) {
        if (chars.hasOwnProperty(key)) {
            reversed[chars[key]] = key;
        }
    }

    return cypherPhrase(reversed, str);
}