# This class is for format the while
# while(){} like this
class While:
    def __init__(self, string):
        self.string = string
    def Search_While(self,errores):
        found = False
        whileaux = ''
        count = 0
        position = []
        errores = []
        for x in self.string:
            if 'while' in x:
                found = True
            if found:
                whileaux += x+';'
                position.append(count)
            if '}' in x:
                found = False
                # Get the thre parts of the while
                w = []
                waux=[]
                if '(' in whileaux and ')' in whileaux:
                    w.append(whileaux[whileaux.index(
                        '(')+1:whileaux.index(')')])
                if '{' in whileaux and '}' in whileaux:
                    waux.append(whileaux[whileaux.index(
                        '{')+1:whileaux.index('}')])
                if len(w) < 2:
                    errores.append('While error de sistaxis')
                else:
                    errores.append('While  correcto')
                del self.string[position[0]:position[-1]+1]
                seperar=waux[0].split(';')
                for y in seperar:
                    if y!='':
                        w.append(y)
                for h in w:
                    self.string.append(h)
            count += 1
        print(self.string)
        return self.string, errores
