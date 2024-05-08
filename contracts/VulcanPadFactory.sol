// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 *Submitted for verification at sepolia.etherscan.io on 2024-04-17

 
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
 _     _           _                            ______               __          
| |   | |         | |                          (_____ \              | |   
| |   | |  _   _  | |  ____   __ _   _ __       _____) )  ____    ___| |  
| |   | | | | | | | | /  _ ) / _  | |  _  \    |  ____/  / _  |  /  _| |  
 \ \_/ /  | |_| | | |( (__  ( ( | | | | | |    | |      ( ( | | (  |_| |  
  \___/    \__,_) |_| \____) \_||_| |_| |_|    |_|       \_||_|  \_____)⠀

 *  https://vulcan.pad
 **/

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Vulcan.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract VulcanPadFactory {
    /// @dev owner of the factory
    address public owner;

    /// @dev cryptoSIDADAO address
    address public daoAddress = 0x5B98a0c38d3684644A9Ada0baaeAae452aE3267B;

    /// @dev DAI ERC20 token
    IERC20 public immutable daiToken;

    /// @dev spam filter fee amount 100 DAI as decimal is 18
    uint256 public feeAmount = 100 ether;

    /// @dev tracks spam filter fee contributions of investors
    mapping(address => uint256) public feeContributions;

    /// @dev created ICOs
    address[] public vulcans;

    /// @dev launched ICO
    mapping(address => bool) isVulcan;

    /// @dev event when user paid 100DAI spam filter fee
    event PaidSpamFilterFee(address user, uint256 amount);

    /// @dev event when new ICO is created
    event ICOCreated(
        address creator,
        address ico,
        string projectURI,
        uint256 softcap,
        uint256 hardcap,
        uint256 startTime,
        uint256 endTime,
        string name,
        string symbol,
        uint256 price,
        uint256 decimal,
        uint256 totalSupply,
        address tokenAddress,
        address fundsAddress,
        address lister
    );

    /// @dev validate if token address is non-zero
    modifier notZeroTokenAddress(address address_) {
        require(address_ != address(0), "Invalid TOKEN address");
        _;
    }

    /// @dev validate if token address is non-zero
    modifier notZeroFundsAddress(address address_) {
        require(address_ != address(0), "Invalid address that funds go to");
        _;
    }

    /// @dev validate if dao address is non-zero
    modifier notZeroDAOAddress(address daoAddress_) {
        require(daoAddress_ != address(0), "Invalid DAO address");
        _;
    }

    /// @dev validate if paid 100DAI spam filter fee
    modifier spamFilterFeePaid(address user_) {
        require(
            feeContributions[user_] >= feeAmount,
            "Not paid spam filter fee"
        );
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

    /// @dev validate if token price is zero
    modifier notZeroPrice(uint256 price_) {
        require(price_ > 0, "Token price must greater than 0");
        _;
    }

    /// @dev validate if funds can reach the hardcap for this token
    modifier totalSupplyAbleToReachHardcap(
        uint price_,
        uint totalSupply_,
        uint decimal_,
        uint hardcap_
    ) {
        require(
            (price_ * totalSupply_) / 10 ** decimal_ >= hardcap_,
            "Have to be able to reach hardcap"
        );
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

    /**
     * @dev contructor
     * @param daiAddress_ DAI stable coin address for paying spam filter fee...
     * @param daoAddress_ cryptoSI DAODAO address...
     */
    constructor(
        address daiAddress_,
        address daoAddress_
    ) notZeroDAOAddress(daoAddress_) {
        require(daiAddress_ != address(0), "Invalid DAI address");
        daiToken = IERC20(daiAddress_);
        daoAddress = daoAddress_;
        owner = msg.sender;
    }
    /**
     * @dev Pay non-refundable spam filter fee of 100DAI
     */
    function paySpamFilterFee() external {
        uint256 _allowance = daiToken.allowance(msg.sender, address(this));
        require(_allowance >= feeAmount, "Insufficient DAI allowance");

        SafeERC20.safeTransferFrom(
            daiToken,
            msg.sender,
            daoAddress,
            feeAmount
        );
        feeContributions[msg.sender] += feeAmount;

        emit PaidSpamFilterFee(msg.sender, feeAmount);
    }
    /**
     * @dev launch new ICO
     * @param projectURI_ project metadata uri "https://ipfs.."
     * @param softcap_ softcap for ICO 100 * 10**18
     * @param hardcap_ hardcap for ICO  200 * 10**18
     * @param endTime_ ICO end time 1762819200000
     * @param name_ token name "vulcan token"
     * @param symbol_ token symbol "$VULCAN"
     * @param price_ token price for ICO 0.01 * 10**18
     * @param decimal_ token decimal 18
     * @param totalSupply_ token totalSupply 1000000000 * 10**18
     * @param tokenAddress_ token address
     * @param fundsAddress_ account address that funds will go to
     * @param lister_ listing partner's address
     */
    function launchNewICO(
        string memory projectURI_,
        uint256 softcap_,
        uint256 hardcap_,
        uint256 endTime_,
        string memory name_,
        string memory symbol_,
        uint256 price_,
        uint256 decimal_,
        uint256 totalSupply_,
        address tokenAddress_,
        address fundsAddress_,
        address lister_
    )
        public
        spamFilterFeePaid(msg.sender)
        capSettingValid(softcap_, hardcap_)
        isFuture(endTime_)
        notZeroTokenAddress(tokenAddress_)
        notZeroFundsAddress(fundsAddress_)
        notZeroPrice(price_)
        totalSupplyAbleToReachHardcap(price_, totalSupply_, decimal_, hardcap_)
        notZeroDecimal(decimal_)
        notZeroTotalSupply(totalSupply_)
        returns (address)
    {
        Vulcan _newVulcan = new Vulcan(
            projectURI_,
            softcap_,
            hardcap_,
            endTime_,
            name_,
            symbol_,
            msg.sender,
            price_,
            decimal_,
            totalSupply_,
            tokenAddress_,
            daoAddress,
            fundsAddress_,
            lister_
        );

        address _vulcan = address(_newVulcan);
        vulcans.push(_vulcan);
        feeContributions[msg.sender] -= feeAmount;

        emit ICOCreated(
            msg.sender,
            _vulcan,
            projectURI_,
            softcap_,
            hardcap_,
            block.timestamp,
            endTime_,
            name_,
            symbol_,
            price_,
            decimal_,
            totalSupply_,
            tokenAddress_,
            fundsAddress_,
            lister_
        );
        return _vulcan;
    }
    /**
     * @dev set DAO address
     */
    function setDAOAddress(
        address daoAddress_
    ) external notZeroDAOAddress(daoAddress_) {
        daoAddress = daoAddress_;
    }

    /**
     * @dev Test whether the user has already paid the spam filter fee of 100DAI
     */
    function paidSpamFilterFee(address user_) external view returns (bool) {
        bool _success = feeContributions[user_] >= feeAmount;
        return _success;
    }

    /**
     * @dev get all ico lists
     */
    function getVulcans() public view returns (address[] memory) {
        return vulcans;
    }

    /**
     * @dev set factory's owner
     */
    function setOwner(address owner_) external {
        require(owner_ != address(0), "Owner address is not zero!");
        owner = owner_;
    }
}
