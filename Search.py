class Search:
    def search(self,string,alphabet):
        if len(string[0])>1:
            aux=string[0]
            if self.s(aux,alphabet)==True:
                string.pop(0)
                return True,string
        else:
            if  len(string)>0:
                if string[0] in alphabet:
                    string.pop(0)
                    return True,string
        return False,string

    def s(self,l,a):
        n=[]
        for x in l:
            if x in a:
                n.append(1)
        if len(n)==len(l):
            return True
        return False





