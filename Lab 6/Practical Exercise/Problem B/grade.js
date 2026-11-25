// Error 1 (grade.html, Line 9): Missing 'return' in the onsubmit attribute. Needs to be onsubmit="return checkMark()"
// Error 2 (grade.html, Line 13): Input type is set to text, allowing letters to be typed instead of restricting to numbers.
// Error 3 (grade.js, Line 4): Missing required condition so that user is required to fill out the mark field before submitting.
// Error 4 (grade.js, Line 15): Logical operator is wrong, used '&&' instead of '||'. A number cannot be less than 0 AND greater than 100 at once.
// Error 5 (grade.js, Line 30): The word 'colour' is used which is wrong, it should be spelled 'color' for CSS styling.
// Error 6 (grade.js, Line 38): Loop condition '<' is wrong, it skips the last index. Since it starts at 1, it needs '<=' or start at 0 with '<'.
// Error 7 (grade.js, Line 42): The word 'innerHtml' has incorrect casing which is wrong, it should be 'innerHTML'.
// Error 8 (grade.js, Line 17-18): The result and date disappear immediately because the form submits and reloads the page.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Name validation
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extension 5: Empty mark check
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Case 2: Check if input is numeric (catches "abc")
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Case 3: Check out of range (catches 150)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    document.getElementById("result").innerHTML = name + " got grade " + grade;

    let resultElement = document.getElementById("result");
    // Extension 6: Color based on grade
    if (grade === "A" || grade === "B") {
        resultElement.style.color = "green"; 
    } else if (grade === "C") {
        resultElement.style.color = "orange";
    } else {
        resultElement.style.color = "red";
    }

    // Extension 8: Display date and time
    let now = new Date();
    document.getElementById("dateOutput").innerHTML = "Checked on: " + now.toString();

    // Fix: Changed from 'return true' to 'return false' to stop the page from reloading and erasing the result.
    return false; 
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";
    
    document.getElementById("tableContainer").innerHTML = tableHTML;
}

// Extension 7: Generate Random Mark
function generateRandomMark() {
    let randomNumber = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomNumber;
}