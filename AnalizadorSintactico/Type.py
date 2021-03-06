import ConvertFormat
import Search
import Variables
import ReservedWords


class Type:
    def types(self, Trees, l, errores, var):
        correct = False
        for d in Trees:
            sr = ConvertFormat.ConvertFormat(l).Convert()
            if sr != False:
                result = d.PostOrder(d.root, sr)
                if result == None:
                    correct = True
                    if Search.Search().SearchTheVar(var, l) == True:
                        errores.append(
                            'Error la variable ya ha sido declarada anteriormente '+l)
                    else:
                        au = l.split(' ')
                        if ReservedWords.ReservedWord().IsReservedWord(au[1]):
                            errores.append(
                                'Error no puedes nombrar a una varibale con una palabra reservada '+l)
                        else:
                            var.append(Variables.Variables(au[0], au[1], self.AsignarValores(au[0])))
                            errores.append('Cadena correcta '+l)
                        break
            else:
                correct = False
        if correct == False:
            errores.append('Error en '+l+' Error de tipo')
        return errores, var
    def AsignarValores(self,valor):
        if valor=='String':
            return ''
        if valor=='int':
            return '0'
        if valor=='float':
            return '0.0'
