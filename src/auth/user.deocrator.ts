import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((_data, req) => {
  return req.user;
});
