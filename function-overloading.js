function overloadedSearch(term, p2, // Union type better than unknown.
p3) {
    // Set the callback only if p2 is a function.
    var callback = typeof p2 === 'function' ? p2 : undefined;
    // Set the tags if either p2 or p3 is defined and an array.
    var tags = typeof p2 !== 'undefined' && Array.isArray(p2) ? p2 :
        typeof p3 !== 'undefined' && Array.isArray(p3) ? p3 :
            undefined;
    var queryString = "?query=" + term;
    if (tags && tags.length) {
        queryString += "&tags=" + tags.joing();
    }
    var results = fetch("/search" + queryString)
        .then(function (response) { return response.json(); });
    // Callback could be undefined.
    if (callback) {
        // Basically return void.
        return void results.then(function (res) { return callback(res); });
    }
    else {
        // Return the Promise if there was no callback.
        return results;
    }
}
var searchWithOverloads = function (term, p2, p3) {
    // Implementation here.
};
