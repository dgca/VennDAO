import SyntaxHighlighter from "react-syntax-highlighter";
import { useIsClient } from "usehooks-ts";

import { Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

const codeString = `
contract Demo {
  IVennDAOOrders private vennDAO;

  constructor(address _vennDAOAddress) {
      vennDAO = IVennDAOOrders(_vennDAOAddress);
  }

  function _placeOrder() internal {
      uint256 productId = 0;
      uint256 quantity = 1;
      address refundRecipient = msg.sender;
      string[] memory publicFields = new string[](1);
      publicFields[0] = "https://foo.com/cool-image.png";
      string memory encryptedFields = "0x1234...";

      vennDAO.placeOrder(
          productId,
          quantity,
          refundRecipient,
          publicFields,
          encryptedFields
      );
  }
}
`;

const Highlight = ({ code }: { code: string }) => {
  const isClient = useIsClient();
  if (!isClient) return null;
  const codeStyles = require("react-syntax-highlighter/dist/esm/styles/hljs");
  return (
    <div className="rounded-sm overflow-hidden my-4">
      <SyntaxHighlighter language="typescript" style={codeStyles.atomOneDark}>
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default function Docs() {
  return (
    <MainLayout>
      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <Text.H2 as="h1">Developer Docs</Text.H2>
        <Text.P>
          Making it easy for web3 projects to integrate with our vendor network
          is our top priority. We offer a simple, on-chain API that allows any
          web3 project to place orders for products listed on VennDAO.
        </Text.P>
        <Text.P>
          In order for your smart contract to place an order, you need the
          following:
        </Text.P>
        <ul className="list-disc list-outside pl-4">
          <li>
            The <code>VennDAOOrders</code> contract address and interface
            <ul className="list-disc list-outside pl-4">
              <li>
                <Text.Anchor
                  href="https://sepolia.basescan.org/address/0x294178884589af64db092eaf6986d499f7799bf8"
                  target="_blank"
                >
                  View Contract on Base Sepolia
                </Text.Anchor>
              </li>
              <li>
                <Text.Anchor
                  href="https://github.com/dgca/VennDAO/blob/main/packages/contracts/src/IVennDAOOrders.sol"
                  target="_blank"
                >
                  View on GitHub
                </Text.Anchor>
              </li>
            </ul>
          </li>
          <li>
            The <code>productId</code> of the product you want to order
          </li>
          <li>The quantity of the product you want to order</li>
          <li>
            The <code>address</code> of the recipient of the refund
          </li>
          <li>
            The data the vendor requires to fulfill the order. These are
            available on the product.
          </li>
        </ul>

        <Highlight code={codeString} />
        <Text.P>
          Few vendors of physical goods list their products on-chain. As a web3
          app, if you want to deliver real world goods to your customers, you
          typically have to build a custom integration with an existing web2
          APIs.
        </Text.P>
        <Text.P>
          VennDAO solves this problem by enabling any vendor to list their
          products on chain without having to deploy their own smart contract.
          Web3 apps can then place orders for products listed on VennDAO
          on-chain.
        </Text.P>
        <Text.P>
          Because VennDAO is a vendor-run organization, it offers vendors a
          unique advantage over traditional web2 marketplaces. This approach
          ensures that the interests of the vendors are at the forefront of the
          platform&apos;s development and governance.
        </Text.P>
      </div>
    </MainLayout>
  );
}
