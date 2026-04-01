class Student:
    def __init__(self, student: list, course: list):
        self.id:int = student[0]
        self.name:str = student[1]
        self.surname:str = student[2]
        self.age:int = student[3]
        self.courses:list = course

class Course:
    def __init__(self, course: list):
        self.id:int = course[0]
        self.name:str = course[1]

def get_students_list(students:list, courses:list):
    studentsList = []
    for student in students:
        studentCourses = []
        studentData = student.split(",")
        for course in courses:
            courseData = course.split(",")
            if courseData[0] == studentData[0]:
                studentCourses.append(courseData[1])

        studentsList.append(Student(studentData, studentCourses))
    return studentsList

def print_studentsList(studentList: list):
    for student in studentList:
        coursesString = ""
        for course in student.courses:
            coursesString = coursesString + course + ", "
        coursesString = coursesString[:-2]

        print(student.name + " " + student.surname + " (" + student.age + " lat): " + coursesString)

def create_files(studentList: list):
    for student in studentList:
        f = open((student.name + "_"+ student.surname +".txt"), "w")
        f.write("Kursy:\n")
        for course in student.courses:
            f.write("-" + course + "\n")
    f.close()

inp = open("data/students.txt", "r", encoding="utf-8")
students = inp.read().split()
inp = open("data/courses.txt", "r", encoding="utf-8")
courses = inp.read().split()
inp.close()

studentsList = get_students_list(students, courses)
print_studentsList(studentsList)

create_files(studentsList)


