from typing import Type
import alphabet

class Operation:
    def __init__(self, string):
        self.string = string
    def FormarString(self,string):
        simbols=['+','-','*','/','^']
        NewString=[]
        for x in string:
            if x in simbols:
                NewString.append(x)
            else:
                if len(NewString)==0:
                    NewString.append(x)
                else:
                    aux=NewString[len(NewString)-1]
                    if aux in simbols:
                        NewString.append(x)
                    else:
                        aux+=x
                        NewString[len(NewString)-1]=aux

        return NewString
    def Convert(self, var, errores):
        temp = self.string.split('=')
        #search the var if exists
        result=self.SearchVar(var,temp[0])
        #separete the result by the simbols
        if result:
            formato=self.FormarString(temp[1])
            #search if in the string everting are numbers or string or there is a var
            r,m=self.SearchVars(formato,var)
            if r==None:
                errores.append(m)
            else:
                operacion=self.CheckSimbols(r)

                if operacion!=None:
                    rt=self.CheckTypes(temp[0],var,operacion)
                    
                    if rt:
                        errores.append('Cadena Correcta '+self.string)
                    else:
                        errores.append('Error el valor asignado no puede guardar en la variable '+temp[0])
                else:
                    errores.append('Error de sintatix '+self.string)
        else:
            errores.append('Error la variable '+temp[0]+' no existe')
        return errores,var
    
    def CheckTypes(self,var,bank_variables,operacion):
        types=self.GetType(var=var,bank_variables=bank_variables)
        tipo=str(type(operacion))
        if types=='int' and tipo== "<class 'int'>":
            return True
        
        if types=='String' and tipo=="<class 'str'>":
            return True
            
        if types=='float' and tipo=="<class 'float'>" or tipo=="<class 'int'>":
            return True
            

        return False

    def CheckSimbols(self,data):
        try:
            r=eval(data)
            return r
        except Exception as e:
            return None

    def SearchVars(self,data,var):
        simbols=['+','-','*','/','^']
        comillas=['"',"'"]
        cadana=''
        caracter=''
        comilla=False
        c=''
        numbers=[str(x) for x in range(0, 10)]
        s=alphabet.Alphabet().AlphabetAllSimbols()
        if  self.HayComillas(data):
            #aqui toca ver si hay comillas para diferencias entre variables o cadenas
            for x in data:
                caracter=x
                if ('"' in x or "'" in x or x in simbols)==False:
                    valor=self.GetValue(var,x)
                    if valor!=None:
                        caracter=valor
                    else:
                        return None, 'Error la variable '+x +'no esta declarada..'
                cadana+=caracter
        else:
            #aqui hay solo variables y numeros
            for x in data:
                caracter=x
                if (self.ConverNumber(x) or x in simbols)==False:
                    valor=self.GetValue(var,x)
                    if valor!=None:
                        caracter=valor
                        pass
                    else:
                        return None,'Error xd la variable '+x+' No esta declarada'
                cadana+=caracter
            pass
        return cadana,''
    def HayComillas(self,data):
        comillas=['"',"'"]
        for x in data:
            for y in x:
                if y in comillas:
                    return True
        return False
    def ConverNumber(self,number):
        try:
            int(number)
            return True
        except Exception as e:
            return False

    def GetValue(self,bank_variables,var):
        for x in bank_variables:
            if x.name==var:
                return x.value
        return None

    def GetType(self,var,bank_variables):
        for x in bank_variables:
            if x.name==var:
                return x.Type
        return None
    
    def SearchVar(self,bank_variables, var):
        for x in bank_variables:
            if x.name==var:
                return True
        return False
    

