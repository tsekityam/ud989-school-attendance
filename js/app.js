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
