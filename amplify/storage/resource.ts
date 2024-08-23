import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'images',
  access: (allow) => ({
    'media/*': [allow.guest.to(['read', 'write', 'delete'])]
  }),
});