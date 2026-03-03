import { z } from 'zod';

export const LeadSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    license: z.string().min(2, "Trading license or Refinery ID is required"),
    annualVolume: z.string().min(1, "Annual volume is required"),
    bankingInstrument: z.enum(['LC', 'SBLC', 'MT103'], {
        errorMap: () => ({ message: "Please select a valid banking instrument" })
    }),
    deliveryRegion: z.string().min(2, "Region of delivery is required"),
    corporateEmail: z.string().email("Valid corporate email is required"),
    ndaAccepted: z.boolean().refine(val => val === true, "NDA must be accepted to proceed")
});

export type LeadFormValues = z.infer<typeof LeadSchema>;
