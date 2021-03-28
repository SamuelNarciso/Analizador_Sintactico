import Search
import PilaOperaciones
import Variables
class Operation:
    def __init__(self, string):
        self.string = string

    def Convert(self, var, errores):
        temp = self.string.split('=')
        result, T, index = Search.Search().Search_Name(var, temp[0])
        if result == True:
            operacion = self.GessOperation(temp[1])
            if len(operacion) == 0:
                errores.append(
                    'Error de sintaxis solo se permite una operacion por linea '+self.string)
            else:

                var1 = self.SearchVar(operacion[0], var)
                var2 = self.SearchVar(operacion[2], var)
                if var1 != None:
                    if var2 != None:
                        r, v = PilaOperaciones.Operaciones().Operar(
                            [var1, operacion[1], var2])
                        if r == True:
                            self.AssigErrors(v, T, errores, var, index)
                            pass
                        else:
                            errores.append(v)
                        pass
                    else:
                        r,v=self.ConvertToFormart(operacion,errores,var)
                        if r:
                            self.AssigErrors(v, T, errores, var, index)
                        else:
                            if v!='':
                                errores.append(v)
                    pass
                else:
                    r,v=self.ConvertToFormart(operacion,errores,var)
                    if r:
                        self.AssigErrors(v, T, errores, var, index)
                    else:
                        if v!='':
                            errores.append(v)
            pass
        else:
            errores.append('Error variable no declarada'+self.string)
        return errores, var
    def ConvertToFormart(self,operacion,errores,var):
        
        v1=self.SearchVar(operacion[0],var)
        v2=self.SearchVar(operacion[2],var)
        pila=[]
        if v1!=None:
            pila.append(v1)
            pass
        else:
            #here i have to create a var
            tipo=self.Type(operacion[0])
            if tipo!='':
                pila.append(Variables.Variables(tipo,'temp',operacion[0]))
                pass
            else:
                errores.append('Error variable no declarada '+operacion[0])
        pila.append(operacion[1])
        if v2!=None:
            pila.append(v2)
        else:
            tipo=self.Type(operacion[2])
            if tipo!='':
                pila.append(Variables.Variables(tipo,'temp',operacion[2]))
                pass
            else:
                errores.append('Error variable no declarada'+operacion[2])
        if len(pila)==3:
            r, v = PilaOperaciones.Operaciones().Operar(
                    pila)
            return r,v
        return False,''


    def Type(self,operacion):
        tipo=''
        if '"' in operacion or "'" in operacion:
            tipo='String'
        if '.' in operacion:
            tipo='float'
        if self.CheckIfIsNumber(operacion):
            tipo='int'
        return tipo
    def CheckIfIsNumber(self,data):
        d=[str(x) for x in range(0,10)]
        for i in data:
            if (i in d)==False:
                return False
        return True
    def correcto(self, v, errores, var, index):
        errores.append('Cadena correcta '+self.string+' ('+str(v)+')')
        var[index].SetValue(v)
        return errores, var

    def AssigErrors(self, v, T, errores, var, index):
        ty = PilaOperaciones.Operaciones().Tipo(v)
        if T == 'int' and ty.tipo is int:
            return self.correcto(v, errores, var, index)
        if T == 'String' and ty.tipo is str:
            return self.correcto(v, errores, var, index)
        if T == 'float' and (ty.tipo is float or ty.tipo is int) == True:
            return self.correcto(v, errores, var, index)
        else:
            errores.append('Error de tipo '+self.string)
            return errores, var

    def SearchVar(self, name, var):
        result, T, index = Search.Search().Search_Name(var, name)
        if result == True:
            return var[index]
        else:
            return None

    def GessOperation(self, operation):
        simbols = [0, 0, 0, 0]
        for x in operation:
            if '+' == x:
                simbols[0] += 1
            if '-' == x:
                simbols[1] += 1
            if '*' == x:
                simbols[2] += 1
            if '/' == x:
                simbols[3] += 1
        suma = simbols[0]+simbols[1]+simbols[2]+simbols[3]
        if suma > 1 or suma < 1:
            return []
        aux = []
        if '+' in operation:
            aux = operation.split('+')
            aux.insert(1, '+')
        if '-' in operation:
            aux = operation.split('-')
            aux.insert(1, '-')
        if '*' in operation:
            aux = operation.split('*')
            aux.insert(1, '*')
        if '/' in operation:
            aux = operation.split('/')
            aux.insert(1, '/')
        return aux
