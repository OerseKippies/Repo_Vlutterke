# Buurtpartners — beheer

Alles via `website/site-config.js`. Daarna: commit + push → live.

## Status per partner

| `status` | Effect |
|----------|--------|
| `live` | Zichtbaar volgens `tier` |
| `limited` | Alleen naam + link (heel beperkt) |
| `off` | Niet tonen |

## Staffels

| `tier` | Richtprijs | Wat ze krijgen |
|--------|------------|----------------|
| `basic` | €50 / jaar | Compacte vermelding: naam, korte regel, link |
| `featured` | €150 / jaar | Grote plek: badge, langere tekst, beeld, knop |

`limited` wint altijd van `tier`: ook een featured-partner wordt dan een kale link.

## Voorbeeld: partner live zetten

```js
{
  id: "zoo-veldhoven",
  status: "live",   // was "off"
  tier: "featured",
  ...
}
```

## Analytics

In `site-config.js`:

```js
analytics: {
  provider: "goatcounter", // of "plausible" / "none"
  id: "vlutterke",
}
```

1. Maak een gratis site op [GoatCounter](https://www.goatcounter.com) met code `vlutterke`
2. Domein toestaan: `oersekippies.github.io`
3. Stats: https://vlutterke.goatcounter.com

Zet `provider: "none"` om tracking uit te zetten.
