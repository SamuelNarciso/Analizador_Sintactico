import ReservedWords


class Search:
    # This method is for search in the alphabets while we're in the Tree
    def search(self, string, alphabet):
        if len(string[0]) > 1:
            aux = string[0]
            if self.s(aux, alphabet) == True:
                string.pop(0)
                return True, string
        else:
            if len(string) > 0:
                if string[0] in alphabet:
                    string.pop(0)
                    return True, string
        return False, string

    def s(self, l, a):
        n = []
        for x in l:
            if x in a:
                n.append(1)
        if len(n) == len(l):
            return True
        return False
    # This method is to find if the var has been already in the list

    def SearchTheVar(self, var, value):
        if len(var) == 0:
            return False
        for x in var:
            aux1 = value.split(' ')
            if x.name == aux1[1]:
                return True
        return False
    # This method is to find the var in a list but if the input has a =

    def NameVar(self, value):
        for y in ReservedWords.ReservedWord().Words():
            if y in value:
                return True
        return False

    def Search_Name(self, var, value):
        if self.NameVar(value) == True:
            return False, '', None
        if len(var) == 0:
            return False
        aux = value.split('=')
        for x in var:
            if x.name == aux[0]:
                return True, x.Type, var.index(x)

        return False, '', None
