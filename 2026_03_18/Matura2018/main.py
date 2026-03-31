inp = open("sygnaly.txt", "r")
signals = inp.read().split()
inp.close()
def hidden_message(signals):
    message = ""
    signalCounter = 1
    for signal in signals:
        if signalCounter%40 == 0:
            letterCounter = 1
            for letter in signal:
                if letterCounter%10 == 0:
                    message += letter
                    break
                letterCounter += 1
        signalCounter += 1
    return message

def search_longest_signal(signals):
    longestSignal = ""
    longestSignalLength = 0
    for signal in signals:
        counter = 0
        differentLetters = [0] * 128
        for letter in signal:
            differentLetters[int(ord(letter))] += 1
        for i in range(len(differentLetters)):
            if differentLetters[i] > 0:
                counter += 1
        if counter > longestSignalLength:
            longestSignal = signal
            longestSignalLength = counter

    return longestSignal, longestSignalLength

def signals_with_short_letter_distance(signals):
    shortSignals=""

    for signal in signals:
        signalIsShort = True
        for letter in signal:
            for letter2 in signal:
                if abs(ord(letter)-ord(letter2)) > 10:
                    signalIsShort = False
                    break
        if signalIsShort:
            shortSignals += (signal + "\n")
    return shortSignals


print(hidden_message(signals))
print("---------------------------------------------------------------------\n")
print(search_longest_signal(signals))
print("---------------------------------------------------------------------\n")
print(signals_with_short_letter_distance(signals))
print("---------------------------------------------------------------------\n")


