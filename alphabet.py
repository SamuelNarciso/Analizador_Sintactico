class Alphabet:
    def GenerateLetters(self):
        alphabet = [
            'A',
            'a',
            'B',
            'b',
            'C',
            'c',
            'D',
            'd',
            'E',
            'e',
            'F',
            'f',
            'G',
            'g',
            'H',
            'h',
            'I',
            'i',
            'J',
            'j',
            'K',
            'k',
            'L',
            'l',
            'M',
            'm',
            'N',
            'n',
            'Ñ',
            'ñ',
            'O',
            'o',
            'P',
            'p',
            'Q',
            'q',
            'R',
            'r',
            'S',
            's',
            'T',
            't',
            'U',
            'u',
            'V',
            'v',
            'W',
            'w',
            'X',
            'x',
            'Y',
            'y',
            'Z',
            'z'
        ]
        return alphabet

    def LetterWithSimbols(self):
        a = self.GenerateLetters()
        a.extend(self.AlphabetNumber())
        return a

    def NumberDecimal(self):
        a = [str(x) for x in range(0, 10)]
        a.append('.')
        return a

    def AlphabetNumber(self):
        return [str(x) for x in range(0, 10)]
