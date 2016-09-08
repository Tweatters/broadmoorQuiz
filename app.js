function create_question (title, answers, correctIndex) {
	return {  
		title: title, 
		answers: answers,
		correctIndex: correctIndex
	}
}

var questions = [
create_question('Overlooking The Broadmoor, Colorado Springs and Garden of the Gods is the ________ Shrine of the Sun', ['lorem1','ipsum1','dolor1','1sit amet'], 3),
create_question('quetsion dos ; lorem ipsum dolor sit amet consequter', ['lorem2', 'ipsum2', 'dolor2', 'sit amet2'], 2),
create_question('quetsion tres ; lorem ipsum dolor sit amet consequter', ['lorem3', 'ipsum3', 'dolor3', 'sit amet3'], 0),
create_question('quetsion qutro ; lorem ipsum dolor sit amet consequter', ['lorem4', 'ipsum4', 'dolor4', 'sit amet4'], 1),
create_question('quetsion cinco ; lorem ipsum dolor sit amet consequter', ['lorem5', 'ipsum5', 'dolor5', 'sit amet5'], 2)
]

var quiz_state =
	{}

$(function(){
	var $questionTitle = $('#question-title');
	var $answer_options = $('#answer-container input');
	var $answer_labels = $('#answer-container label');
	var $answer_popups = $('.answerPop'); 

	var question_count = 0;
	var current_question = questions[question_count];
	var $question_number = $('#progressContainer span');
	var number_correct = 0;
	
	var $submit = $('#submit');
	var $next = $('#next');
	var $start = $('#start');
	var $reStart = $('#re-start');

	$('#intro-banner').html("How much do you know about 'The Most Unique Resort in the World?'");
	$('#intro-banner').show();

	$answer_popups.hide();
	$('#closingPage h1').hide();

// 'start quiz' pushed, banner fades and question fades in along with answers and progress bar
function clearPage() {
	console.log("page content hidden");

	$('#intro-banner').hide();
	$start.hide();
	$reStart.hide();
	$('#progressContainer').hide();
};  

function display_current_question () {
	$question_number.text(current_question.questionNumber);
	$questionTitle.text(current_question.title);
	$answer_labels.each(function(index){
		this.innerText = current_question.answers[index]
	});
}


var start_quiz = function() {
	clearPage();
	question_count = 0;
	$questionTitle.show();
	$('#answer-container').show();
	$('#submit').show();

	display_current_question();
}

$start.on('click', start_quiz);


var submit_answer = $submit.on('click', function(){

	var answer = +$answer_options.filter(':checked').val();
	$answer_popups.hide();

	if ( answer === current_question.correctIndex) {
		$('#correct').show();
		number_correct++;
	} else {
		$('#incorrect').show();
	}

	$submit.hide();
	$next.show();
})



function finish_quiz () {
	$('#correct').hide();
	$('#incorrect').hide();
	$questionTitle.hide();
	$('#answer-container').hide();
	$next.hide()
	
	$('#closingPage h1').show(); //add in an if loop that compares number_correct against a number and gives different responses
	//working on the line below this to get text inside the #final-score header after quiz is complete
	$reStart.show();
	
	$('#final-score').html('You got ' +number_correct+ ' out of 5 questions correct.');
	$('#final-score').show();
}

function go_to_next_question () {
	question_count++
	current_question = questions[question_count];
	$('#progressContainer span').text(question_count);
}

var next_question = $next.on('click', function(){
	if (question_count < 4) {
		
		$answer_popups.hide();
		go_to_next_question();
		$answer_options.prop('checked', false);
		display_current_question();

		$next.hide();
		$submit.show();	

	} else {
		clearPage();
		finish_quiz();

	}

})



$reStart.on('click', start_quiz);







});

//set quiz state patterns, with enums; branch it at state pattern

//query methods calling quetsion_count, correct_number.