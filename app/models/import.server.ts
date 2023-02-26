import type { Import } from "@prisma/client";
import type { CreateImportInterface } from "~/commons/type";
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
