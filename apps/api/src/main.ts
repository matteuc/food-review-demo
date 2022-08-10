import * as express from 'express';
import * as cors from 'cors';
import {
  ApiRoutes,
  GetSurveyDataApiType,
  SubmitSurveyApiType,
  SurveyResponse,
} from '@food-review-demo/api-interfaces';
import * as bodyParser from 'body-parser';
import { environment } from './environments/environment';

const app = express();

/**
 * TODO
 *
 * Transfer to a more persistent database solution
 *
 * This variable is currently stored in the server's allocated memory
 *
 * If the server shuts down, this data will be lost
 */
const breakfastSurveysByUser: Record<string, Set<SurveyResponse> | undefined> =
  {};

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
  // Path
  ApiRoutes.SubmitSurvey,
  // URL Query Parameters
  any,
  // JSON Response
  SubmitSurveyApiType['response'],
  // JSON Payload
  SubmitSurveyApiType['payload']
>(ApiRoutes.SubmitSurvey, (req, res) => {
  const survey = req.body.survey;

  // If no surveys have been submitted by the specified user...
  if (!breakfastSurveysByUser[survey.userId]) {
    // ... create a surveys Set for this user
    breakfastSurveysByUser[survey.userId] = new Set<SurveyResponse>();
  }

  // Create the survey response
  const surveyResponse: SurveyResponse = {
    // Using the current time as a unique ID
    responseId: Date.now().toString(),
    userId: survey.userId,
    breakfastItem: survey.breakfastItem,
    breakfastRating: survey.breakfastRating,
    createdAt: new Date(),
  };

  // Add the survey response to the user's survey Set
  breakfastSurveysByUser[survey.userId].add(surveyResponse);

  // Return the survey's unique ID
  res.json({
    responseId: surveyResponse.responseId,
  });
});

app.get<
  // Path
  ApiRoutes.GetSurveyData,
  // URL Query Parameters
  GetSurveyDataApiType['payload'],
  // JSON Response
  GetSurveyDataApiType['response']
>(ApiRoutes.GetSurveyData, (req, res) => {
  const surveyResponses: SurveyResponse[] = [];

  Object.keys(breakfastSurveysByUser).forEach((userId) => {
    const surveySet = breakfastSurveysByUser[userId];

    if (surveySet) {
      /**
       * Equivalent to:
       *
       * surveyResponses.push(item1, item2, ...)
       */
      surveyResponses.push(...Array.from(surveySet));
    } else {
      return;
    }
  });

  res.json({
    responses: surveyResponses,
  });
});

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});

server.on('error', console.error);
