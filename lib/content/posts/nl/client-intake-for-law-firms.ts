import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>Een nieuwe zaak begint zelden met juridisch werk. Hij begint met wachten: op een kopie van het ID, op het UBO-uittreksel, op de getekende opdrachtbevestiging, op het voorschot. Zolang die er niet zijn, mag of wilt u niet beginnen. En dus belt en mailt er iemand op kantoor achter de cliënt aan.</p>
<p>Dat nabellen kan een systeem van u overnemen. Het oordeel over de cliënt, de zaak en het risico blijft bij de advocaat. Dit artikel is geschreven voor advocatenkantoren; voor notarissen en juridisch adviseurs gelden andere regels, en die hebben we hier niet onderzocht.</p>

<h2>Wat de intake verplicht moet bevatten</h2>
<p>Bij elke nieuwe zaak komen drie dingen terug. U stelt vast wie de cliënt is, en voor zaken onder de Wwft doet u een volledig cliëntenonderzoek. U controleert of er een belangenconflict is met andere cliënten van het kantoor. En u legt de afspraken met de cliënt schriftelijk vast in een opdrachtbevestiging.</p>
<p>Die laatste twee stappen werken we uit in een apart artikel: <a href="/nl/blog/engagement-letters-and-conflict-checks-for-law-firms">opdrachtbevestiging en conflictcheck zonder knip- en plakwerk</a>. Hier gaat het vooral over het eerste deel: de stukken die u van de cliënt nodig heeft.</p>

<h2>Wanneer de Wwft geldt, en wanneer de procesvrijstelling</h2>
<p>Advocaten vallen alleen onder de Wwft voor bepaalde diensten. Denk aan vastgoedtransacties, het beheren van vermogen, het oprichten van vennootschappen, aandelentransacties en vergelijkbaar fiscaal werk. Voor procederen geldt de procesvrijstelling. Die vrijstelling wordt beperkt uitgelegd (<a href="https://www.advocatenorde.nl/sites/default/files/2026-09/Inleiding%20Wwft%20en%20UBO-register%20voor%20advocaten%2007-05-2025.pdf">NOvA, Handleiding Wwft en UBO-register, 2025</a>).</p>
<p>Het eerste oriënterende gesprek valt er nog buiten. Maar het cliëntenonderzoek moet af zijn voordat de zakelijke relatie begint, en zonder UBO-uittreksel mag u geen zakelijke relatie aangaan (zelfde bron).</p>
<p>Of een zaak onder de Wwft valt, beslist de advocaat. Een intakeformulier kan wel de vragen stellen die bij die beslissing horen, en de uitkomst vastleggen. Dan staat in elk dossier op dezelfde plek waarom een zaak wel of niet onder de Wwft valt.</p>
<p>Let op, stand oktober 2026: op 10 juli 2027 treedt de Europese antiwitwasverordening (AMLR) in werking, en vervalt de Wwft. Advocaten werken vanaf dan rechtstreeks onder de AMLR (<a href="https://www.advocatenorde.nl/voor-advocaten/wwft-en-sanctieregelgeving/europees-aml-pakket">NOvA, Europees AML-pakket</a>). We werken dit artikel vóór die datum bij.</p>


<!--block:route-->
<h2>De vier momenten waarop u op de cliënt wacht</h2>
<p>In bijna elke intake wacht u op vier dingen.</p>
<h3>1. Het identiteitsbewijs</h3>
<p>Een kopie van een geldig identiteitsbewijs. Hoe u de cliënt identificeert en die identiteit verifieert, staat in de handleiding van de NOvA.</p>
<h3>2. Het UBO-uittreksel</h3>
<p>Sinds 1 augustus 2024 moeten advocaten de cliënt vragen om een gecertificeerd UBO-uittreksel uit het register van de KvK. De cliënt moet dat zelf opvragen (<a href="https://www.advocatenorde.nl/praktijkuitoefening/wwft">NOvA, Wwft</a>). Dat is precies het soort stap waar cliënten op blijven hangen, omdat ze niet weten waar ze het moeten halen. Een herinnering met een korte uitleg en de juiste link scheelt dan een telefoontje.</p>
<p>Het formulier vraagt alleen om stukken die bij het soort cliënt horen. Een UBO-uittreksel is bijvoorbeeld alleen aan de orde als de cliënt een rechtspersoon is.</p>
<h3>3. De handtekening</h3>
<p>De opdrachtbevestiging moet getekend terugkomen. Met een e-ondertekendienst krijgt de cliënt een link, en ziet u wanneer er getekend is.</p>
<h3>4. Het voorschot</h3>
<p>Veel kantoren vragen een voorschot voordat het werk begint. Een factuur met een betaallink, en een herinnering als die na een paar dagen nog openstaat, voorkomt dat iemand dat met de hand moet bijhouden.</p>
<p>Wij hebben geen cijfers over hoeveel tijd kantoren aan dit nabellen kwijt zijn. Die bestaan, voor zover wij weten, niet voor Nederland. Wie het bij zichzelf wil meten, kan een maand lang turven hoeveel mails en telefoontjes er per nieuwe zaak nodig zijn.</p>


<!--block:flow-->
<h2>Een intake die zelf nabelt en alles in het dossier vastlegt</h2>
<p>Hieronder een voorbeeld van hoe zo'n intake kan lopen. Het is een illustratie, geen bestaand kantoor.</p>
<ol>
<li>De cliënt vult na het eerste gesprek een intakeformulier in: gegevens, de zaak in het kort, de wederpartij.</li>
<li>Het systeem maakt een dossier aan en zet een lijst klaar van wat er nog nodig is, afhankelijk van het soort zaak.</li>
<li>De cliënt krijgt één bericht met alles wat nodig is: een link voor de identificatie, uitleg over het UBO-uittreksel, de opdrachtbevestiging om te tekenen en de factuur voor het voorschot.</li>
<li>Elk stuk dat binnenkomt, wordt in het dossier gezet en afgevinkt.</li>
<li>Ontbreekt er na een paar dagen nog iets, dan gaat er een vriendelijke herinnering uit. Na de tweede herinnering krijgt de advocaat of secretaresse een taak om zelf te bellen.</li>
<li>Pas als alles binnen is en de advocaat het cliëntenonderzoek heeft afgerond, gaat de zaak op "actief".</li>
</ol>
<p>Het bericht aan de cliënt kan er zo uitzien:</p>
<blockquote><p>Beste mevrouw Jansen, dank voor het gesprek van vanochtend. Om met uw zaak te beginnen, hebben we nog vier dingen van u nodig. Via de link hieronder ziet u per stuk wat het is en hoe u het aanlevert. Het UBO-uittreksel vraagt u zelf op bij de KvK; in de link staat hoe dat werkt. Vragen? Bel gerust.</p><cite>Voorbeeldtekst, fictieve cliënt</cite></blockquote>
<!--block:portal-->

<p>Voor de cliënt is dat ook prettiger, denken wij. Wie net een advocaat heeft gesproken over een lastige kwestie, zit niet te wachten op vijf losse mails met verzoeken. Eén overzicht, met per stuk wat het is en waarom het nodig is, maakt het makkelijker om snel te reageren. Onderzoek naar hoe cliënten dit ervaren, hebben we niet.</p>
<p>Elke stap wordt met datum vastgelegd. Dat helpt bij het toezicht. Volgens de dekens is de meest voorkomende bevinding bij Wwft-onderzoeken een risicobeoordeling zonder schriftelijke onderbouwing, of met een algemene zin als "alle factoren zijn gecontroleerd" (<a href="https://www.toezichtadvocatuur.nl/cms/public/files/communicatie/20250311-advocatenblad-maart.pdf?dc96f3e2af=">Dekenberaad, maart 2025</a>). Een vast formulier zorgt ervoor dat de advocaat elke keer dezelfde vragen beantwoordt, en dat die antwoorden in het dossier staan.</p>
<p>Ook de bewaartermijn hoort erbij: de gegevens uit het cliëntenonderzoek bewaart u vijf jaar na het einde van de zakelijke relatie, of vijf jaar na de transactie (<a href="https://wetten.overheid.nl/BWBR0024282">Wwft, artikel 33</a>). Een systeem kan die termijn per dossier bijhouden.</p>

<h3>Herinneringen per zaak uit te zetten</h3>
<p>Er is een situatie waarin automatische berichten niet mogen. Bij een melding aan de FIU mag de cliënt daar niet over worden geïnformeerd (<a href="https://www.advocatenorde.nl/sites/default/files/2026-09/Inleiding%20Wwft%20en%20UBO-register%20voor%20advocaten%2007-05-2025.pdf">NOvA, Handleiding Wwft</a>). Een systeem dat vrolijk herinneringen blijft sturen, kan dan een probleem worden. Daarom bouwen we elke intake zo dat de advocaat de automatische berichten per zaak met één handeling kan stilzetten.</p>

<h2>Wat bij de advocaat blijft</h2>
<p>De software verzamelt stukken, stuurt herinneringen en houdt het dossier bij. Een paar dingen doet hij nooit:</p>
<ul>
<li>bepalen of de Wwft van toepassing is, of dat de procesvrijstelling geldt;</li>
<li>het risico van een cliënt inschatten en die inschatting onderbouwen;</li>
<li>beoordelen of er een belangenconflict is;</li>
<li>besluiten of het kantoor de zaak aanneemt.</li>
</ul>
<p>Het systeem kan die beslissingen voorbereiden door de juiste vragen te stellen en de antwoorden op één plek te zetten. De beslissing en de verantwoordelijkheid blijven bij de advocaat.</p>

<h2>Waar u kunt beginnen</h2>
<p>U hoeft niet alles tegelijk te doen. De meeste kantoren hebben al een checklist voor de intake, op papier of in het hoofd van een ervaren secretaresse. Schrijf die lijst eerst uit, per soort zaak. Welke stukken zijn altijd nodig? Welke alleen bij Wwft-zaken? Wie controleert wat, en wanneer?</p>
<p>Als die lijst er is, is het automatiseren van de herinneringen de kleinste stap. Daarna komt het formulier, en als laatste de koppeling met uw praktijkmanagementsysteem. Zo heeft u na de eerste stap al minder nabelwerk, ook als de rest nog even duurt.</p>


<!--block:list-->
<h2>Privacy: geen gratis AI-hulpmiddelen, en een verwerkersovereenkomst</h2>
<p>Intakegegevens zijn vertrouwelijk, en vaak gevoelig. De NOvA raadt af om gratis of open AI-hulpmiddelen te gebruiken voor vertrouwelijke gegevens (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA, aanbevelingen AI in de praktijk</a>). Dat geldt ook voor de intake: een formulier dat antwoorden naar een gratis chatbot stuurt om ze "samen te vatten", hoort daar niet bij.</p>
<p>Elke dienst die gegevens van uw cliënten verwerkt, heeft een verwerkersovereenkomst nodig. De NOvA heeft daar modellen voor (<a href="https://www.advocatenorde.nl/praktijkuitoefening/voor-uw-praktijk-1/gegevensbescherming-avg">NOvA, gegevensbescherming</a>). Bij een intake die we bouwen, zetten we op een rij welke diensten welke gegevens zien, zodat u weet met wie u een overeenkomst moet hebben.</p>
<p>Werkt u al met een praktijkmanagementsysteem, dan bouwen we de intake daaromheen, voor zover de API of de exportmogelijkheden dat toelaten. Waarom we dat doen, leest u in <a href="/nl/blog/build-on-the-software-you-already-use">waarom we bouwen op de software die u al gebruikt</a>.</p>
` + auditCta("nl");

export const cover = { alt: "Lijntekening: vier documenten op één lijn (een ID, een UBO-schema, een getekende brief en een factuur), eindigend bij een gestippelde cirkel voor de advocaat." };

export const blocks: PostBlocks = {
  "route": {
    "acf_fc_layout": "diagram",
    "src": "/blog/client-intake-for-law-firms/wwft-or-exemption.nl.svg",
    "alt": "De advocaat beslist om welke dienst het in een zaak gaat. Route 1: bijvoorbeeld een vastgoedtransactie, vermogensbeheer, het oprichten van een vennootschap, aandelentransacties of vergelijkbaar fiscaal werk. Dan geldt de Wwft: volledig cliëntenonderzoek, en een UBO-uittreksel voordat de zakelijke relatie begint. Route 2: procederen. Dan geldt de procesvrijstelling, die beperkt wordt uitgelegd. Het intakeformulier stelt de vragen en legt de uitkomst vast in het dossier.",
    "caption": null,
    "source": {
      "title": "NOvA, Handleiding Wwft en UBO-register, 2025",
      "url": "https://www.advocatenorde.nl/sites/default/files/2026-09/Inleiding%20Wwft%20en%20UBO-register%20voor%20advocaten%2007-05-2025.pdf",
      "target": "_blank"
    }
  },
  "flow": {
    "acf_fc_layout": "flow_diagram",
    "title": "Voorbeeld: de vier dingen waarop u wacht",
    "nodes": [
      {
        "label": "ID-bewijs",
        "detail": "Een kopie van een geldig ID",
        "human": false
      },
      {
        "label": "UBO-uittreksel",
        "detail": "De cliënt vraagt het op bij de KvK",
        "human": false
      },
      {
        "label": "Opdrachtbevestiging",
        "detail": "Getekend via een link",
        "human": false
      },
      {
        "label": "Voorschot",
        "detail": "Factuur met een betaallink",
        "human": false
      },
      {
        "label": "Zaak start",
        "detail": "Zodra de advocaat het cliëntenonderzoek heeft afgerond",
        "human": true
      }
    ],
    "caption": "Het systeem verzamelt en herinnert. De laatste stap is van de advocaat."
  },
  "portal": {
    "acf_fc_layout": "mock_ui",
    "window": "Intakeoverzicht",
    "caption": "Voorbeeld, fictieve cliënt. Wat de link in het bericht zou kunnen tonen.",
    "mock": {
      "kind": "form",
      "title": "Uw zaak: wat we nog nodig hebben",
      "intro": "Vier stukken. Per regel ziet u wat het is en hoe u het aanlevert.",
      "fields": [
        {
          "label": "ID-bewijs",
          "value": "kopie-id-jansen.pdf",
          "type": "file",
          "state": "done"
        },
        {
          "label": "UBO-uittreksel",
          "value": "Op te vragen bij de KvK",
          "type": "file",
          "state": "open"
        },
        {
          "label": "Opdrachtbevestiging",
          "value": "Getekend",
          "type": "sign",
          "state": "done"
        },
        {
          "label": "Voorschot",
          "value": "Factuur 2026-031",
          "type": "pay",
          "state": "open"
        }
      ],
      "status": "2 van 4 ontvangen"
    }
  },
  "list": {
    "acf_fc_layout": "checklist",
    "id": "intake-list",
    "title": "Uw intakelijst, per soort zaak",
    "items": [
      {
        "id": "i1",
        "text": "Welke stukken altijd nodig zijn"
      },
      {
        "id": "i2",
        "text": "Welke stukken alleen bij Wwft-zaken"
      },
      {
        "id": "i3",
        "text": "Welke stukken alleen als de cliënt een rechtspersoon is"
      },
      {
        "id": "i4",
        "text": "Wie wat controleert, en wanneer"
      },
      {
        "id": "i5",
        "text": "Wanneer de advocaat het cliëntenonderzoek afrondt"
      },
      {
        "id": "i6",
        "text": "Welke diensten welke gegevens zien, en of er een verwerkersovereenkomst is"
      }
    ]
  }
};
