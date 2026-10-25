import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>Vraag een accountant wat er zwaar is aan het werk en u hoort zelden "het boekhoudpakket". U hoort over de klant die zijn stukken niet aanlevert, de machtiging die nog niet rond is en de controle die elke maand op dezelfde manier met de hand gaat. Daar zit de tijd. Hieronder de vijf klussen waar wij als eerste naar kijken bij een klein kantoor.</p>
<p>Die volgorde is onze eigen keuze, op basis van waar we bij kantoren meestal beginnen. Het is geen ranglijst uit onderzoek, en we weten van geen enkele Nederlandse bron die meet hoeveel uur elke klus kost.</p>

<h2>Het zit in de eindeloze kleine taken</h2>
<p>Vier op de vijf accountancyprofessionals (79%) hebben soms of structureel te veel werk. Een op de vijf (20%) noemt "eindeloze kleine taken" als grootste frustratie (<a href="https://www.accountancyvanmorgen.nl/2025/08/06/vier-op-vijf-accountants-vinden-werkdruk-te-hoog/">Accountancy van Morgen, augustus 2025</a>). <mark>[CHECK: sample size of the survey behind the 79% and 20% (not stated in the article)]</mark> Hetzelfde onderzoek laat zien dat de verwerking van facturen al voor 78% geautomatiseerd is, en rapportages maar voor 38%.</p>
<p>In ander onderzoek combineert 57% van de Nederlandse accountants Excel met handmatige controles voor werkdossiers, jaarrekeningen en rapportages. Dat is het hoogste aandeel van de vijf onderzochte landen; in het Verenigd Koninkrijk is het 31%. En 84% denkt minstens een uur per dag terug te kunnen winnen (<a href="https://www.accountant.nl/nieuws/2026/9/voor-zes-op-de-tien-accountants-is-ai-de-grootste-gamechanger-voor-hun-beroep/">Accountant.nl, onderzoek van Silverfin en Censuswide, september 2026</a>).</p>
<p>Extra mensen aannemen lost het niet op. Bij kantoren met minder dan tien medewerkers staat bijna een kwart van de vacatures open (cijfers van de SRA over 2023, via <a href="https://www.accountancyvanmorgen.nl/2025/07/03/ict-accountancy-2025-trends-cijfers-en-knelpunten-in-de-sector/">Accountancy van Morgen</a>). Wie niet kan bijwerven, moet het werk zelf kleiner maken.</p>


<!--block:stat-->
<h2>1. Klanten achter stukken aan voor de IB en Vpb</h2>
<p>Elk seizoen hetzelfde: een lijst met klanten, een lijst met ontbrekende stukken, en iemand die mailt, belt en nog eens mailt. Dat nabellen is goed te automatiseren. Een klant krijgt een persoonlijke lijst met wat er nog ontbreekt. Wat binnenkomt, wordt afgevinkt. Wie na een week niets heeft gestuurd, krijgt vanzelf een herinnering, en uw medewerker ziet in één overzicht wie er nog openstaat.</p>
<p>Een voorbeeld, met een fictief kantoor: 150 IB-klanten krijgen in februari elk één bericht met een persoonlijke lijst. Na een week krijgt wie nog niets heeft gestuurd een herinnering, na drie weken nog een. Pas daarna belt iemand, en alleen de klanten die dan nog openstaan. Het bellen verdwijnt dus niet. Het wordt een kortere lijst.</p>
<p>Veel pakketten hebben al een portaal of een functie om documenten op te vragen. Vaak ontbreekt alleen de koppeling met het overzicht dat uw kantoor zelf bijhoudt. <mark>[CHECK: current document-request features in Exact, Twinfield, Moneybird and SnelStart before naming any]</mark></p>
<p>Wat een mens blijft doen: beoordelen of de aangeleverde stukken kloppen en compleet zijn. De software weet dat er een jaaropgave is binnengekomen. Of het de goede is, ziet uw medewerker.</p>


<!--block:t1-->
<h2>2. Machtigingen en deadlines bijhouden</h2>
<p>Om vooraf ingevulde aangiftegegevens (VIA) van een IB-klant te ontvangen, heeft u als intermediair een actieve doorlopende machtiging nodig. Voor het afgelopen seizoen moest die uiterlijk 1 november 2026 rond zijn (<a href="https://www.taxlive.nl/nl/documenten/nieuws/deadline-doorlopende-machtiging-via-vervroegd-naar-1-november/">Taxlive</a>; <a href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/intermediairs/aangifte_doen/serviceberichten_aanslag/doorlopende-machtiging-belastingmiddel">Belastingdienst</a>). <mark>[CHECK: the machtiging deadline for the next season (aangiftejaar 2027); don't present 1 Nov 2026 as upcoming]</mark></p>
<p>Zo'n datum hoort niet in iemands hoofd of in een losse Excel-lijst. Een automatisering kan per klant bijhouden of de machtiging er is, wanneer de klant moet reageren en wie er nog een herinnering nodig heeft. Een paar weken voor de deadline krijgt u een lijst met de klanten waarvoor het nog niet rond is. Dezelfde aanpak werkt voor andere vaste termijnen, zoals uitstelregelingen en aangiftedata.</p>


<!--block:t2-->
<h2>3. Bank- en inkoopfactuurregels bijstellen</h2>
<p>Als de boeking van bankmutaties en inkoopfacturen veel handwerk geeft, is de reflex vaak een nieuw pakket of een nieuwe scanner. Meestal ligt het dichterbij. Denk aan de vaste maandelijkse betaling aan de verhuurder van het kantoorpand, de energieleverancier of de leasemaatschappij. Als die niet vanzelf op de juiste grootboekrekening komt, kijkt iemand er twaalf keer per jaar naar. De regels die bepalen hoe een terugkerende betaling of leverancier wordt geboekt, zijn ooit ingesteld en daarna niet meer bijgehouden.</p>
<p>We kijken welke mutaties elke maand met de hand worden geboekt en of daar een vaste regel voor kan komen. Dat is saai werk, en het levert direct iets op in de software die u al heeft. <mark>[CHECK: current bank-rule features in Exact, Twinfield, Moneybird and SnelStart]</mark></p>
<p>Een mens blijft kijken naar wat afwijkt: een nieuwe leverancier, een ongebruikelijk bedrag, een betaling die nergens bij past.</p>


<!--block:t3-->
<h2>4. Controles bij de periodeafsluiting en klantrapportages</h2>
<p>Hier zit volgens de cijfers de grootste achterstand. Rapportage is maar voor 38% geautomatiseerd, en 53% noemt het automatiseren van controles, rapportages en periodeafsluiting de waardevolste vernieuwing (Exact, via <a href="https://www.accountancyvanmorgen.nl/2025/11/27/av-top-50-grote-stappen-in-ontzorgen-accountant/">Accountancy van Morgen, november 2025</a>).</p>
<p>Veel controles zijn elke maand hetzelfde. Sluit de btw-rekening aan? Staan er posten al lang open op de tussenrekening? Wijkt een kostenpost sterk af van vorig jaar? Een automatisering kan die vragen elke maand stellen en de uitkomst klaarzetten. De maandrapportage voor een klant kan op dezelfde manier worden gevuld, zodat uw medewerker alleen nog de toelichting schrijft.</p>
<p>Een voorbeeld van zo'n controle: na elke bankimport kijkt een automatisering of er posten langer dan dertig dagen op de tussenrekening staan, en zet die op een lijst voor de medewerker die het dossier beheert. Die lijst is er elke maand op dezelfde dag, ook in een drukke week.</p>
<p>Het oordeel over wat een afwijking betekent, blijft bij de accountant.</p>


<!--block:t4-->
<h2>5. Periodieke Wwft-reviews inplannen</h2>
<p>De Wwft vraagt dat u klantprofielen periodiek opnieuw beoordeelt. Volgens ComplianceWise, een leverancier van compliancesoftware, horen verlopen identiteitsbewijzen en het ontbreken van periodieke reviews bij de meest gemaakte fouten. Dat is partnercontent van een leverancier, dus lees het met die kanttekening (<a href="https://www.accountancyvanmorgen.nl/2025/07/17/partner-compliancewise-de-9-meest-gemaakte-wwft-compliance-fouten-en-hoe-je-ze-voorkomt/">Accountancy van Morgen, partnerbijdrage ComplianceWise</a>).</p>
<p>Het plannen kan automatisch. Per klant staat vast wanneer de volgende review moet gebeuren en wanneer het identiteitsbewijs verloopt. Een maand vooraf komt de taak bij de juiste persoon terecht, met het dossier erbij. De beoordeling zelf blijft mensenwerk.</p>


<!--block:t5-->
<h2>Zo herkent u ze in uw eigen week</h2>
<p>Een eenvoudige oefening: laat iedereen op kantoor een week lang op een briefje bijhouden welke klussen ze meer dan twee keer op dezelfde manier hebben gedaan. Geen tijdregistratie, alleen een streepje per keer. Na een week ziet u welke klussen steeds terugkomen.</p>
<p>Let daarbij op deze signalen:</p>
<ul>
<li>iemand typt gegevens over van het ene pakket naar het andere;</li>
<li>er bestaat een Excel-lijst die alleen dient om bij te houden wat er nog openstaat;</li>
<li>een collega zegt "dat weet alleen zij", omdat de stappen nergens zijn opgeschreven;</li>
<li>een klus schuift steeds door naar het einde van de maand, omdat hij saai is;</li>
<li>klanten krijgen dezelfde mail, met elke keer een paar andere namen erin.</li>
</ul>
<p>Hoe meer van die signalen bij één klus, hoe groter de kans dat automatiseren iets oplevert. Een klus met maar één signaal is meestal niet de eerste om aan te pakken.</p>


<!--block:map-->
<h2>Waar een mens de baas blijft</h2>
<p>Bij alle vijf klussen loopt dezelfde lijn. De software verzamelt, herinnert, plant en legt vast. Een mens beoordeelt en beslist. Dat is ook de manier waarop het werk overeind blijft als er iets misgaat: iemand ziet het, omdat iemand ernaar kijkt.</p>
<p>Begin bij de klus waar uw kantoor het vaakst over klaagt. Meestal is dat nummer een of twee. Meer over waar de grens ligt leest u in <a href="/nl/blog/what-not-to-automate">wat u beter níet automatiseert</a>.</p>
` + auditCta("nl");

export const cover = { alt: "Lijntekening: vier programmavensters met vijf klussen op de lijnen ertussen." };

export const blocks: PostBlocks = {
  "stat": {
    "acf_fc_layout": "stat",
    "value": "79%",
    "label": "van de Nederlandse accountancyprofessionals heeft soms of structureel te veel werk",
    "source": {
      "title": "Accountancy van Morgen, augustus 2025",
      "url": "https://www.accountancyvanmorgen.nl/2025/08/06/vier-op-vijf-accountants-vinden-werkdruk-te-hoog/"
    },
    "note": "De steekproefgrootte staat niet in het artikel; nog te controleren."
  },
  "t1": {
    "acf_fc_layout": "before_after",
    "variant": "process",
    "title": "Klanten achter stukken aan",
    "before": [
      "Iemand houdt per klant een lijst bij van wat ontbreekt",
      "Mailt en belt elke klant, en mailt opnieuw",
      "Vinkt met de hand af wat binnenkomt"
    ],
    "after": [
      "Elke klant krijgt één bericht met een persoonlijke lijst",
      "Wat binnenkomt, wordt automatisch afgevinkt",
      "Na een week een herinnering, na drie weken nog een",
      "Eén overzicht van wie nog openstaat"
    ],
    "human": "Beoordelen of de stukken kloppen en compleet zijn."
  },
  "t2": {
    "acf_fc_layout": "before_after",
    "variant": "process",
    "title": "Machtigingen en deadlines bijhouden",
    "before": [
      "De deadline zit in iemands hoofd of in een losse Excel-lijst",
      "Machtigingen worden klant voor klant nagelopen"
    ],
    "after": [
      "Per klant: of de machtiging rond is en wanneer de klant moet reageren",
      "Herinneringen aan klanten die niet hebben gereageerd",
      "Een paar weken voor de deadline een lijst van wat nog openstaat"
    ],
    "human": "Bepalen wat er gebeurt met de klanten die nog op de lijst staan."
  },
  "t3": {
    "acf_fc_layout": "before_after",
    "variant": "process",
    "title": "Bank- en inkoopfactuurregels",
    "before": [
      "Vaste betalingen worden elke maand met de hand geboekt",
      "De regels zijn ooit ingesteld en nooit onderhouden"
    ],
    "after": [
      "Vaste regels voor terugkerende betalingen en leveranciers",
      "Wat elke maand nog met de hand wordt geboekt, wordt nagelopen"
    ],
    "human": "Kijken naar wat opvalt: een nieuwe leverancier, een afwijkend bedrag, een betaling die nergens bij past."
  },
  "t4": {
    "acf_fc_layout": "before_after",
    "variant": "process",
    "title": "Controles bij de afsluiting en klantrapportages",
    "before": [
      "Elke maand dezelfde controles met de hand",
      "De klantrapportage wordt met de hand gevuld"
    ],
    "after": [
      "Na elke bankimport komen posten die langer dan 30 dagen op de tussenrekening staan op een lijst",
      "Elke maand dezelfde vragen, met de antwoorden op een rij",
      "De rapportage is gevuld; de medewerker schrijft de toelichting"
    ],
    "human": "Beoordelen wat een afwijking betekent."
  },
  "t5": {
    "acf_fc_layout": "before_after",
    "variant": "process",
    "title": "Periodieke Wwft-reviews inplannen",
    "before": [
      "Reviewdata en verloopdata van ID-bewijzen uit het hoofd of in een lijst"
    ],
    "after": [
      "Per klant vastgelegd: de volgende reviewdatum en de verloopdatum van het ID-bewijs",
      "Een maand vooraf ligt de taak bij de juiste persoon, met het dossier erbij"
    ],
    "human": "De review zelf."
  },
  "map": {
    "acf_fc_layout": "diagram",
    "src": "/blog/five-admin-tasks-to-automate-first/between-systems.nl.svg",
    "alt": "Voorbeeld van welke systemen elke taak raakt bij een gemiddeld klein kantoor. Achter stukken aan: e-mail, boekhoudpakket en Excel-lijst. Machtigingen en deadlines: e-mail, Excel-lijst, agenda en taken. Bank- en factuurregels: boekhoudpakket. Controles bij afsluiting: e-mail, boekhoudpakket en Excel-lijst. Wwft-reviews: Excel-lijst, agenda en taken.",
    "caption": "Onze inschatting van een gemiddeld klein kantoor, geen onderzoek.",
    "source": null
  }
};
