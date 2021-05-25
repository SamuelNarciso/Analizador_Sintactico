
class ReservedWord():
    def Words(self):
        w = [
            'int',
            'float',
            'String',
            'while'
        ]
        return w

    def IsReservedWord(self, data):
        for x in self.Words():
            if x in data:
                return True
        return False
