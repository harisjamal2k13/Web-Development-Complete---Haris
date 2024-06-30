// const studentData = [
//     {
//         rollNumber: '1',
//         name: 'John Doe',
//         subjects: [
//             { serialNumber: 1, name: 'Mathematics', marks: 85 },
//             { serialNumber: 2, name: 'Science', marks: 78 },
//             { serialNumber: 3, name: 'English', marks: 92 }
//         ]
//     },
//     {
//         rollNumber: '2',
//         name: 'Jane Smith',
//         subjects: [
//             { serialNumber: 1, name: 'Mathematics', marks: 80 },
//             { serialNumber: 2, name: 'Science', marks: 85 },
//             { serialNumber: 3, name: 'English', marks: 88 }
//         ]
//     }
//     // Add more students as needed
// ];

function showReport() {
    const rollNumberInput = document.getElementById('rollNumber').value;
    const student = studentData.find(student => student.rollNumber === rollNumberInput);

    if (student) {
        const studentInfoDiv = document.getElementById('studentInfo');
        studentInfoDiv.innerHTML = `<p>Roll Number:<b> ${student.rollNumber}</b></p><p>Name:<b> ${student.name}</b></p>`;

        const reportTable = document.getElementById('reportBody');
        reportTable.innerHTML = '';

        let totalMarks = 0;
        let totalSubjects = student.subjects.length;

        student.subjects.forEach(subject => {
            const row = `<tr>
                            <td>${subject.serialNumber}</td>
                            <td>${subject.name}</td>
                            <td>${subject.marks}</td>
                        </tr>`;
            reportTable.innerHTML += row;
            totalMarks += subject.marks;
        });

        // Calculate percentage and determine grade
        const percentage = (totalMarks / (totalSubjects * 100)) * 100;
        let grade = '';

        if (percentage >= 80) {
            grade = 'A+';
        } else if (percentage >= 70) {
            grade = 'A';
        } else if (percentage >= 60) {
            grade = 'B';
        } else if (percentage >= 50) {
            grade = 'C';
        } else {
            grade = 'F';
        }

        // Display percentage and grade
        const percentageSpan = document.getElementById('percentage');
        const gradeSpan = document.getElementById('grade');

        percentageSpan.textContent = "Percentage: "+  percentage.toFixed(2) + '%';
        gradeSpan.textContent = "Grade: " + grade;

        // Show the percentageAndGrade section
        const percentageAndGradeDiv = document.getElementById('percentageAndGrade');
        percentageAndGradeDiv.style.display = 'block';
    } else {
        alert('Student not found. Please enter a valid roll number.');
        
        // Hide the percentageAndGrade section if student not found
        const percentageAndGradeDiv = document.getElementById('percentageAndGrade');
        percentageAndGradeDiv.style.display = 'none';
    }
}
document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");
