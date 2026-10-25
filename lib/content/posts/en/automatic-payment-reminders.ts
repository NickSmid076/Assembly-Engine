import { auditCta } from "../cta";

export default `
<p>Chasing payments is work almost nobody feels like doing. So it waits until the end of the month, or until someone in the office clears an afternoon for it. Meanwhile the money is out. A fixed reminder schedule, with a payment link and written in your own tone, solves most of that. Often you can do it with the software you already have.</p>

<h2>How big the problem is</h2>
<p>Exact's 2025 SMB Barometer (897 Dutch business owners surveyed) gives a clear picture (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>):</p>
<ul>
<li>90% of Dutch SMBs deal with late payments;</li>
<li>on average 14.2% of invoices are paid late, and 2.4% never;</li>
<li>the average agreed payment term is 27.7 days;</li>
<li>18% lose €20,000 or more a year because of it;</li>
<li>getting customers to pay on time is the biggest financial-admin challenge, named by 34%.</li>
</ul>
<p>One caveat: elsewhere in the same report, "almost 3%" is given for invoices that are never paid. We use the 2.4%.</p>

<h2>Which payment terms you can agree</h2>
<p>Since 1 July 2023, large companies in the Netherlands must pay their SMB suppliers within 30 days. Other business relationships keep a maximum of 60 days (<a href="https://factua.nl/blogs/betalingstermijn-grootbedrijf-van-60-30-dagen-van-kracht">Factua</a>). <mark>[CHECK: status of the EU Late Payment Regulation, which may change these terms]</mark></p>
<p>The term on your invoice is also the starting point of your reminder schedule. The shorter and clearer the term, the sooner you know something needs to happen.</p>

<h2>A reminder schedule: first reminder, second reminder, final notice</h2>
<p>Below is an example schedule for business customers. It's a starting point to adapt to your own customers; the law doesn't prescribe these days.</p>
<figure class="wp-block-table"><table><thead><tr><th>Moment (example)</th><th>Message</th><th>Tone</th></tr></thead><tbody>
<tr><td>3 days before the due date</td><td>Friendly heads-up that the invoice is due soon, with payment link</td><td>Service</td></tr>
<tr><td>7 days after the due date</td><td>First reminder, with the invoice and the payment link</td><td>Friendly, assumes an oversight</td></tr>
<tr><td>21 days after the due date</td><td>Second reminder, with a new deadline</td><td>Businesslike and clear</td></tr>
<tr><td>35 days after the due date</td><td>Task for a colleague to call</td><td>Personal</td></tr>
<tr><td>After that</td><td>Final notice, possibly with collection costs</td><td>Formal</td></tr>
</tbody></table></figure>
<p>What matters most is that the schedule is fixed. Every invoice follows the same route, however busy the week is. That feels fairer to customers too: nobody gets a stern email because someone in the office happened to have a bad day.</p>
<p>Be careful with collection costs for business customers. What you may charge depends on what you agreed and on the law. <mark>[CHECK: whether the statutory WIK scale applies to B2B by default, whether €40 is the minimum commercial collection fee (art. 6:96 BW), and the current WIK cap; use Rijksoverheid or Ondernemersplein, not Stripe]</mark> So we give no legal advice on the amounts here; have it checked if needed.</p>

<h2>What belongs in every reminder</h2>
<ul>
<li>the invoice number, the amount and the original due date;</li>
<li>the invoice itself as an attachment, so the customer doesn't have to search;</li>
<li>the payment link;</li>
<li>the name and phone number of someone who can answer questions;</li>
<li>in the second reminder: a new, concrete date.</li>
</ul>
<p>Leave threatening language out of the first two messages. We think a customer who simply forgot pays sooner after a friendly email than after an angry one. We haven't found research on this, so treat it as our view.</p>
<h3>When the customer disputes the invoice</h3>
<p>A reminder schedule has to be able to stop. When a customer says something is wrong, a colleague should be able to pause the reminders for that invoice in one click. Otherwise a customer who has just called still gets an automatic final notice, and that's how a good relationship gets damaged.</p>

<h2>Consumers are different: the veertiendagenbrief</h2>
<p>If you invoice consumers, different rules apply. Before you may charge collection costs, you have to send a veertiendagenbrief, the fourteen-day letter: a final notice giving the customer fourteen more days to pay without extra costs (<a href="https://stripe.com/nl/resources/more/dutch-debt-collection-costs-act">Stripe</a>). <mark>[CHECK: veertiendagenbrief requirements against Rijksoverheid or Ondernemersplein]</mark></p>
<p>In an automatic schedule that means a separate route for consumer customers, with the fourteen-day letter as a fixed step, with the right text and date in it. Then the step can't be skipped by accident.</p>

<h2>A payment link, and reconciliation that happens by itself</h2>
<p>A reminder works better when paying is one click away. Put a payment link in every invoice and every reminder, for example through Mollie or your accounting package's payment feature. The customer clicks, pays, and doesn't have to retype an IBAN or invoice number. <mark>[CHECK: how Mollie payment links behave (expiry, partial payments, methods)]</mark> <mark>[CHECK: the iDEAL to Wero transition timeline, if a payment method is named]</mark></p>
<p>The second benefit is on your side. When the payment comes in through the link, it can be matched to the right invoice automatically. Moneybird does this, for example, for the payment methods it offers itself (<a href="https://www.adyen.com/nl_NL/knowledge-hub/moneybird-en-adyen-een-geintegreerde-betaalrekening-voor-automatische-boekhouding">Adyen on Moneybird</a>). The reminder schedule then stops as soon as the invoice is paid, and nobody gets a reminder for an invoice settled yesterday.</p>
<p>Many accounting packages already have a reminder feature. <mark>[CHECK: the built-in reminder features in Moneybird, Exact Online and Twinfield]</mark> Often it's enough to set that up properly. We only build something around it when you need more, such as a call task for a colleague, or reminders that take agreements from your CRM into account.</p>

<h2>Keep it human, and know when to pick up the phone</h2>
<p>Automatic here means on time and every time. It doesn't have to sound like a machine. Write the texts yourself, in the tone you use with the customer. Put the name of a real colleague under the message, with a phone number.</p>
<p>An example of a first reminder (fictional):</p>
<blockquote><p>Hi Peter, our invoice 2026-118 for €1,240 was due on 14 October. It has probably ended up between the other post. You can pay it directly here: [payment link]. Something not right on the invoice? Feel free to call me. Best, Sanne</p><cite>Example text, fictional customer and amounts</cite></blockquote>
<p>Executives see little point in a chatbot for this conversation either: only 22% think customers prefer talking to AI about a late payment (<a href="https://www.intrum.com/press/press-releases/press-release-article/?id=40724231-127d-4c21-9211-7d598dc5f407">Intrum European Payment Report 2025</a>). That's why the example schedule above has a moment where a person calls. With a regular customer who has a good reason for the delay, a phone call solves more than the third email.</p>
<p>Even with a fixed schedule, some customers will pay late. What changes is that you no longer forget an invoice.</p>
<h3>Exceptions for regular customers</h3>
<p>Some customers belong in a different schedule. A large client with fixed payment runs, a customer with a payment plan, or a customer who pays a project in instalments. Record those agreements in your accounting package or CRM so the schedule takes them into account. Then a customer on a payment plan doesn't get a reminder for an instalment that isn't due yet.</p>

<h2>Measure whether it works</h2>
<p>We don't promise a percentage less in outstanding invoices. You can measure it yourself, though. Before you start, note how many invoices are late on average, and how many days it takes on average before you're paid. Look again after three months. Then you know what it delivers, measured with your own customers.</p>

<h2>Is it worth it for you?</h2>
<p>There's no research on this that we can cite. Our own rule of thumb, and it's no more than that: if someone in your office spends more than an hour a month following up unpaid invoices, or you regularly find an invoice has sat for weeks without a reminder, it's worth setting up the schedule.</p>
<p>A worked example with made-up numbers: a business sends 80 invoices a month. If 14% of them are paid late, as in the SMB Barometer average, that's about 11 invoices a month someone has to follow up. If each one takes a quarter of an hour to look up, email and note down, that's nearly three hours a month. For most businesses that's reason enough to at least switch on the built-in reminders in their accounting package.</p>
<p>Start with what your accounting package can already do. If that isn't good enough, we'll look together at what's missing. How we do that sum is in <a href="/en/blog/what-a-free-automation-audit-looks-at">what a free automation audit looks at</a>.</p>
` + auditCta("en");
