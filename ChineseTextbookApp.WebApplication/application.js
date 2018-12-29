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

function getVocabularyPairs(vocabularySet, numberOfPairs) {
    var words = [];

    var v = orderRandomly(vocabularySet);
    v = v.slice(0, numberOfPairs);

    for (let w of v) {
        words.push({ "word": w.word, "language": "Chinese", "style": "matchpairs-word-chinese", "colour": "blue" });
        words.push({ "word": w.choices[0], "language": "English", "style": "matchpairs-word-english", "colour": "blue" });
    }

    words = orderRandomly(words);

    return words;
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

    $scope.word1 = "";
    $scope.word2 = "";

    $scope.score = 0;

    $scope.startMatchingPairsActivity = function () {

        $scope.currentWords = getVocabularyPairs(vocabulary, 8);

        $scope.word1 = "";
        $scope.word2 = "";

        $scope.score = 0;

    }

    $scope.startMatchingPairsActivity();

    $scope.chooseWord = function (word) {
        if ($scope.word1 != "" && $scope.word2 != "") {
            return;
        }

        for (let w of $scope.currentWords) {
            if (w.word == word) {
                if (w.colour == "green") {
                    return;
                }

                w.colour = "red";
            }
        }

        if ($scope.word1 == "") {
            $scope.word1 = word;
            return;
        }

        $scope.word2 = word;

        for (let w1 of vocabulary) {
            if ((w1.word == $scope.word1 && w1.choices[0] == $scope.word2) || (w1.word == $scope.word2 && w1.choices[0] == $scope.word1)) {

                $scope.currentWords.forEach(w => { if (w.word == $scope.word1 || w.word == $scope.word2) { w.colour = "green"; } });

                $scope.word1 = "";
                $scope.word2 = "";

                $scope.score += 1;

                if ($scope.score >= 8) {
                    $timeout($scope.startMatchingPairsActivity, 1000);
                }

                return;
            }
        }

        $timeout(function () {
            $scope.currentWords.forEach(w => { if (w.word == $scope.word1 || w.word == $scope.word2) { w.colour = "blue"; } });

            $scope.word1 = "";
            $scope.word2 = "";
        }, 500);
    }

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