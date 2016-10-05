// Student object
var Student = function(name) {
    this.name = name;
    this.attendance = [];

    for (var i = 0; i < 12; i++) {
        this.attendance.push(false);
    }
}

Student.prototype.getMissingCount = function () {
    var missingCount = 0;
    for (var i = 0; i < this.attendance.length; i++) {
        if (this.attendance[i] == false) {
            missingCount++;
        }
    }
    return missingCount;
};

Student.prototype.toggleMissing = function (day) {
    if (day < this.attendance.length) {
        this.attendance[day] = !this.attendance[day];
    }
};

// the model used to store the student objects.
var model = {
    students: []
};

model.init = function() {
    this.students.push(new Student("Honoka Kosaka"));
    this.students.push(new Student("Eli Ayase"));
    this.students.push(new Student("Kotori Minami"));
    this.students.push(new Student("Umi Sonoda"));
    this.students.push(new Student("Rin Hoshizora "));
    this.students.push(new Student("Maki Nishikino"));
    this.students.push(new Student("Nozomi Tojo"));
    this.students.push(new Student("Hanayo Koizumi"));
    this.students.push(new Student("Nico Yazawa"));
};

model.getStudentByName = function(name) {
    for (student of this.students) {
        if (student.name === name) {
            return student;
        }
    }
};

model.saveToLocalStorage = function() {
    localStorage.students = JSON.stringify(this.students);
};

model.loadFromLocalStorage = function() {
    this.students = JSON.parse(localStorage.students);
};

model.clearLocalStorage = function() {
    localStorage.clear();
};

// the object between model and view
var octopus = {};

octopus.init = function() {
    model.init();
    view.init();
};

octopus.getNumberOfStudent = function() {
    return model.students.length;
};

octopus.getStudentNameByIndex = function(index) {
    return model.students[index].name;
};

octopus.isStudentMissing = function(name, day) {
    return model.getStudentByName(name).attendance[day];
};

octopus.getStudentMissingCount = function(name) {
    var student = model.getStudentByName(name);
    var missingCount = 0;
    for (var i = 0; i < student.attendance.length; i++) {
        if (student.attendance[i] == false) {
            missingCount++;
        }
    }
    return missingCount;
};

// view, the one modifying the document
var view = {};
var $attendanceSheet = $("#attendance-sheet-body");

view.init = function() {
    var studentName;

    // DOM elements
    var row;
    var data;
    var input;

    for (var i = 0; i < octopus.getNumberOfStudent(); i++) {
        studentName = octopus.getStudentNameByIndex(i);

        // create row
        row = document.createElement("tr");
        $(row).addClass("student");

        // create name column
        data = document.createElement("td");
        $(data).addClass("name-col");
        $(data).append(studentName);

        $(row).append(data);

        // create attendance columns
        for (var j = 0; j < 12; j++) {
            data = document.createElement("td");
            $(data).addClass("attend-col");

            input = document.createElement("input");
            $(input).attr("type", "checkbox");
            $(input).attr("checked", octopus.isStudentMissing(studentName, j));

            $(data).append(input);
            $(row).append(data);
        }

        //create missed column
        data = document.createElement("td");
        $(data).addClass("missed-col");
        $(data).append(octopus.getStudentMissingCount(studentName));

        $(row).append(data);

        $attendanceSheet.append(row);
    }
};

// program starts here
octopus.init();
