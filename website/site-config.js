/**
 * Sitebeheer — 't Vlutterke
 * ========================
 * Pas dit bestand aan, commit & push → live.
 *
 * ANALYTICS
 * ---------
 * provider: "none" | "goatcounter" | "plausible"
 * id:
 *   - goatcounter → site-code (maak gratis account op https://www.goatcounter.com)
 *   - plausible   → domein, bv. "oersekippies.github.io"
 *
 * PARTNERS
 * --------
 * status: "live" | "limited" | "off"
 *   live     → tonen volgens tier
 *   limited  → alleen naam + link (heel beperkt), ongeacht tier
 *   off      → niet tonen
 *
 * tier: "basic" | "featured"
 *   basic    ≈ €50/jaar  — compacte vermelding
 *   featured ≈ €150/jaar — grotere plek, tekst, beeld, knop
 */
window.VLUTTERKE = {
  analytics: {
    provider: "goatcounter",
    id: "vlutterke",
  },

  partnerEmail: "",

  partners: [
    {
      id: "zoo-veldhoven",
      status: "off",
      tier: "featured",
      name: "Zoo Veldhoven",
      tagline: "Op de plek van de oude camping",
      description:
        "Waar vroeger tenten stonden, ontdek je nu vogels, makis en een bamboo jungle. Dé bestemming voor een dagje uit in Oerle.",
      url: "https://www.zooveldhoven.nl/",
      image: "assets/images/zoo-ingang.jpg",
      cta: "Naar Zoo Veldhoven",
    },
    {
      id: "geitenboerke",
      status: "off",
      tier: "basic",
      name: "'t Geitenboerke",
      tagline: "Geitenboerderij & zorgboerderij in Oerle",
      description:
        "Melkgeiten, producten en rondleidingen aan de Toterfout — om de hoek van de Vlut.",
      url: "https://geitenboerke.nl/",
      image: "",
      cta: "Naar 't Geitenboerke",
    },
    {
      id: "dorpsgenot",
      status: "off",
      tier: "basic",
      name: "Gasterij 't Dorpsgenot",
      tagline: "Eten & drinken naast de geitenboerderij",
      description: "Horeca in Oerle, onder meer met producten van 't Geitenboerke.",
      url: "https://geitenboerke.nl/geitenboerderij/",
      image: "",
      cta: "Meer info",
    },
  ],
};
