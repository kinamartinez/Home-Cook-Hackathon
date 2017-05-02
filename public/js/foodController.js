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
            cookimg: "https://c1.staticflickr.com/9/8151/7459692904_4d24118b94_b.jpg",
            type: "Thai",
            locationHC: "Kibuttz G. 30",
            descrip: "I met my Israeli husband when he was traveling in Thailand. At first I was hesitant to come and live in Israel because the culture is so different. I realize now people all over the world are the same because we all like good food. My Thai curry has become so popular that I have extra money to sent home to Thailand."

        },

        {
            name: "Kaito Levi",
            dish: "Sushi",
            dietaryOptions: "Fish, Gluten free",
            Price: "30",
            img: "https://i.ytimg.com/vi/jPLJbSp6vKY/maxresdefault.jpg",
            cookimg: "https://c2.staticflickr.com/4/3947/33753392476_6389c4d5ab_b.jpg",
            type: "Japanese",
            locationHC: "Shalma 26 Rd",
            descrip: "In Japan my family always tried to serve traditional Jewish food such as matzot and latkes but here in Israel everybody loves sushi! I like it that I am contributing in my small way to the amazing traditional international melting pot of food here in Israel. "


        },
        {
            name: "Juanita Lopez",
            dish: "Tacos",
            dietaryOptions: "Meat",
            Price: "30",
            img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEpeIA0L2v-G8wffXVvEi60QbCWWF5J65vfTaRCc44y53dZtWVow",
            cookimg: "https://c2.staticflickr.com/8/7387/14186686135_2efbdf8c27_b.jpg",
            type: "Mexican",
            locationHC: "Wolfson 84 St",
            descrip: "I came to Israel on a Christian pilgrimage from Mexico and after three months I just knew that I am meant to live in the holy land. At first it was very difficult to make a living but then I discovered The Home Cook app. It is really convenient to cook from home because I can arrange it around my Hebrew classes."


        },
        {
            name: "Hannah Massala",
            dish: "Injera",
            dietaryOptions: "Vegetarian",
            Price: "30",
            img: "https://img.buzzfeed.com/buzzfeed-static/static/2014-06/17/17/enhanced/webdr06/original-9638-1403041240-11.jpg?downsize=715:*&output-format=auto&output-quality=auto",
            cookimg: "https://c2.staticflickr.com/8/7578/16025616471_7a45fd421e_b.jpg",
            type: "Ethiopian",
            locationHC: "Shlabim 57 st",
            descrip: "My husband is a busdriver and I worked in a kindergarten but then our youngest daughter got very sick and someone had to stay at home for her. Someone asked my husband if I could make injeera for him and he liked it so much that he told me I should sell it to other people too. People are very curious about Ethiopian food and they like to try a new type of vegetarian food.  "


        },
        {
            name: "Franco Ayzemberg",
            dish: "Empanadas",
            dietaryOptions: "Chicken and Meat",
            Price: "30",
            img: "http://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/Argentinian-Street-Food---Clasico-Argentino-p30.jpg?itok=xOHjRoc7&mtime=1394750265",
            cookimg: "http://c1.staticflickr.com/3/2826/13487674005_be142b1bb6_z.jpg",
            type: "Argentinian",
            locationHC: "Eilat 20 St",
            descrip: "My empanadas money is a nice supplement to my pension. Life was a lot more lonely for me before I started to cook but now I am connecting to all types of people everyday. It is nice to feel useful again."


        }
    ];

});