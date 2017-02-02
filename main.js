var app = angular.module('myApp', []);
app.factory('productFactory', ['$http', function($http){
    var factory = {};
    var products = [];
    factory.index = function(callback){
        callback(products);
    }
    factory.create = function(product, callback){
            product.quantity = 50;
            products.push(product);
            callback(products);
    }
    factory.update = function(product, callback){
        if(Number.isInteger(product.quantity)){
            if(products[product.id].quantity - product.quantity > 0){
                products[product.id].quantity -= product.quantity;
            } else {
                products[product.id].quantity = 0;
            }
        }
        callback(products);
    }
    factory.delete = function(id, callback){
        products.splice(id,1);
        callback(products);
    }
    return factory;
}]);

app.controller('productController', ['$scope', 'productFactory', function($scope, productFactory){
    function setProducts(product){
        $scope.products = product;
        $scope.product = {};
    }

    $scope.product = {};
    $scope.products = {};

    $scope.index = function(){
        productFactory.index(setProducts);
    }

    $scope.index();
    $scope.create = function(){
        productFactory.create($scope.product, setProducts);
    }
    $scope.delete = function(id){
        productFactory.delete(id, setProducts);
    }
}]);

app.controller('orderController', ['$scope', 'productFactory', function($scope, productFactory){
    function setProducts(product){
        $scope.products = product;
        $scope.product = {};
    }
    $scope.products = [];

    productFactory.index(setProducts);
    $scope.update = function(id){
        productFactory.update({
            id: id,
            quantity: 1
        }, setProducts);
    }
}]);
