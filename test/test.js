/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 1:19 AM
 * To change this template use File | Settings | File Templates.
 */

var assert = require("assert");

describe("Array",function(){
    describe("#indexOf",function(){
       it("should return -1 when value is not present in Array",function(){
            assert.equal(-1,["1","2","3"].indexOf(5));
       });
    });
});