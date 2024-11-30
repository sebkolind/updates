import { z } from "zod";
import { Provider } from "./types/provider.ts";

const providerSchema = z.nativeEnum(Provider);

function validateProvider(provider: string): Provider {
  const { success, data: name } = providerSchema.safeParse(provider);

  if (!success) {
    const validOptions = Object.values(Provider).join(", ");

    console.error(
      `Invalid provider "${provider}". Please provide one of: ${validOptions}`,
    );
    Deno.exit(1);
  }

  return name;
}

export { validateProvider };
