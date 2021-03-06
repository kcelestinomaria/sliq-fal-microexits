import * as React from "react";
import AccountDetailComponent from "../stateless/accountdetailcomponent";
import $ from "jquery";
import AlgorandClient from "../../services/algorandsdk";

/**
 * This component will show account details and provides helper methods to changeAccount and getAccountBalance
 * @props address: string -> account address
 * @props mnemonic: string -> account mnemonic
 * @props accountList: Array -> list of account created
 * @props changeAccount: (account) => void -> send account to be changed
 */
class AccountComponent extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      balance: 0,
      transactions: [],
      transactionLoaded: false
    };
  }

  componentDidMount = async () => {
    // get address from state
    let addr = this.props.address;

    this.getAccountBalance(addr);

    this.getAccountTransaction(addr);

    // for tooltip
    $('[data-toggle="tooltip"]').tooltip();
  };

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  /**
   * Change account details and account transaction.
   *
   * @param {{address: string, mnemonic: string}} account
   */
  changeAccount = account => {
    this.props.changeAccount(account);
    console.log(account);
    this.setState({
      balance: 0,
      transactions: [],
      transactionLoaded: false
    });
    this.getAccountBalance(account.address);
    this.getAccountTransaction(account.address);
  };

  /**
   * Get account balance
   *
   * @param {{address: string}} addr
   */
  getAccountBalance = async addr => {
    // get account information
    let accountDet = await AlgorandClient.accountInformation(addr);
    // setting balance to state
    console.log(accountDet);
    this.setState({
      balance: accountDet.amount / 1000000
    });
  };

  /**
   * Get account transactions
   *
   * @param {{address: string}} addr
   */
  getAccountTransaction = async addr => {
    // get transaction params
    let params = await AlgorandClient.getTransactionParams();

    //get all transactions for an address for the last 1000 rounds
    let txts = await AlgorandClient.transactionByAddress(
      addr,
      params.lastRound - 1000,
      params.lastRound
    );

    // setting transaction list and transactionLoaded to true
    this.setState({
      transactions: txts.transactions === undefined ? [] : txts.transactions,
      transactionLoaded: true
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 p-3">
            <AccountDetailComponent
              balance={this.state.balance}
              address={this.props.address}
              mnemonic={this.props.mnemonic}
              accountList={this.props.accountList}
              changeAccount={this.changeAccount}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default AccountComponent;