import { z } from "zod";

import {
  createManualHandoffs,
  ManualHandoffAdapter,
} from "@/src/domain/booking";

const productionBookingModeSchema = z.literal("manual-handoff");

export type ProductionBookingMode = z.infer<typeof productionBookingModeSchema>;

export function readProductionBookingMode(
  env: NodeJS.Dict<string> = process.env,
): ProductionBookingMode {
  const parsed = productionBookingModeSchema.safeParse(
    env.BOOKING_MODE ?? "manual-handoff",
  );
  return parsed.success ? parsed.data : "manual-handoff";
}

export function createProductionAdapter(
  phoneE164: string,
): ManualHandoffAdapter {
  return new ManualHandoffAdapter(createManualHandoffs(phoneE164));
}
