// Development fixture: every element the article template must handle, as WordPress would send it,
// plus markup the sanitiser must drop. Used only by the dev-only /blog/rich-text-sample route; never live.
export const RICH_TEXT_SAMPLE = `
<p>Dit is <strong>opmaaktekst</strong> om de artikelsjabloon te controleren, met een <a href="/nl/contact">interne link</a> en een <a href="https://wordpress.org">externe link</a>. Geen echte inhoud.</p>
<h2>Een tussenkop op niveau twee</h2>
<p>Een alinea met <em>nadruk</em> en <code>inline code</code>.</p>
<ul><li>Eerste punt van een lijst</li><li>Tweede punt, iets langer, zodat het over twee regels loopt op een telefoon</li><li>Derde punt</li></ul>
<h3>Een kop op niveau drie</h3>
<ol><li>Stap een</li><li>Stap twee</li></ol>
<blockquote><p>Een citaat zoals een redacteur het in WordPress plaatst.</p><cite>Bron van het citaat</cite></blockquote>
<figure class="wp-block-image"><img src="/case/energielabel-breda-desktop.jpg" alt="Voorbeeldafbeelding" width="1440" height="900"/><figcaption>Een bijschrift onder de afbeelding.</figcaption></figure>
<pre><code class="language-js">const regels = factuur.regels.filter((r) => r.uren > 0);</code></pre>
<figure class="wp-block-table"><table><thead><tr><th>Taak</th><th>Uren per week</th></tr></thead><tbody><tr><td>Documenten opvragen</td><td>3,5</td></tr><tr><td>Herinneringen sturen</td><td>1,0</td></tr></tbody></table></figure>
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper"><iframe src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ" title="Voorbeeldvideo"></iframe></div></figure>
<hr/>
<p>Laatste alinea.</p>
<script>alert("x")</script><img src="x" onerror="alert(1)"/><iframe src="https://evil.example.com"></iframe><p style="color:red" onclick="alert(2)">Opgeschoond.</p>
`;
