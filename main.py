import  TreeFloat
import Treeints
import TreeString
import ConvertFormat
import Search
import Type
import Float
from flask import Flask,jsonify,request,render_template
app=Flask(__name__)
#Trees for declare vars
Trees=[
        TreeFloat.TreeFloat().CreateTree(),
        TreeString.TreeString().CreateTree(),
        Treeints.TreeInt().CreateTree()
        ]
#Tree to assign a valor to a var
AssignTree={
        'int':Treeints.TreeInt().TreeAssign(),
        'String':TreeString.TreeString().TreeAssign(),
        'float':TreeFloat.TreeFloat().TreeAssign()
        }

#Home route of the server 
@app.route('/', methods=['GET','POST'])
def home():
    if request.method=='POST':
        data=request.get_json()#Get Data from JS
        aux=data['cadena'].split('\n')
        lista=[]
        for x in aux:
            for j in x.split(';'):
                if len(j)>0:
                    lista.append(j)
        errores=[]
        var=[]
        for l in lista:
            #see if the var has a value like a=10
            if '=' in list(l):
                temp=l.split('=')
                if len(temp)>2:
                    errores.append('Error systaxis '+l)
                else:
                    #we hake to check if the var has already been in the list
                    result,T,index=Search.Search().Search_Name(var,temp[0])
                    if result==True:
                        #Make de tree by the type of the data
                        sr=ConvertFormat.ConvertFormat(l).OrdenAssign()
                        sr.append(';')
                        if T=='float':
                            sr=Float.Float().Convert(sr[2],sr)
                        if T=='String':
                            St=sr[2]
                            sr.insert(2,St.pop(0))
                            sr.insert(len(sr)-1,St.pop())
                        trunk=AssignTree[T]
                        if trunk.PostOrder(trunk.root,sr)==None:
                            errores.append('Cadena correcta '+l)
                            #Change The Value of the var in de array
                            var[index].SetValue(temp[1])
                        else:
                            errores.append('Error en la asignacion de valores en '+l)
                    else:
                        errores.append('Error variable no declarada '+ l)
            else:
                errores,var=Type.Type().types(Trees,l,errores,var)
        return jsonify({'mensajes':errores})
    return render_template('index.html')
if __name__=='__main__':
    app.run(debug=True)
