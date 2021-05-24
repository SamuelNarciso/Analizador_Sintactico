
class Write:
    def __init__(self,string):
        self.string=string

    def CheckSintax(self):
       data=list(self.string)
       data=self.CheckWrite(data)
       if data :
           if self.CheckParentesis(data):
               print(data)
               print(self.CheckContenido(data=data))
               pass
           pass
       return False
       
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
                    return True

        else:
            #check if is a number 
            pass
        return False
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


 

Print=Write("Write(''nombre)")
Print.CheckSintax()



