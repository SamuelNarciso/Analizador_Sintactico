import Search
import ConvertFormat
import Float


class Check:
    def Check_Var_Var(self, l, T, index, errores, var, temp):
        re, ty, indice = Search.Search().Search_Name(var, temp[1])
        if re == True:
            if T == ty:
                errores.append('Cadena correcta '+l)
                var[index].SetValue(var[indice].value)
                pass
            else:
                errores.append('Error en la asignacion de tipos '+l)
                pass
        else:
            errores.append('Error variable no declarada '+l)
            pass
        return errores, var

    def Check_Var_Value(self, l, AssignTree, errores, var, index, T, temp):
        sr = ConvertFormat.ConvertFormat(l).OrdenAssign()
        sr.append(';')
        print(sr)
        if T == 'float':
            sr = Float.Float().Convert(sr[2], sr)
        if T == 'String':
            St = sr[2]
            sr.insert(2, St.pop(0))
            sr.insert(len(sr)-1, St.pop())
        trunk = AssignTree[T]
        if trunk.PostOrder(trunk.root, sr) == None:
            errores.append('Cadena correcta '+l)
            # Change The Value of the var in de array
            var[index].SetValue(temp[1])
        else:
            errores.append('Error en la asignacion de valores en '+l)
        return errores, var
