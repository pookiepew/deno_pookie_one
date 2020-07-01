import { getUserCollection } from '../helpers/db.ts';

export class User {

  static async findAll() {
    try {
      const users = await getUserCollection()!.find();
      return users;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to fetch users!');
    }
  }
}