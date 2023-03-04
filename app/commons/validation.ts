//zod
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const importValidator = withZod(
  z.object({
    import: z.preprocess(
      (arg) => {
        if (arg && arg != "" && typeof arg == "string") return Number(arg);
      },
      z
        .number({
          required_error: "Value required" as string,
        })
        .min(0, { message: "The value must be positive" as string })
    ),
    // import: z.number(),
    name: z.string().min(1, {
      message: "Campo non corretto" as string,
    }),
    userId: z.string().min(1, {
      message: "Campo non corretto" as string,
    }),
    category: z.any().optional(),
    categoryInput: z.any().optional(),
    entry: z.any(),
  })
);
