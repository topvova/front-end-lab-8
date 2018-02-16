function cypherPhrase(chars, str) {
    return getTransformedArray(str, el => chars[el] || el).join('');
}