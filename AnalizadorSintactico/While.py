# This class is for format the while
# while(){} like this
class While:
    def __init__(self, string):
        self.string = string
    def Search_While(self,errores):
        count=0
        texto=[]
        for x in self.string:
            if 'while(' in  x:
                resultado=self.Acomodar(self.Search(count))
                if(resultado!=False):
                    texto.append(resultado)
                    errores.append('Cadena correcta While ')
                else:
                    errores.append('Error While incorrecto')
            elif (x in ['{','}'])==False:
                texto.append(x)
            count+=1
        print(texto)
        return texto, errores
    def Acomodar(self,aux):
        w=[]
        codigo=[]

        if '(' in aux and ')' in aux:
             w.append(aux[aux.index('(')+1:aux.index(')')])
        if '{' in aux and '}' in aux:
            codigo.append(aux[aux.index('{')+1:aux.index('}')])
        if len(codigo)>0 and len(w)>0:
            return self.Ocomodar(w)

        return False
    def Ocomodar(self,arreglo):
        aux=''
        for x in arreglo:
            if x:
                aux+=x
        return aux
    def EliminarCodigo(self,matrix):
        aux=[]
        for x in matrix:
            if(x):
                aux.append(x)
        return aux

    def Search(self,count):
        aux=''
        for x in range(count,len(self.string)):
                aux+=self.string[x]+';'
                if self.string[x]=='}':
                    break;
        return aux

