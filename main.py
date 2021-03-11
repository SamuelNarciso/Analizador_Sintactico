import  TreeFloat
import Treeints
import TreeString
import ConvertFormat
from flask import Flask,jsonify,request,render_template
app=Flask(__name__)
@app.route('/', methods=['GET','POST'])
def home():
    if request.method=='POST':
        texto_crudo=str(request.form['txtArea'])
        aux=texto_crudo.split('\r\n')
        lista=[]
        for x in aux:
            for j in x.split(';'):
                if len(j)>0:
                    lista.append(j)
        Trees=[
                TreeFloat.TreeFloat().CreateTree(),
                TreeString.TreeString().CreateTree(),
                Treeints.TreeInt().CreateTree()
                ]
        errores=[]
        correct=False
        for l in lista:
            for d in Trees:
                sr=ConvertFormat.ConvertFormat(l).Convert()
                if sr!=False:
                    result=d.PostOrder(d.root,sr)
                    if result==None:
                        correct=True
                        errores.append('Cadena correcta '+l)
                        break
                    else:
                        correct=False
            if correct==False:
                errores.append('Error en '+l+' Error de tipo')

        print(errores)
        return render_template('index.html',texto=texto_crudo,error=errores)
    return render_template('index.html')
if __name__=='__main__':
    app.run(debug=True)
