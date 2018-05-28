var application = angular.module("ChineseTextbookApp", []);

var vocabulary = [{ "word": "你", "choices": ["You", "I", "He"] },
{ "word": "我", "choices": ["I", "You", "She"] },
{ "word": "他", "choices": ["He", "She", "They"] },
{ "word": "她", "choices": ["She", "He", "You"] },
{ "word": "你好", "choices": ["Hello", "How are you?", "Good morning"] },
{ "word": "你好吗", "choices": ["How are you?", "Hello", "I'm good"] },
{ "word": "您好", "choices": ["How do you do?", "How are you?", "Hello"] },
{ "word": "我很好", "choices": ["I'm very well.", "How are you?", "I'm happy."] },
{ "word": "你呢", "choices": ["And you?", "Hello", "How are you?"] }];

application.controller("MainController", ["$scope", "$timeout", function MainController($scope, $timeout) {

    $scope.index = -1;
    $scope.currentWord = "";
    $scope.currentChoices = [];
    $scope.correctAnswer = "";
    $scope.showCorrect = false;

    $scope.getNextQuestion = function () {
        if ($scope.index < vocabulary.length) {
            $scope.index++;
        }
        else {
            $scope.index = 0;
        }

        $scope.currentWord = vocabulary[$scope.index].word;
        $scope.currentChoices = vocabulary[$scope.index].choices;
        $scope.correctAnswer = vocabulary[$scope.index].choices[0];

        $scope.showCorrect = false;
    }

    $scope.getNextQuestion();

    $scope.chooseAnswer = function (answer) {
        if (answer == $scope.correctAnswer) {
            $scope.showCorrect = true;
            $timeout($scope.getNextQuestion, 1000);
        }
    }

}]);