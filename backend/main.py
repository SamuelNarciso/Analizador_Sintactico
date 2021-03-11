from flask import Flask,jsonify,request
app=Flask(__name__)
@app.route('/', methods=['POST'])
def home():
    aux=request.json['cadenas']
    return  aux
if __name__=='__main__':
    app.run(debug=True)
