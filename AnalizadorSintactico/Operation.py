from typing import Type
import alphabet

class Operation:
    def __init__(self, string):
        self.string = string

    def Convert(self, var, errores):
        temp = self.string.split('=')
        #search the var if exists
        result=self.SearchVar(var,temp[0])
        if result:
            #search if in the string everting are numbers or string or there is a var
            r,m=self.SearchVars(temp[1],var=var)
            if r==None:
                errores.append(m)
            else:
                operacion=self.CheckSimbols(r)
                if operacion!=None:
                    rt=self.CheckTypes(temp[0],var,operacion)
                    print(rt)
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
            print('Test')
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
            print(e)
            return None

    def SearchVars(self,data,var):
        simbols=['+','-','*','/','^']
        comillas=['"',"'"]
        comilla=False
        c=''
        i=0
        cadana=''
        for x in data:
            caracter=x
            if x in comillas:
                if comilla:
                    comilla=False
                else:
                    c=x
                    comilla=True
            if (x in  alphabet.Alphabet().AlphabetAllSimbols() or x in simbols or x in comillas)==False:
                if comilla==False:
                    #searc if the var exists
                    r=self.SearchVar(var,x)
                    if r:
                        caracter=str(self.GetValue(var,x))
                    else:
                        return None,'Error la variable '+x+' No esta declarada'
            cadana+=caracter
            i+=1
        return cadana,''
    
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
    

