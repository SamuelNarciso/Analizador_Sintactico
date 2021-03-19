import ConvertFormat
import Search
import Variables

class Type:
    def types(self,Trees,l,errores,var):
        correct=False
        for d in Trees:
            sr=ConvertFormat.ConvertFormat(l).Convert()
            if sr!=False:
                result=d.PostOrder(d.root,sr)
                if result==None:
                    correct=True
                    if  Search.Search().SearchTheVar(var,l)==True:
                        errores.append('Error la variable ya ha sido declarada anteriormente '+l)
                    else:
                        au=l.split(' ')
                        var.append(Variables.Variables(au[0],au[1],None))
                        errores.append('Cadena correcta '+l)
                        break
            else:
                correct=False
        if correct==False:
            errores.append('Error en '+l+' Error de tipo')
        return errores,var
