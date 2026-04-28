__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Nikodem Jokiel 4d"

import datetime
import json

from sprawdzian_Nikodem_Jokiel_4d.models.Grades import Grades
from sprawdzian_Nikodem_Jokiel_4d.models.Student import Student
from sprawdzian_Nikodem_Jokiel_4d.models.Subject import Subject
from sprawdzian_Nikodem_Jokiel_4d.models.Teacher import Teacher
from sprawdzian_Nikodem_Jokiel_4d.year_grade import year_grade

teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []

def main() -> None:

    with open("teachers.txt", "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            teachers.append(Teacher(int(parts[0]), parts[1], parts[2]))

    with open("subjects.txt", "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            matched_teacher = next((t for t in teachers if t._id == int(parts[2])), None)
            if matched_teacher:
                    subjects.append(Subject(int(parts[0]), parts[1], matched_teacher))

    with open("students.txt", "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            birthdate = datetime.datetime.strptime(parts[3],'%Y-%m-%d').date()
            students.append(Student(int(parts[0]), parts[1], parts[2], birthdate))

    with open("grades.txt", "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            matched_student = next((s for s in students if s._id == int(parts[0])), None)
            matched_subject = next((s for s in subjects if s._id == int(parts[1])), None)

            if matched_student and matched_subject:
                grade_object = Grades(matched_student, matched_subject)
                for g in parts[2].split(','):
                    grade_object.add_grade(int(g.strip()))
                grades.append(grade_object)

    print("Oceny i średnie poszczególnych uczniów")

    students_json_data: list[dict] = []
    for student in students:
        student_str = str(student)
        student_dict: dict = {}
        student_grades = [g for g in grades if g.student == student]
        print(f"{student_str}:")

        for g in student_grades:
            subj_name = g.subject.name
            grades_list = g.get_grades()
            grades_str = ", ".join(map(str, grades_list))
            avg = round(g.get_average(), 2)
            final_grade = year_grade(avg)

            print(f"{subj_name}:")
            print(f"Oceny: {grades_str}")
            print(f"Średnia: {avg}")
            print(f"Ocena końcowa: {final_grade}")

            student_dict[subj_name] = {
                "Oceny": grades_str,
                "Srednia": avg,
                "Ocena roczna": final_grade
            }
        print()
        students_json_data.append({student_str: student_dict})

    with open("students.json", "w", encoding="utf-8") as f:
        json.dump(students_json_data, f, ensure_ascii=False, indent=4)

    print("=" * 50)
    print()

    subjects_json_data: list[dict] = []
    for subject in subjects:
        subject_name = subject.name
        subject_teacher = subject.teacher
        print(f"{subject_name}:")
        print(f"Nauczyciel: {subject_teacher}")

        all_grades: list[int] = []
        for g in grades:
            if g.subject == subject:
                all_grades.extend(g.get_grades())

        grades_str = ", ".join(map(str, all_grades))
        avg = round(sum(all_grades) / len(all_grades), 2) if all_grades else 0.0

        print(f"Oceny: {grades_str}")
        print(f"Średnia: {avg}")
        print()

        subjects_json_data.append({
            subject.name: {
                "Nauczyciel": str(subject.teacher),
                "Oceny": all_grades,
                "Sredina": avg
            }
        })

    with open("subjects.json", "w", encoding="utf-8") as f:
        json.dump(subjects_json_data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
