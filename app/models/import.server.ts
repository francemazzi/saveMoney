import type { Import } from "@prisma/client";
import type {
  CreateImportInterface,
  UserImportInterface,
} from "~/commons/type";
import { prisma } from "~/db.server";

/**
 * @description Create a new unassigned import
 * @param name (string) - Import's name
 * @param value (string) - Import's value
 * @param entry (boolean) - Set if import is positive (true) or negative (false)
 * @param fixed (boolean) - Set if import is fixed (like every month update or not)
 * @param update_date (date stamp) - Set the date when import is automatically added
 * @param start_date (date stamp) -  If it's a fixed import set the start import
 * @param due_date (date stamp) -  If it's a fixed import set the end of import
 * @param description (string) - Import's description
 * @param category (string) - Import's category
 * @returns the import created
 */
export async function createNewImport(request: CreateImportInterface) {
  try {
    const createImport = await prisma.import.create({
      data: request,
    });

    return createImport;
  } catch (e) {
    throw e;
  }
}

/**
 * @description Find all import
 * @returns an array containing all the imports found
 */
export async function getImports() {
  try {
    const imports = await prisma.import.findMany();
    return imports || [];
  } catch (e) {
    throw e;
  }
}

/**
 * @description Find  import from category import
 * @param category - Imports category data
 * @returns  import related to category or null
 */
export async function getCategoryFromImport(category: Import["category"]) {
  try {
    const imports = await prisma.import.findMany({
      where: { category },
    });
    return imports || [];
  } catch (e) {
    throw e;
  }
}

/**
 * @description Assign an existent import to a user
 * @interface UserImportInterface
 * @param importId (cuid) - Import's id
 * @param userId (cuid) - User's id
 * @returns true if the process is succesfull
 */
export async function assignTaskToUser(request: UserImportInterface) {
  await prisma.user.update({
    where: {
      id: request.userId,
    },
    data: {
      imports: {
        create: {
          imports: {
            connect: { id: request.importId },
          },
        },
      },
    },
  });
}
