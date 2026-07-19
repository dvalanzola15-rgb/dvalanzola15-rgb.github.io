// Grades the Milestone 2 self-assessment quiz and provides answer feedback.
const quizForm = document.getElementById("dnsQuiz");
const resetQuizButton = document.getElementById("resetQuiz");

if (quizForm) {
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;

    const answerOne = document.getElementById("q1").value.toLowerCase().trim();
    const answerTwo = document.querySelector('input[name="q2"]:checked');
    const answerThree = document.querySelector('input[name="q3"]:checked');
    const answerFour = document.querySelector('input[name="q4"]:checked');
    const answerFive = document.querySelectorAll('input[name="q5"]:checked');

    if (answerOne === "ip" || answerOne === "internet protocol") {
      score += 20;
      showFeedback("feedback1", true, "Correct. DNS translates names into IP addresses.");
    } else {
      showFeedback("feedback1", false, "Incorrect. The correct answer is IP or Internet Protocol.");
    }

    if (answerTwo && answerTwo.value === "translate") {
      score += 20;
      showFeedback("feedback2", true, "Correct. DNS translates domain names into network information.");
    } else {
      showFeedback("feedback2", false, "Incorrect. DNS translates domain names into network information.");
    }

    if (answerThree && answerThree.value === "root") {
      score += 20;
      showFeedback("feedback3", true, "Correct. A root server directs the resolver toward the correct TLD server.");
    } else {
      showFeedback("feedback3", false, "Incorrect. The correct answer is Root server.");
    }

    if (answerFour && answerFour.value === "authentication") {
      score += 20;
      showFeedback("feedback4", true, "Correct. DNSSEC uses digital signatures to authenticate DNS data.");
    } else {
      showFeedback("feedback4", false, "Incorrect. DNSSEC adds authentication through digital signatures.");
    }

    const selectedValues = [];
    for (let i = 0; i < answerFive.length; i++) {
      selectedValues.push(answerFive[i].value);
    }

    if (
      selectedValues.length === 4 &&
      selectedValues.includes("resolver") &&
      selectedValues.includes("root") &&
      selectedValues.includes("tld") &&
      selectedValues.includes("authoritative")
    ) {
      score += 20;
      showFeedback("feedback5", true, "Correct. All four DNS components can participate in a complete lookup.");
    } else {
      showFeedback("feedback5", false, "Incorrect. Select Recursive resolver, Root server, TLD server, and Authoritative name server.");
    }

    const results = document.getElementById("quizResults");
    const passFail = document.getElementById("passFail");
    const totalScore = document.getElementById("totalScore");

    results.hidden = false;
    totalScore.textContent = "Your score is " + score + " out of 100.";

    if (score >= 70) {
      passFail.textContent = "You passed the quiz.";
      passFail.className = "pass";
    } else {
      passFail.textContent = "You did not pass the quiz. Review the answers and try again.";
      passFail.className = "fail";
    }
  });
}

// Displays correct or incorrect feedback under a quiz question.
function showFeedback(elementId, isCorrect, message) {
  const feedback = document.getElementById(elementId);
  feedback.textContent = message;

  if (isCorrect) {
    feedback.className = "question-feedback correct";
  } else {
    feedback.className = "question-feedback incorrect";
  }
}

// Clears the form, feedback, and final result for another attempt.
if (resetQuizButton) {
  resetQuizButton.addEventListener("click", function () {
    quizForm.reset();

    for (let i = 1; i <= 5; i++) {
      const feedback = document.getElementById("feedback" + i);
      feedback.textContent = "";
      feedback.className = "question-feedback";
    }

    document.getElementById("quizResults").hidden = true;
    document.getElementById("passFail").textContent = "";
    document.getElementById("totalScore").textContent = "";
  });
}
