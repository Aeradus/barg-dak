/**
 * Agent B: Zustand store for Barg Dak's static contact information.
 * Components read from this store instead of hardcoding contact data.
 */

import { create } from "zustand";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BusinessHours {
  label: string;
  description: string;
}

export interface ContactInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  phone: string;
  hours: BusinessHours;
  /** Google Maps embed / directions URL — fill in before going live. */
  mapsUrl: string;
}

interface ContactState {
  contact: ContactInfo;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useContactStore = create<ContactState>()(() => ({
  contact: {
    name: "Barg Dak",
    address: "Boshamerstraat 13",
    postalCode: "3314 XA",
    city: "Dordrecht",
    province: "Zuid-Holland",
    phone: "06 10934885",
    hours: {
      label: "Openingstijden",
      description: "24 uur per dag open",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Boshamerstraat+13+3314+XA+Dordrecht",
  },
}));
