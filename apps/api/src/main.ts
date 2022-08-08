import * as express from 'express';
import * as cors from 'cors';
import {
  ApiRoutes,
  GetSurveyDataApiType,
  SubmitSurveyApiType,
} from '@food-review-demo/api-interfaces';
import { environment } from './environments/environment';
import * as bodyParser from 'body-parser';

const app = express();

app.use(
  // parse application/x-www-form-urlencoded
  bodyParser.urlencoded({ extended: false }),
  // parse application/json
  bodyParser.json(),
  cors({
    origin: environment.clientUrl,
  })
);

app.post<
  ApiRoutes.SubmitSurvey,
  any,
  SubmitSurveyApiType['response'],
  SubmitSurveyApiType['payload']
>(ApiRoutes.SubmitSurvey, (req, res) => {
  const survey = req.body.survey;

  // TODO - Save survey data for the specified user
  console.log({ survey });

  res.json({
    responseId: '',
  });
});

app.get<
  ApiRoutes.GetSurveyData,
  GetSurveyDataApiType['payload'],
  GetSurveyDataApiType['response']
>(ApiRoutes.GetSurveyData, (req, res) => {
  // TODO - Get survey data for today
  console.log({ params: req.params });

  res.json({
    responses: [],
  });
});

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});

server.on('error', console.error);
