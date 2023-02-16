import { Account, Image, User } from '../../types';
import { Row } from '../components';

export const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => {
  const userIdImageMap: Record<string, string> = images.reduce((acc, user) => {
    return {
      ...acc,
      [user.userID]: user.url,
    };
  }, {});

  const userIdAccountDataMap: Record<
    string,
    Omit<Account, 'userID'>
  > = accounts.reduce((map, { userID, posts, payments }) => {
    return {
      ...map,
      [userID]: { posts, payments },
    };
  }, {});

  return users.map(({ userID, country, username, name }) => {
    const lastPayments =
      userIdAccountDataMap[userID]?.payments.at(-1)?.totalSum || 0;
    return {
      username,
      country,
      name,
      lastPayments,
      avatar: userIdImageMap[userID],
      posts: userIdAccountDataMap[userID]?.posts,
    };
  }, {});
};
