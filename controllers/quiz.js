(function() {

    var app = angular.module('turtleFacts');
    app.controller('quizCtrl', quizController);

    quizController.$inject = ['quizMetrics', 'dataService'];

    function quizController(quizMetrics, dataService) {
        var current = this;

        current.quizMetrics = quizMetrics;
        current.activeQuestionIndex = 0;
        current.questionAnswered = false;
        current.quizQuestions = [];

        dataService.quizQuestions().success(function(data) {
            current.quizQuestions = data;
        });

        /**
         * [Answer a question by selecting an answer and assing the answer index to "selected" property
         * @param  {number} index : selected answer index
         * @return {}           
         */
        current.answerQuestion = function(index) {
            current.quizQuestions[current.activeQuestionIndex].selected = index;
        };

        /**
         * [navigateByProgressBar description]
         * @param  {number} index : index of the question that will 
         * be jumped to
         * @return {}   
         */
        current.navigateByProgressBar = function(index) {
            current.activeQuestionIndex = index;
        };

        /**
         * Jump to next question, no matter if the current question 
         * is answered or not.
         * @return {[type]} [description]
         */
        current.goToNextQuestion = function() {
            var quizQuestionsLength = current.quizQuestions.length;

            if (current.activeQuestionIndex < quizQuestionsLength - 1) {
                current.activeQuestionIndex++;
            } else {
                current.activeQuestionIndex = 0;
            }
        };
    }

})();