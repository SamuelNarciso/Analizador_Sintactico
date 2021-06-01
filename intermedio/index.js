
const express = require("express");
const app = express();


app.get('/:path?', (req, res) => {
    const resolverPostfija = require('./postfija')
    const data = resolverPostfija(req.params.path)
    res.json({operacion: data})
})
app.listen(3000, () => console.log('Server running on port 3000'))
