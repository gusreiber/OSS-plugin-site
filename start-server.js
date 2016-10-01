import { server } from 'universal-webpack';
import settings from './universal-webpack-settings';
// `configuration.context` and `configuration.output.path` are used
import configuration from './webpack.config';

server(configuration, settings);
