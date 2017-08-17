"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var car_1 = require("./controllers/car");
var user_1 = require("./controllers/user");
function setRoutes(app) {
    var router = express.Router();
    var carCtrl = new car_1.default();
    var userCtrl = new user_1.default();
    // Cats
    router.route('/cars').get(carCtrl.getAll);
    router.route('/cars/count').get(carCtrl.count);
    router.route('/car').post(carCtrl.insert);
    router.route('/car/:id').get(carCtrl.get);
    router.route('/car/:id').put(carCtrl.update);
    router.route('/car/:id').delete(carCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map