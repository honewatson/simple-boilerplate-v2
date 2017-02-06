import {quote} from './utils';

const helloWorld = (str: string): string =>
    quote(str);

helloWorld('Hello Monkey!');