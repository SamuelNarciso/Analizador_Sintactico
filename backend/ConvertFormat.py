class ConvertFormat:
    def __init__(self,string):
        self.string=string
    def Convert(self):
        aux=self.string.split(' ')
        l=[]
        for x in list(aux[0]):
            l.append(x)
        l2=[]
        for x in aux[1]:
            if x!=';':
                l2.append(x)
        if len(l2)>1:
            l.append(l2)
        else:
            l.append(l2.pop())
        l.append(';')
        return l

