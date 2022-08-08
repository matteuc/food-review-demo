import * as express from 'express';
import * as cors from 'cors';
import { ApiRoutes, Message } from '@food-review-demo/api-interfaces';
import { environment } from './environments/environment';
import * as bodyParser from "body-parser"

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(
  cors({
    origin: environment.clientUrl,
  })
);

app.post(ApiRoutes.SubmitSurvey, (req, res) => {
  // TODO
  console.log({body: req.body})

  res.send({});
});

app.get(ApiRoutes.GetSurveyData, (req, res) => {
  // TODO
  console.log({params: req.params})

  res.send({});
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
