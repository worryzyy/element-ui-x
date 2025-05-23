/**
 * Mixins 入口文件
 */

import recordMixin from './recordMixin';
import { createSendUtils, sendMixin, XRequest } from './sendMixin';
import {
  createStreamUtils,
  DEFAULT_KV_SEPARATOR,
  DEFAULT_PART_SEPARATOR,
  DEFAULT_STREAM_SEPARATOR,
  isValidString,
  splitPart,
  splitStream,
  streamMixin,
  XStream,
} from './streamMixin';

export {
  createSendUtils,
  createStreamUtils,
  DEFAULT_KV_SEPARATOR,
  DEFAULT_PART_SEPARATOR,
  DEFAULT_STREAM_SEPARATOR,
  isValidString,
  recordMixin,
  sendMixin,
  splitPart,
  splitStream,
  streamMixin,
  XRequest,
  XStream,
};

export default {
  recordMixin,
  sendMixin,
  XRequest,
  createSendUtils,
  streamMixin,
  createStreamUtils,
  XStream,
  splitStream,
  splitPart,
  isValidString,
  DEFAULT_STREAM_SEPARATOR,
  DEFAULT_PART_SEPARATOR,
  DEFAULT_KV_SEPARATOR,
};
