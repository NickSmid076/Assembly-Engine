import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>Als we een kantoor helpen, raden we zelden een nieuw pakket aan. Meestal koppelen we wat er al is. Dat is een bewuste keuze, en hieronder leggen we uit waarom. En ook wanneer we toch adviseren om te vervangen.</p>

<h2>Uw administratie is al digitaal. De gaten zitten ertussen</h2>
<p>Bij ongeveer twee derde van het Nederlandse mkb lopen boekhouding en salarisadministratie al via software (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>). Nederlandse bedrijven horen volgens het CBS zelfs bij de top drie van de EU als het om digitalisering gaat (<a href="https://www.cbs.nl/en-gb/news/2026/14/dutch-firms-in-top-three-in-eu-for-digitalisation-dutch-population-has-best-digital-skills-in-the-eu">CBS, maart 2026</a>).</p>
<p>Aan software is dus meestal geen gebrek. Wat ontbreekt, zijn de verbindingen tussen de pakketten. Een klant komt binnen via het contactformulier, wordt met de hand in het CRM gezet, krijgt een offerte uit Word en een factuur uit het boekhoudpakket. Vier systemen, en tussen elk paar zit iemand die overtypt.</p>

<h2>Wat een nieuw pakket kost</h2>
<p>De licentie is het kleinste deel. Een nieuw pakket betekent een extra login voor iedereen, een extra plek waar klantgegevens staan, en een nieuwe gewoonte die het team moet aanleren.</p>
<p>Kleine bedrijven (tot vijftig medewerkers) gebruiken gemiddeld al zo'n 36 apps (Okta, 2024). Gemiddeld is maar 27% van de apps in een organisatie met elkaar verbonden (MuleSoft, 2026). En werknemers verliezen bijna vier uur per week aan het wisselen tussen programma's (Harvard Business Review, 2022). Alle drie de cijfers komen via het overzicht van <a href="https://www.toriihq.com/saas-statistics">Torii</a>. <mark>[CHECK: verify the Okta 2024, MuleSoft 2026 and HBR 2022 figures in the original reports; we only saw them via Torii]</mark></p>
<!--block:stat-->

<p>Elk nieuw pakket maakt die getallen groter. Daarom kijken we eerst of wat u al heeft het werk kan doen.</p>
<p>Een voorbeeld, met een fictief kantoor van acht mensen. Het neemt een apart pakket voor klantcommunicatie. Iedereen krijgt een nieuwe login. Klantgegevens staan voortaan in het boekhoudpakket, in het CRM en in het nieuwe pakket, en na een paar maanden klopt het adres van een klant op een van de drie plekken niet meer. Twee collega's mailen toch gewoon vanuit Outlook. Het pakket zelf was prima. Het paste alleen niet bij hoe het kantoor werkte.</p>


<!--block:copies-->
<h2>Waarom kantoren een overstap uitstellen, en waarom dat vaak verstandig is</h2>
<p>Uit IT-onderzoek van de SRA blijkt dat kantoren een overstap naar nieuwe software vaak uitstellen, omdat de huidige software nog werkt of omdat een overstap de werkprocessen zou verstoren (via <a href="https://www.accountancyvanmorgen.nl/2025/07/03/ict-accountancy-2025-trends-cijfers-en-knelpunten-in-de-sector/">Accountancy van Morgen</a>).</p>
<p>Wij vinden dat vaak verstandig. Een migratie kost maanden, de data moet over, en in de tussentijd draait het kantoor half op het oude en half op het nieuwe systeem. Als uw pakket doet wat het moet doen, is dat geld en die onrust vaak beter besteed aan de verbindingen ertussen.</p>

<h2>Wat koppelen in de praktijk betekent</h2>
<p>Koppelen betekent dat gegevens die op één plek worden ingevoerd, automatisch doorlopen naar de plek waar ze daarna nodig zijn. Een paar voorbeelden van wat we bouwen, met software die veel kantoren al hebben:</p>
<ul>
<li>Een aanvraag via het contactformulier komt als contact en deal in HubSpot, met een taak voor de juiste collega.</li>
<li>Een getekende offerte maakt in Moneybird of Exact Online een klant en een eerste factuur aan, met een betaallink van Mollie erin.</li>
<li>Een nieuwe klant krijgt automatisch een map in Microsoft 365 of Google Workspace, met de vaste structuur van uw kantoor.</li>
<li>Een afspraak die via Cal.com wordt geboekt, komt in de juiste agenda en zet de voorbereiding klaar.</li>
<li>Cijfers uit het boekhoudpakket lopen elke nacht door naar een rapportage in Power BI.</li>
</ul>
<p><mark>[CHECK: confirm each named tool has the API or connector described here (Exact Online, Moneybird, Twinfield, Mollie, HubSpot, Cal.com, Power BI)]</mark></p>
<p>Het team blijft werken in de schermen die het kent. Wat verdwijnt, is het overtypen.</p>
<p>Een koppeling heeft wel onderhoud nodig. Als een leverancier zijn API wijzigt, moet de koppeling mee. Daarom leggen we bij elke koppeling vast welke systemen erin zitten en wat er gebeurt als een stap mislukt: wie krijgt een melding, en wordt het later opnieuw geprobeerd? Wij bouwen die koppelingen meestal in n8n. Waarom, en wanneer een ander hulpmiddel beter past, leest u in <a href="/nl/blog/n8n-vs-make-vs-zapier-for-dutch-firms">n8n, Make of Zapier</a>.</p>


<!--block:flow-->
<h2>Begin met één proces</h2>
<p>Koppelen hoeft geen groot project te zijn. Begin met één proces en de systemen die daarin zitten. Laat de koppeling waar het kan eerst een tijd naast de oude werkwijze lopen, en kijk of de uitkomst klopt. Pas als het team erop vertrouwt, schrapt u de handmatige stap.</p>
<p>Daarna komt het volgende proces. Zo groeit het geheel stap voor stap, en kunt u op elk moment stoppen zonder dat er een half gebouwd systeem blijft liggen. Elke koppeling werkt op zichzelf.</p>
<p>Wat u daarvoor nodig heeft, is meestal weinig: toegang tot de pakketten die u al gebruikt, en iemand op kantoor die weet hoe het proces nu loopt. Die collega is vaak belangrijker dan welke software dan ook, omdat die weet waar de uitzonderingen zitten.</p>

<h2>Eerst gestructureerde, gekoppelde gegevens, daarna AI</h2>
<p>Veel kantoren willen iets met AI. Dat begrijpen we. De CEO van Silverfin zei het in september 2026 zo: gestructureerde data en gekoppelde systemen moeten er eerst zijn, voordat AI iets kan (<a href="https://www.accountant.nl/nieuws/2026/9/voor-zes-op-de-tien-accountants-is-ai-de-grootste-gamechanger-voor-hun-beroep/">Accountant.nl</a>).</p>
<p>Daar zijn we het mee eens. Een AI-hulpmiddel dat klantgegevens uit vier losse systemen bij elkaar moet zoeken, maakt fouten. Als de gegevens al op één plek kloppen, wordt elke volgende stap eenvoudiger, met of zonder AI.</p>

<h2>Wanneer vervangen wel de goede keuze is</h2>
<p>Soms is koppelen de verkeerde keuze. Bijvoorbeeld als:</p>
<ul>
<li>een pakket geen API heeft, zodat elke koppeling een wankele omweg wordt;</li>
<li>de leverancier stopt met het product of geen updates meer uitbrengt;</li>
<li>het pakket niet meer past bij hoe uw kantoor werkt, en uw team er dagelijks omheen werkt;</li>
<li>u twee pakketten heeft die hetzelfde doen, en de dubbele invoer meer kost dan een overstap.</li>
</ul>
<p>Twijfelt u, dan helpt één vraag: als dit pakket morgen verdwijnt, wat zou u dan missen? Is het antwoord "weinig", dan is vervangen misschien beter dan koppelen. Is het antwoord "alles wat erin staat", dan is koppelen meestal verstandiger.</p>
<p>Dan zeggen we dat, en helpen we met de overstap. Maar we beginnen bij wat u al heeft, omdat dat in de meeste gevallen het goedkoopst is en uw team er niets nieuws voor hoeft te leren.</p>
` + auditCta("nl");

export const cover = { alt: "Lijntekening: drie bestaande programmavensters, verbonden met één gedeeld klantrecord." };

export const blocks: PostBlocks = {
  "stat": {
    "acf_fc_layout": "stat",
    "value": "36",
    "label": "apps gebruiken kleine bedrijven met maximaal vijftig medewerkers gemiddeld",
    "source": {
      "title": "Okta 2024, via Torii",
      "url": "https://www.toriihq.com/saas-statistics"
    },
    "note": "Gezien via Torii; nog te controleren in het oorspronkelijke Okta-rapport."
  },
  "copies": {
    "acf_fc_layout": "diagram",
    "src": "/blog/build-on-the-software-you-already-use/one-source.nl.svg",
    "alt": "Voorbeeld met de fictieve klant De Vries Installatie. Links: hetzelfde adres staat in drie pakketten, en in de klantmap staat na een verhuizing nog het oude adres. Rechts: het CRM is de enige bron, en het boekhoudpakket en de klantmap nemen het adres daar automatisch van over.",
    "caption": null,
    "source": null
  },
  "flow": {
    "acf_fc_layout": "flow_diagram",
    "title": "Voorbeeld: één nieuwe klant, vijf systemen, niets overtypen",
    "nodes": [
      {
        "label": "Contactformulier",
        "detail": "Er komt een aanvraag binnen",
        "human": false
      },
      {
        "label": "CRM",
        "detail": "Contact, deal en een taak voor een collega",
        "human": false
      },
      {
        "label": "Boekhoudpakket",
        "detail": "Klant en eerste factuur",
        "human": false
      },
      {
        "label": "Betaallink",
        "detail": "In de factuur",
        "human": false
      },
      {
        "label": "Klantmap",
        "detail": "Aangemaakt met uw vaste indeling",
        "human": false
      }
    ],
    "caption": "Algemene soorten software. Elke stap gebruikt software die het kantoor al heeft."
  }
};
