/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var names = ['Slappy the Frog',
                     'Lilly the Lizard',
                     'Paulrus the Walrus',
                     'Gregory the Goat',
                     'Adam the Anaconda'],
            attendance = {};

        for (name of names) {
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        }

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {

    // name, string of student name
    // days, array of boolean that stores the attendance of student
    var Student = function(name, dayChecks) {
        this.name = name;
        this.dayChecks = dayChecks;
    }

    var attendance,
        $allMissed,
        $allCheckboxes,
        students = [],
        attendanceSheet;

    // Reload attendance from local storage
    function reloadAttendance() {
        attendance = JSON.parse(localStorage.attendance);
    }

    reloadAttendance();

    // Create student array from local storage
    $.each(attendance, function(name, days) {
        students.push(new Student(name, days));
    });

    function insertNameCell(row, name) {
        nameCell = row.insertCell();
        nameCell.innerHTML = name;
        nameCell.classList.add('name-col');
    }

    function insertAttendCell(row, dayCheck) {
        attendCell = row.insertCell();
        attendCell.innerHTML = HTMLattendCell;
        checkbox = attendCell.getElementsByTagName('input')[0];
        if (dayCheck == true) {
            checkbox.setAttribute('checked', 'true');
        }
    }

    function insertMissedCell(row) {
        missedCell = row.insertCell();
        missedCell.innerHTML = '0';
        missedCell.classList.add('missed-col');
    }

    // create UI from student array
    attendanceSheet = document.getElementById('attendance-sheet-body')
    var nameCell, attendCell, missedCell,
        checkbox,
        HTMLattendCell = '<td class="attend-col"><input type="checkbox"></td>';
    for (student of students) {
        var row = attendanceSheet.insertRow();
        row.classList.add('student');

        insertNameCell(row, student.name);

        for (dayCheck of student.dayChecks) {
            insertAttendCell(row, dayCheck);
        }

        insertMissedCell(row);
    }

    // Count a student's missed days
    $allMissed = $('tbody .missed-col');
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                studentName = studentRow.find('td:first').text(),
                numMissed = 0;

            for (dayChecks of attendance[studentName]) {
                if (dayChecks === false) {
                    numMissed++;
                }
            }

            $(this).text(numMissed);
        });
    }

    // When a checkbox is clicked, update localStorage
    $allCheckboxes = $('tbody input');
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        localStorage.attendance = JSON.stringify(newAttendance);
        reloadAttendance();
        countMissing();
    });

    countMissing();
}());

function reset() {
    localStorage.clear();
    location.reload();
}
