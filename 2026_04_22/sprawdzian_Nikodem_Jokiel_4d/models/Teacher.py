__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Nikodem Jokiel 4d"

class Teacher:
    def __init__ (self, _id: int, name: str, surname: str) -> None:
        self._id = _id
        self.name = name
        self.surname = surname

    def __str__(self):
        return f'{self.name} {self.surname}'