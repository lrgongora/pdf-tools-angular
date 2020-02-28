const express    = require('express');
      bodyParser = require('body-parser');
      path       = require('path');
      app        = express();
      port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/pdf-tools/'));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/dist/pdf-tools/index.html'));
})

app.listen(port)
