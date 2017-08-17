"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var carSchema = new mongoose.Schema({
    name: String,
    traffic: String
});
var Car = mongoose.model('Car', carSchema);
exports.default = Car;
//# sourceMappingURL=cat.js.map