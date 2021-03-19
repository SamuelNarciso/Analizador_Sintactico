class ConvertFormat:
    def __init__(self,string):
        self.string=string
    #This method convert to the correct format to create a var
    def Convert(self):
        aux=self.string.split(' ')
        l=[]
        if len(aux)!=2:
            return False
        for x in list(aux[0]):
            l.append(x)
        l2=[]
        for x in aux[1]:
            if x!=';':
                l2.append(x)
        if len(l2)>1:
            l.append(l2)
        else:
            if len(l2)>0:
                l.append(l2.pop())
            else:
                return False
        l.append(';')
        return l
    #This method sort out the string
    def OrdenAssign(self):
        aux=self.string.split('=')
        #a=10 a =10 a = 10
        data=[]
        c=[]
        for x in list (aux[0]):
            if x!=' ':
                c.append(x)
        if len(c)==1:
            data.append(c[0])
        else:
            data.append(c)
        data.append('=')
        e=[]
        for x in list(aux[1]):
            if x !=' ':
                e.append(x)
        data.append(e)
        return data

