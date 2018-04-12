class Teacher {
    constructor(n) {
        this.name = n;
        this.hoursTaught = 0;
    }
    teach(teacher, student) {
        student.fundamentalsProficiency = student.fundamentalsProficiency + 1;
        teacher.hoursTaught = teacher.hoursTaught + 1;
    }
    dadJoke(teacher) {
        console.log(teacher + " made a funny");
    }
    
}

class Student {
    constructor(n, we) {
        this.name = n;
        this.fundamentalsProficiency = 0;
        this.workEthic = we;
    }
    getProficiency(student) {
        return student.fundamentalsProficiency;
    }
    doProject(student) {
        if(student.fundamentalsProficiency < 5) {
            console.log(student.name + " was not ready to take on the project");
        } else {
            console.log(student.name + " successfully completed the project!");
        }
    }
    study(student) {
        student.fundamentalsProficiency = student.fundamentalsProficiency + student.workEthic;
    }
}

var jack = new Teacher("jack");
var bob = new Student("bob", 10);
var susan = new Student("susan", 12);
jack.teach(jack, bob);
jack.teach(jack, susan);
bob.doProject(bob);
susan.doProject(susan);
bob.study(bob);
susan.study(susan);
bob.doProject(bob);
susan.doProject(susan);


