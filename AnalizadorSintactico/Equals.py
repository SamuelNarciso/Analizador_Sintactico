class Equals:
    def __init__(self, string):
        # we have to count how many = has the string and how many <,> it has
        self.string = string

    def CheckString(self):
        number_equals = 0
        number_bracket = 0
        for x in self.string:
            if x == '=':
                number_equals += 1
            if x == '<' or x == '>':
                number_bracket += 1
        return number_equals == 1 and number_bracket == 0
