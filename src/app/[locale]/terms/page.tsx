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
  title: "Terms of Use — Beyond Code Collective",
  description:
    "Beyond Code Collective Terms of Use. Read our terms governing use of our websites and services.",
    alternates: pageAlternates(locale, "/terms"),
  };
}

export default function TermsOfUsePage() {
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
              TERMS OF USE
            </h1>
            <p className="mt-4 text-sm text-grey-3">Effective Date: March 2026</p>
          </header>

          <div className="legal-content space-y-8 text-base leading-relaxed text-charcoal">
            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access to this website, which is
              operated by Beyond Code Collective (&quot;BCC&quot;) (collectively, the
              &quot;Site&quot;). BY ACCESSING OR USING THE SITE, YOU (&quot;YOU&quot;) AGREE THAT YOU
              HAVE READ AND UNDERSTAND THESE TERMS. IF YOU DO NOT AGREE WITH THESE TERMS, DO NOT
              ACCESS OR USE THE SITE.
            </p>
            <p>
              We may modify these Terms at any time. All changes will be effective immediately upon
              posting to the Site. Material changes will be conspicuously posted on the Site or
              otherwise communicated to you. By using the Site after changes are posted, you agree to
              those changes.
            </p>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                CONTENT
              </h2>
              <p>
                The Site, including its text, audio, video, graphics, charts, photographs, interfaces,
                icons, software, computer code, data, trademarks, logos, slogans, documentation, other
                components and content, and the design, selection, and arrangement of content, and all
                intellectual property rights in the foregoing (collectively, the &quot;Content&quot;)
                are exclusively the property of BCC or, as applicable, its vendors or licensors. Except
                for the rights expressly granted to you in the next section, BCC reserves all other
                rights in and to the Site and Content, including all intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                USE RIGHTS
              </h2>
              <p>
                You may only use the Site or Content for your personal, non-exclusive use in the United
                States, so long as you comply with these Terms and all other terms posted throughout the
                Site as applicable to you (if any), and all applicable laws. You may only use the Site
                and the Content for their intended purposes for which they are made available to you by
                BCC.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                DONATIONS
              </h2>
              <p>
                By making a donation on the Site, you acknowledge and agree to the following:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  All donations made via the Site are intended to support the activities, including
                  charity activities, of BCC.
                </li>
                <li>
                  By donating money through the Site, you represent and warrant that any donation you
                  make is legal in your jurisdiction and that you are authorized to use the payment
                  method you have selected.
                </li>
                <li>
                  Donations are processed by our third-party payment processor. When making a donation
                  via the Site, you agree to any terms, conditions, or privacy policies of the
                  third-party payment processor being utilized. When making an online donation, you will
                  be prompted to make a one-time gift or a recurring gift. If you choose to make a
                  recurring gift, you authorize periodic payments (e.g., monthly, quarterly, annually,
                  etc.) made on the same form of payment in which you are making your initial payment.
                  You will receive an email each month to the email address we have on file for you
                  prior to the recurring gift being charged to your credit or debit card.
                </li>
                <li>
                  Donations may be subject to transaction processing fees, which may vary depending on
                  the payment method used. The amount donated may be reduced by these processing fees.
                </li>
                <li>
                  All donations made through this website are final and non-refundable, except as
                  required by law.
                </li>
                <li>
                  BCC is a tax-exempt organization under Section 501(c)(3) of the Internal Revenue
                  Code. As such, your donation may be tax-deductible, subject to applicable tax laws. We
                  make no representation as to whether all or any portion of your donations, including,
                  if any, processing fees, are tax deductible. We will have no liability for any claim
                  by any federal, state, local or any other tax authority with respect to the
                  characterization on any applicable tax return of any donation by you. You should
                  consult your tax advisor as to the amount of your donation that is tax deductible.
                </li>
                <li>
                  While BCC makes every effort to ensure the proper use of donated funds, we cannot
                  guarantee specific outcomes from donations. All donations are used in furtherance of
                  BCC&apos;s mission and activities, but specific use or success is not guaranteed.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                USE OF MARKS
              </h2>
              <p>
                BCC owns certain trademarks, names, logos, insignia, or service marks
                (&quot;Marks&quot;). You do not have the right to use any Marks except as expressly
                agreed to in writing by BCC. In addition, the Site may contain third-party marks and
                third-party copyrighted materials, which are the property of their respective owners.
                Nothing in these Terms grants to you any rights in or to those third-party marks or
                materials without such third-party&apos;s consent.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                INTELLECTUAL PROPERTY RIGHTS
              </h2>
              <p>
                The Site and Content are protected by copyright, trademark, and other intellectual
                property laws. Any unauthorized use of any trademarks, trade dress, copyrighted
                materials, or any other intellectual property belonging to BCC or any third party is
                strictly prohibited and may be prosecuted to the fullest extent of the law.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                COMPLIANCE WITH LAWS
              </h2>
              <p>
                In connection with your access to and use of the Site, you are responsible for complying
                with all applicable laws, regulations, and rules of all relevant jurisdictions,
                including all applicable rules regarding online conduct.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                CHILDREN&apos;S INFORMATION
              </h2>
              <p>
                The Site is not directed at children under the age of eighteen (18) years old. If you
                are under eighteen (18) years old, you must immediately stop using the Site.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                RESTRICTIONS ON YOUR USE OF THE SITE
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  You will not copy, duplicate, sell, publish, post, license, rent, distribute, modify,
                  translate, adapt, reverse-engineer, or create derivative works of the Site or Content
                  without BCC&apos;s prior written consent.
                </li>
                <li>You will not use the Site for unlawful purposes.</li>
                <li>
                  You will not submit inaccurate, incomplete, or out-of-date information via the Site,
                  commit fraud or falsify information in connection with your use of the Site, including
                  using stolen, expired, or invalid payment information for donation purposes.
                </li>
                <li>
                  You will not make donations or conduct financial transactions on behalf of another
                  person or entity without appropriate consent.
                </li>
                <li>
                  You will not engage in data mining or similar data gathering or extraction activities
                  from the Site. You will not use the Site to harvest email addresses, names, or other
                  information of the users of the Site or to spam other users of the Site.
                </li>
                <li>
                  You will not access, use, or copy any portion of the Site or Content, through the use
                  of indexing agents, spiders, scrapers, bots, web crawlers, or other automated devices
                  or mechanisms.
                </li>
                <li>
                  You will not use the Site to post, transmit, input, upload, or otherwise provide any
                  information or material that contains any viruses, worms, Trojan horses, malware,
                  ransomware, adware, or other harmful computer code that may disable, damage, impair,
                  or otherwise interfere with the Site, the servers used to make the Site available, or
                  any other network, computers, hardware, software or systems.
                </li>
                <li>
                  You will not engage in activities that aim to render the Site or associated services
                  inoperable or to make their use more difficult.
                </li>
                <li>
                  You may not frame, mirror, or circumvent the navigational structure of any part of the
                  Site.
                </li>
                <li>
                  You may not upload, distribute, or transmit, or post anything to or through the Site
                  that: (i) is fraudulent, libelous, obscene, pornographic, indecent, violent,
                  offensive, hate speech, harassing, threatening, defamatory, harms another person, or
                  the like; (ii) invades the privacy of another or includes the confidential or
                  proprietary information of another; or (iii) is protected by intellectual property
                  rights without the express prior written consent of the owner of such intellectual
                  property rights.
                </li>
                <li>
                  You may not engage in any conduct while using the Site that BCC considers
                  inappropriate, unauthorized, or contrary to the intended purpose of the Site.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                FEEDBACK AND OTHER CONTENT SUBMITTED BY YOU
              </h2>
              <p>
                If you submit comments or feedback to us regarding the Site or its Content, or any other
                comments, questions, requests, content or information that is not personal information
                (&quot;Feedback&quot;), we may use any comments and feedback that you send us in our
                discretion and without attribution or compensation to you.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                SOCIAL MEDIA
              </h2>
              <p>
                Links to BCC&apos;s social media pages (e.g. Facebook, Twitter, LinkedIn, and YouTube)
                may be included on the Site (&quot;Social Media Pages&quot;). Because anyone may post or
                tag on Social Media Pages, posts do not necessarily reflect BCC&apos;s views. We reserve
                the right to remove anything from our Social Media Pages, in our sole discretion. We may
                also take steps to block users from access to our Social Media Pages who violate these
                Terms. If we follow, like, favorite, share, or re-post an individual&apos;s content on
                our Social Media Pages, that is not an endorsement by BCC of that third party or any
                service or company they represent.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                NO WARRANTY
              </h2>
              <p className="font-semibold">
                THE SITE AND CONTENT ARE PROVIDED &quot;AS IS,&quot; &quot;AS AVAILABLE,&quot; AND
                WITHOUT ANY WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
                BCC EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND WITH RESPECT TO THE SITE AND
                CONTENT, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY
                WARRANTIES ARISING FROM STATUTE, SUCH AS COURSE OF PERFORMANCE, COURSE OF DEALING OR
                USAGE IN TRADE.
              </p>
              <p className="mt-4 font-semibold">
                BCC MAKES COMMERCIALLY REASONABLE EFFORTS TO ENSURE THAT ALL CONTENT ON THE SITE IS
                ACCURATE AND RELIABLE, BUT NEITHER ACCURACY NOR RELIABILITY ARE GUARANTEED. BCC DOES
                NOT WARRANT OR GUARANTEE THE QUALITY, COMPLETENESS, TIMELINESS, OR AVAILABILITY OF THE
                SITE OR CONTENT. BCC DOES NOT WARRANT OR GUARANTEE THAT THE SITE OR CONTENT WILL BE
                UNINTERRUPTED OR ERROR-FREE, THAT ANY DEFECTS IN THE SITE OR CONTENT WILL BE CORRECTED,
                OR THAT THE SITE OR THE SERVERS THAT MAKE THE SITE AVAILABLE ARE FREE OF VIRUSES OR
                OTHER HARMFUL CONDITIONS OR COMPONENTS.
              </p>
              <p className="mt-4 font-semibold">
                WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE DO NOT WARRANT OR ENDORSE ANY
                THIRD-PARTY CONTENT.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                LIMITATION OF LIABILITY
              </h2>
              <p className="font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL BCC OR ITS
                DIRECTORS, OFFICERS, OWNERS, EMPLOYEES, CONTRACTORS, REPRESENTATIVES, CONSULTANTS,
                VOLUNTEERS, AGENTS, SUPPLIERS, ATTORNEYS OR LICENSORS (TOGETHER, &quot;BCC
                PARTY(IES)&quot;) BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY,
                PUNITIVE, OR CONSEQUENTIAL LOSS OR DAMAGE, ARISING OUT OF OR IN CONNECTION WITH THE
                SITE OR CONTENT, OR YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SITE
                OR CONTENT, REGARDLESS OF THE FORM OF ACTION, WHETHER THE CLAIM IS BASED IN CONTRACT,
                TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, WARRANTY, OR OTHERWISE, AND EVEN IF A
                BCC PARTY HAS EXPRESS KNOWLEDGE OF THE POSSIBILITY OF THE LOSS OR DAMAGE.
              </p>
              <p className="mt-4 font-semibold">
                YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP ACCESSING AND USING THE SITE OR CONTENT.
              </p>
              <p className="mt-4 font-semibold">
                WITHOUT LIMITING THE FOREGOING, IN NO EVENT WILL THE AGGREGATE LIABILITY OF THE BCC
                PARTIES ARISING OUT OF OR IN CONNECTION WITH THE SITE OR CONTENT, OR YOUR ACCESS TO OR
                USE OF, OR INABILITY TO ACCESS OR USE, THE SITE OR CONTENT EXCEED $100 U.S.D., EVEN IF
                ANY REMEDY PROVIDED FAILS OF ITS ESSENTIAL PURPOSE.
              </p>
              <p className="mt-4 font-semibold">
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME
                OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                INDEMNIFICATION
              </h2>
              <p className="font-semibold">
                YOU SHALL INDEMNIFY, DEFEND AND HOLD HARMLESS THE BCC PARTIES FROM AND AGAINST ALL
                LOSSES, CLAIMS, LIABILITIES, DEMANDS, COMPLAINTS, ACTIONS, DAMAGES, JUDGMENTS,
                SETTLEMENTS, FINES, PENALTIES, EXPENSES, AND COSTS (INCLUDING WITHOUT LIMITATION
                REASONABLE ATTORNEYS&apos; FEES) THAT ARISE OUT OF OR IN CONNECTION WITH (A) YOUR
                VIOLATION OF APPLICABLE LAWS, (B) YOUR MISUSE OF THE SITE OR ANY CONTENT, AND (C) YOUR
                BREACH OF THESE TERMS OR ANY OTHER TERMS ON THE SITE. WE RESERVE, AND YOU GRANT TO US,
                THE EXCLUSIVE RIGHT TO ASSUME THE DEFENSE AND CONTROL OF ANY MATTER SUBJECT TO
                INDEMNIFICATION BY YOU (SUBJECT TO YOUR CONTINUING INDEMNIFICATION).
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                THIRD-PARTY WEBSITES AND CONTENT
              </h2>
              <p>
                The Site may link to, or be linked to, websites not maintained or controlled by BCC.
                Those links are provided as a convenience to the visitors of our Site. BCC is not
                responsible for examining or evaluating the content or accuracy of third-party websites
                linked through the Site. BCC does not warrant or endorse any third-party website or any
                products or services made available through those websites. When leaving the Site, it is
                the terms and privacy notice of that third party that govern your use of the third-party
                site (and such third-party&apos;s use of your personal information), not these Terms.
              </p>
              <p className="mt-4">
                The Site may also contain certain third-party content. We provide third-party content
                for your convenience, not as an endorsement. The presence of third-party content does
                not mean that BCC has reviewed the third-party content or that there is any association
                between BCC and any third party. You access third-party content at your sole risk. BCC
                has no responsibility for any third-party content. Nothing in these Terms grants you any
                rights to any third-party content.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                LINKING TO THE SITE
              </h2>
              <p>
                You are prohibited from linking to the Site on your website or elsewhere without the
                prior express written consent of BCC. If BCC grants you a right to link to the Site,
                certain terms may apply, and BCC reserves the right to revoke such consent at any time.
                You are responsible for any costs incurred by BCC in enforcing its rights under this
                Section.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                USE IN THE UNITED STATES
              </h2>
              <p>
                The Site is intended for use in the United States only. We do not guarantee that use of
                the Site will be available or permitted in any location other than the United States. If
                you choose to access the Site from a location other than the United States, you do so at
                your own risk. THE EXISTENCE OF THE SITE OR ANY CONTENT SHALL NOT BE CONSTRUED AS BCC
                OR THE BCC PARTIES OFFERING SUCH SITE OR CONTENT TO PERSONS IN JURISDICTIONS WHERE THE
                PROVISION OF SUCH SITE OR CONTENT IS PROHIBITED BY LAW.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                TERMINATION
              </h2>
              <p>
                If you violate applicable laws or these Terms, you are immediately prohibited from
                further use of the Site or Content, and we may restrict your access to your Account or
                the Site or Content. BCC may suspend or terminate your use of the Site or any Content,
                in whole or in part, at any time in its sole discretion for any reason. BCC shall not be
                liable to you or anyone else for any damages arising from or related to BCC&apos;s
                suspension or termination of your use or access to the Site or the Content, or in the
                event BCC modifies, discontinues or restricts the availability of your use the Site or
                the Content (in whole or in part).
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                SITE UNAVAILABILITY
              </h2>
              <p>
                Without limiting the generality of the previous section, the Site or Content may be
                unavailable or limited for various reasons, and we shall not be liable to you for any
                such unavailability, including without limitation (a) hardware, software, server,
                network, or telecommunications failures, (b) severe weather, war, riot, act of God,
                fire, earthquake, strike, labor shortage, etc., (c) regulatory restrictions and other
                acts of government, (d) interruptions due to utility and power companies, and (e)
                interruptions due to hacking or other malicious intrusion.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                COOPERATION WITH LAW ENFORCEMENT
              </h2>
              <p>
                BCC will cooperate with law enforcement if you are suspected of having violated
                applicable laws. YOU WAIVE AND HOLD BCC AND THE BCC PARTIES HARMLESS FOR ANY
                COOPERATION WITH, OR DISCLOSURE OF YOUR INFORMATION TO, LAW ENFORCEMENT RELATING TO
                YOUR SUSPECTED VIOLATION OF APPLICABLE LAWS.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                GOVERNING LAW
              </h2>
              <p>
                These Terms will be governed by and construed, interpreted, and enforced in accordance
                with the laws of the State of California without reference to its conflicts or choice of
                law principles. Any arbitration or court proceeding will take place in Oakland,
                California and you hereby consent to the exclusive jurisdiction and venue of the state
                or Federal courts in Oakland, California. You irrevocably submit and consent to the
                personal jurisdiction of such courts. Any cause of action or other claim brought by you
                with respect to the Site or Content must be commenced within one year after the cause of
                action or claim arises.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                ASSIGNMENT
              </h2>
              <p>
                We may assign our rights and delegate our duties under these Terms at any time to any
                party without notice to you. You may not assign your rights or delegate your duties
                under these Terms without our prior written consent. These Terms inure to the benefit of
                BCC&apos;s successors and assigns.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                ENTIRE AGREEMENT
              </h2>
              <p>
                These Terms and any terms posted throughout the Site (if any) are the entire agreement
                between you and BCC with respect to your access to and use of the Site.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                WAIVER
              </h2>
              <p>
                BCC&apos;s failure to enforce any provision of these Terms will not constitute a waiver
                of that provision or any other provision. Any waiver of any provision of these Terms
                will be effective only if in writing and signed by BCC.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                SEVERABILITY
              </h2>
              <p>
                If any provision of these Terms is held invalid, void, or unenforceable, that provision
                will be severed from the remaining provisions and the remaining provisions will remain
                in full force and effect. The headings in these Terms are for convenience only and do
                not affect the interpretation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                ELECTRONIC COMMUNICATIONS
              </h2>
              <p>
                These Terms and any other documentation, agreements, notices, or communications between
                you and BCC may be provided to you electronically to the extent permissible by law.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                CONTACT US
              </h2>
              <p>
                Please direct any questions and concerns regarding these Terms to us by emailing{" "}
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
