
var ques = ['Which of the following is true about typeof operator in JavaScript?', 'Which of the following type of variable is visible everywhere in your JavaScript code?', 'Which built-in method returns the character at the specified index?', 'Which built-in method returns the characters in a string beginning at the specified location?', 'Which of the following function of Boolean object returns a string containing the source of the Boolean object?', 'Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?', 'Which of the following function of String object returns the calling string value converted to lower case?', 'Which of the following function of String object causes a string to be displayed in fixed-pitch font as if it were in a "<tt>" tag?', 'Which of the following function of Array object creates a new array with all of the elements of this array for which the provided filtering function returns true?', 'Which of the following function of Array object extracts a section of an array and returns a new array?'];
var opt = {
    A: ["The typeof is a unary operator that is placed before its single operand, which can be of any type.", "global variable", "characterAt()", "substr()", "toSource()", "substr()", "toLocaleLowerCase()", "fixed()", "concat()", "reverse()"],
    B: ["Its value is a string indicating the data type of the operand.", "local variable", "getCharAt()", "getSubstring()", "valueOf()", "search()", "toLowerCase()", "big()", "every()", "shift()"],
    C: ["Both of the above.", "Both of the above.", "charAt()", "slice()", "toString()", "lastIndexOf()", "toString()", "blink()", "filter()", "slice()"],
    D: ["None of the above.", "None of the above.", "None of the above.", "None of the above.", "None of the above.", "indexOf()", "substring()", "bold()", "some()", "some()"]
};

var correctOpt = ['c', 'a', 'c', 'a', 'a', 'd', 'b', 'a', 'c', 'c'];
var score = 0;

document.getElementById('ques').innerHTML = 'Q' + 1 + "  " + ques[0];
document.getElementById('text1').innerHTML = 'A - ' + opt.A[0];
document.getElementById('text2').innerHTML = 'B - ' + opt.B[0];
document.getElementById('text3').innerHTML = 'C - ' + opt.C[0];
document.getElementById('text4').innerHTML = 'D - ' + opt.D[0];


function startQuiz() {
    document.getElementById('startquiz').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('timer').style.display = 'block';

    var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();
    var min = "45";
    var currentTime = new Date();
    console.log(currentTime);
    var currentMins = currentTime.getMinutes()

    var a = new Date();
    a.setMinutes(currentMins + 10);
    console.log(a);
    var limit = a.getTime();
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
        var current = new Date().getTime();
        // var currentMin = current.getMinutes();
        // var a = new Date();
        // var limit = a.setMinutes(currentMin+20);
        var distance = a - current;
        // console.log(min);
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // document.getElementById("timer").innerHTML = d.toLocaleTimeString();
        document.getElementById("timer").innerHTML = minutes + " : " + seconds;
        if (distance < 0) {
            document.getElementById('quiz').style.display = 'none';
            var per = (score / 10) * 100;
            var greeting = "Sorry you are fail";
            if (per >= 65) greeting = "Congratulations You are passed";
            document.getElementById('ans').innerHTML = 'CORRECT ANSWERS = ' + score;
            document.getElementById('score').innerHTML = 'YOUR SCORE = ' + per + ' % ';
            document.getElementById('remarks').innerHTML = greeting;
            document.getElementById('result').style.display = 'block';
        }

    }
}
var i = 0;
// var counter = 1;

function next() {

    var ans;
    if (document.getElementById('opt1').checked) {
        ans = document.getElementById('opt1').value;
    } else if (document.getElementById('opt2').checked) {
        ans = document.getElementById('opt2').value;
    } else if (document.getElementById('opt3').checked) {
        ans = document.getElementById('opt3').value;
    } else if (document.getElementById('opt4').checked) {
        ans = document.getElementById('opt4').value;
    }

    if (ans === correctOpt[i]) {
        // alert();
        ++score;
    }
    i++;
    //  console.log(document.getElementById('opt').value);

    if (i < ques.length) {
        document.getElementById('next').disabled = true;





        console.log(score)
        document.getElementById('opt1').checked = false;
        document.getElementById('opt2').checked = false;
        document.getElementById('opt3').checked = false;
        document.getElementById('opt4').checked = false;
        // document.getElementById('opt').checked = false;

        // document.getElementById('opt').checked = false;

        // document.getElementById('opt').checked = false;

        document.getElementById('ques').innerHTML = 'Q' + (i + 1) + "  " + ques[i];
        document.getElementById('text1').innerHTML = 'A - ' + opt.A[i];
        document.getElementById('text2').innerHTML = 'B - ' + opt.B[i];
        document.getElementById('text3').innerHTML = 'C - ' + opt.C[i];
        document.getElementById('text4').innerHTML = 'D - ' + opt.D[i];
        // i++;
        // counter++;
    }
    else {
        document.getElementById('quiz').style.display = 'none';
        var per = (score / 10) * 100;
        var greeting = "Sorry you are fail";
        if (per >= 65) greeting = "Congratulations You are passed";
        document.getElementById('ans').innerHTML = 'CORRECT ANSWERS = ' + score;
        document.getElementById('score').innerHTML = 'YOUR SCORE = ' + per + ' % ';
        document.getElementById('remarks').innerHTML = greeting;
        document.getElementById('result').style.display = 'block';
    }
}


function enableNextBtn() {
    document.getElementById('next').disabled = false;
}



function changeBtn() {

    document.getElementById('start').style.background = 'black';
    document.getElementById('start').style.color = 'white';
    document.getElementById('next').style.background = 'black';
    document.getElementById('next').style.color = 'white';
}


function reverseBtn() {
    document.getElementById('start').style.background = 'white';
    document.getElementById('start').style.color = 'black';
    document.getElementById('next').style.background = 'white';
    document.getElementById('next').style.color = 'black';
}

document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");
