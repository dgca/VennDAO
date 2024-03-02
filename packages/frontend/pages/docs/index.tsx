import SyntaxHighlighter from "react-syntax-highlighter";
import { useIsClient } from "usehooks-ts";

import { Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

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
            The data the vendor requires to fulfill the order. These fields are
            available on each product.
            <ul className="list-disc list-outside pl-4">
              <li>
                <code>publicFields</code> are passed in as an array of strings.
              </li>
              <li>
                <code>encryptedFields</code> must be encryped before being
                passed in. Encryption must follow the steps seen in&nbsp;
                <Text.Anchor
                  href="https://github.com/dgca/VennDAO/blob/main/packages/frontend/utils/encrypt.ts"
                  target="_blank"
                >
                  this function
                </Text.Anchor>
                .
              </li>
            </ul>
          </li>
        </ul>

        <Text.P>
          With this information, you can then calculate the price of your order,
          allow <code>VennDAO</code> to transfer that amount, and call{" "}
          <code>VennDAO.placeOrder()</code>
          with the appropriate arguments.
        </Text.P>

        <Text.P>An example of this process looks like this:</Text.P>

        <Highlight
          code={`
contract Demo {
  IVennDAOOrders private vennDAO;
  IERC20 private usdcContract;

  constructor(address _vennDAOAddress, address _usdcContract) {
    vennDAO = IVennDAOOrders(_vennDAOAddress);
    usdcContract = IERC20(_usdcContract);
  }

  function _placeOrder() internal {
    uint256 productId = 0;
    uint256 quantity = 1;
    uint256 price = vennDAO.calculateOrderTotal(
      productId,
      quantity
    );
    address refundRecipient = msg.sender;
    string[] memory publicFields = new string[](1);
    publicFields[0] = "https://foo.com/cool-image.png";
    string memory encryptedFields = "0x1234...";

    // Approve spend of USDC
    usdcContract.approve(address(vennDAO), price);

    // Place order
    vennDAO.placeOrder(
      productId,
      quantity,
      refundRecipient,
      publicFields,
      encryptedFields
    );
  }
}
`}
        />
      </div>
    </MainLayout>
  );
}
