
application.controller("MultipleChoiceController", ["$scope", "$timeout", function MultipleChoiceController($scope, $timeout) {

    $scope.index = -1;
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

        $scope.currentWord = vocabulary[$scope.index].word;
        $scope.correctAnswer = vocabulary[$scope.index].choices[0];
        $scope.currentChoices = orderRandomly(vocabulary[$scope.index].choices);

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