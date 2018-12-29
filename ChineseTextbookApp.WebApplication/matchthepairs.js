

function getVocabularyPairs(vocabularySet, numberOfPairs) {
    var words = [];

    var v = orderRandomly(vocabularySet);
    v = v.slice(0, numberOfPairs);

    for (let w of v) {
        words.push({ "word": w.word, "language": "Chinese", "style": "matchthepairs-word-chinese", "colour": "blue" });
        words.push({ "word": w.choices[0], "language": "English", "style": "matchthepairs-word-english", "colour": "blue" });
    }

    words = orderRandomly(words);

    return words;
}

application.controller("MatchThePairsController", ["$scope", "$timeout", function MatchThePairsController($scope, $timeout) {

    $scope.word1 = "";
    $scope.word2 = "";

    $scope.score = 0;

    $scope.startActivity = function () {

        $scope.currentWords = getVocabularyPairs(vocabulary, 8);

        $scope.word1 = "";
        $scope.word2 = "";

        $scope.score = 0;

    }

    $scope.startActivity();

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
                    $timeout($scope.startActivity, 1000);
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

}]);