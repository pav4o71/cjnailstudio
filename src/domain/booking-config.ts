import { z } from "zod";

import {
  createManualHandoffs,
  ManualHandoffAdapter,
  PavellsWidgetAdapter,
  type BookingAdapter,
} from "@/src/domain/booking";
import { readPavellsBookingConfig } from "@/src/domain/pavells-booking";

const productionBookingModeSchema = z.enum([
  "manual-handoff",
  "embedded-widget",
]);

export type ProductionBookingMode = z.infer<typeof productionBookingModeSchema>;

export function readProductionBookingMode(
  env: NodeJS.Dict<string> = process.env,
): ProductionBookingMode {
  const parsed = productionBookingModeSchema.safeParse(
    env.BOOKING_MODE ?? "embedded-widget",
  );
  return parsed.success ? parsed.data : "manual-handoff";
}

export function createProductionAdapter(
  phoneE164: string,
  env: NodeJS.Dict<string> = process.env,
): BookingAdapter {
  const mode = readProductionBookingMode(env);
  if (mode === "embedded-widget") {
    const config = readPavellsBookingConfig();
    if (config) {
      return new PavellsWidgetAdapter(config);
    }
  }

  return new ManualHandoffAdapter(createManualHandoffs(phoneE164));
}
