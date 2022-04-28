import type { ValidationOptions } from 'class-validator';
import {
  IsPhoneNumber as isPhoneNumber,
  registerDecorator,
} from 'class-validator';

export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
        },
      },
    });
  };
}

export function IsPhoneNumber(
  validationOptions?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
  },
): PropertyDecorator {
  return isPhoneNumber(validationOptions?.region, {
    message: 'error.phoneNumber',
    ...validationOptions,
  });
}
