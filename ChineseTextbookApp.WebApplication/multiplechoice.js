
application.controller("MultipleChoiceController", ["$scope", "$timeout", function MultipleChoiceController($scope, $timeout) {

    $scope.index = -1;
    $scope.questionNumber = 0;
    $scope.currentWord = "";
    $scope.currentChoices = [];
    $scope.correctAnswer = "";
    $scope.showCorrect = false;
    $scope.title = vocabularySet1.multipleChoiceTitle;

    $scope.getNextQuestion = function () {

        var vocabulary = vocabularySet1.vocabulary;

        if ($scope.index < vocabulary.length) {
            $scope.index++;
        }
        else {
            $scope.index = 0;
        }

        $scope.questionNumber = $scope.index + 1;
        $scope.currentWord = vocabulary[$scope.index].word;
        $scope.correctAnswer = vocabulary[$scope.index].choices[0];
        $scope.currentChoices = orderRandomly(vocabulary[$scope.index].choices).map(c => ({"word":c, "colour": "blue"}));

        $scope.showCorrect = false;
    }

    $scope.getNextQuestion();

    $scope.chooseAnswer = function (answer) {
        if (answer == $scope.correctAnswer) {
            $scope.currentChoices.forEach(c => c.colour = (c.word == answer)? "green":"grey");
            $scope.showCorrect = true;
            $timeout($scope.getNextQuestion, 1000);
        }
        else {
            $scope.currentChoices.forEach(c => c.colour = (c.word == answer) ? "red" : "grey");
            $timeout(function () {
                $scope.currentChoices.forEach(c => c.colour ="blue");

            }, 1000);

        }
    }

}]);