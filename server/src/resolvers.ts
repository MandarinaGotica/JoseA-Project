import { Users } from './Entities/User'

export const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await Users.find();
        return users;
      } catch (error: any) {
        throw new Error(`Error fetching users: ${error.message}`);
      }
    },
    getUserByEmail: async (_: any, { email }: { email: string }) => {
      try {
        const user = await Users.findOne({ where: { email } });
        return user;
      } catch (error: any) {
        throw new Error(`Error fetching user by email: ${error.message}`);
      }
    },
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      try {
        const newUser = await Users.create(args).save();
        return newUser;
      } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
    updateUser: async (_: any, args: any) => {
      const { id, ...userData } = args;
      try {
        await Users.update({ id }, userData);
        const updatedUser = await Users.findOne(id);
        return updatedUser;
      } catch (error: any) {
        throw new Error(`Error updating user: ${error.message}`);
      }
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      try {
        const userToDelete = await Users.findOne(id);
        await Users.delete(id);
        return userToDelete;
      } catch (error: any) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
    },
    loginUser: async (_: any, { email, password }: { email: string, password: string }) => {
      try {
        const user = await Users.findOne({ where: { email, password } });
        return user;
      } catch (error: any) {
        throw new Error(`Error logging in user: ${error.message}`);
      }
    },
    logoutUser: async () => {
      // Implementación del cierre de sesión (si es necesario)
      return "Logout successful";
    },
  },
};