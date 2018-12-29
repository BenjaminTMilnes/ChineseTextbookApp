var application = angular.module("ChineseTextbookApp", ["ngRoute", "ngSanitize"]);

application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "multiplechoice.html", controller: "MultipleChoiceController" })
    .when("/matchthepairs", { templateUrl: "matchthepairs.html", controller: "MatchThePairsController" });
});

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

var vocabularySet1 = {
    "multipleChoiceTitle": "Choose the correct English word for the following Chinese word.",
    "from": "Chinese",
    "to": "English",
    "vocabulary": [
        { "word": "我", "choices": ["I", "You", "He", "She", "We"] },
        { "word": "你", "choices": ["You", "I", "He", "She", "We"] },
        { "word": "您", "choices": ["You (formal)", "You (informal)", "I"] },
        { "word": "他", "choices": ["He", "She", "You"] },
        { "word": "她", "choices": ["She", "He", "They"] },
        { "word": "好", "choices": ["good", "very", "are"] },
        { "word": "吗", "choices": ["[question particle]", "[follow-up particle]", "good"] },
        { "word": "很", "choices": ["very", "good", "you"] },
        { "word": "呢", "choices": ["[follow-up particle]", "[question particle]", "good"] }
    ]
};

var phrases = [
{ "word": "你好", "choices": ["Hello", "How are you?", "Good morning"] },
{ "word": "你好吗", "choices": ["How are you?", "Hello", "I'm good"] },
{ "word": "您好", "choices": ["How do you do.", "How are you?", "Hello"] },
{ "word": "我很好", "choices": ["I'm very well.", "How are you?", "I'm happy."] },
{ "word": "你呢", "choices": ["And you?", "Hello", "How are you?"] }
];

application.controller("MainController", ["$scope", "$timeout", function MainController($scope, $timeout) {


}]);