# Booking Requirements

Status: OWNER INPUT REQUIRED

## Required before implementation

- Services, prices, durations, add-ons and removals.
- Staff, specialties, schedules and concurrent capacity.
- Buffers, lead time, walk-ins and overbooking rules.
- Rescheduling, cancellation, late/no-show and deposit policies.
- Payment methods, refunds and reconciliation.
- Inspiration-image upload rules.
- Confirmation and reminder channels.

## Architectural rule

The marketing site must not depend directly on one provider's internal model. Use a booking adapter/handoff boundary so a widget, hosted page or custom scheduler can be replaced.
