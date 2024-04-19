import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import ABI from './test/vulcan.json';

describe("Factory Contract Test", function () {
    let vulcanPadFactory:any;
    let vulcan: any;
    let dew:any;
    let dai:any;
    let owner:any;
    let user:any;
    let user1:any;
    let user2:any;
    let lister:any;
    let contributor1:any;
    let contributor2:any ;
    const daoAddress:any = "0x5B98a0c38d3684644A9Ada0baaeAae452aE3267B";

    let ico: any;

    it("should deploy DAI contract", async function(){
        // Get the first account as the owner
        [owner, user, user1, user2, lister, contributor1, contributor2] = await ethers.getSigners();
        const DAIInstance = await ethers.getContractFactory("DAI") ;
        dai = await DAIInstance.connect(user).deploy(1000000) ;
        console.log('\tDAI token deployed at:', await dai.getAddress());
        console.log("\tuser's dai balance: ", await dai.balanceOf(await user.address));
    })
    it("should deploy DEW contract", async function(){
        // Get the first account as the owner
        const DEWInstance = await ethers.getContractFactory("DEW") ;
        dew = await DEWInstance.connect(user).deploy(ethers.parseUnits("10000000000", 10)) ;
        console.log('\tDEW token deployed at:', await dew.getAddress());
        console.log("\tuser's dew balance: ", await dew.balanceOf(await user.address));
    })
    it("should deploy Factory contract", async function(){
        // Get the first account as the owner
        console.log("\tAccount address\t", await owner.address);
        const VulcanFactoryInstance = await ethers.getContractFactory("VulcanPadFactory") ;
        vulcanPadFactory = await VulcanFactoryInstance.deploy(await dai.getAddress(), daoAddress) ;
        console.log('\tVulcanPadFactory deployed at:', await vulcanPadFactory.getAddress());
    })
    it("test for deploying Vulcan ICO", async function () {
        // const VulcanInstance = await ethers.getContractFactory("Vulcan");
        console.log("user's fee before: ", await vulcanPadFactory.feeContributions(await user.address));
        console.log("user's dai balance before: ", await dai.balanceOf(await user.address));
        await dai.connect(user).approve(await vulcanPadFactory.getAddress(), ethers.parseEther("100"));
        await vulcanPadFactory.connect(user).paySpamFilterFee();
        console.log("user's fee: ", await vulcanPadFactory.feeContributions(await user.address));
        console.log("user's dai balance: ", await dai.balanceOf(await user.address));
        
        const _projectURI = "https://ipfs:werwqerwerqwer";
        const _softcap = ethers.parseEther("55");
        const _hardcap = ethers.parseEther("60");
        const _endTime = new Date("2024-04-17").getTime();
        const _symbol = "DEW";
        const _name = "Dreams Evolving Widely";
        const _price = ethers.parseEther("0.0001");
        const _decimals = 10;
        const _totalSupply = ethers.parseUnits("50000000", 10);
        const _tokenAddress = await dew.getAddress();

        await vulcanPadFactory.connect(user).launchNewICO(
            _projectURI,
            _softcap,
            _hardcap,
            Math.floor(_endTime / 1000),
            _symbol,
            _name,
            _price,
            _decimals,
            _totalSupply,
            _tokenAddress,
            lister.address
        );
        console.log("user's fee: ", await vulcanPadFactory.feeContributions(await user.address))
        const _vulcans = await vulcanPadFactory.getVulcans();
        console.log("ICOs: ", _vulcans);

        const vulcanInstance = await ethers.getContractFactory("Vulcan") ;
        ico = await vulcanInstance.attach(_vulcans[0]);
        // ico = new ethers.Contract(_vulcans[0], ABI, ethers.provider) ;
        
        // ico = vulcanInstance.attach(_vulcans[0]);
    });
    it("test ICO info", async function () {
        const _totalCap = await ico.totalCap()
        const _tokenInfo = await ico.tokenInfo();
        const _hardcap = await ico.hardcap();
        const _softcap = await ico.softcap();
        const _creator = await ico.creator();

        console.log({
            _tokenInfo,
            _softcap,
            _hardcap,
            _creator,
            _totalCap,
        });
    })
    it("Check the balance of all addresses", async function(){
        const listerAmount = await ethers.provider.getBalance(lister.address) ;
        console.log("lister ", ethers.formatEther(listerAmount)) ;
        const contributor1Amount = await ethers.provider.getBalance(contributor1.address) ;
        console.log("contributor1 ", ethers.formatEther(contributor1Amount)) ;
        const contributor2Amount = await ethers.provider.getBalance(contributor2.address) ;
        console.log("contributor2 ",await ethers.formatEther(contributor2Amount)) ;
        const daoAmount = await ethers.provider.getBalance(daoAddress) ;
        console.log("dao ", await ethers.formatEther(daoAmount)) ;
        const userAmount = await ethers.provider.getBalance(user.address) ;
        console.log("creator ", await ethers.formatEther(userAmount)) ;
    })
    it("Try to buy tokens 100", async function () {
        
        let _user1Balance = await dew.balanceOf(user1.address);
        await dew.connect(user).transfer(await ico.getAddress(), 100000*1e10);
        await dew.connect(user).transfer(await ico.getAddress(), 300000*1e10);
        await dew.connect(user).transfer(await ico.getAddress(), 200000*1e10);
        console.log("user1 balance before buy: ", _user1Balance);
        await ico.connect(user1).buy(200*1e10, contributor1, {value: ethers.parseEther("0.2")});
        _user1Balance = await dew.balanceOf(user1.address);
        console.log("user1 balance after buy: ", _user1Balance);
        console.log("fundsRaised", await ethers.provider.getBalance(ico.getAddress()))
        await ico.connect(user1).buy(499800*1e10, contributor2,  {value: ethers.parseEther("100")});
        _user1Balance = await dew.balanceOf(user1.address);
        console.log("user1 balance after buy1: ", _user1Balance);
        console.log("fundsRaised1", await ethers.provider.getBalance(ico.getAddress()), await ico.tokensAvailable())
    })

   

    // it("claim creator when soft cap arrived", async function(){
    //     await time.increaseTo(1713312000) ;
    //     await ico.connect(user).finishNotSuccess() ;
    // })
    it("claim user1 when soft cap arrived", async function(){
        await time.increaseTo(1713312000) ;
        await dew.connect(user1).approve(await ico.getAddress(), 4000000000000000);
        await ico.connect(user1).withdraw() ;
    })
    it("Check the balance of all addresses", async function(){
        const listerAmount = await ethers.provider.getBalance(lister.address) ;
        console.log("lister ", ethers.formatEther(listerAmount)) ;
        const contributor1Amount = await ethers.provider.getBalance(contributor1.address) ;
        console.log("contributor1 ", ethers.formatEther(contributor1Amount)) ;
        const contributor2Amount = await ethers.provider.getBalance(contributor2.address) ;
        console.log("contributor2 ",await ethers.formatEther(contributor2Amount)) ;
        const daoAmount = await ethers.provider.getBalance(daoAddress) ;
        console.log("dao ", await ethers.formatEther(daoAmount)) ;
        const userAmount = await ethers.provider.getBalance(user.address) ;
        console.log("creator ", await ethers.formatEther(userAmount)) ;
        const user1Amount = await ethers.provider.getBalance(user1.address) ;
        console.log("user1 ", await ethers.formatEther(user1Amount)) ;
    })
    

})
