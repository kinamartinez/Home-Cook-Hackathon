const foodController = angular.module('foodController', []);
foodController.controller('foodController', function ($scope, gservice) {

    $scope.hardCodeUsers = gservice.hardCodeUsers;

      $scope.hardCodeUsers = [
        {
            name: "Nan Chankul",
            dish: "Green Thai curry",
            dietaryOptions: "Chicken, Gluten free",
            Price: "30",
            img: "https://static1.squarespace.com/static/50106d5684aed4702b7242ed/t/530a60e0e4b0dbc78d16cbdf/1432352707452/ThaiGreenCurry.jpg",
            type: "Thai",
            locationHC: "Kibuttz G. 30"

        },

        {
            name: "Kaito Levi",
            dish: "Sushi",
            dietaryOptions: "Fish, Gluten free",
            Price: "30",
            img: "https://i.ytimg.com/vi/jPLJbSp6vKY/maxresdefault.jpg",
            type: "Japanese",
            locationHC:"Shalma 26 Rd"

        },
        {
            name: "Juanita Lopez",
            dish: "Tacos",
            dietaryOptions: "Meat",
            Price: "30",
            img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEpeIA0L2v-G8wffXVvEi60QbCWWF5J65vfTaRCc44y53dZtWVow",
            type: "Mexican",
            locationHC:"Wolfson 84 St"


        },
        {
            name: "Hannah Massala",
            dish: "Injera",
            dietaryOptions: "Vegetarian",
            Price: "30",
            img: "https://img.buzzfeed.com/buzzfeed-static/static/2014-06/17/17/enhanced/webdr06/original-9638-1403041240-11.jpg?downsize=715:*&output-format=auto&output-quality=auto",
            type: "Ethiopian",
            locationHC:"Shlabim 57 st"


        },
        {
            name: "Franco Ayzemberg",
            dish: "Empanadas",
            dietaryOptions: "Chicken and Meat",
            Price: "30",
            img: "http://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/Argentinian-Street-Food---Clasico-Argentino-p30.jpg?itok=xOHjRoc7&mtime=1394750265",
            type: "Argentinian",
            locationHC:"Eilat 20 St"


        }
    ];

});