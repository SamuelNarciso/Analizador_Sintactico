class Variables:
    def __init__(self, Type, name, value):
        self.Type = Type
        self.name = name
        self.value = value
        pass

    def SetValue(self, newValue):
        self.value = newValue
