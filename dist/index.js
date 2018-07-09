'use strict';

require('./config/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.get('/usuario', function (req, res) {
  res.json({
    message: 'GET usuario'
  });
});

app.post('/usuario', function (req, res) {
  res.json({
    message: 'POST usuario'
  });
});

app.put('/usuario/:id', function (req, res) {
  res.json({
    message: 'PUT usuario'
  });
});

app.delete('/usuario/:id', function (req, res) {
  res.json({
    message: 'DELETE usuario'
  });
});

app.listen(process.env.PORT, function () {

  console.log('Server running on port : ' + process.env.PORT);
});
//# sourceMappingURL=index.js.map