// === Async/Await: Bestell-Pipeline mit individuellen Exceptions ===
// Lektion 2026-09-23, 5akif — Runtime ist Deno: deno run demo.ts
// Deno führt TypeScript direkt aus; Typ-Prüfung: deno check demo.ts

// --- Stufe 0: eigene Error-Typen (je Pipeline-Stufe einer) ---
class ValidationError extends Error {
    constructor(artikel: string, menge: number) {
        super(`Ungültige Bestellung: ${menge}x "${artikel}"`);
        this.name = "ValidationError";
    }
}

class PaymentError extends Error {
    constructor(karte: string) {
        super(`Zahlung fehlgeschlagen: Karte ${karte} abgelehnt`);
        this.name = "PaymentError";
    }
}

class ShippingError extends Error {
    constructor(plz: string) {
        super(`Lieferung nicht möglich: PLZ ${plz} außerhalb des Lieferraums`);
        this.name = "ShippingError";
    }
}

class ClaimError extends Error {
    constructor(zufriedenheit: number) {
        super(`Reklamation: ${zufriedenheit}/10 Zufriedenheit, bitte prüfen`);
        this.name = "ClaimError";
    }
}

// --- Daten-Form: Auftrag (Input) wird zur Bestellung (durchgereicht) ---
interface Auftrag {
    artikel: string;
    menge: number;
}

interface Bestellung extends Auftrag {
    nr: number;
    zahlung?: string;
    tracking?: string;
    reklamation?: string;
}

// --- Hilfsbaukasten: simulate(ms, wert) -> Promise ---
const simulate = <T>(ms: number, wert: T): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(wert), ms));

// --- Hilfsfunktion: Exception lesbar machen (err ist in catch: unknown) ---
const fehlerText = (err: unknown): string =>
    err instanceof Error ? err.message : String(err);

// --- Pipeline-Stufen: jede wirft ihre eigene Exception ---
async function bestellen(artikel: string, menge: number): Promise<Bestellung> {
    const bestellNr = await simulate(300, { nr: 4711, artikel, menge });
    if (menge <= 0) {
        throw new ValidationError(artikel, menge);
    }
    console.log(`✓ Bestellung ${bestellNr.nr}: ${menge}x ${artikel}`);
    return bestellNr;
}

async function bezahlen(bestellung: Bestellung, karte: string): Promise<Bestellung> {
    if (karte === "4242-0000-0000-0002") {
        throw new PaymentError(karte);
    }
    const zahlung = await simulate(400, { id: "pay-99", betrag: bestellung.menge * 19.9 });
    console.log(`✓ Bezahlung ok (${zahlung.id}, ${zahlung.betrag.toFixed(2)} €)`);
    return { ...bestellung, zahlung: zahlung.id };
}

async function liefern(bestellung: Bestellung, plz: string): Promise<Bestellung> {
    if (plz.startsWith("9")) {
        throw new ShippingError(plz);
    }
    const lieferung = await simulate(300, { tracking: "AT-8812", plz });
    console.log(`✓ Lieferung an ${plz} unterwegs (${lieferung.tracking})`);
    return { ...bestellung, tracking: lieferung.tracking };
}

async function reklamieren(bestellung: Bestellung, zufriedenheit: number): Promise<Bestellung> {
    if (zufriedenheit < 0 || zufriedenheit > 10) {
        throw new Error(`Der Zufriedenheitswert ${zufriedenheit} sollte zwischen 0 und 10 sein`);
    }
    if (zufriedenheit < 5) {
        throw new ClaimError(zufriedenheit);
    }
    const reklamation = await simulate(300, { id: "claim-01", zufriedenheit });
    return { ...bestellung, reklamation: reklamation.id };
}


// --- Variante B: granular — jedes await eigenes try/catch, Weiterarbeit möglich ---
async function pipelineGranular(auftrag: Auftrag, karte: string, plz: string, zufriedenheit: number): Promise<void> {
    let b: Bestellung;
    try {
        b = await bestellen(auftrag.artikel, auftrag.menge);
    } catch (err) {
        console.log(`🛑 Abbruch: ${fehlerText(err)}`);
        return;
    }

    try {
        b = await bezahlen(b, karte);
    } catch (err) {
        console.log(`⚠️  Bezahlung fehlgeschlagen (${fehlerText(err)}) — andere Karte versuchen?`);
        b = await bezahlen(b, "4242-1111-1111-1111"); // Fallback-Karte
    }

    try {
        b = await liefern(b, plz);
    } catch (err) {
        console.log(`⚠️  Lieferung fehlgeschlagen (${fehlerText(err)})`);
        throw err; // Re-Throw: oben will das Ganze noch jemand sehen
    }
    try {
        b = await reklamieren(b, zufriedenheit);
    } catch (err) {
        console.log(`⚠️  Reklamation: ${fehlerText(err)}`);
    }
}



// --- Hauptprogramm: 4 Läufe, jeder zeigt ein anderes Fangen ---
const hauptprogramm = async (): Promise<void> => {
    // Lauf 3: granulare Variante B — PaymentError gefangen, Fallback greift, ShippingError Re-Throw
    try {
        await pipelineGranular({ artikel: "Webcam", menge: 1 }, "3242-0000-0000-0002", "1100", 3);
    } catch (err) {
        console.log(`🛑 Hauptprogramm fängt Re-Throw: ${err instanceof Error ? err.name : String(err)}`);
    }

};

hauptprogramm();
