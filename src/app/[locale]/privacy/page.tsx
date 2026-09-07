import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterProvider } from "@/components/newsletter-modal";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Privacy Notice — Beyond Code Collective",
  description:
    "Beyond Code Collective Privacy Notice. Learn how we collect, use, and protect your personal information.",
    alternates: pageAlternates(locale, "/privacy"),
  };
}

export default function PrivacyNoticePage() {
  return (
    <NewsletterProvider>
      <Nav />
      <main className="bg-off-white px-6 pt-32 pb-24 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-16">
            <p
              className="font-mono text-xs tracking-[0.2em] text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ LEGAL ]
            </p>
            <h1
              className="mt-4 text-5xl leading-[0.9] tracking-tight text-true-black sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              PRIVACY NOTICE
            </h1>
            <p className="mt-4 text-sm text-grey-3">Last Updated: March 2026</p>
          </header>

          <div className="legal-content space-y-8 text-base leading-relaxed text-charcoal">
            <p>
              Beyond Code Collective (&quot;BCC,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) respects your privacy. This Privacy Notice (&quot;Notice&quot;)
              describes the processing of Personal Information (defined below) that is provided,
              collected, or disclosed while providing our products or services to you
              (&quot;Services&quot;) and on the websites, applications, and online platforms that link
              to this Notice (collectively, &quot;Site&quot;). Please read this Notice carefully to
              understand our policies and practices regarding your Personal Information and how we will
              treat it.
            </p>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                PERSONAL INFORMATION WE COLLECT
              </h2>
              <p>
                &quot;Personal Information&quot; means information that uniquely identifies, relates to,
                describes, or is reasonably capable of being associated with or linked to you. The
                categories of Personal Information we collect may include:
              </p>
              <ul className="mt-3 list-disc space-y-3 pl-6">
                <li>
                  <strong>Contact Information</strong> &ndash; If you submit an inquiry, register for an
                  account, submit a donation, or provide information on or through our Site or Services,
                  we may collect your contact information including your name, mailing address, email
                  address, and phone number.
                </li>
                <li>
                  <strong>Commercial Information</strong> &ndash; If you submit an inquiry, or provide
                  information on our Site, we may collect commercial information including information
                  about Services you have shown interest in.
                </li>
                <li>
                  <strong>Usage Information</strong> &ndash; When you use our Site, we may automatically
                  record information, including your Internet Protocol address (IP Address), geolocation
                  of your device, browser type, referring URLs (e.g., the website you visited before
                  coming to our Site), domain names associated with your internet service provider, and
                  any other information regarding your interaction with our Site.
                </li>
                <li>
                  <strong>Communication Information</strong> &ndash; We may collect Personal Information
                  contained within your communications with us via email, social media, telephone, or
                  otherwise, and in certain cases we may use third-party service providers to do so.
                  Where permitted by applicable law, we may collect and maintain records of calls and
                  chats with our agents, representatives, or employees via message, chat, post, or
                  similar functionality.
                </li>
                <li>
                  <strong>Financial Information</strong> &ndash; If you make a donation, your financial
                  information will be securely processed by our third-party payment service provider,
                  and we do not store your full financial account details on our systems.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                HOW WE COLLECT PERSONAL INFORMATION
              </h2>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Directly From You</strong> &ndash; We collect Personal Information that you
                  provide to us directly, for example, if you choose to contact us, request information
                  from us or otherwise utilize our Site or Services.
                </li>
                <li>
                  <strong>From Third Parties</strong> &ndash; We may collect Personal Information from
                  third parties, including but not limited to business partners, advertising networks,
                  social networks, data analytics providers, mobile device providers, and Internet or
                  mobile service providers.
                </li>
                <li>
                  <strong>Through Online Tracking Technologies</strong> &ndash; We use cookies and
                  similar technologies to collect Personal Information automatically as you navigate our
                  Site. For additional information regarding our use of these technologies, see the
                  Cookies and Tracking Technologies section below.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                HOW WE USE PERSONAL INFORMATION
              </h2>
              <p>
                To the extent permitted by applicable law, we use Personal Information:
              </p>
              <ul className="mt-3 list-disc space-y-3 pl-6">
                <li>
                  <strong>To provide and optimize our Site and Services,</strong> such as processing
                  donations, providing customer service, maintaining or servicing accounts, providing
                  educational content and resources, maintaining participant and donor records, creating
                  and maintaining business records, verifying eligibility, and undertaking or providing
                  similar services.
                </li>
                <li>
                  <strong>For internal research and development,</strong> such as testing, verifying, and
                  improving the quality of our Services or developing new ones.
                </li>
                <li>
                  <strong>For marketing and advertising,</strong> including using your information to send
                  you messages, notices, newsletters, surveys, promotions, or event invitations about our
                  own or third parties&apos; goods and services that may be of interest to you. We also
                  use Personal Information to conduct interest-based advertising as discussed in the
                  Cookies and Other Tracking Technologies section below. You can also unsubscribe from
                  any marketing emails or text messages that we may send you by following the
                  instructions included in the email or text correspondence.
                </li>
                <li>
                  <strong>For communicating with you,</strong> such as responding to your questions and
                  comments or notifying you of changes to our Site or Services.
                </li>
                <li>
                  <strong>For legal, security, or safety reasons,</strong> such as protecting our and our
                  users&apos; safety, property, or rights; complying with legal requirements; enforcing
                  our terms, conditions, and policies; detecting, preventing, and responding to security
                  incidents; and protecting against malicious, deceptive, fraudulent, or illegal
                  activity.
                </li>
                <li>
                  <strong>As part of a corporate transaction,</strong> such as in connection with the
                  sale of part or all of our assets or business, the acquisition of part or all of
                  another business or another business&apos; assets, or another corporate transaction,
                  including bankruptcy.
                </li>
                <li>
                  <strong>To fulfill any other purpose</strong> for which you provide it, including
                  purposes described when you provide the information or give your consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                HOW WE DISCLOSE PERSONAL INFORMATION
              </h2>
              <p>
                We may disclose aggregated information about our users, and information that does not
                identify any individual, without restriction.
              </p>
              <p className="mt-4">
                We may disclose your Personal Information with your consent or in the following
                circumstances:
              </p>
              <ul className="mt-3 list-disc space-y-3 pl-6">
                <li>
                  <strong>Employees and Other Personnel</strong> &ndash; We may share Personal
                  Information with our employees and personnel (such as contractors) who have a need to
                  know the information for our business purposes.
                </li>
                <li>
                  <strong>Service Providers</strong> &ndash; We disclose your Personal Information with
                  the service providers that we use to support our business, including but not limited
                  to, data analytics providers, website hosting providers, and other technology
                  providers.
                </li>
                <li>
                  <strong>Business Partners</strong> &ndash; We may disclose Personal Information with
                  trusted business partners. For example, we may disclose your Personal Information with
                  a company whose products or services we think may be of interest to you or who we
                  co-sponsor a promotion or service with.
                </li>
                <li>
                  <strong>Ad Tech Companies and Other Providers</strong> &ndash; We may share or make
                  available limited Personal Information (such as mobile device identifiers) with ad tech
                  companies and other online service providers. When we share your Personal Information
                  in this context, we follow applicable legal requirements, which may require that we
                  provide opt-out rights or other individual rights.
                </li>
                <li>
                  <strong>Legal Obligation or Safety Reasons</strong> &ndash; We may disclose Personal
                  Information to a third party when we have a good faith belief that such disclosure of
                  Personal Information is reasonably necessary to (a) satisfy or comply with any
                  requirement of law, regulation, legal process, or enforceable governmental request, (b)
                  enforce or investigate a potential violation of any agreement you have with us, (c)
                  detect, prevent, or otherwise respond to fraud, security or technical concerns, (d)
                  support auditing and compliance functions, or (e) protect the rights, property, or
                  safety of BCC, its employees and clients, or the public against harm.
                </li>
                <li>
                  <strong>Merger or Change of Control</strong> &ndash; We may disclose Personal
                  Information to third parties as necessary if we are involved in a merger, acquisition,
                  or any other transaction involving a change of control in our business, including but
                  not limited to, a bankruptcy or similar proceeding. Where legally required, we will
                  give you notice prior to such disclosure.
                </li>
                <li>
                  <strong>Other</strong> &ndash; We may disclose Personal Information to third parties
                  when explicitly requested by or consented to by you, or for the purposes for which you
                  disclosed the Personal Information to us as indicated at the time and point of the
                  disclosure (or as was obvious at the time and point of disclosure).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                COOKIES AND OTHER TRACKING TECHNOLOGIES
              </h2>
              <p>
                We and our service providers may use cookies and similar technologies to collect usage
                and browser information about how you use our Site. The technologies we use for this
                automatic data collection may include cookies and web beacons that permit us to verify
                system and server integrity and generate statistics around the popularity of certain
                content. We process the information collected through such technologies, which may
                include or be combined with Personal Information, to help operate certain features of
                our Site, to enhance your experience through personalization, and to help us better
                understand the features of our Site that you and other users are most interested in.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                Website Delivery and Appearance
              </h3>
              <p>
                We may use third-party providers to enable certain customer interaction opportunities,
                content delivery (like audio or video), or other service capabilities. For example, we
                partner with companies like YouTube to deliver specific content delivery like audio and
                video. For more information about how YouTube collects and uses your data, visit
                Google&apos;s Privacy Policy.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                Website Analytics and Session Replay
              </h3>
              <p>
                We use analytics and session replay services, that use cookies and other technologies
                that collect your Personal Information, to assist us with analyzing our Site traffic and
                site usage to optimize, maintain, and secure our Site and inform subsequent business
                decisions (including, e.g., advertising). These include, but are not limited to, Google
                Analytics. To learn more about how Google uses data, visit Google&apos;s Privacy Policy
                and Google&apos;s page on &quot;How Google uses data from sites or apps that use our
                services.&quot; You may download the Google Analytics Opt-out Browser Add-on for each
                web browser you use, but this does not prevent the use of other analytics tools. To
                learn more about Google Analytics cookies, visit Google Analytics Cookie Usage on
                Websites.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                Interest-Based Advertising
              </h3>
              <p>
                We may also allow or enable third parties to collect Personal Information to provide
                their interest-based advertising on behalf of our products and services, or their own.
                Interest-based advertising occurs when advertisements are shown to you based on
                information collected from your online interactions over time and across multiple
                websites, devices, or online services that you visit or use.
              </p>
              <p className="mt-4">
                We do not control these third parties&apos; collection or use of your information for
                these purposes, or the opt-out options they may individually offer you via their terms,
                conditions, and privacy policies. If you have any questions about an advertisement or
                other targeted content, you should contact the responsible provider directly.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                Selling Personal Information
              </h3>
              <p>
                While we do not sell Personal Information in exchange for monetary consideration, we do
                disclose Personal Information for other benefits that could be deemed a &quot;sale&quot;
                under various data protection laws because it is sometimes broadly defined to include
                activities such as the delivery of interest-based advertising on websites or allowing
                third parties to receive certain information, such as cookies, IP address, and/or
                browsing behavior.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">Cookie Choices</h3>
              <p>To manage your preferences with respect to these technologies, you can:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Customize your browser settings to refuse all or some browser cookies, or to alert you
                  when websites set or access cookies. If you disable certain cookies, please note that
                  some parts of our Site may not function properly. These settings may be lost and
                  require reconfiguration if you delete your cookies.
                </li>
                <li>
                  Block the collection and use of your information by online platforms and ad tech
                  companies for the purpose of serving interest-based advertising by visiting the opt out
                  pages of the self-regulatory programs of which those companies are members: National
                  Advertising Initiative and Digital Advertising Alliance. Please note that even if you
                  opt out of interest-based advertising, you may still see &quot;contextual&quot; ads
                  which are based on the context of what you are looking at on the websites and pages you
                  visit.
                </li>
                <li>
                  Review and execute any provider-specific instructions to customize your preferences or
                  opt-out of certain processing, including interest-based advertising, by third-party
                  service providers. For example, to opt-out of this type of advertising by Google,
                  customize your ad preferences, or limit Google&apos;s collection or use of your data,
                  visit Google&apos;s Safety Center and Google&apos;s Ad Settings and follow
                  Google&apos;s personalized ad opt-out instructions.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                HOW LONG WE KEEP YOUR PERSONAL INFORMATION
              </h2>
              <p>
                We retain your Personal Information for as long as needed: (i) to conduct business with
                you; (ii) fulfill the purposes outlined in this Notice; and (iii) to comply with our
                legal obligations, resolve disputes, and enforce any agreements. Criteria we will use to
                determine how long to retain your Personal Information include the nature and length of
                our business relationship with you; our legal rights, obligations, and retention
                requirements; and if we have an ongoing business purpose for retaining your Personal
                Information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                LINKS TO THIRD-PARTY WEBSITES
              </h2>
              <p>
                We are not responsible for the practices employed by any websites or services linked to
                or from our Site, including the information or content contained within them. We
                encourage you to investigate and ask questions before disclosing Personal Information to
                third parties, since any Personal Information disclosed will be handled in accordance
                with the applicable third party&apos;s privacy policy.
              </p>
              <p className="mt-4">
                In some cases, we offer links to social media platforms (like Facebook, Instagram,
                LinkedIn, and X (formerly known as Twitter)) that enable you to easily connect with us
                or share information on social media. Any content you post via these social media pages
                is subject to the Terms of Use and Privacy Policies for those platforms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                INTERNATIONAL USE
              </h2>
              <p>
                If you are visiting our Site from outside of the United States, please note that our
                Site is hosted in the United States. Where permitted by applicable law, we may transfer
                the Personal Information we collect about you to the United States and other
                jurisdictions that may not be deemed to provide the same level of data protection as
                your home country, as necessary for the purposes set out in this Notice.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                HOW WE PROTECT PERSONAL INFORMATION
              </h2>
              <p>
                We have implemented commercially reasonable measures designed to secure your Personal
                Information from accidental loss and from unauthorized access, use, alteration, and
                disclosure. Unfortunately, the transmission of information via the internet is not
                completely secure. Despite these efforts to store Personal Information in a secure
                environment, we cannot guarantee the security of Personal Information during its
                transmission or its storage on our systems.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                CHILDREN&apos;S PRIVACY
              </h2>
              <p>
                We do not knowingly collect or solicit any Personal Information from children, as
                defined under applicable law, without verified written parental consent, and we have no
                actual knowledge of selling Personal Information of minors under 16 years of age. If we
                learn that we have collected Personal Information from a child, we will promptly take
                steps to delete that information. If you believe we might have any information from or
                about a child, please contact us at{" "}
                <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                  info@wearebcc.org
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                CHANGES TO THIS NOTICE
              </h2>
              <p>
                Please note that we may modify or update this Notice from time to time, so please
                review it periodically. If we make material changes to how we treat Personal
                Information, we will notify you according to applicable law. Unless otherwise indicated,
                any changes to this Notice will apply immediately upon posting to our Site. You are
                responsible for periodically visiting our Site and this Notice to check for any changes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                CONTACT US
              </h2>
              <p>
                If you have any questions about our practices or this Notice, please contact us at{" "}
                <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                  info@wearebcc.org
                </a>
                .
              </p>
            </section>

            <p className="mt-12 border-t border-grey-2 pt-8 text-sm text-grey-3">
              &copy; 2026 Beyond Code Collective, Inc. All Rights Reserved.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </NewsletterProvider>
  );
}
