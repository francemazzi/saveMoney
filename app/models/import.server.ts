import type { Import } from "@prisma/client";
import { prisma } from "~/db.server";

/**
 * @description Create a new unassigned import
 * @interface CreateTaskInterface
 * @param name (string) - Import's name
 * @param value (string) - Import's value
 * @param description (string) - Import's description
 * @param category (int) - Import's category
 * @returns the import created
 */
export async function createNewBalnce(request: Import) {
  try {
    const createImport = await prisma.import.create({
      data: request,
    });

    return createImport;
  } catch (e) {
    return e;
  }
}
