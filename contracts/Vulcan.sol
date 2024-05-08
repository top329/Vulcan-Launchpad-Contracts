// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * Submitted for verification at basescan.org on 2024-04-2

                                                       
                              *                              
                      **       ***                             
                      ****     ****                            
           *          *****    ******                           
          ***          ***     ********        *                 
          ***                  **********      ***               
         ******               ***********     *****               
         ******   ****       *************   *****               
          ****   ******    ****************   **                
               ********* *******  *********                     
            *****************      ********     ***             
          *****************        *******  ******             
         *****************      *   **************             
        ************ ****      **    **************             
      ***********     *      ***       *************             
      ***********         ******        **   *******             
      **********        *********           ********             
      ********** **   ***********     *      *******              
       ****** *  *************   ******    ********              
        *****    *********************     *******               
         ******  ********************      ******                
          ******   *****************     ******                  
             ******  *************    *******                    
               ********       *********                       
                     ********                    ⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
 _     _           _                            ______               __          
| |   | |         | |                          (_____ \              | |   
| |   | |  _   _  | |  ____   __ _   _ __       _____) )  ____    ___| |  
| |   | | | | | | | | /  _ ) / _  | |  _  \    |  ____/  / _  |  /  _| |  
 \ \_/ /  | |_| | | |( (__  ( ( | | | | | |    | |      ( ( | | (  |_| |  
  \___/    \__,_) |_| \____) \_||_| |_| |_|    |_|       \_||_|  \_____) ⠀⠀
  ⠀

 *  https://vulcan.pad
 **/

// Uncomment this line to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Vulcan is ReentrancyGuard {
    /// @dev struct for token info
    struct TOKEN {
        string name;
        string symbol;
        uint256 totalSupply;
        address tokenAddress;
        uint256 decimal;
        uint256 price;
    }

    /// @dev struct for fee distribution
    struct DISTRIBUTION {
        bool distributed;
        address distributor;
        uint256 timestamp;
    }

    /// @dev struct for fee refund
    struct REFUND {
        bool refunded;
        address refunder;
        uint256 timestamp;
    }

    /// @dev structure for investment details
    struct HISTORY {
        address investor;
        address contributor;
        uint256 amount;
        uint256 timestamp;
    }

    /// @dev enum for representing ICO's state
    enum ICOState {
        PROGRESS,
        FAILED,
        SUCCESS_SOFTCAP,
        SUCCESS_HARDCAP
    }

    /// @dev listing partner's address
    address public lister;

    /// @dev contract owner
    address public owner;

    /// @dev contract owner
    address public daoAddress;

    /// @dev ICO start time
    uint256 public startTime;

    //@dev immutables
    IERC20 public immutable token;

    /// @dev ICO creator
    address public creator;

    /// @dev account that funds will go to after success
    address public fundsAddress;

    /// @dev project metadata URI
    string public projectURI;

    /// @dev ICO hardcap
    uint256 public hardcap;

    /// @dev ICO softcap
    uint256 public softcap;

    /// @dev endTime
    uint256 public endTime;

    /// @dev token info
    TOKEN public tokenInfo;

    /// @dev funds raised from ICO
    uint256 public fundsRaised;

    /// @dev Tracks investors
    address[] public investors;

    /// @dev Tracks contributions of investors
    mapping(address => uint256) public investments;

    // @dev Tracks contribution partners
    address[] public contributors;

    // @dev test if funds are distributed
    DISTRIBUTION public distribution;

    // @dev test if funds are refunded
    REFUND public refund;

    // @dev investment history
    HISTORY[] public history;

    // @dev Tracks contributions of contribution partners
    mapping(address => uint256) public contributions;

    /// @dev validate if token address is non-zero
    modifier notZeroTokenAddress(address address_) {
        require(address_ != address(0), "Invalid TOKEN address");
        _;
    }

    /// @dev validate if token address is non-zero
    modifier notZeroFundsAddress(address address_) {
        require(address_ != address(0), "Invalid account address that funds will go to");
        _;
    }

    /// @dev validate if dao address is non-zero
    modifier notZeroDaoAddress(address daoAddress_) {
        require(daoAddress_ != address(0), "Invalid DAO address");
        _;
    }

    /// @dev validate if listing partner's address is non-zero
    modifier notZeroListerAddress(address lister_) {
        require(lister_ != address(0), "Invalid listing partner's address");
        _;
    }

    /// @dev validate if token address is non-zero
    modifier notZeroCreator(address creator_) {
        require(creator_ != address(0), "Invalid creator address");
        _;
    }

    /// @dev validate endtime is valid
    modifier isFuture(uint256 endTime_) {
        require(endTime_ > block.timestamp, "End time should be in the future");
        _;
    }

    /// @dev validate softcap & hardcap setting
    modifier capSettingValid(uint256 softcap_, uint256 hardcap_) {
        require(softcap_ > 0, "Softcap must be greater than 0");
        require(hardcap_ > 0, "Hardcap must be greater than 0");
        require(hardcap_ > softcap_, "Softcap must less than hardcap");
        _;
    }

    /// @dev validate if token decimal is zero
    modifier notZeroDecimal(uint256 decimal_) {
        require(decimal_ > 0, "Token decimal must greater than 0");
        _;
    }

    /// @dev validate if token totalsupply is zero
    modifier notZeroTotalSupply(uint256 totalSupply_) {
        require(totalSupply_ > 0, "Token totalSupply must greater than 0");
        _;
    }

    /// @dev validate if tokens have been charged fully according to hardcap
    modifier tokensChargedFully() {
        uint _tokensAvailable = tokensAvailable();
        uint _fundsAbleToRaise = (tokenInfo.price * _tokensAvailable) /
            10 ** tokenInfo.decimal;
        require(
            _fundsAbleToRaise >= hardcap,
            "Tokens have to be charged fully for ICO"
        );
        _;
    }

    /// @dev validate if amount to purchase less than ico balance.
    modifier ableToBuy(uint256 amount_) {
        uint256 _tokensAvailable = tokensAvailable();
        uint256 _tokens = ((amount_ + fundsRaised) * 10 ** tokenInfo.decimal) /
            tokenInfo.price;
        require(
            _tokens <= _tokensAvailable,
            "Insufficient purchase token amount"
        );
        _;
    }

    /// @dev validate if funds can reach the hardcap for this token
    modifier totalSupplyAbleToReachHardcap(
        uint price_,
        uint totalSupply_,
        uint decimal_,
        uint hardcap_
    ) {
        console.log("------------->", (price_ * totalSupply_) / 10 ** decimal_, hardcap_);
        require(
            (price_ * totalSupply_) / 10 ** decimal_ >= hardcap_,
            "Have to be able to reach hardcap"
        );
        _;
    }

    /// @dev event for fee distribution after ico success
    event FeeDistributed(
        address ico,
        address distributor,
        uint256 fundsRaised,
        uint256 daoFee,
        uint256 listerFee,
        uint256 creatorFee,
        uint256 timestamp
    );

    /// @dev event for new investment
    event Invest(
        address ico,
        address investor,
        address contributor,
        uint256 amount,
        uint256 timestamp
    );

    /// @dev event for refunding all funds
    event FundsRefunded(address ico, address caller, uint256 timestamp);

    /**
     * @dev constructor for new ICO launch
     * @param projectURI_ project metadata uri "https://ipfs.."
     * @param softcap_ softcap for ICO 100 * 10**18
     * @param hardcap_ hardcap for ICO  200 * 10**18
     * @param endTime_ ICO end time 1762819200000
     * @param name_ token name "vulcan token"
     * @param symbol_ token symbol "$VULCAN"
     * @param creator_ ICO creator address "0x00f.."
     * @param price_ token price for ICO 0.01 * 10**18
     * @param decimal_ token decimal 18
     * @param totalSupply_ token totalSupply 1000000000 * 10**18
     * @param tokenAddress_ token address 0x810fa...
     * @param fundsAddress_ account address that funds will go to 0x810fa...
     * @param daoAddress_ cryptoSI DAODAO address 0x810fa...
     */
    constructor(
        string memory projectURI_,
        uint256 softcap_,
        uint256 hardcap_,
        uint256 endTime_,
        string memory name_,
        string memory symbol_,
        address creator_,
        uint256 price_,
        uint256 decimal_,
        uint256 totalSupply_,
        address tokenAddress_,
        address daoAddress_,
        address fundsAddress_,
        address lister_
    )
        capSettingValid(softcap_, hardcap_)
        isFuture(endTime_)
        notZeroCreator(creator_)
        notZeroDecimal(decimal_)
        notZeroTotalSupply(totalSupply_)
        totalSupplyAbleToReachHardcap(price_, totalSupply_, decimal_, hardcap_)
        notZeroTokenAddress(tokenAddress_)
        notZeroFundsAddress(fundsAddress_)
        notZeroDaoAddress(daoAddress_)
        notZeroListerAddress(lister_)
    {
        owner = msg.sender;
        daoAddress = daoAddress_;
        lister = lister_;

        projectURI = projectURI_;

        tokenInfo.name = name_;
        tokenInfo.totalSupply = totalSupply_;
        tokenInfo.symbol = symbol_;
        tokenInfo.tokenAddress = tokenAddress_;
        tokenInfo.price = price_;
        tokenInfo.decimal = decimal_;

        fundsAddress = fundsAddress_;
        creator = creator_;
        softcap = softcap_;
        hardcap = hardcap_;
        startTime = block.timestamp;
        endTime = endTime_;

        token = IERC20(tokenAddress_);
    }

    /**
     * @dev return remaining token balance for ICO
     * @return amount token balance as uint256
     */
    function maxAmountToPurchase() public view returns (uint256) {
        uint256 _amount = token.balanceOf(address(this));
        return _amount;
    }

    /// @dev test if tokens are charged fully to reach hardcap
    function tokensFullyCharged() public view returns (bool) {
        uint _tokensAvailable = tokensAvailable();
        uint _fundsAbleToRaise = (tokenInfo.price * _tokensAvailable) / 10 ** tokenInfo.decimal;

        if ( _fundsAbleToRaise >= hardcap ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev return remaining token balance for ICO
     * @return amount token balance as uint256
     */
    function tokensAvailable() public view returns (uint256) {
        uint256 _amount = token.balanceOf(address(this));
        return _amount;
    }

    /**
     * @dev return minimum ETH available to purchase tokens
     * @return amount token balance as uint256
     */
    function minEthAvailable() public view returns (uint256) {
        return (tokenInfo.price * 10 ** tokenInfo.decimal) / 10 ** 18;
    }

    /**
     * @dev return token available to purchase using given Eth
     * @return amount token amount as uint256
     */
    function tokensAvailableByEth(uint256 eth_) public view returns (uint256) {
        return eth_ / tokenInfo.price;
    }

    /**
     * @dev Returns the Eth needed to purchase a equivalent amount of tokens.
     * @param amount_ the amount of tokens
     * @return amount eth as uint256
     */
    function ethdByTokens(uint256 amount_) public view returns (uint256) {
        return (tokenInfo.price * amount_) / 10 ** tokenInfo.decimal;
    }
    /**
     * @dev Returns a token that can be purchased with an equivalent amount of ETH.
     * @param amount_ the amount of eth
     * @return amount token amount as uint256
     */
    function tokensByEth(uint256 amount_) public view returns (uint256) {
        return (amount_ * 10 ** tokenInfo.decimal) / tokenInfo.price;
    }

    /**
     * @dev Calculate the amount of tokens to sell to reach the hard cap.
     * @return amount token amount as uint256
     */
    function totalCap() public view returns (uint256) {
        return hardcap / tokenInfo.price;
    }

    /**
     * @dev buy tokens using ETH
     * @param amount_ ETH amount to invest
     * @param contributor_ contribution partner's address
     */
    function invest(
        uint amount_,
        address contributor_
    ) external payable nonReentrant tokensChargedFully ableToBuy(amount_) {

        require(block.timestamp < endTime, "ICO is ended");
        require(amount_ > 0, "Invalid amount");
        require(msg.value >= amount_, "Insufficient Eth amount");
        require(contributor_ != address(0), "Invalid contributor's address");

        if(investments[msg.sender] == 0) investors.push(msg.sender) ;
        investments[msg.sender] += amount_;

        if (contributions[contributor_] == 0) contributors.push(contributor_);
        contributions[contributor_] += amount_;

        uint256 _gap = msg.value - amount_;
        if (_gap > 0) {
            payable(msg.sender).transfer(_gap); // If there is any ETH left after purchasing tokens, it will be refunded.
        }

        // save investment history
        history.push(HISTORY(
            msg.sender,
            contributor_,
            amount_,
            block.timestamp
        ));

        fundsRaised += amount_;
        if (fundsRaised >= hardcap) {
            // Once the funds raised reach the hard cap, the ICO is completed and the funds are distributed.
            endTime = block.timestamp - 1;
            distribute();
        }
        emit Invest(address(this), msg.sender, contributor_, amount_, block.timestamp);
    }

    /**
     * @dev when time is reach, creator finish ico
     */
    function finish() external payable nonReentrant {
        require(block.timestamp > endTime, "ICO not ended yet.");

        if (fundsRaised >= softcap) {
            distribute(); // If funds raised reach softcap, distribute funds
        } else {
            finishNotSuccess(); // If the funds don't reach softcap, all investments will be refunded to investors
        }
    }

    /**
     * @dev If the ICO fails to reach the soft cap before the end of the self-set time, all funds will be refunded to investors.
     */
    function finishNotSuccess() internal {

        // refunds all funds to investors
        for (uint256 i = 0; i < investors.length; i++) {
            address to = investors[i];
            uint256 _amount = investments[to];
            investments[to] = 0;
            if (_amount > 0) payable(to).transfer(_amount);
        }

        // refunds all tokens to creator
        uint256 _tokens = tokensAvailable();
        SafeERC20.safeTransfer(token, creator, _tokens);

        // set refund information
        refund.refunded = true;
        refund.refunder = msg.sender;
        refund.timestamp = block.timestamp;

        emit FundsRefunded(
            address(this),
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev Distribute fees to dao and partners and send funds to creators' wallets, and send tokens to investors.
     */
    function distribute() internal {

        bool success = false;
        // funds raised
        uint256 _funds = fundsRaised;
        // cryptoSI DADAO fee 2.5%
        uint256 _daoFee = _funds * 25 / 1000;
        (success, ) = payable(daoAddress).call{ value: _daoFee }("");
        require(success, "Failed to send DAO fee.");
        //listing partner's fee 1%
        uint256 _listerFee = _funds * 10 / 1000;
        (success, ) = payable(lister).call{ value: _listerFee }("");
        require(success, "Failed to send listing partner's fee.");
        //creator's funds 95%
        uint256 _creatorFee = _funds * 95 / 100;
        (success, ) = payable(fundsAddress).call{ value: _creatorFee }("");
        require(success, "Failed to send creator's funds.");
        
        // distribute investor's contribution fees to contribution partners
        for (uint256 i = 0; i < contributors.length; i++) {
            address _to = contributors[i];
            uint256 _amount = contributions[_to] * 15 / 1000;
            // send 1.5% to contribution partner
            (success, ) = payable(_to).call{ value: _amount }("");
            require(success, "Failed to send contribution partner's fee.");
        }
        // distribute tokens to investors
        for (uint256 i = 0; i < investors.length; i++) {
            address _to = investors[i];
            uint256 _amount = investments[_to];
            uint256 _tokens = (_amount * 10 ** tokenInfo.decimal) /
                tokenInfo.price;
            SafeERC20.safeTransfer(token, _to, _tokens);
        }
        // set distribution information
        distribution.distributed = true;
        distribution.distributor = msg.sender;
        distribution.timestamp = block.timestamp;

        emit FeeDistributed(
            address(this),
            msg.sender,
            _funds,
            _daoFee,
            _listerFee,
            _creatorFee,
            block.timestamp
        );
    }

    /**
     * @dev get current state of this ICO
     */
    function getICOState() public view returns (ICOState _state) {
        if (block.timestamp < endTime) {
            _state = ICOState.PROGRESS;
        } else if (fundsRaised >= hardcap) {
            _state = ICOState.SUCCESS_HARDCAP;
        } else if (fundsRaised < softcap) {
            _state = ICOState.FAILED;
        } else {
            _state = ICOState.SUCCESS_SOFTCAP;
        }
        return _state;
    }

    /**
     * @dev get all investors
     */
    function getInvestors() public view returns (address[] memory) {
        return investors;
    }

    /**
     * @dev Get the investor's investment amount
    */
    function getInvestAmount(address from) public view returns (uint256) {
        return investments[from];
    }

    /**
     * @dev Get all contributors
     */
    function getContributors() public view returns (address[] memory) {
        return contributors;
    }

    /**
     * @dev Get contribution partner's fee
     */
    function getContributorAmount(address from) public view returns (uint256) {
        return contributions[from];
    }

    /**
     * @dev get all investment history
     */
    function getHistory() public view returns (HISTORY[] memory) {
        return history;
    }

    function getTokenAmountForInvestor(
        address from
    ) public view returns (uint256) {
        uint256 _amount = investments[from];
        uint256 _tokens = (_amount * 10 ** tokenInfo.decimal) / tokenInfo.price;
        return _tokens;
    }

    receive() external payable { }
    fallback() external payable { }
}
