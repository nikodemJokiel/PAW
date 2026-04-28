__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Nikodem Jokiel 4d"

from sprawdzian_Nikodem_Jokiel_4d.models.Student import Student
from sprawdzian_Nikodem_Jokiel_4d.models.Subject import Subject


class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.grades: list[int] = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int) -> None:
        if grade < 1 or grade > 6:
            raise ValueError(f'Grade must be between 1 and 6')
        self.grades.append(grade)

    def get_grades(self) -> list[int]:
        return self.grades

    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades)
