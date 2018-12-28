var application = angular.module("ChineseTextbookApp", []);

function orderRandomly(array) {
    var currentIndex = array.length;
    var randomIndex;
    var temporaryValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var vocabulary = [
{ "word": "我", "choices": ["I", "You", "She"] },
{ "word": "你", "choices": ["You", "I", "He"] },
{ "word": "您", "choices": ["You (formal)", "You (informal)", "I"] },
{ "word": "他", "choices": ["He", "She", "You"] },
{ "word": "她", "choices": ["She", "He", "They"] },
{ "word": "好", "choices": ["good", "very", "are"] },
{ "word": "吗", "choices": ["[question particle]", "[follow-up particle]", "good"] },
{ "word": "很", "choices": ["very", "good", "you"] },
{ "word": "呢", "choices": ["[follow-up particle]", "[question particle]", "good"] }
];

var phrases = [
{ "word": "你好", "choices": ["Hello", "How are you?", "Good morning"] },
{ "word": "你好吗", "choices": ["How are you?", "Hello", "I'm good"] },
{ "word": "您好", "choices": ["How do you do.", "How are you?", "Hello"] },
{ "word": "我很好", "choices": ["I'm very well.", "How are you?", "I'm happy."] },
{ "word": "你呢", "choices": ["And you?", "Hello", "How are you?"] }
];
application.controller("MainController", ["$scope", "$timeout", function MainController($scope, $timeout) {

    $scope.index = -1;
    $scope.currentWord = "";
    $scope.currentChoices = [];
    $scope.correctAnswer = "";
    $scope.showCorrect = false;

    $scope.currentWords = [];

    var v1 = vocabulary.slice(0, 8);

    $scope.currentWords = v1.map(w => ( { "word": w.word, "language":"Chinese", "style":"matchpairs-word-chinese"}));
    $scope.currentWords = $scope.currentWords.concat(v1.map(w => ({ "word": w.choices[0], "language": "English", "style": "matchpairs-word-english" })));
    $scope.currentWords = orderRandomly($scope.currentWords);

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