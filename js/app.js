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

model.init();
