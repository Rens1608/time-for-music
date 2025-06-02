export default function PrivacyPolicy() {
    return (
        <div className="flex justify-center">
            <div className="mt-32 mb-16 flex flex-col rounded-lg max-w-4xl bg-white shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 p-7">
                <p className="text-2xl font-bold mb-4">Privacy Policy of Time for Music!</p>
                <p className="font-bold text-lg">Introduction</p>
                <p className="mb-4">Welcome to Time for Music! We are committed to protecting your privacy. This policy details the information we collect, how it is used and shared, and your rights regarding your data.</p>

                <p className="font-bold text-lg">Information We Collect</p>

                <p className="mb-4">Personal Information: We collect your email when you are placing an order. This enables us to send the generated playlist to the right email address and keep track of the purchase history.</p>
                <p className="font-bold text-lg">Sharing Your Information</p>

                <p className="mb-4">Data Hosting and Storage: We use Firebase to host the data collected. Your personal data is stored securely on Firebase, and we do not share it with any third-party services other than for the purpose of data hosting.</p>
                <p className="font-bold text-lg">Data Security</p>
                <p className="mb-4">We take the security of your data seriously. Your personal information is stored securely on Firebase, protected with industry-standard encryption protocols both in transit and at rest. We implement stringent security measures to prevent unauthorized access, alteration, and misuse of your data.</p>

                <p className="font-bold text-lg">Your Rights</p>
                <ul className="mb-4">
                    <li>Access, Correction, and Deletion: You have the right to access, correct, or request the deletion of your personal data at any time. If you wish to request deletion, please contact us through the contact form.</li>
                    <li>Data Portability: You have the right to request a copy of the data we hold about you in a structured, commonly used, and machine-readable format.</li>
                    <li>Right to Object: You have the right to object to this processing if you feel it impacts your personal rights and freedoms. You can exercise this right by contacting us through the contact form.</li>
                </ul>
                <p className="font-bold text-lg">International Data Transfers</p>
                <p className="mb-4">Data we collect may be processed and stored in any country where our servers or service providers are located. We ensure that data transferred to and from Firebase adheres to stringent data protection standards to maintain the security and confidentiality of your information.

                    Changes to This Privacy Policy
                    We may update our Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any significant changes by posting the new privacy policy on our website and updating the effective date at the top of this policy.

                    Contact Us
                    If you have any questions or concerns about our privacy practices or your personal data, please contact us through the contact form.
                </p>
            </div >
        </div >
    )
}