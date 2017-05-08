'use strict';

angular.module('noServer', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home.html',
    controller: 'mainCtrl'

  }).state('fivecast', {
    url: '/fivecast',
    templateUrl: './views/fivecast.html',
    controller: 'fivecastCtrl'

  }).state('palletTown', {
    url: '/palletTown',
    templateUrl: './views/palletTown.html',
    controller: 'palletCtrl'

  });

  $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('noServer').controller('fivecastCtrl', function ($scope, fivecastServ) {

  var d = new Date();
  var n = d.getDay();
  console.log(n);

  var week = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];

  week = week.splice(n, 5);

  $scope.weekDay1 = week.splice(0, 1).join('');
  $scope.weekDay2 = week.splice(0, 1).join('');
  $scope.weekDay3 = week.splice(0, 1).join('');
  $scope.weekDay4 = week.splice(0, 1).join('');
  $scope.weekDay5 = week.splice(0, 1).join('');

  //gets the weather data for the next five days
  $scope.getFivecast = function () {
    fivecastServ.getFivecast().then(function (response) {
      //console.log(response.data.list.length);
      //console.log(response);


      var arr = response.data.list; //sets arr equal to the massive forecast array

      $scope.day1 = arr.splice(0, 8);
      $scope.day2 = arr.splice(0, 8);
      $scope.day3 = arr.splice(0, 8); //these arrays contain the 3-hr increments of weather in each day
      $scope.day4 = arr.splice(0, 8);
      $scope.day5 = arr.splice(0, 8);
      //console.log('splice is: ' + day1);
      //console.log('splice is: ' + day2);


      //one array for each day that will consist of the 8 3-hr increments for that day
      $scope.day1Weather = [];
      $scope.day2Weather = [];
      $scope.day3Weather = [];
      $scope.day4Weather = [];
      $scope.day5Weather = [];
      //console.log($scope.day5Weather);

      //each of these for loops pushes the 8 3-hr increments into each of the day arrays above
      for (var dayOne in $scope.day1) {
        $scope.day1Weather.push($scope.day1[dayOne].weather[0].main);
        //console.log('day one weather is: ' +$scope.day1Weather);
        //console.log($scope.day1[dayOne].weather[0].main);
      }

      for (var dayTwo in $scope.day2) {
        $scope.day2Weather.push($scope.day2[dayTwo].weather[0].main);
        //console.log(day1Weather);
        //console.log($scope.day1[dayOne].weather[0].main);
      }

      for (var dayThree in $scope.day3) {
        $scope.day3Weather.push($scope.day3[dayThree].weather[0].main);
        //console.log(day1Weather);
        //console.log($scope.day1[dayOne].weather[0].main);
      }

      for (var dayFour in $scope.day4) {
        $scope.day4Weather.push($scope.day4[dayFour].weather[0].main);
        //console.log(day1Weather);
        //console.log($scope.day1[dayOne].weather[0].main);
      }

      for (var dayFive in $scope.day5) {
        $scope.day5Weather.push($scope.day5[dayFive].weather[0].main);
        //console.log(day1Weather);
        //console.log($scope.day1[dayOne].weather[0].main);
      }
      //console.log($scope.day3Weather);


      //sets the data from the fivecast function to the scope
      $scope.getFivecast = response.data.list;

      //these variables will display the weather for that day (THE FINAL DEAL)
      $scope.day1Display;
      $scope.day2Display;
      $scope.day3Display;
      $scope.day4Display;
      $scope.day5Display;

      //if it rains at any point in the day, display rain for that day
      if ($scope.day1Weather.includes('Rain')) {
        $scope.day1Display = 'Rain';
      }

      if ($scope.day2Weather.includes('Rain')) {
        $scope.day2Display = 'Rain';
      }

      if ($scope.day3Weather.includes('Rain')) {
        $scope.day3Display = 'Rain';
      }

      if ($scope.day4Weather.includes('Rain')) {
        $scope.day4Display = 'Rain';
      }

      if ($scope.day5Weather.includes('Rain')) {
        $scope.day5Display = 'Rain';
      }

      //if it snows at any point in that day, display snow.
      if ($scope.day1Weather.includes('Snow')) {
        $scope.day1Display = 'Snow';
      }

      if ($scope.day2Weather.includes('Snow')) {
        $scope.day2Display = 'Snow';
      }

      if ($scope.day3Weather.includes('Snow')) {
        $scope.day3Display = 'Snow';
      }

      if ($scope.day4Weather.includes('Snow')) {
        $scope.day4Display = 'Snow';
      }

      if ($scope.day5Weather.includes('Snow')) {
        $scope.day5Display = 'Snow';
      }

      //if it thunders at any point in that day, display thunder.
      if ($scope.day1Weather.includes('Thunderstorm')) {
        $scope.day1Display = 'Thunderstorm';
      }

      if ($scope.day2Weather.includes('Thunderstorm')) {
        $scope.day2Display = 'Thunderstorm';
      }

      if ($scope.day3Weather.includes('Thunderstorm')) {
        $scope.day3Display = 'Thunderstorm';
      }

      if ($scope.day4Weather.includes('Thunderstorm')) {
        $scope.day4Display = 'Thunderstorm';
      }

      if ($scope.day5Weather.includes('Thunderstorm')) {
        $scope.day5Display = 'Thunderstorm';
      }

      //if no rain AND no snow, display clear or cloudy depending on the ratio
      //DAY 1
      if (!$scope.day1Weather.includes('Rain') && !$scope.day1Weather.includes('Snow')) {
        var day1WeatherClouds;

        //filters out anny 'clouds' values from the array(consisting of the 3-hr increments)
        day1WeatherClouds = $scope.day1Weather.filter(function (val) {
          //console.log(val);
          if (val === 'Clouds') {
            return val;
          }
        });

        if (day1WeatherClouds.length >= 3) {
          $scope.day1Display = 'Cloudy';
        } else {
          $scope.day1Display = 'Clear';
        }
      }

      //DAY 2
      if (!$scope.day2Weather.includes('Rain') && !$scope.day2Weather.includes('Snow')) {
        var day2WeatherClouds;

        //filters out anny 'clouds' values from the array(consisting of the 3-hr increments)
        day2WeatherClouds = $scope.day2Weather.filter(function (val) {
          //console.log(val);
          if (val === 'Clouds') {
            return val;
          }
        });

        if (day2WeatherClouds.length >= 3) {
          $scope.day2Display = 'Cloudy';
        } else {
          $scope.day2Display = 'Clear';
        }
      }

      //DAY 3
      if (!$scope.day3Weather.includes('Rain') && !$scope.day3Weather.includes('Snow')) {
        var day3WeatherClouds;

        //filters out anny 'clouds' values from the array(consisting of the 3-hr increments)
        day3WeatherClouds = $scope.day3Weather.filter(function (val) {
          //console.log(val);
          if (val === 'Clouds') {
            return val;
          }
        });

        if (day3WeatherClouds.length >= 3) {
          $scope.day3Display = 'Cloudy';
        } else {
          $scope.day3Display = 'Clear';
        }
      }

      //DAY 4
      if (!$scope.day4Weather.includes('Rain') && !$scope.day4Weather.includes('Snow')) {
        var day4WeatherClouds;

        //filters out anny 'clouds' values from the array(consisting of the 3-hr increments)
        day4WeatherClouds = $scope.day4Weather.filter(function (val) {
          //console.log(val);
          if (val === 'Clouds') {
            return val;
          }
        });

        if (day4WeatherClouds.length >= 3) {
          $scope.day4Display = 'Cloudy';
        } else {
          $scope.day4Display = 'Clear';
        }
      }

      //DAY5
      if (!$scope.day5Weather.includes('Rain') && !$scope.day5Weather.includes('Snow')) {
        var day5WeatherClouds;

        //filters out anny 'clouds' values from the array(consisting of the 3-hr increments)
        day5WeatherClouds = $scope.day5Weather.filter(function (val) {
          //console.log(val);
          if (val === 'Clouds') {
            return val;
          }
        });

        if (day5WeatherClouds.length >= 3) {
          $scope.day5Display = 'Cloudy';
        } else {
          $scope.day5Display = 'Clear';
        }
      }

      //console.log($scope.day1Display);

      //declare variable pokename
      $scope.pokeName1 = 1;
      $scope.pokeName2 = 1;
      $scope.pokeName3 = 1;
      $scope.pokeName4 = 1;
      $scope.pokeName5 = 1;

      //decides which pokemon to show
      //DAY ONE
      if ($scope.day1Display == 'Cloudy') {
        $scope.pokeName1 = 334;
      }

      if ($scope.day1Display == 'Rain') {
        $scope.pokeName1 = 7;
      }
      if ($scope.day1Display == 'Clear') {
        $scope.pokeName1 = 133;
      }

      if ($scope.day1Display == 'Snow') {
        $scope.pokeName1 = 361;
      }

      if ($scope.day1Display == 'Thunderstorm') {
        $scope.pokeName1 = 145;
      }

      //DAY TWO
      if ($scope.day2Display == 'Cloudy') {
        $scope.pokeName2 = 334;
      }

      if ($scope.day2Display == 'Rain') {
        $scope.pokeName2 = 7;
      }
      if ($scope.day2Display == 'Clear') {
        $scope.pokeName2 = 133;
      }

      if ($scope.day2Display == 'Snow') {
        $scope.pokeName2 = 361;
      }
      if ($scope.day2Display == 'Thunderstorm') {
        $scope.pokeName2 = 145;
      }

      //DAY THREE
      if ($scope.day3Display == 'Cloudy') {
        $scope.pokeName3 = 334;
      }

      if ($scope.day3Display == 'Rain') {
        $scope.pokeName3 = 7;
      }
      if ($scope.day3Display == 'Clear') {
        $scope.pokeName3 = 133;
      }

      if ($scope.day3Display == 'Snow') {
        $scope.pokeName3 = 361;
      }
      if ($scope.day3Display == 'Thunderstorm') {
        $scope.pokeName3 = 145;
      }

      //DAY FOUR
      if ($scope.day4Display == 'Cloudy') {
        $scope.pokeName4 = 334;
      }

      if ($scope.day4Display == 'Rain') {
        $scope.pokeName4 = 7;
      }
      if ($scope.day4Display == 'Clear') {
        $scope.pokeName4 = 133;
      }

      if ($scope.day4Display == 'Snow') {
        $scope.pokeName4 = 361;
      }
      if ($scope.day4Display == 'Thunderstorm') {
        $scope.pokeName4 = 145;
      }

      //DAY FIVE
      if ($scope.day5Display == 'Cloudy') {
        $scope.pokeName5 = 334;
      }

      if ($scope.day5Display == 'Rain') {
        $scope.pokeName5 = 7;
      }
      if ($scope.day5Display == 'Clear') {
        $scope.pokeName5 = 133;
      }

      if ($scope.day5Display == 'Snow') {
        $scope.pokeName5 = 361;
      }
      if ($scope.day5Display == 'Thunderstorm') {
        $scope.pokeName5 = 145;
      }

      //  console.log($scope.pokeName);
      //links the service variable pokename to the scope

      //pokenames get sent to the service function to be added to the end of the API call
      $scope.getPokemonSprites1($scope.pokeName1);
      $scope.getPokemonSprites2($scope.pokeName2);
      $scope.getPokemonSprites3($scope.pokeName3);
      $scope.getPokemonSprites4($scope.pokeName4);
      $scope.getPokemonSprites5($scope.pokeName5);
    }); //END OF THE .THEN
  };

  $scope.getFivecast();

  //this is where the sprites are retrieved


  $scope.sprite1;
  $scope.sprite2;
  $scope.sprite3;
  $scope.sprite4;
  $scope.sprite5;

  //gets the pokemon sprites from the service
  $scope.getPokemonSprites1 = function (pokeName) {
    fivecastServ.getPokemonSprites(pokeName).then(function (response) {
      //console.log(response);
      $scope.sprite1 = response.data.sprites.front_default;
    });
  };

  $scope.getPokemonSprites2 = function (pokeName) {
    fivecastServ.getPokemonSprites(pokeName).then(function (response) {
      //console.log(response);
      $scope.sprite2 = response.data.sprites.front_default;
    });
  };

  $scope.getPokemonSprites3 = function (pokeName) {
    fivecastServ.getPokemonSprites(pokeName).then(function (response) {
      //console.log(response);
      $scope.sprite3 = response.data.sprites.front_default;
    });
  };

  $scope.getPokemonSprites4 = function (pokeName) {
    fivecastServ.getPokemonSprites(pokeName).then(function (response) {
      //console.log(response);
      $scope.sprite4 = response.data.sprites.front_default;
    });
  };

  $scope.getPokemonSprites5 = function (pokeName) {
    fivecastServ.getPokemonSprites(pokeName).then(function (response) {
      //console.log(response);
      $scope.sprite5 = response.data.sprites.front_default;
    });
  };

  $scope.show = fivecastServ.show;

  $scope.revealZipSearch = function () {
    $scope.show = fivecastServ.revealZipSearch();
  };

  $scope.passZippy = function () {
    fivecastServ.zip = $scope.zippy;
    $scope.getFivecast();
  };
});
'use strict';

angular.module('noServer').controller('mainCtrl', function ($scope, mainService) {

  //this is the variable that will be set to the current weather.
  var currentWeather;

  //gets the weather
  $scope.getWeather = function () {
    mainService.getWeather().then(function (response) {
      console.log(response);
      $scope.getWeather = response.data;
      currentWeather = response.data.weather[0].main;
      console.log('the weather is: ' + currentWeather);
    });
  };

  //invokes the weather
  $scope.getWeather();

  //var pokename is a number at the end of the api call
  //I can set this equal to 1 to get bulbasaur
  //eevee = 132
  //castform = 350
  // snorunt = 360
  //altaria = 333
  //squirtle = 6
  //ditto = 131
  var pokeName = 132;

  var currentWeatherPokemon;

  //function that gathers the pokemon names data
  $scope.getPokemon = function () {
    mainService.getPokemon().then(function (response) {
      //console.log(response.data.results);
      $scope.getPokemon = response.data.results;
      //HARD CODE IS HERE
      //  currentWeather = 'Rain';


      switch (currentWeather) {
        case 'Rain':
          pokeName = 7;
          break;

        case 'Clouds':
          pokeName = 334;
          break;

        case 'Clear':
          pokeName = 133;
          break;

        case 'Snow':
          pokeName = 361;
          break;

        case 'Thunderstorm':
          pokeName = 145;
          break;
      }

      //this gets the sprite for the pokemon
      $scope.getPokemonSprites(pokeName);
    });
  };

  //invokes the 'getPokemon' function
  $scope.getPokemon();

  //function that gathers the sprites data for the pokemon
  $scope.getPokemonSprites = function (pokeName) {
    mainService.getPokemonSprites(pokeName).then(function (response) {
      //console.log(response.data.sprites);
      $scope.getPokemonSprites = response.data.sprites;
    });
  };
});
'use strict';

angular.module('noServer').controller('palletCtrl', function ($scope) {});
'use strict';

angular.module('noServer').directive('fivecastDir', function () {

  return {
    restrict: 'E',
    templateUrl: './js/directives/directiveTemplates/fivecastDirTemp.html',
    link: function link(scope, elem, attr) {

      var counter = 0;
      var once = 0;

      while (counter <= 200) {

        $('.weather-div img').animate({ bottom: '30px' });
        $('.weather-div img').animate({ bottom: '20px' });

        $('#poke-party').animate({ bottom: '10px' });
        $('#poke-party').animate({ bottom: '0px' });
        counter++;
      }

      $('#poke-party').on('click', function () {
        $('.weather-div').addClass('party-time');
      });
    }
  };
});
'use strict';

angular.module('noServer').directive('palletDir', function () {

  return {
    restrict: 'A',
    link: function link(scope, elem, attr) {

      $(elem).delay(1500).animate({ top: '80vw' });
      $('#speech-bubble').delay(2000).fadeIn();

      $('#ash2').delay(1500).animate({ top: '17.5vw' });
      $('#speech-bubble2').delay(2000).fadeIn();

      $('#ash2').on('click', function () {
        $('#ash2').fadeOut();
        $('.background-div').fadeOut();
        $('#speech-bubble2').fadeOut();
        $('.red-background').fadeIn();
        $('.background-div2').fadeIn();
        $('.barrydos-shadow').fadeIn();
        $('.pallet-button').fadeIn();
        $('.barrydos').delay(1000).fadeIn();
        $('.ash-pedestal').fadeOut();

        $('.background-div2').on('click', function () {
          $('.barrydos-shadow').fadeOut();
        });
      });
    }
  };
});
'use strict';

angular.module('noServer').service('fivecastServ', function ($http) {

  this.zip = 84601;

  this.getFivecast = function () {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?zip=' + this.zip + ',us&units=imperial&appid=a6c45a3b8b1f377d5bcdc4ecde68b577'
    });
  };

  this.getPokemonSprites = function (pokeName) {
    // console.log('it worked');
    //console.log(pokeName);

    return $http({
      method: 'GET',
      url: 'http://pokeapi.co/api/v2/pokemon' + '/' + pokeName

    });
  };

  this.show = 'true';

  this.revealZipSearch = function () {
    this.show = false;

    return this.show;
  };

  this.getZippy = function () {};
});
'use strict';

angular.module('noServer').service('mainService', function ($http) {

  // API calls


  //api call to get the current weather
  this.getWeather = function () {

    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?zip=84601,us&units=imperial&appid=a6c45a3b8b1f377d5bcdc4ecde68b577'
    });
  };

  //api call to get the pokemon names
  this.getPokemon = function () {

    return $http({
      method: 'GET',
      url: 'http://pokeapi.co/api/v2/pokemon/?limit=386'
    });
  };

  //api call to get pokemon sprites
  this.getPokemonSprites = function (pokeName) {
    // console.log('it worked');
    // console.log(pokeName);

    return $http({
      method: 'GET',
      url: 'http://pokeapi.co/api/v2/pokemon' + '/' + pokeName

    });
  };
});
//# sourceMappingURL=maps/bundle.js.map
