import Search
import alphabet

class Logic:
    def CheckSintax(self, string, var, errores):
        if self.SintaxLogic(string):
            simbol = self.CheckTypes(string)
            # now we have de simbol and split the string
            aux = string.split(simbol)
            # search the vars
            result, T, index = Search.Search().Search_Name(var, aux[0])
            if result:
                if T == 'int' or T == 'float':
                    self.ComapareteNumber(aux,var,string,index,errores,simbol)
                    pass
                else:
                    self.ComparateSring(simbol,aux,errores,string,var,index,T)
                    pass
            else:
                errores.append('Error variable no declarada '+aux[0])
        else:
            errores.append('Error de sintaxis '+string)
        return errores
    def ComparateSring(self,simbol,aux,errores,string,var,index,T):
        if simbol=='==' or simbol=='<>':
            if self.IsNumber(aux[1]) and ("'" in aux[1] or '"' in aux[1])==False:
                errores.append(
                        'Error no se permite esa operacion '+ string )
            else:
                #check if the thing has any " or '
                if '"' in  aux[1] or "'" in aux[1]:
                    #Comparate var with a value
                    #now we have to check that the sintax value
                    if self.SintaxValue(aux[1]):
                        errores.append('Cadena correcta '+string+' '+
                                str(self.OperationSimbols(simbol,
                                    var[index].value,
                                    aux[1]
                                    )
                                ))
                        pass
                    else:
                        errores.append('Error en la comparacion '+string)
                    pass

                else:
                    #here is for comparete var
                    #search the second var
                    re, t, indice = Search.Search().Search_Name(var, aux[1])
                    if re:
                        if t==T:
                            errores.append('Cadena correcta '+string+
                                    ' '+
                                    str(
                                        self.OperationSimbols(
                                            simbol,
                                            var[index].value,
                                            var[indice].value
                                            )
                                        )
                                    )
                            pass
                        else:
                            errores.append(
                                    'Error las variables no son del mismo'+
                                    'Tipo '+string
                                    )
                        pass
                    else:
                        errores.append('Error variable no delclarda '+aux[1])

                    pass
                pass

        else:
            errores.append('Error no se permite esa operacion '+string)
    def SintaxValue(self,value):
        number_simbol=0
        for x in value:
            if '"' in x or "'" in x:
                number_simbol+=1
        return number_simbol==2
    def OperationSimbols(self,simbol,value1,value2):
        if simbol=='==':
            return value1==value2
        if simbol=='<>':
            return value1!=value2
        return False
    def ComapareteNumber(self,aux,var,string,index,errores,simbol):
        # see if the value after the simbol is a var or a number
        if self.IsNumber(aux[1]):
            if var[index].value != None:
                errores.append('Cadena correcta '+string)
            else:
                errores.append('Error la variable ' +
                        string+' No tiene un valor definido')
        else:
            # search the bar
            re, t, indice = Search.Search().Search_Name(var, aux[1])
            if re:
                if var[index].value != None and var[indice].value != None:
                    errores.append('Cadena correcta '+string+' ' +
                            str(self.DoOperation(
                                int(var[index].value),
                                simbol, int(var[indice].value))))
                else:
                    errores.append('Error varibale sin valor '+string)
            else:
                errores.append('Error Variable no declarada '+string)

    def DoOperation(self, data1, l, data2):
        if '<' in l and ('=' in l or '>' in l) == False:
            return data1 < data2
        if '>' in l and ('=' in l or '<' in l) == False:
            return data1 > data2
        if '<=' in l:
            return data1 <= data2
        if '>=' in l:
            return data1 >= data2
        if '<>' in l:
            return data1 != data2
        if '==' in l:
            return data1 == data2
        pass

    def CheckTypes(self, l):
        simbol = ''
        if '<' in l and ('=' in l or '>' in l) == False:
            simbol = '<'
        if '>' in l and ('=' in l or '<' in l) == False:
            simbol = '>'
        if '<=' in l:
            simbol = '<='
        if '>=' in l:
            simbol = '>='
        if '<>' in l:
            simbol = '<>'
        if '==' in l:
            simbol = '=='
        return simbol

    def IsNumber(self, value):
        for e in value:
            if (e in alphabet.Alphabet().NumberDecimal()) == False:
                return False
        return True

    def SintaxLogic(self, cadena):
        c = [0, 0, 0, 0, 0, 0]
        s = [0, 0, 0, 0, 0, 0]

        s[0] = len(list(filter(None, cadena.split('<'))))
        s[1] = len(list(filter(None, cadena.split('>'))))
        s[2] = len(list(filter(None, cadena.split('<='))))
        s[3] = len(list(filter(None, cadena.split('>='))))
        s[4] = len(list(filter(None, cadena.split('=='))))
        s[5] = len(list(filter(None, cadena.split('<>'))))

        if len(cadena) < 3:
            return False
        for letra in cadena:
            if letra == '<':
                c[0] = c[0]+1
            if letra == '>':
                c[1] = c[1]+1
        for x in range(len(cadena)-1):
            if cadena[x]+''+cadena[x+1] == '<=':
                c[2] = c[2]+1
            if cadena[x]+''+cadena[x+1] == '>=':
                c[3] = c[3]+1
            if cadena[x]+''+cadena[x+1] == '==':
                c[4] = c[4]+1
            if cadena[x]+''+cadena[x+1] == '<>':
                c[5] = c[5]+1
        if(c[0] == 1 and c[1] == 0 and c[2] == 1 and c[3] == 0 and c[4] == 0 and c[5] == 0 and s[2] == 2):
            return True
        if(c[0] == 1 and c[1] == 1 and c[2] == 0 and c[3] == 0 and c[4] == 0 and c[5] == 1 and s[5] == 2):
            return True
        if(c[0] == 1 and c[1] == 0 and c[2] == 0 and c[3] == 0 and c[4] == 0 and c[5] == 0 and s[0] == 2):
            return True
        if(c[0] == 0 and c[1] == 1 and c[2] == 0 and c[3] == 1 and c[4] == 0 and c[5] == 0 and s[3] == 2):
            return True
        if(c[0] == 0 and c[1] == 1 and c[2] == 0 and c[3] == 0 and c[4] == 0 and c[5] == 0 and s[1] == 2):
            return True
        if(c[0] == 0 and c[1] == 0 and c[2] == 0 and c[3] == 0 and c[4] == 1 and c[5] == 0 and s[4] == 2):
            return True
        return False
