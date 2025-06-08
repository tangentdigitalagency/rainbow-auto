import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
} from "@heroui/react";
import Logo from "@/assets/r-logo.webp";

const Footer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <footer className="py-8 border-t border-gray-200 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-start">
            <Image src={Logo} alt="Surety Auto Group" width={75} height={75} />
          </div>

          {/* Social Media Links */}

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <p>5471 W Atlantic Blvd</p>
            <p>Margate, FL 33063</p>
            <p>Phone: (954) 977-0047</p>
            <p>Email: info@rainbowinsurance.com</p>
          </div>

          {/* TCPA Compliance */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">TCPA Compliance</h3>
            <p className="text-sm">
              By using this website, you agree to our TCPA consent. We or our
              partners may contact you via phone or SMS. To opt-out, reply STOP
              or contact us.
            </p>
            <Button
              onPress={onOpen}
              className="h-auto p-0 mt-2 text-sm font-normal bg-transparent text-primary hover:underline min-w-min"
            >
              View Full TCPA Policy
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 text-center border-t border-gray-200">
          <p>&copy; 2025 Rainbow Insurance. All rights reserved.</p>
        </div>
      </div>

      {/* TCPA Policy Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="blur"
        closeButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                TCPA Policy
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-foreground">
                  <span className="text-sm text-foreground">
                    By using this site, I expressly provide my E-SIGN signature
                    and consent to receive marketing calls, texts, and emails
                    regarding insurance, from or on behalf of USAA at the phone
                    number and email address I provided, including via automatic
                    telephone dialing system or artificial or prerecorded voice
                    messages, even if my number is on a federal, state, or
                    company Do-Not-Call List. I understand that my consent is
                    not a condition of purchasing any goods or services. By
                    clicking Get Quote, above, I affirm that I have read and
                    agree to the{" "}
                    <a
                      className="text-blue-600 hover:underline"
                      href="https://rainbowinsurance.com/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://rainbowinsurance.com/terms-conditions/"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms & Conditions
                    </a>{" "}
                    including the arbitration provision and the{" "}
                    <a
                      href="https://rainbowinsurance.com/terms-conditions/"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      E-SIGN Consent
                    </a>
                    .
                  </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </footer>
  );
};

export default Footer;
