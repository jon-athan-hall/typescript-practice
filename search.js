var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/**
 * Use the declare keyword to type a function head, before
 * the actual implementation to think about the function's
 * interface before any details.
 *
 * The tags parameter is optional.
 * @param query
 * @param tags
 */
function search(query, tags) {
    var queryString = "?query=" + query;
    if (tags === null || tags === void 0 ? void 0 : tags.length) {
        queryString += "&tags=" + tags.join();
    }
    /**
     * Hover over functions to learn their parameters and return values.
     * Explicitly type the function head's return value to match
     * with what response.json() returns.
     */
    return fetch("/search" + queryString)
        .then(function (response) { return response.json(); });
}
/**
 * An example Query object that satisfies the previously defined
 * type definition.
 */
var query = {
    query: 'Ember',
    tags: ['javascript'],
    assemble: function (includeTags) {
        if (includeTags === void 0) { includeTags = false; }
        var query = "?query=" + this.query;
        if (includeTags && typeof this.tags !== 'undefined') {
            query += "&" + this.tags.join('.');
        }
        return query;
    }
};
/**
 * This function type declaration has a callback function
 * as one of its parameters. That callback function references
 * the previously defined type called SearchFunction.
 * @param inputId
 * @param outputId
 * @param search
 */
function displaySearch(inputId, outputId, search) {
    var _a;
    /**
     * The this keyword value from getElementById will be passed into the callback.
     */
    (_a = document.getElementById(inputId)) === null || _a === void 0 ? void 0 : _a.addEventListener('change', inputChangeHandler);
}
/**
 * TypeScript allows for using this as a parameter to type when breaking out callback
 * functions for easier reuse.
 */
function inputChangeHandler() {
    var _a;
    (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    /**
     * Guard check the this keyword referenced after the getElementById call. By default
     * TypeScript is assuming this is an HTMLElement, which doesn't have value as a property.
     */
    if (this instanceof HTMLInputElement) {
        var searchTerm = this.value;
        search(searchTerm)
            .then(function (results) {
            // @TODO
        });
    }
}
/**
 * Tags for tagged template literals are functions with two parameters:
 * TemplateStringsArray that contains all the strings around the expressions, and
 * string Array with the actual expressions
 */
function highlight(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var str = '';
    strings.forEach(function (templ, i) {
        var _a, _b;
        var expr = (_b = (_a = values[i]) === null || _a === void 0 ? void 0 : _a.replace('@@start@@', '<em>').replace('@@end@@', '</em>')) !== null && _b !== void 0 ? _b : '';
        str += templ + expr;
    });
    return str;
}
function createResultTemplate(results) {
    return "<ul>\n    " + results.map(function (result) { return highlight(__makeTemplateObject(["<li>", "</li>"], ["<li>", "</li>"]), result.title); }) + "\n  </ul>";
}
var result = {
    title: 'How to play @@starthl@@Too Many Bones@@endhl@@',
    url: '/how-to-play-too-many-bones',
    abstract: 'An article stepping through the rule book for Too Many Bones board game.'
};
console.log(createResultTemplate([result]));
/**
 * Function type declarations require the order of parameters and
 * their types, but the actual names of the parameters can be different!
 *
 * Parameters, even non-optional ones, can be dropped completely too.
 *
 * Any return type can be used when a function's typed return is void.
 * Have the callback function type definition explicityly return undefined
 * in order to require the callback function parameter to return only undefined.
 */ 
