class ConvertString:
    def __init__(self,s):
        self.s=s
    def AdingSpaces(self,array,x):
        a=list(self.s)
        if x>0:
            if a[x-1]!=' ':
                array.append(' ')
            array.append('=')
            if x+1<len(a):
                if a[x+1]!=' ':
                    array.append(' ')
        return array
    def Convert(self):
        String=[]
        aux=list(self.s)
        c=""
        l=0
        for x in range(len(aux)):
            if aux[x]=='=':
                String=self.AdingSpaces(String,x)
            else:
                String.append(aux[x])
            if aux[x]=='"' or aux[x]=="'":
                l=x
                c=aux[x]
                break
        if len(String)>=len(aux):
            return String
        #In the case that is a string we have to delete the spaces in the ""
        k=0
        for x in range(l+1,len(aux)+1):
            if aux[x]!=' ':
                String.append(aux[x])
            if c==aux[x]:
                k=x
                break
        if len(String)<len(aux):
            for x in range(k+1,len(aux)):
                String.append(aux[x])
        return String
