function createFun() {
    var result = [];
    for ( var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        };
    }
    return result;
}
var result = createFun();
console.log(result[5]()); // 10