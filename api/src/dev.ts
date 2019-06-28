import './api';
import './websocket';
import './queue';
import { upsertLambdaFunctions } from './modules/aws/services';

upsertLambdaFunctions();
