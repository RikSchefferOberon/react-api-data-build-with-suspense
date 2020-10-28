import { EndpointParams } from '../types';
import { StringifyOptions } from 'query-string';
export declare const formatUrl: (url: string, params?: EndpointParams | undefined, queryStringOpts?: StringifyOptions | undefined) => string;
