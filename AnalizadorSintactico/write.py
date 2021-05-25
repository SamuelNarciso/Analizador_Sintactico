
class Write:
    def __init__(self,string,var,errores):
        self.string=string
        self.var=var
        self.errores=errores

    def CheckSintax(self):
       data=list(self.string)
       data=self.CheckWrite(data)
       if data :
           if self.CheckParentesis(data):
               self.errores=self.CheckContenido(data=data)
               return self.errores
       self.errores.append('Error en '+self.string)
       return self. errores 
       
    def DefineSintax(self):
        sintax=[
                "W",
                "r",
                "i",
                "t",
                "e",
                '(',
                ")"
                ]
        return sintax
    def CheckWrite(self,string):
        sintax=self.DefineSintax()
        for i in range (0,5):
            if sintax[i]==string[0]:
                string.pop(0)
            else:
                return False
        return string
    def CheckParentesis(self,string):
        if string[0]=='(' and string[len(string)-1]==')':
            string.pop()
            string.pop(0)
            return string
        return False

    def CheckContenido(self,data):
        if '"' in data or "'" in data:
            comillas=['"',"'"]
            if data[0] in comillas and data[len(data)-1] in comillas and data[0]==data[len(data)-1]:
                num_comillas=0
                for x in data:
                    if x==data[0]:
                        num_comillas+=1
                if num_comillas==2:
                    self.errores.append(self.CadenaCorrecta())
                    return self.errores
        else:
            #check if is a number 
            numbers,letters=self.CheckNumbers(data)
            if numbers>0 and letters==0:
                self.errores.append(self.CadenaCorrecta())
                return self.errores
            else :
                if numbers==0 and letters>0:
                    #check of the vars exist
                    return self.SearchNameVar(data=data)
        self.errores.append('Error en '+self.string)
        return self.errores

    def SearchNameVar(self,data):
        aux=""
        for x in data:
            aux+=x
        for i in self.var:
            if i.name==aux:
                self.errores.append(self.CadenaCorrecta())
                return self.errores
        self.errores.append('Error Variable no declarada '+self.string)
        return self.errores

    def CheckNumbers(self,data):
        numbers=0
        letter=0
        matrix = [str(x) for x in range(0, 10)]
        for element in data:
            if (element in matrix)==False:
                letter+=1
            else:
                numbers+=1
        return numbers,letter

    def CadenaCorrecta(self):
        return 'Cadena correcta '+self.string



 





