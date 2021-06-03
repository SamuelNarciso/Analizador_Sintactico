const express = require("express");
const app = express();

app.get("/:path?", (req, res) => {
    const resolverPostfija = require("./postfija");
    let operacion = req.params.path;
    let opc = "";
    for (let i in operacion) {
        if (operacion.charAt(i) === "_") {
            opc += "/";
        } else {
            opc += operacion.charAt(i);
        }
    }
    console.log(opc);
    const data = resolverPostfija(opc);
    res.json({operacion: data});
});

app.listen(3000, () => console.log("Server running on port 3000"));
