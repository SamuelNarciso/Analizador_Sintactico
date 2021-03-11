class ConvertFormat:
    def __init__(self,string):
        self.string=string
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

