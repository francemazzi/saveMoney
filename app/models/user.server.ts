import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UpdateUserIntr, UserImportInterface } from "~/commons/type";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

/**
 * @description Find all import that are assigned to a user
 * @param id (cuid) - User's id from scheme
 * @returns and array containing all the imports connected to the given user
 */
export async function getImportsFromUsers(id: User["id"]) {
  try {
    const imports = await prisma.import.findMany({
      where: {
        users: {
          some: {
            user: { id },
          },
        },
      },
    });
    return imports || [];
  } catch (e) {
    throw e;
  }
}

/**
 * @description Get all import from user
 * @returns An array of imports assigned to sinngle logged user
 */
export async function getImportFromUser(id: User["id"]) {
  try {
    await prisma.user.findMany({
      where: {
        imports: {
          some: {
            imports: { id },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Find all users
 * @returns an array containing all the users found
 */
export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users || [];
  } catch (e) {
    throw e;
  }
}

/**
 * @description Update data of an user
 * @interface UpdateUserInterface
 * @param field (string) - The field is the name tha has to be updated
 * @param value (any) - It's the value to be updated
 * @param id (cuid) - It's the ID of the USER
 * @returns You will get true if it's all ok
 */
export async function updateUserData(request: UpdateUserIntr) {
  try {
    await prisma.user.update({
      where: { id: request.id },
      data: {
        [request.field]: request.value,
      },
    });
    return true;
  } catch (e) {
    throw e;
  }
}
