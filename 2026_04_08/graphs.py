def read_graph(filename: str) ->tuple[list[list[int]], int]:
    inp = open(filename, 'r')
    data = inp.read().splitlines()
    inp.close()

    n: int = int(data[0])
    a: list[list[int]] = []

    for i in range(1, n+1):
        row: list[int] = [int(x) for x in data[i].split()]
        row = row[1:]
        a.append(row)
    return a, n

def write_neighbours_list(a: list[list[int]]) -> None:
    for i in range (len(a)):
        neighbours: str = ", ".join(map(str, a[i]))
        print(f"Sąsiadami wierzchołka {i} są: {neighbours}")

def list_to_matrix(a: list[list[int]]) -> list[list[int]]:
    matrix: list[list[int]] = []
    n: int = len(a)
    for i in range(n):
        matrix.append([0] * n)

    for i in range(n):
        for neighbour in a[i]:
            matrix[i][neighbour] = 1
    return matrix

def write_matrix(matrix: list[list[int]]) -> None:
    print("Macierz sąsiedztwa: ")
    for i in matrix:
        print(*i)

def main() -> None:
    a, n = read_graph('graph.txt')
    write_neighbours_list(a)

    matrix = list_to_matrix(a)
    print()
    write_matrix(matrix)

if __name__ == "__main__":
    main()
